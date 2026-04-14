import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/criar.css";

function Criar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [nome, setNome] = useState("");
  const [data_inicio, setData_inicio] = useState("");
  const [data_termino, setData_termino] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    

    if (!token) {
      navigate("/"); // manda pro login
    }
  },);

  function criarTarefa() {
    const id = localStorage.getItem("id");
    if (token) {
      fetch("http://localhost:8000/api/createTar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_user: id,
          nome: nome,
          DataInicio: data_inicio,
          DataLimite: data_termino,
          tipo: categoria,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigate("/tarefas");
        })
        .catch((err) => {
          console.error("Erro ao criar tarefa:", err);
        });
    }
  }

  return (
    <>
      <div className="criar-page">
        <nav
          className="navbar navbar-dark fixed-top"
          style={{ background: "#141310" }}
        >
          <div className="container-fluid">
            <span className="navbar-brand" style={{ color: "#c8a96e" }}>
              Gerador de Tarefas
            </span>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#menu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="offcanvas offcanvas-end text-bg-dark" id="menu">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title">MENU</h5>
                <button
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                ></button>
              </div>

              <div className="offcanvas-body">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      onClick={() => navigate("/tarefas")}
                    >
                      Tarefas
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <main className="criar-container">
          <div className="criar-header">
            <div>
              <h1 className="criar-title">Cadastrar Nova Tarefa</h1>
              <div className="criar-subtitle">Preencha os dados</div>
            </div>
            <span className="criar-badge">nova</span>
          </div>

          <div className="criar-form-card">
            <input
              type="text"
              className="form-control mb-3"
              style={{
                background: "#141310",
                color: "#f5f0e8",
                borderColor: "#2a2822    ",
              }}
              placeholder="Nome"
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="date"
              className="form-control mb-3"
              style={{
                background: "#141310",
                color: "#f5f0e8",
                borderColor: "#2a2822    ",
              }}
              placeholder="Data de Início"
              onChange={(e) => setData_inicio(e.target.value)}
            />
            <input
              type="date"
              className="form-control mb-3"
              style={{
                background: "#141310",
                color: "#f5f0e8",
                borderColor: "#2a2822    ",
              }}
              placeholder="Data de Término"
              onChange={(e) => setData_termino(e.target.value)}
            />

            <select
              className="form-select mb-3"
              style={{
                background: "#141310",
                color: "#f5f0e8",
                borderColor: "#2a2822    ",
              }}
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option>Trabalho</option>
              <option>Estudo</option>
              <option>Lazer</option>
            </select>

            <div className="d-flex justify-content-between">
              <button
                onClick={() => navigate("/tarefas")}
                className="criar.btn btn btn-primary"
              >
                Voltar
              </button>

              <button
                onClick={() => criarTarefa()}
                className="criar.btn btn btn-primary"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Criar;
