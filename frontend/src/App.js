import {React,ReactDOM} from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import { createTheme } from '@mui/material/styles';
import Navbar from "./components/Navbar";

import CreateWorkflow from "./pages/CreateWorkflow";

import Form from "./pages/Form";

import WorkflowsAdmin from "./pages/WorkflowsAdmin";

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
        <Route path="/WorkflowsAdmin" element={<WorkflowsAdmin />} />
      </Routes> 
      
    </div>
  );

}

export default App;
