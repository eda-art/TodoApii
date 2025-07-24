import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Doğru yazıldığına emin ol
 
function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
 
  const handleSubmit = async (e) => {
    e.preventDefault(); // formun sayfayı yenilemesini engeller
    try {
      await axios.post("https://localhost:7006/api/Auth/login", {
        Username: username,
        Password: password,
      });
      onLoginSuccess();
    } catch (err) {
      setError("Kullanıcı adı veya şifre hatalı");
    }
  };
 
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Giriş Yap</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        autoFocus
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Giriş</button>
    </form>
  );
}
 
export default Login;