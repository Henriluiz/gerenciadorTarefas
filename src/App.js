import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Tarefas from "./pages/tarefas";
import CriarTarefa from "./pages/criar";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/tarefas" element={<Tarefas />} />
        <Route path="/criar" element={<CriarTarefa />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;