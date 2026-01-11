import { Paper, Typography, Box } from "@mui/material";

export default function SummaryCard({ title, value, subtitle, color }) {
  const handleClick = () => {
    console.log(`${title} card clicked`);
    // (Later: navigate or open modal)
  };

  return (
    <Paper
      elevation={0}
      onClick={handleClick}
      sx={{
        p: 2.5,
        height: "100%",
        borderRadius: 2,
        backgroundColor: "background.paper",
        transition: "all 0.22s ease-in-out",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",

        "&:hover": {
          transform: "translateY(-6px) scale(1.02)",
          boxShadow: "0px 8px 22px rgba(0, 0, 0, 0.35)",
          backgroundColor: "rgba(35, 38, 42, 0.95)",
        },

        "&:active": {
          transform: "scale(0.98)",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>

      <Box>
        <Typography
          variant="h4"
          fontWeight={600}
          sx={{ color: color || "text.primary" }}
        >
          {value}
        </Typography>

        {subtitle && (
          <Typography
            variant="caption"
            sx={{ color: color, display: "block", mt: 0.5 }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}
