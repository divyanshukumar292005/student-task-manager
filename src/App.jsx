import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: task,
        completed: false,
      },
    ]);

    setTask("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  return (
    <div className="app">

      {/* Header */}

      <header className="header">
        <div>
          <p className="small-title">STUDENT WORKSPACE</p>
          <h1>Study<span>Flow</span></h1>
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


      {/* Dashboard Cards */}

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
            <h2>
              {tasks.filter((item) => !item.completed).length}
            </h2>
          </div>
        </div>


        <div className="stat-card green">
          <div className="icon">✓</div>

          <div>
            <p>Completed</p>
            <h2>
              {tasks.filter((item) => item.completed).length}
            </h2>
          </div>
        </div>

      </section>


      {/* Main Task Area */}

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

          {tasks.length === 0 ? (

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