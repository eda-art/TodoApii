import React, { useState } from "react";
import Login from "./components/Login";
import  TodoList from "./components/TodoList"; // Görev listesi bileşeni
 
 
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  return isLoggedIn ? (
    <TodoList />
  ) : (
    <Login onLoginSuccess={() => setIsLoggedIn(true)} />
  );
}
 
export default App;
 