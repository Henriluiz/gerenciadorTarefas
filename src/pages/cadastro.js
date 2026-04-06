import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/login.css"

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function cadastrar() {
    fetch("http://localhost:8000/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        email,
        senha,
      }),
    }).then(() => navigate("/"));
  }

  return (
  <div className="auth-wrapper">

    <div className="auth-card">
      <h1 className="auth-title">Cadastro</h1>
      <div className="auth-subtitle">crie sua conta</div>

      <input
        className="auth-input"
        placeholder="Nome"
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        className="auth-input"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="auth-input"
        placeholder="Senha"
        onChange={(e) => setSenha(e.target.value)}
      />

      <button className="auth-button" onClick={cadastrar}>
        Criar conta
      </button>

      <div className="auth-link">
        Já tem conta?{" "}
        <span onClick={() => navigate("/")}>
          Entrar
        </span>
      </div>
    </div>

  </div>
);
}

export default Cadastro;