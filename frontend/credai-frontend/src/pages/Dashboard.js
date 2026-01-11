import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Chip,
  LinearProgress,
  Divider,
} from "@mui/material";

const Dashboard = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600}>
        Vendor Trust Dashboard
      </Typography>

      {/* SUMMARY CARDS */}
      <Grid container spacing={2} mt={2}>
        {[
          {
            title: "Total Vendors",
            value: "142",
            sub: "↑ 12% increase from last month",
          },
          { title: "Avg Trust Score", value: "78.5" },
          { title: "Active Loans", value: "24", sub: "98% repayment rate" },
          {
            title: "Risk Alerts",
            value: "3",
            sub: "Requires attention",
            alert: true,
          },
        ].map((card, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography fontSize={14} color="gray">
                {card.title}
              </Typography>
              <Typography variant="h4" fontWeight={600} mt={1}>
                {card.value}
              </Typography>
              {card.sub && (
                <Typography
                  mt={1}
                  fontSize={12}
                  color={card.alert ? "red" : "green"}
                >
                  {card.sub}
                </Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* MAIN CONTENT SECTION */}
      <Grid container spacing={2} mt={2}>
        {/* VENDOR MONITORING */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography fontWeight={600} mb={2}>
              Vendor Monitoring
            </Typography>

            {[
              {
                name: "Fresh Grocery Mart",
                category: "Grocery Store • 2 years",
                score: 92,
                status: "Excellent",
                color: "success",
              },
              {
                name: "Spice Kitchen",
                category: "Restaurant • 1.5 years",
                score: 65,
                status: "Moderate",
                color: "warning",
              },
              {
                name: "Quick Fix Hardware",
                category: "Hardware • 8 months",
                score: 42,
                status: "High Risk",
                color: "error",
              },
              {
                name: "Urban Fashion Hub",
                category: "Clothing Store • 3 years",
                score: 88,
                status: "Good",
                color: "info",
              },
            ].map((vendor, i) => (
              <Box
                key={i}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                py={1}
              >
                <Box>
                  <Typography fontWeight={600}>{vendor.name}</Typography>
                  <Typography fontSize={12} color="gray">
                    {vendor.category}
                  </Typography>
                </Box>
                <Chip label={vendor.status} color={vendor.color} size="small" />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* LOAN APPROVAL */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography fontWeight={600}>Loan Approval Predictor</Typography>
            <Typography mt={1} fontSize={12}>
              Approval Probability
            </Typography>
            <Typography fontWeight={600} fontSize={20} color="primary">
              87%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={87}
              sx={{ height: 8, borderRadius: 1, mb: 2 }}
            />

            <Typography fontSize={13}>
              <b>Recommended Limit:</b> ₹2,50,000
            </Typography>
            <Typography fontSize={13}>
              <b>Interest Rate:</b> 9.5% - 12%
            </Typography>
            <Typography fontSize={13}>
              <b>Term:</b> 24 months
            </Typography>

            <Paper
              elevation={0}
              sx={{
                mt: 2,
                bgcolor: "primary.main",
                color: "white",
                textAlign: "center",
                py: 0.8,
                fontWeight: 600,
                borderRadius: 1,
                cursor: "pointer",
              }}
            >
              Generate Loan Report
            </Paper>
          </Paper>
        </Grid>
      </Grid>

      {/* TRUST FACTORS */}
      <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
        <Typography fontWeight={600} mb={1}>
          Trust Score Calculation Factors
        </Typography>

        {[
          { label: "Payment History (35%)", value: 94, color: "success" },
          { label: "Business Longevity (25%)", value: 82, color: "info" },
          { label: "Customer Reviews (20%)", value: 76, color: "warning" },
          { label: "Financial Stability (15%)", value: 68, color: "secondary" },
          { label: "Market Reputation (5%)", value: 45, color: "error" },
        ].map((item, i) => (
          <Box key={i} mb={1}>
            <Typography fontSize={13}>{item.label}</Typography>
            <LinearProgress
              variant="determinate"
              value={item.value}
              color={item.color}
              sx={{ height: 7, borderRadius: 1, mt: 0.5 }}
            />
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default Dashboard;
