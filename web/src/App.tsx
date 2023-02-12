import "bootstrap/dist/css/bootstrap.min.css";

import React from 'react';

import FileUpload from "./components/FileUpload";

const App: React.FC = () => {
  return (
    <div className="container" style={{ width: "600px" }}>
      <div className="my-3">
        <h3>Latii challenge</h3>
        <h4>PDF to text service</h4>
      </div>

      <FileUpload />
    </div>
  );
}

export default App;
