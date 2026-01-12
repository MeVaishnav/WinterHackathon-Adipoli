import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Chip,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

export default function AboutUs() {
  return (
    <Box sx={{ maxWidth: 1100, mb: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        About Us
      </Typography>

      {/* SECTION: Who We Are */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <InfoOutlinedIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Who We Are
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            CredAI is a fintech platform focused on vendor credit profiling,
            trust scoring, and loan eligibility evaluation. We use data-driven
            financial models to help lenders make transparent, reliable, and
            risk-aware lending decisions.
          </Typography>
        </CardContent>
      </Card>

      {/* SECTION: What We Do */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <TrackChangesOutlinedIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              What We Do
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            We evaluate vendor performance using trust scoring and risk levels
            to help determine eligibility for financial products such as credit
            lines, loans, and supplier financing.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Chip
                icon={<VerifiedUserOutlinedIcon />}
                label="Trust Score Engine"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Chip
                icon={<InsightsOutlinedIcon />}
                label="Risk Assessment"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Chip
                icon={<GroupsOutlinedIcon />}
                label="Vendor Profiling"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* SECTION: Vision & Mission */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body1" color="text.secondary">
                To enable transparent and data-backed lending ecosystems where
                vendors receive fair financial opportunities based on
                performance, not paperwork.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" color="text.secondary">
                To empower lenders and financial institutions with intelligent
                analytics, ensuring smarter and safer credit decisions for small
                and medium vendors.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* SECTION: Loan Eligibility Engine */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <InsightsOutlinedIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Loan Eligibility Engine
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            This module evaluates vendor loan eligibility based on trust score,
            approval probability, repayment history, and risk profile. It helps
            lenders determine suitable credit limits while minimizing exposure
            to defaults.
          </Typography>
          <Typography
            variant="caption"
            display="block"
            mt={1}
            color="text.disabled"
          >
            (Demo placeholder — logic can be expanded)
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
