import { useEffect, useState } from "react";
import AddVendorModal from "../components/AddVendorModal";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Button,
} from "@mui/material";
import { getVendors } from "../api/api";

function getStatus(trust) {
  if (trust >= 80) return { label: "Excellent", color: "success" };
  if (trust >= 50) return { label: "Moderate", color: "warning" };
  return { label: "High Risk", color: "error" };
}

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      const res = await getVendors();
      setVendors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight="bold">
          Vendor Monitoring
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          + Add Vendor
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell width={200}>Trust Score</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {vendors.map((v) => {
              const status = getStatus(v.trust_score);
              return (
                <TableRow key={v.id}>
                  <TableCell>
                    <Typography fontWeight="bold">{v.name}</Typography>
                  </TableCell>

                  <TableCell>{v.age}</TableCell>

                  <TableCell>{v.phone_number}</TableCell>

                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <LinearProgress
                        variant="determinate"
                        value={v.trust_score}
                        sx={{
                          width: 120,
                          height: 8,
                          borderRadius: 5,
                        }}
                      />
                      <Typography fontWeight="bold">{v.trust_score}</Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={status.label}
                      color={status.color}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Vendor Modal */}
      <AddVendorModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={loadVendors}
      />
    </Box>
  );
}
