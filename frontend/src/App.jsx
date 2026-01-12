import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Vendors from "./pages/Vendors";
import Analytics from "./pages/Analytics";
import Loans from "./pages/Loans";
import TrustCalculator from "./pages/TrustCalculator";


function App() {
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/trust-calculator" element={<TrustCalculator />} />

          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
