import { useNavigate } from "react-router-dom";
import "./../styles/tarefas.css";

function Tarefas() {
  const navigate = useNavigate();

  return (
    <>
    <div className="tarefas-page">
      <nav className="navbar navbar-dark fixed-top" style={{ background: "#141310" }}>
        <div className="container-fluid">
          <span className="navbar-brand" style={{ color: "#c8a96e" }}>
            Gerador de Tarefas
          </span>

          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#menu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="offcanvas offcanvas-end text-bg-dark" id="menu">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">MENU</h5>
              <button className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button className="nav-link" onClick={() => navigate("/criar")}>
                    Criar Tarefa
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <main className="tarefas.container mt-5 pt-5">

        <div className="search-bar">
          <div style={{ width: "100%", maxWidth: "480px" }}>
            <label style={{ fontSize: "0.65rem", color: "#c8a96e" }}>
              Nome da Tarefa
            </label>

            <div className="input-wrapper">
              <input placeholder="Digite o nome da tarefa..." />
              <span className="divider"></span>
              <button onClick={() => navigate("/criar")}>
                Avançar →
              </button>
            </div>
          </div>
        </div>

        {/* CARDS */}
        <div className="tarefas-cards-grid">
          <div className="tarefas-card tarefas-card-total">
            <div className="tarefas-card-title">Total de Tarefas</div>
            <div className="tarefas-card-count">0</div>
            <div className="tarefas-card-subtitle">Registradas</div>
          </div>

          <div className="tarefas-card tarefas-card-active">
            <div className="tarefas-card-title">Em Andamento</div>
            <div className="tarefas-card-count">0</div>
            <div className="tarefas-card-subtitle">⏳ Em execução</div>
          </div>

          <div className="tarefas-card tarefas-card-pending">
            <div className="tarefas-card-title">Pendentes</div>
            <div className="tarefas-card-count">0</div>
            <div className="tarefas-card-subtitle">❌ Aguardando</div>
          </div>

          <div className="tarefas-card tarefas-card-paused">
            <div className="tarefas-card-title">Concluídas</div>
            <div className="tarefas-card-count">0</div>
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
              <tr>
                <td colSpan="6" className="text-center">
                  Nenhuma tarefa encontrada.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>
    </div>
    </>
  );
}

export default Tarefas;