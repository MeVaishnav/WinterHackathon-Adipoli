import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Vendors from "./pages/Vendors";
import Analytics from "./pages/Analytics";
import LoanApplications from "./pages/LoanApplications";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import { Box } from "@mui/material";

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ width: "100%" }}>
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/loan-apps" element={<LoanApplications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
