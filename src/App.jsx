import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import TodoItem from "./components/TodoItem";
import Weather from "./components/Weather";

function Header() {
  return (
    <header
      style={{ backgroundColor: "#282c34", padding: "10px", color: "white" }}
    >
      <h1 className="display-5 fw-bold">My Awesome Todo List</h1>
    </header>
  );
}

function App() {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [list, setList] = useState(() => {
    const savedList = localStorage.getItem("myToDoList");
    return savedList ? JSON.parse(savedList) : [];
  }); // We start with an empty array []

  useEffect(() => {
    localStorage.setItem("myToDoList", JSON.stringify(list));
  }, [list]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (text === "") return;
    // 1. Take what's in 'text' and add it to the 'list' array
    const newItem = { id: Date.now(), text, completed: false };
    setList([...list, newItem]);

    // 2. (Optional) Clear the 'text' so the input box goes blank for the next item
    setText("");
  };

  const handleDelete = (id) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  };

  const toggleComplete = (id) => {
    const updatedList = list.map((item) => {
      if (id === item.id) {
        // Return a new object that is exactly like the old one,
        // BUT with the 'completed' value flipped!
        return { ...item, completed: !item.completed };
      }
      return item; // Otherwise, just return the item as it was
    });

    setList(updatedList);
  };

  const handleClear = () => {
    setList([]); // Set the 'list' state to an empty array
  };

  const filteredList = list.filter((item) => {
    if (filter === "active") return !item.completed;
    if (filter === "completed") return item.completed;
    return true; // this handles "all"
  });

  return (
    <div className="bg-light min-vh-100">
      <Header />

      <div className="container py-5">
        {/* The 'row' is the wrapper for side-by-side columns */}
        <div className="row g-4">
          {/* Left Column: Todo List (7 out of 12 units wide) */}
          <div className="col-md-7">
            <div className="card shadow p-4 h-100">
              <h3 className="mb-4">My Tasks</h3>

              <form onSubmit={handleAdd} className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="What needs to be done?"
                  onChange={handleChange}
                  value={text}
                />
                <button className="btn btn-primary" type="submit">
                  Add Task
                </button>
              </form>

              <div className="mb-3">
                <label className="form-label">Filter:</label>
                <select
                  className="form-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <TodoItem
                list={filteredList}
                handleDelete={handleDelete}
                toggleComplete={toggleComplete}
              />
              {list.length > 0 && (
                <button className="btn btn-warning" onClick={handleClear}>
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Weather (5 out of 12 units wide) */}
          <div className="col-md-5">
            {/* We don't need another card here because Weather.js already has a card! */}
            <Weather />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
