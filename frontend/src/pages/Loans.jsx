import { Typography, Card, CardContent } from "@mui/material";

const Loans = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Loans
      </Typography>

      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6">
            Loan Eligibility Engine
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            This module evaluates vendor loan eligibility based on trust score
            and risk level.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            (Demo placeholder — logic can be expanded)
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Loans;
