import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import { getAnalytics, getVendors } from "../api/api";

function StatCard({ title, value, subtitle, color }) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold" mt={1}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color={color || "success.main"} mt={1}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [a, v] = await Promise.all([
        getAnalytics(),
        getVendors(),
      ]);
      setAnalytics(a.data);
      setVendors(v.data);
    } catch (err) {
      console.error(err);
    }
  };

  const avgTrust = analytics?.average_trust_score || 0;

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Vendor Trust Dashboard
      </Typography>

      {/* TOP STATS */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Vendors"
            value={vendors.length}
            subtitle="↑ active vendors"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Avg Trust Score
              </Typography>
              <Typography variant="h4" fontWeight="bold" mt={1}>
                {avgTrust}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={avgTrust}
                sx={{ mt: 2, height: 8, borderRadius: 5 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Active Loans"
            value={vendors.filter(v => v.risk_level !== "High").length}
            subtitle="Healthy vendors"
            color="success.main"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Risk Alerts"
            value={vendors.filter(v => v.risk_level === "High").length}
            subtitle="Requires attention"
            color="error.main"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
