import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import { createTheme } from '@mui/material/styles';
import Navbar from "./components/Navbar";

import CreateWorkflow from "./pages/CreateWorkflow";

import Form from "./pages/Form";

function App() {


  return (
    <div className="App">
      <header className="App-header">
      <>
      <Navbar />

      </>
      </header>      
      <Routes>
        <Route path="/Form" element={<Form />} />
        <Route exact path="/CreateWorkflow" element={<CreateWorkflow/>}/>
      </Routes> 
    </div>
  );
}

export default App;
