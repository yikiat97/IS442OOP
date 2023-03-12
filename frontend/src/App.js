import { React } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import CreateWorkflow from "./pages/CreateWorkflow";

import Form from "./pages/Form";

import WorkflowsAdmin from "./pages/WorkflowsAdmin";
import RejectedWorkflow from "./pages/RejectedWorkflow";
import CompletedWorkflow from "./pages/CompletedWorkflow";
import UncompletedWorkflow from "./pages/UncompletedWorkflow";
import AssignWorkflow from "./pages/AssignWorkflow";
import ViewWorkflows from "./pages/ViewWorkflowsTemplate";
import ViewAllWorkflow from "./pages/ViewAllWorkflow";
import Login from "./pages/Login";
import NotAuthorized from "./pages/NotAuthorized";
import Home from "./pages/Home";

function App() {
  const ProtectedRoute = ({ rolesAllowed = [], children }) => {
    const role = sessionStorage.getItem("role");
    const user = sessionStorage.getItem("user");

    if (user !== null && !rolesAllowed.includes(role)) {
      return <Navigate to="/NotAuthorized" replace />;
    }

    return children;
  };

  const user = sessionStorage.getItem("user");
  

  return (
    <div className="App">
      <header className="App-header">
    
        {user && <Navbar />} 
        
      </header>
      <Routes>
        <Route path="/Form" element={<Form />} />
        <Route path="/CreateWorkflow" element={<CreateWorkflow />} />
        <Route
          path="/WorkflowsAdmin"
          element={
            <ProtectedRoute rolesAllowed={["Admin"]}>
              <WorkflowsAdmin />
            </ProtectedRoute>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/CompletedWorkflow" element={<CompletedWorkflow />} />
        <Route path="/RejectedWorkflow" element={<RejectedWorkflow />} />
        <Route
          path="/UncompletedWorkflow"
          element={
            <ProtectedRoute rolesAllowed={["Vendor"]}>
              <UncompletedWorkflow />
            </ProtectedRoute>
          }
        />
        <Route path="/AssignWorkflow" element={<AssignWorkflow />} />
        <Route path="/ViewWorkflows" element={<ViewWorkflows />} />
        <Route path="/ViewAllWorkflow" element={<ViewAllWorkflow />} />
        <Route path="/NotAuthorized" element={<NotAuthorized />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
