import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLogin ? <div>로그인 성공</div> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
