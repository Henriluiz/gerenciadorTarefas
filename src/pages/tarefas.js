import { useNavigate } from "react-router-dom";
import "./../styles/tarefas.css";
import { useEffect, useState } from "react";

function Tarefas() {
  const navigate = useNavigate();

  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/"); // manda pro login
    } else {
      atualizarLista(); // carrega tarefas
    }
  }, []);
  
  function atualizarLista() {
    fetch("http://localhost:8000/api/tarefa", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTarefas(data.tarefa || []);
      })
      .catch((err) => console.error(err));
  }

  function alterarStatus(id, statusAtual) {
    const novoStatus =
      statusAtual === "Pendente"
        ? "Em Andamento"
        : statusAtual === "Em Andamento"
          ? "Concluída"
          : "Pendente";

    fetch(`http://localhost:8000/api/update/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        StatusTarefa: novoStatus,
      }),
    }).then(() => atualizarLista());
  }

  function deletar(id) {
    fetch(`http://localhost:8000/api/excluir/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(() => atualizarLista());
  }

  function renderStatus(status) {
    switch (status) {
      case "Pendente":
        return "❌";
      case "Em Andamento":
        return "⏳";
      case "Concluída":
        return "✅";
      default:
        return "❓";
    }
  }

  function logout() {
    fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(() => {
        localStorage.removeItem("token"); // limpa token
        navigate("/"); // volta pro login (ou home)
      })
      .catch((err) => console.error(err));
  }
  const total = tarefas.length;

  const pendentes = tarefas.filter((t) => t.StatusTarefa === "Pendente").length;

  const andamento = tarefas.filter(
    (t) => t.StatusTarefa === "Em Andamento",
  ).length;

  const concluidas = tarefas.filter(
    (t) => t.StatusTarefa === "Concluída",
  ).length;

  return (
    <>
      <div className="tarefas-page">
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
                      onClick={() => navigate("/criar")}
                    >
                      Criar Tarefa
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      onClick={logout}
                      style={{ color: "#cf6f6f" }}
                    >
                      🚪 Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <main className="tarefas-container mt-5 pt-5">
          <div className="search-bar">
            <div style={{ width: "100%", maxWidth: "480px" }}>
              <label style={{ fontSize: "0.65rem", color: "#c8a96e" }}>
                Central de Tarefa
              </label>

              <div className="input-wrapper">
                <input placeholder="Buscar Tarefa..." />
                <span className="divider"></span>
                <button onClick={() => navigate("/criar")}>Criar →</button>
              </div>
            </div>
          </div>

          {/* CARDS */}
          <div className="tarefas-cards-grid">
            <div className="tarefas-card tarefas-card-total">
              <div className="tarefas-card-title">Total de Tarefas</div>
              <div className="tarefas-card-count">{total}</div>
              <div className="tarefas-card-subtitle">Registradas</div>
            </div>

            <div className="tarefas-card tarefas-card-active">
              <div className="tarefas-card-title">Em Andamento</div>
              <div className="tarefas-card-count">{andamento}</div>
              <div className="tarefas-card-subtitle">⏳ Em execução</div>
            </div>

            <div className="tarefas-card tarefas-card-pending">
              <div className="tarefas-card-title">Pendentes</div>
              <div className="tarefas-card-count">{pendentes}</div>
              <div className="tarefas-card-subtitle">❌ Aguardando</div>
            </div>

            <div className="tarefas-card tarefas-card-paused">
              <div className="tarefas-card-title">Concluídas</div>
              <div className="tarefas-card-count">{concluidas}</div>
              <div className="tarefas-card-subtitle">✅ Finalizadas</div>
            </div>
          </div>

          {/* TABELA */}
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Inicio</th>
                  <th>Final</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {tarefas.length > 0 ? (
                  tarefas.map((t, index) => (
                    <tr key={index}>
                      <td>{t.nome}</td>
                      <td>{t.tipo}</td>
                      <td>{t.DataInicio}</td>
                      <td>{t.DataLimite}</td>
                      <td>{renderStatus(t.StatusTarefa)}</td>
                      <td>
                        <button
                          onClick={() => alterarStatus(t.id, t.StatusTarefa)}
                        >
                          🔄
                        </button>
                        <button onClick={() => deletar(t.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Nenhuma tarefa encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

export default Tarefas;
