import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Task {
  id: number;
  name: string;
  destination: string;
  date: string;
  totaldays: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    id: 0,
    name: "",
    destination: "",
    date: "",
    totaldays: "",
  });
  const [password, setPassword] = useState<string>("");
  const [isPasswordEntered, setIsPasswordEntered] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({
      ...newTask,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddTask = () => {
    const sortedNumbersInTotaldays = newTask.totaldays
      .split(" ")
      .map(Number)
      .sort((a, b) => a - b) // Sort in ascending order
      .filter((num) => !isNaN(num))
      .join(" ");

    setTasks([...tasks, { ...newTask, totaldays: sortedNumbersInTotaldays }]);
    setNewTask({
      id: newTask.id + 1,
      name: "",
      destination: "",
      date: "",
      totaldays: "",
    });
  };

  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === "2015") {
      setIsPasswordEntered(true);
    }
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleReset = () => {
    setTasks([]);
  };

  const handleCellEdit = (
    event: React.ChangeEvent<HTMLInputElement>,
    taskId: number,
    fieldName: string
  ) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          [fieldName]: event.target.value,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const sortTasksByTotaldays = () => {
    const sortedTasks = tasks
      .map((task) => ({ ...task }))
      .sort((a, b) => {
        const numbersA = a.totaldays
          .split(" ")
          .map(Number)
          .filter((num) => !isNaN(num));
        const numbersB = b.totaldays
          .split(" ")
          .map(Number)
          .filter((num) => !isNaN(num));

        return Math.min(...numbersA) - Math.min(...numbersB);
      });

    setTasks(sortedTasks);
  };

  useEffect(() => {
    sortTasksByTotaldays();
  }, [tasks]);

  return (
    <div className="container">
      {!isPasswordEntered ? (
        <form onSubmit={handlePasswordSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Enter Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordInputChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      ) : (
        <>
          <h2>Driver Tasks</h2>
          {tasks.length > 0 ? (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Destination</th>
                    <th>Date</th>
                    <th>Totaldays</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={task.id}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="text"
                          value={task.name}
                          onChange={(e) => handleCellEdit(e, task.id, "name")}
                          className="form-control"
                          readOnly={!isPasswordEntered}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={task.destination}
                          onChange={(e) =>
                            handleCellEdit(e, task.id, "destination")
                          }
                          className="form-control"
                          readOnly={!isPasswordEntered}
                        />
                      </td>

                      <td>
                        <input
                          type="text"
                          value={task.date}
                          onChange={(e) => handleCellEdit(e, task.id, "date")}
                          className="form-control"
                          readOnly={!isPasswordEntered}
                        />
                      </td>

                      <td>
                        <input
                          type="text"
                          value={task.totaldays}
                          onChange={(e) =>
                            handleCellEdit(e, task.id, "totaldays")
                          }
                          className="form-control"
                          readOnly={!isPasswordEntered}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="btn btn-danger"
                          disabled={!isPasswordEntered}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={handleReset}
                className="btn btn-secondary"
                disabled={!isPasswordEntered}
              >
                Reset
              </button>
            </>
          ) : (
            <p>No tasks available.</p>
          )}
          <div>
            <h3>Add Task</h3>
            <div className="row g-3">
              <div className="col">
                <input
                  type="text"
                  name="name"
                  placeholder="Task name"
                  value={newTask.name}
                  onChange={handleInputChange}
                  className="form-control"
                  readOnly={!isPasswordEntered}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="destination"
                  placeholder="Task destination"
                  value={newTask.destination}
                  onChange={handleInputChange}
                  className="form-control"
                  readOnly={!isPasswordEntered}
                />
              </div>

              <div className="col">
                <input
                  type="text"
                  name="date"
                  placeholder="Task date"
                  value={newTask.date}
                  onChange={handleInputChange}
                  className="form-control"
                  readOnly={!isPasswordEntered}
                />
              </div>

              <div className="col">
                <input
                  type="text"
                  name="totaldays"
                  placeholder="Task totaldays"
                  value={newTask.totaldays}
                  onChange={handleInputChange}
                  className="form-control"
                  readOnly={!isPasswordEntered}
                />
              </div>
              <div className="col-auto">
                <button
                  onClick={handleAddTask}
                  className="btn btn-primary"
                  disabled={!isPasswordEntered}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;
