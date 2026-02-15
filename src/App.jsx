import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import TodoItem from "./components/TodoItem";

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
    const newItem = { text, completed: false };
    setList([...list, newItem]);

    // 2. (Optional) Clear the 'text' so the input box goes blank for the next item
    setText("");
  };

  const handleDelete = (index) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    setList(updatedList);
  };

  const toggleComplete = (index) => {
    const updatedList = list.map((item, i) => {
      if (i === index) {
        // Return a new object that is exactly like the old one,
        // BUT with the 'completed' value flipped!
        return { ...item, completed: !item.completed };
      }
      return item; // Otherwise, just return the item as it was
    });

    setList(updatedList);
  };

  return (
    <div className="bg-light min-vh-100">
      <Header />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 card shadow p-4">
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

            <TodoItem
              list={list}
              handleDelete={handleDelete}
              toggleComplete={toggleComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
