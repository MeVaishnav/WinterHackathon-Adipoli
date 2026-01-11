import { Grid } from "@mui/material";
import SummaryCard from "./SummaryCard";

export default function StatsGrid({ data }) {
  return (
    <Grid container spacing={2} mt={2}>
      {data.summary.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.id}>
          <SummaryCard
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            color={card.color}
          />
        </Grid>
      ))}
    </Grid>
  );
}
