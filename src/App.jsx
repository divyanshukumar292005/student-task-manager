import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tasks from backend
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  // Add task
  async function addTask() {
    if (task.trim() === "") return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.trim(),
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const newTask = await response.json();

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  // Complete / Undo task
  async function toggleTask(id) {
    const taskToUpdate = tasks.find((item) => item.id === id);

    if (!taskToUpdate) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !taskToUpdate.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((item) =>
          item.id === id ? updatedTask : item
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  // Delete task
  async function deleteTask(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((prevTasks) =>
        prevTasks.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  const pendingTasks = tasks.filter(
    (item) => !item.completed
  ).length;

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  return (
    <div className="app">

      {/* Header */}

      <header className="header">
        <div>
          <p className="small-title">STUDENT WORKSPACE</p>

          <h1>
            Study<span>Flow</span>
          </h1>

          <p className="subtitle">
            Plan • Track • Complete
          </p>
        </div>

        <div className="profile">
          <div className="avatar">D</div>

          <div>
            <strong>Divyanshu</strong>
            <small>BCA Student</small>
          </div>
        </div>
      </header>

      {/* Dashboard */}

      <section className="dashboard">

        <div className="stat-card blue">
          <div className="icon">📚</div>

          <div>
            <p>Total Tasks</p>
            <h2>{tasks.length}</h2>
          </div>
        </div>

        <div className="stat-card purple">
          <div className="icon">⏳</div>

          <div>
            <p>Pending</p>
            <h2>{pendingTasks}</h2>
          </div>
        </div>

        <div className="stat-card green">
          <div className="icon">✓</div>

          <div>
            <p>Completed</p>
            <h2>{completedTasks}</h2>
          </div>
        </div>

      </section>

      {/* Task Manager */}

      <section className="task-section">

        <div className="section-header">

          <div>
            <p className="small-title">TASK MANAGER</p>
            <h2>Today's Tasks</h2>
          </div>

          <div className="task-count">
            {tasks.length} Tasks
          </div>

        </div>

        {/* Add Task */}

        <div className="task-input">

          <input
            type="text"
            placeholder="What do you need to accomplish?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />

          <button onClick={addTask}>
            + Add Task
          </button>

        </div>

        {/* Tasks */}

        <div className="tasks">

          {loading ? (

            <div className="empty">
              <h3>Loading tasks...</h3>
            </div>

          ) : tasks.length === 0 ? (

            <div className="empty">

              <div className="empty-icon">
                ✓
              </div>

              <h3>No tasks yet</h3>

              <p>
                Add your first task and start getting things done.
              </p>

            </div>

          ) : (

            tasks.map((item) => (

              <div
                className={
                  item.completed
                    ? "task completed"
                    : "task"
                }
                key={item.id}
              >

                <button
                  className="check"
                  onClick={() => toggleTask(item.id)}
                >
                  {item.completed ? "✓" : ""}
                </button>

                <div className="task-info">

                  <h3>{item.title}</h3>

                  <p>
                    Personal Task
                  </p>

                </div>

                <div className="task-actions">

                  <button
                    className="complete-btn"
                    onClick={() => toggleTask(item.id)}
                  >
                    {item.completed
                      ? "Undo"
                      : "Complete"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(item.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </section>

    </div>
  );
}

export default App;