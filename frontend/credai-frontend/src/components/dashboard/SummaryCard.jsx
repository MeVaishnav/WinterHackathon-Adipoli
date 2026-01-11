import { Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SummaryCard({
  id,
  title,
  value,
  subtitle,
  color,
  icon,
}) {
  const navigate = useNavigate();

  const routeMap = {
    vendors: "/vendors",
    trust: "/analytics?tab=trust",
    loans: "/loan-apps",
    alerts: "/analytics?tab=risk",
  };

  const handleClick = () => {
    navigate(routeMap[id]);
  };

  return (
    <Paper
      elevation={0}
      onClick={handleClick}
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 160,
        cursor: "pointer",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
          borderColor: "rgba(58,141,255,0.4)",
        },
      }}
    >
      {/* Top Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>

        {/* Icon bubble */}
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            bgcolor: "rgba(58,141,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#3A8DFF",
          }}
        >
          {icon}
        </Box>
      </Box>

      {/* Value + Subtitle */}
      <Box mt={2}>
        <Typography variant="h4" fontWeight={600}>
          {value}
        </Typography>

        {subtitle && (
          <Typography
            variant="caption"
            sx={{
              color: color,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mt: 0.5,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}
