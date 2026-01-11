import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import InsightsIcon from "@mui/icons-material/Insights";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { name: "Vendors", icon: <StoreIcon />, path: "/vendors" },
    { name: "Analytics", icon: <InsightsIcon />, path: "/analytics" },
    { name: "Loan Applications", icon: <AssignmentIcon />, path: "/loan-apps" },
    { name: "Settings", icon: <SettingsIcon />, path: "/settings" },
    { name: "Help & Support", icon: <HelpOutlineIcon />, path: "/help" },
  ];

  const location = useLocation();

  return (
    <Box sx={{ width: 230, bgcolor: "#f4f6f9", height: "100vh", p: 2 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
        CredAI
      </Typography>

      <List>
        {menu.map((item) => (
          <ListItemButton
            key={item.name}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{ borderRadius: 1, mb: 1 }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ position: "absolute", bottom: 20, left: 15 }}>
        <Typography variant="caption">System Status</Typography>
        <Typography sx={{ fontSize: 12, color: "green" }}>
          AI Scoring: Active
        </Typography>
        <Typography sx={{ fontSize: 12, color: "green" }}>
          Data Sync: Live
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
