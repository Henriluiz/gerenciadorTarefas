import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/login.css"

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function fazerLogin() {
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: email,
        senha: senha
      })
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("id", data.id);

        // 👉 vai pra tela de tarefas
        navigate("/tarefas");
      });
  }

  return (
  <div className="auth-wrapper">

    <div className="auth-card">
      <h1 className="auth-title">Login</h1>
      <div className="auth-subtitle">acesso ao sistema</div>

      <input
        className="auth-input"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="auth-input"
        placeholder="Senha"
        type="password"
        onChange={(e) => setSenha(e.target.value)}
      />

      <button className="auth-button" onClick={fazerLogin}>
        Entrar
      </button>

      <div className="auth-link">
        Não tem conta?{" "}
        <span onClick={() => navigate("/cadastro")}>
          Criar conta
        </span>
      </div>
    </div>

  </div>
);
}

export default Login;