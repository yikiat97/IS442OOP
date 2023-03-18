import { React } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";


import CreateWorkflow from "./pages/CreateWorkflow";

import Form from "./pages/FormCreation";

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
import FormHomePage from "./pages/FormHomePage";
import FormCreation from "./pages/FormCreation";
import ViewForms from "./pages/ViewForms";
import UserManagement from "./pages/UserManagement";
import CreateCompany from "./pages/CreateCompany";
import CreateNewContact from "./pages/CreateNewContact";
import Vendor from "./pages/Vendor";
import Admin from "./pages/Admin";
import Approver from "./pages/Approver";
import CompanyDetails from "./pages/CompanyDetails"
import ForgetPassword from "./pages/ForgetPassword"
import VendorViewForm from "./pages/VendorViewForm"


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
    
        {/* {user && <Navbar />}  */}
        <Navbar />
      </header>
      <Routes>
      
        <Route path="/VendorViewForm" element={<VendorViewForm />} />
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
        <Route
          path="/UserManagement"
          element={
            <ProtectedRoute rolesAllowed={["Admin"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route path="/CreateCompany" element={<CreateCompany />} />
        <Route path="/CreateNewContact/:company" element={<CreateNewContact />} />
        <Route path="/Vendor" element={<Vendor />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Approver" element={<Approver />} />
        <Route path="/CompanyDetails/:company" element={<CompanyDetails />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/FormHomePage" element={<FormHomePage />} />
        <Route path="/FormCreation" element={<FormCreation />} /> 
        <Route path="/ViewForms" element={<ViewForms />} /> 
        <Route exact path="/CreateWorkflow" element={<CreateWorkflow/>}/>
        <Route path="/WorkflowsAdmin" element={<WorkflowsAdmin />} />
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
