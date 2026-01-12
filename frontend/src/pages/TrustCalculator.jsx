import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Grid,
} from "@mui/material";
import axios from "axios";

export default function TrustCalculator() {
  const [form, setForm] = useState({
    avg_monthly_sales: "",
    sales_variance: "",
    repayment_history: "",
    outstanding_loans: "",
    years_active: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    setResult(null);

    try {
      const res = await axios.post("http://localhost:8000/ml/predict", {
        avg_monthly_sales: Number(form.avg_monthly_sales),
        sales_variance: Number(form.sales_variance),
        repayment_history: Number(form.repayment_history),
        outstanding_loans: Number(form.outstanding_loans),
        years_active: Number(form.years_active),
      });

      setResult(res.data);
    } catch (err) {
      setError(
        err.response?.data?.detail?.[0]?.msg ||
          "Invalid input values. Please check ranges."
      );
    }
  };

  return (
    <Box maxWidth={900}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Trust Score Calculator
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Avg Monthly Sales (₹)"
                name="avg_monthly_sales"
                fullWidth
                onChange={handleChange}
                helperText="₹10,000 – ₹1,00,00,000"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Sales Variance (%)"
                name="sales_variance"
                fullWidth
                onChange={handleChange}
                helperText="0 – 100"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Repayment History (%)"
                name="repayment_history"
                fullWidth
                onChange={handleChange}
                helperText="0 – 100"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Outstanding Loans (₹)"
                name="outstanding_loans"
                fullWidth
                onChange={handleChange}
                helperText="₹0 – ₹5,00,00,000"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Years Active"
                name="years_active"
                fullWidth
                onChange={handleChange}
                helperText="0 – 50 years"
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            Calculate Trust Score
          </Button>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {result && (
            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography>
                <b>Trust Score:</b> {result.trust_score}
              </Typography>
              <Typography>
                <b>Risk Level:</b> {result.risk_level}
              </Typography>
              <Typography>
                <b>Approval Probability:</b>{" "}
                {result.approval_probability}%
              </Typography>
              <Typography>
                <b>Recommended Limit:</b> ₹
                {result.recommended_limit.toLocaleString()}
              </Typography>
              <Typography>
                <b>Interest Rate:</b> {result.interest_rate}
              </Typography>
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
