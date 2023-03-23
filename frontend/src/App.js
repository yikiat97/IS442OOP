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
import ViewWorkflowsTemplate from "./pages/ViewWorkflowsTemplate";
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
import CompanyDetails from "./pages/CompanyDetails";
import ForgetPassword from "./pages/ForgetPassword";
import EditUser from "./pages/EditUser";
import VendorViewForm from "./pages/VendorViewForm";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const VENDOR_ROLE = "Vendor";
  const ADMIN_ROLE = "Admin";
  const APPROVER_ROLE = "Approver";

  const ProtectedRoute = ({ rolesAllowed = [], children }) => {
    const role = sessionStorage.getItem("role");
    const user = sessionStorage.getItem("user");
    if (
      rolesAllowed.length > 0 ||
      (user && !rolesAllowed.includes(role)) // test this later, admin allowed all pages
    ) {
      return <Navigate to="/NotAuthorized" replace />;
    }

    return children;
  };

  const routes = {
    "/VendorViewForm": {
      element: <VendorViewForm />,
      rolesAllowed: [VENDOR_ROLE],
    },
    "/Form": { element: <Form />, rolesAllowed: [VENDOR_ROLE] },
    "/CreateWorkflow": {
      element: <CreateWorkflow />,
      rolesAllowed: [ADMIN_ROLE],
    },
    "/WorkflowsAdmin": {
      element: <WorkflowsAdmin />,
      rolesAllowed: [ADMIN_ROLE],
    },
    "/UserManagement": {
      element: <UserManagement />,
      rolesAllowed: [ADMIN_ROLE],
    },
    "/CreateCompany": {
      element: <CreateCompany />,
      rolesAllowed: [ADMIN_ROLE],
    },
    "/CreateNewContact": {
      element: <CreateNewContact />,
      rolesAllowed: [ADMIN_ROLE],
    },
    "/Vendor": { element: <Vendor />, rolesAllowed: [ADMIN_ROLE] },
    "/Admin": { element: <Admin />, rolesAllowed: [ADMIN_ROLE] },
    "/Approver": { element: <Approver />, rolesAllowed: [APPROVER_ROLE] },
    "/CompanyDetails/:company": {
      element: <CompanyDetails />,
      rolesAllowed: [ADMIN_ROLE, VENDOR_ROLE],
    },
    "/EditUser/:userEmail": {
      element: <EditUser />,
      rolesAllowed: [ADMIN_ROLE],
    },
    "/FormHomePage": { element: <FormHomePage />, rolesAllowed: [ADMIN_ROLE] },
    "/FormCreation": { element: <FormCreation />, rolesAllowed: [ADMIN_ROLE] },
    "/ViewForms": { element: <ViewForms />, rolesAllowed: [ADMIN_ROLE] },
    "/CompletedWorkflow": {
      element: <CompletedWorkflow />,
      rolesAllowed: [ADMIN_ROLE, VENDOR_ROLE],
    },
    "/RejectedWorkflow": {
      element: <RejectedWorkflow />,
      rolesAllowed: [ADMIN_ROLE, VENDOR_ROLE],
    },
    "/UncompletedWorkflow": {
      element: <UncompletedWorkflow />,
      rolesAllowed: [ADMIN_ROLE, VENDOR_ROLE],
    },
    "/AssignWorkflow": {
      element: <AssignWorkflow />,
      rolesAllowed: [ADMIN_ROLE],
    },
    "/ViewWorkflowsTemplate": {
      element: <ViewWorkflowsTemplate />,
      rolesAllowed: [ADMIN_ROLE],
    },
    "/ViewAllWorkflow": {
      element: <ViewAllWorkflow />,
      rolesAllowed: [ADMIN_ROLE],
    },
    "/Login": { element: <Login />, rolesAllowed: [] },
    "/NotAuthorized": { element: <NotAuthorized />, rolesAllowed: [] },
    "/ForgetPassword": { element: <ForgetPassword />, rolesAllowed: [] },
    "/": { element: <Home />, rolesAllowed: [] },
  };

  const renderRoutes = () => {
    const paths = Object.keys(routes);
    return paths.map((p) => (
      <Route
        path={p}
        element={
          <ProtectedRoute rolesAllowed={routes[p].rolesAllowed}>
            {routes[p].element}
          </ProtectedRoute>
        }
      />
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* {user && <Navbar />}  */}
        <Navbar />
      </header>
      <Routes>{renderRoutes()}</Routes>
    </div>
  );
}

export default App;
