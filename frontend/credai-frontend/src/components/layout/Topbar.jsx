import { Box, TextField, Button, Avatar } from "@mui/material";
import { Plus } from "lucide-react";

export default function Topbar() {
  return (
    <Box
      sx={{
        height: 60,
        width: "100%",
        px: 3,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        gap: 2,
        background: "rgba(16,18,20,0.8)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Full Width Search */}
      <TextField
        placeholder="Search vendors..."
        variant="outlined"
        size="small"
        sx={{
          flexGrow: 1,
          input: { color: "white" },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255,255,255,0.07)",
            borderRadius: 2,
          },
        }}
      />

      <Button
        variant="contained"
        startIcon={<Plus size={18} />}
        sx={{ borderRadius: 2 }}
      >
        Add Vendor
      </Button>

      <Avatar sx={{ width: 32, height: 32, ml: 1 }} />
    </Box>
  );
}
