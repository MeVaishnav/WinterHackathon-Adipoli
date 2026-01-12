import React from "react";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";

export default function Analytics() {
  // Load saved data from TrustCalculator
  const data = JSON.parse(localStorage.getItem("trust_score_data"));

  // If no data exists, show message
  if (!data) {
    return (
      <Box p={3}>
        <Typography variant="h5" fontWeight="bold">
          Analytics
        </Typography>
        <Card sx={{ mt: 2, p: 3 }}>
          <Typography>
            No trust score data available. Please calculate first.
          </Typography>
        </Card>
      </Box>
    );
  }

  // Risk level badge color logic
  const getRiskColor = (risk) => {
    if (!risk) return "default";

    const r = risk.toLowerCase();
    if (r === "low") return "success";
    if (r === "moderate") return "warning";
    if (r === "high") return "error";
    return "default";
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold">
        Analytics Dashboard
      </Typography>

      {/* Overview Section */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            📊 Overview
          </Typography>

          <Typography sx={{ mt: 1 }}>
            <b>Trust Score:</b> {data.trust_score}
          </Typography>

          <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>
              <b>Risk Level:</b>
            </Typography>
            <Chip
              label={data.risk_level}
              color={getRiskColor(data.risk_level)}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Financial Insights */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            💰 Financial Insights
          </Typography>

          <Typography sx={{ mt: 1 }}>
            <b>Approval Probability:</b> {data.approval_probability}%
          </Typography>

          <Typography sx={{ mt: 1 }}>
            <b>Recommended Limit:</b> ₹
            {data.recommended_limit?.toLocaleString()}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            <b>Interest Rate:</b> {data.interest_rate}
          </Typography>
        </CardContent>
      </Card>

      {/* Operational Summary */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            📌 Operational Summary
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Based on the computed trust score and financial metrics, this
            profile demonstrates a {data.risk_level?.toLowerCase()} risk
            category with {data.approval_probability}% approval likelihood.
            Recommended credit allocation aligns with current financial posture
            and repayment history.
          </Typography>
        </CardContent>
      </Card>

      {/* Actionable Insights */}
      <Card sx={{ mt: 3, mb: 5 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            🚀 Actionable Insights
          </Typography>

          {data.risk_level === "High" && (
            <Typography sx={{ mt: 1 }}>
              • Reduce outstanding liabilities to improve creditworthiness.
            </Typography>
          )}

          {data.risk_level === "Moderate" && (
            <Typography sx={{ mt: 1 }}>
              • Improve repayment consistency to move into low-risk category.
            </Typography>
          )}

          {data.risk_level === "Low" && (
            <Typography sx={{ mt: 1 }}>
              • Strong profile — eligible for higher credit exposure with
              competitive interest.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
