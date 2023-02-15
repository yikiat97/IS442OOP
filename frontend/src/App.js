import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import { createTheme } from '@mui/material/styles';
import Navbar from "./components/Navbar";

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <Navbar>
          
        </Navbar>
        
      </header>
    </div>
  );
}

export default App;
