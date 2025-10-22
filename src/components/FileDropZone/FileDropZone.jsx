import { useState, useRef } from "react";
import "./FileDropZone.css";

const FileDropZone = ({ label, onFileSelected }) => {
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelected && onFileSelected(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelected && onFileSelected(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div
      className="dropzone"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => fileInputRef.current.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <p>{fileName || label}</p>
    </div>
  );
};

export default FileDropZone;
