import { useState } from "react";
import FileDropZone from "../FileDropZone/FileDropZone";
import "./Sidebar.css";

const Sidebar = ({ setResponse, loading, setLoading }) => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  // Lê o conteúdo de um arquivo
  const readFileContent = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file1 || !file2) {
      alert("Envie dois arquivos!");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const file1Text = await readFileContent(file1);
      const file2Text = await readFileContent(file2);

      const prompt = `
Você é um assistente especializado em pareceres técnicos do Tribunal de Contas.
Analise os documentos a seguir e elabore uma sugestão de voto fundamentada.

INFORMAÇÃO DO SERVIÇO DE INSTRUÇÃO:
${file1Text}

OPINIÃO DO MINISTÉRIO PÚBLICO E DECISÕES ANTERIORES:
${file2Text}
`;

      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "dolphin3",
          prompt: prompt,
        }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        try {
          const json = JSON.parse(chunk);
          if (json.response) {
            setResponse((prev) => prev + json.response);
          }
        } catch {
          // Ignora pedaços incompletos de JSON
        }
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar os arquivos ou conectar ao Ollama.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="aside-container">
      <img
        src="../../../src/assets/images/lexmind_logo2.png"
        alt="lexmind logo"
        className="lex-logo"
      />
      <FileDropZone
        label="Arraste ou clique para enviar a informação do serviço de instrução"
        onFileSelected={(file) => setFile1(file)}
      />
      <FileDropZone
        label="Arraste ou clique para enviar a opinião do MP/decisões anteriores"
        onFileSelected={(file) => setFile2(file)}
      />
      <button type="submit" disabled={loading} onClick={handleSubmit}>
        <span className="material-symbols-outlined">upload</span>
      </button>
    </aside>
  );
};

export default Sidebar;
