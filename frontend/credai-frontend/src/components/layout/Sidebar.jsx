import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  BarChart2,
  FileText,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Box, Typography, Divider } from "@mui/material";

const navItems = [
  { label: "Dashboard", icon: <LayoutGrid size={18} />, path: "/" },
  { label: "Vendors", icon: <Users size={18} />, path: "/vendors" },
  { label: "Analytics", icon: <BarChart2 size={18} />, path: "/analytics" },
  {
    label: "Loan Applications",
    icon: <FileText size={18} />,
    path: "/loan-apps",
  },
  { label: "Settings", icon: <Settings size={18} />, path: "/settings" },
  { label: "Help & Support", icon: <HelpCircle size={18} />, path: "/help" },
];

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        py: 2,
        px: 1.5,
        background: "rgba(22,26,30,0.75)",
        backdropFilter: "blur(12px)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Logo */}
      <Typography variant="h6" fontWeight={600} sx={{ px: 2, pb: 2, pt: 1 }}>
        CredAI
      </Typography>

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, mt: 1 }}>
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2,
                  py: 1.2,
                  borderRadius: 1.3,
                  cursor: "pointer",
                  transition: "180ms ease",
                  color: isActive ? "#3A8DFF" : "rgba(200,200,200,0.85)",
                  backgroundColor: isActive
                    ? "rgba(58,141,255,0.15)"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.06)",
                  },
                }}
              >
                {item.icon}
                <Typography fontSize={14}>{item.label}</Typography>
              </Box>
            )}
          </NavLink>
        ))}
      </Box>

      {/* Status Footer */}
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ px: 2, pb: 1 }}>
        <Typography variant="caption" color="gray">
          System Status
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#4ECB71", display: "block" }}
        >
          AI Scoring: Active
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#4ECB71", display: "block" }}
        >
          Data Sync: Live
        </Typography>
      </Box>
    </Box>
  );
}
