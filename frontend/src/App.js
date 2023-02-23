import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import { createTheme } from '@mui/material/styles';
import Navbar from "./components/Navbar";

import CreateWorkflow from "./pages/CreateWorkflow";

function App() {


  return (
    <div className="App">
      <Router>

        <header className="App-header">
          <Navbar>
            
          </Navbar>
          
        </header>

      <Routes>

        <Route exact path="/CreateWorkflow" element={<CreateWorkflow/>}/>

      </Routes>
        
      </Router>
    

      
    </div>
  );
}

export default App;
