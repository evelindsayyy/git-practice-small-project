import { useState, useEffect } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Welcome to your to-do list!", completed: false },
    { id: 2, text: "Click the checkbox to mark as complete", completed: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Reset body styles
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "auto";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
  }, []);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
        },
      ]);
      setInputValue("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "white",
          borderRadius: "12px",
          padding: window.innerWidth < 600 ? "20px" : "30px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          marginTop: "20px",
        }}
      >
        <h1
          style={{
            fontSize: window.innerWidth < 600 ? "24px" : "32px",
            marginBottom: "30px",
            color: "#333",
            textAlign: "center",
            margin: "0 0 30px 0",
          }}
        >
          📝 My To-Do List
        </h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            flexDirection: window.innerWidth < 500 ? "column" : "row",
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            placeholder="What needs to be done?"
            style={{
              flex: 1,
              padding: "12px",
              fontSize: "16px",
              border: "2px solid #ddd",
              borderRadius: "8px",
              outline: "none",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={addTodo}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              width: window.innerWidth < 500 ? "100%" : "auto",
            }}
          >
            Add
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setFilter("all")}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              backgroundColor: filter === "all" ? "#667eea" : "#f0f0f0",
              color: filter === "all" ? "white" : "#333",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            All ({todos.length})
          </button>
          <button
            onClick={() => setFilter("active")}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              backgroundColor: filter === "active" ? "#667eea" : "#f0f0f0",
              color: filter === "active" ? "white" : "#333",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setFilter("completed")}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              backgroundColor: filter === "completed" ? "#667eea" : "#f0f0f0",
              color: filter === "completed" ? "white" : "#333",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Completed ({todos.length - activeCount})
          </button>
        </div>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 0 20px 0",
          }}
        >
          {filteredTodos.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
                color: "#999",
                fontSize: "16px",
              }}
            >
              No tasks {filter !== "all" ? `in ${filter}` : "yet"}
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "15px",
                  marginBottom: "10px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  border: "1px solid #eee",
                }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    flex: 1,
                    fontSize: "16px",
                    color: todo.completed ? "#999" : "#333",
                    textDecoration: todo.completed ? "line-through" : "none",
                    wordBreak: "break-word",
                  }}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    backgroundColor: "#ff4444",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    fontSize: "14px",
                    flexShrink: 0,
                  }}
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "15px",
            borderTop: "1px solid #eee",
            fontSize: "14px",
            color: "#666",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <span>
            {activeCount} {activeCount === 1 ? "task" : "tasks"} remaining
          </span>
          {todos.some((todo) => todo.completed) && (
            <button
              onClick={clearCompleted}
              style={{
                backgroundColor: "transparent",
                color: "#ff4444",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Clear completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
