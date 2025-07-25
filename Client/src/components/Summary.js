import React from "react";
import "./Summary.css";

function Summary() {
  // Dummy data - replace with API data later
  const files = [
    { name: "File 1", date: "05 Jan" },
    { name: "File 2", date: "25 Jan" },
    { name: "File 3", date: "02 Feb" },
    { name: "File 4", date: "11 Mar" },
    { name: "File 5", date: "25 Apr" },
  ];

  return (
    <div className="summary-container">
      <h2>AI Summary</h2>
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Date</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{file.name}</td>
              <td>{file.date}</td>
              <td>
                <button onClick={() => alert(`Viewing summary for ${file.name}`)}>
                  View Summary
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Summary;

