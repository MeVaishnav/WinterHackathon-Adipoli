import { useEffect, useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions,
  Typography, CircularProgress, Chip
} from '@mui/material';
import { getVendors, createVendor } from '../api/api';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', gst_number: '', credit_points: 500 });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await getVendors();
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await createVendor(formData);
      setOpen(false);
      setFormData({ name: '', gst_number: '', credit_points: 500 });
      fetchVendors();
    } catch (error) {
      console.error('Error creating vendor:', error);
      alert('Error creating vendor. GST might already exist.');
    }
  };

  const getRiskColor = (risk) => {
    const colors = { Low: 'success', Medium: 'warning', High: 'error' };
    return colors[risk] || 'default';
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Typography variant="h4">Vendors</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Vendor
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>GST Number</TableCell>
              <TableCell>Trust Score</TableCell>
              <TableCell>Credit Points</TableCell>
              <TableCell>Risk Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell>{vendor.name}</TableCell>
                <TableCell>{vendor.gst_number}</TableCell>
                <TableCell>{vendor.trust_score}</TableCell>
                <TableCell>{vendor.credit_points}</TableCell>
                <TableCell>
                  <Chip label={vendor.risk_level} color={getRiskColor(vendor.risk_level)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Vendor</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Vendor Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="GST Number"
            value={formData.gst_number}
            onChange={(e) => setFormData({ ...formData, gst_number: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Credit Points"
            type="number"
            value={formData.credit_points}
            onChange={(e) => setFormData({ ...formData, credit_points: parseInt(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Vendors;