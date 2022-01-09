import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="App">kakao talk</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
