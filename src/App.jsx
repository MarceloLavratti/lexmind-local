import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Loader from "./components/Loader/Loader";
import "./App.css";

const App = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <header></header>
      <div className="page-container">
        <Sidebar
          setResponse={setResponse}
          loading={loading}
          setLoading={setLoading}
        />
        <main className="page-content">
          <div className="text-content">
            {/* Renderização condicional */}

            {response ? (
              <div className="response-box">
                <h3>💬 Resposta sugerida:</h3>
                <p>{response}</p>
              </div>
            ) : (
              <div className="response-box">
                Bem-vindo ao Lexmind. Carregue os arquivos para que eu possa
                analisar e fazer uma sugestão de relatório e voto!
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
