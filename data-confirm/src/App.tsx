import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormToken from "./Components/ConfirmData/FormToken";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route path="*" element={<FormToken />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
