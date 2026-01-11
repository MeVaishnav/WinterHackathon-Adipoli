import { Paper, Typography, Box } from "@mui/material";

export default function SummaryCard({ title, value, subtitle, color }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        minHeight: 120,
        height: "100%",
        borderRadius: 2,
        backgroundColor: "background.paper",
        transition: "all 0.22s ease-in-out",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 6px 18px rgba(0,0,0,0.35)",
          backgroundColor: "rgba(28, 30, 34, 0.95)",
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
