import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTaskForm from "./AddTaskForm";
import "./TodoList.css";
import { FaUndo, FaTrash } from "react-icons/fa";
 
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
 
  const loadTodos = () => {
    axios
      .get("https://localhost:7006/api/todo")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Görevler yüklenemedi", err));
  };
 
  useEffect(() => {
    loadTodos();
  }, []);
 
  const addTodo = (todo) => {
    axios
      .post("https://localhost:7006/api/todo", todo)
      .then(() => loadTodos())
      .catch((err) => console.error("Görev eklenemedi", err));
  };
 
  const toggleStatus = (todo) => {
    axios
      .put(`https://localhost:7006/api/todo/${todo.id}`, {
        ...todo,
        durum: !todo.durum,
      })
      .then(() => loadTodos())
      .catch((err) => console.error("Durum güncellenemedi", err));
  };
 
  const deleteTodo = (id) => {
    axios
      .delete(`https://localhost:7006/api/todo/${id}`)
      .then(() => loadTodos())
      .catch((err) => console.error("Görev silinemedi", err));
  };
 
  const bgClasses = ["bg-blue", "bg-green", "bg-yellow", "bg-red"];
 
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.durum === true;
    if (filter === "pending") return todo.durum === false;
    return true;
  });
 
  return (
    <div className="todo-container">
      <h1 className="header-title">📋 Görev Listesi</h1>
 
      <AddTaskForm onAdd={addTodo} />
 
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>📋 Tümü</button>
        <button onClick={() => setFilter("completed")}>✅ Tamamlananlar</button>
        <button onClick={() => setFilter("pending")}>🕓 Tamamlanmayanlar</button>
      </div>
 
      {filteredTodos.length === 0 ? (
        <p>Henüz görev yok</p>
      ) : (
        <div className="task-list">
          {filteredTodos.map((todo, index) => {
            const bgClass = bgClasses[index % bgClasses.length];
            return (
              <div key={todo.id} className={`task-card ${bgClass}`}>
                <div className="task-title">{todo.baslik}</div>
                <div className="task-desc">{todo.aciklama}</div>
                <div className="task-date">
                  Oluşturulma: {new Date(todo.olusturulmaTarihi).toLocaleDateString()}
                </div>
                <div
                  className={`task-status ${todo.durum ? "completed" : "pending"}`}
                >
                  {todo.durum ? "✔️ Tamamlandı" : "⏳ Bekliyor"}
                </div>
                <div className="task-buttons">
                  <button
                    className="toggle-btn"
                    onClick={() => toggleStatus(todo)}
                    aria-label="Durumu değiştir"
                    title="Durumu değiştir"
                  >
                    <FaUndo />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(todo.id)}
                    aria-label="Görevi sil"
                    title="Görevi sil"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
 
export default TodoList;