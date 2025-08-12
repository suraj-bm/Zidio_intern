import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

function FileUpload({ setColumns, setData }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("https://excel-visualizer.onrender.com/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("File uploaded successfully!");
      setColumns(res.data.columns);
      setData(res.data.data);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Excel File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default FileUpload;
