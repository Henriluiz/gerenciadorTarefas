import { useNavigate } from "react-router-dom";
import "./../styles/criar.css"

function Criar() {
  const navigate = useNavigate();

  return (
    <>
        <div className="criar-page">
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
                        <button className="nav-link" onClick={() => navigate("/tarefas")}>
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
                <input type="text" className="form-control mb-3" style={{ background: "#141310", color: "#f5f0e8", borderColor: "#2a2822    " }} placeholder="Nome" />
                <input type="date" className="form-control mb-3" style={{ background: "#141310", color: "#f5f0e8", borderColor: "#2a2822    " }} placeholder="Data de Início"/>
                <input type="date" className="form-control mb-3" style={{ background: "#141310", color: "#f5f0e8", borderColor: "#2a2822    " }} placeholder="Data de Término"/>

                <select className="form-select mb-3" style={{ background: "#141310", color: "#f5f0e8", borderColor: "#2a2822    " }}>
                <option>Trabalho</option>
                <option>Estudo</option>
                <option>Lazer</option>
                </select>

                <div className="d-flex justify-content-between">
                <button onClick={() => navigate("/tarefas")} className="criar.btn btn-primary">
                    Voltar
                </button>

                <button onClick={() => navigate("/tarefas")} className="criar.btn btn-primary">
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