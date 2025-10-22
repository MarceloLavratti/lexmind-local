import "./Loader.css";
import brainCheck from "../../assets/images/lexmind1.png";

export default function Loader() {
  return (
    <div className="loader-container">
      <img src={brainCheck} alt="Carregando..." className="loader-img" />
    </div>
  );
}
