import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { getAnalytics } from '../api/api';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await getAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Analytics</Typography>
      <Card style={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h6">Risk Level Breakdown</Typography>
          <Typography variant="body1" style={{ marginTop: '10px' }}>
            Low Risk: {analytics?.risk_distribution?.Low || 0} vendors
          </Typography>
          <Typography variant="body1">
            Medium Risk: {analytics?.risk_distribution?.Medium || 0} vendors
          </Typography>
          <Typography variant="body1">
            High Risk: {analytics?.risk_distribution?.High || 0} vendors
          </Typography>
        </CardContent>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h6">Trust Score Overview</Typography>
          <Typography variant="h3" style={{ marginTop: '10px' }}>
            {analytics?.average_trust_score || 0}
          </Typography>
          <Typography color="textSecondary">Average Trust Score</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;