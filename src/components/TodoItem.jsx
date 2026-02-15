import React from "react";

function TodoItem({ list, handleDelete, toggleComplete }) {
  return (
    // 'list-group-flush' removes the outer borders
    <ul className="list-group list-group-flush mt-3">
      {list.map((item, index) => (
        <li
          key={index}
          // d-flex aligns items in a row, justify-content-between pushes delete to the right
          className="list-group-item d-flex justify-content-between align-items-center border-0 px-0"
        >
          <div className="d-flex align-items-center">
            <input
              className="form-check-input mt-0" // mt-0 centers it vertically
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleComplete(index)}
              style={{ cursor: "pointer", width: "20px", height: "20px" }}
            />
            <label
              style={{
                textDecoration: item.completed ? "line-through" : "none",
                marginLeft: "15px",
                color: item.completed ? "#6c757d" : "#212529", // Gray out if done
                cursor: "pointer",
                fontSize: "1.1rem",
              }}
              // When you click the text, it should also toggle the checkbox!
              onClick={() => toggleComplete(index)}
            >
              {item.text}
            </label>
          </div>

          <button
            onClick={() => handleDelete(index)}
            type="button"
            className="btn btn-sm btn-outline-danger border-0" // 'border-0' makes it look cleaner
          >
            {/* Using an 'x' instead of 'Delete' makes it look more like a modern app */}
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoItem;
