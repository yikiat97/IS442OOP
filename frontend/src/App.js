import { React, ReactDOM, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
// import { createTheme } from '@mui/material/styles';
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

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const ProtectedRoute = ({ user, role, rolesAllowed = [], children }) => {
    console.log(role)
    if (!rolesAllowed.includes(role)) {
      // return <Navigate to="/login" replace />;
    }

    // return children;
  };

  return (
    <div className="App">
      <header className="App-header">
        <>
          <Navbar />
        </>
      </header>
      <Routes>
        <Route path="/Form" element={<Form />} />
        <Route exact path="/CreateWorkflow" element={<CreateWorkflow />} />
        <Route
          path="/WorkflowsAdmin"
          element={
            <ProtectedRoute user={user} role={role} rolesAllowed={["Admin"]}>
              <WorkflowsAdmin role={role} setRole={setRole} />
            </ProtectedRoute>
          }
        />
        <Route path="/Login" element={<Login role={role} setRole={setRole.bind(this)}/>} />
        <Route path="/CompletedWorkflow" element={<CompletedWorkflow />} />
        <Route path="/RejectedWorkflow" element={<RejectedWorkflow />} />
        <Route path="/UncompletedWorkflow" element={<UncompletedWorkflow />} />
        <Route path="/AssignWorkflow" element={<AssignWorkflow />} />
        <Route path="/ViewWorkflows" element={<ViewWorkflows />} />
        <Route path="/ViewAllWorkflow" element={<ViewAllWorkflow />} />
      </Routes>
    </div>
  );
}

export default App;
