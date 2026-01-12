import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Dashboard,
  People,
  Analytics,
  AccountBalance,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import CalculateIcon from "@mui/icons-material/Calculate";


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/" },
  { text: "Vendors", icon: <People />, path: "/vendors" },
  { text: "Analytics", icon: <Analytics />, path: "/analytics" },
  { text: "Loans", icon: <AccountBalance />, path: "/loans" },

  // ✅ NEW (safe addition)
  { text: "Trust Calculator", icon: <CalculateIcon />, path: "/trust-calculator" },
];


  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <div style={{ padding: 20, fontSize: 24, fontWeight: "bold" }}>
        CredAI
      </div>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
