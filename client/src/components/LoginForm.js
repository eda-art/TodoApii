import React, { useState } from "react";
import axios from "axios";
 
function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const response = await axios.post("https://localhost:7006/api/user/login", {
        Username:username,
        Password:password,
      });
      onLogin(response.data); // Giriş başarılı, kullanıcıyı gönder
    } catch (err) {
      setError("Kullanıcı adı veya şifre yanlış");
    }
  };
 
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Giriş Yap</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
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
 
export default LoginForm;