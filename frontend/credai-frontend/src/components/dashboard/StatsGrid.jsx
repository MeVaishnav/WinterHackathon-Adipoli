import { Box } from "@mui/material";
import SummaryCard from "./SummaryCard";

export default function StatsGrid({ data }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 2,
        width: "100%",
        mt: 2,
      }}
    >
      {data.summary.map((item) => (
        <SummaryCard
          key={item.id}
          id={item.id}
          title={item.title}
          value={item.value}
          subtitle={item.subtitle}
          color={item.color}
          icon={item.icon}
        />
      ))}
    </Box>
  );
}
