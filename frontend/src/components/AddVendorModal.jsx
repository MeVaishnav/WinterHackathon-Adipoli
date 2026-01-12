import { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
} from "@mui/material";
import axios from "axios";

// MUI modal style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

export default function AddVendorModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    phone_number: "",
  });

  const [trustScore, setTrustScore] = useState(null);
  const [error, setError] = useState("");

  // Load trust score from localStorage when modal opens
  useEffect(() => {
    if (open) {
      const saved = JSON.parse(localStorage.getItem("latest_trust_score"));
      if (saved?.trust_score) {
        setTrustScore(saved.trust_score);
      } else {
        setTrustScore(null);
      }
    }
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");

    if (!trustScore) {
      setError(
        "Please calculate trust score first in the Trust Calculator page."
      );
      return;
    }

    if (!form.name || !form.age || !form.phone_number) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/vendors", {
        name: form.name,
        age: Number(form.age),
        phone_number: form.phone_number,
        trust_score: trustScore,
      });

      // Clear trust score after submission
      localStorage.removeItem("latest_trust_score");

      // Call parent refresh
      if (onSuccess) onSuccess();

      // Close modal
      onClose();
    } catch (err) {
      setError("Failed to add vendor. Check backend.");
      console.error(err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Add Vendor
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!trustScore && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Please calculate a trust score first in the Trust Calculator page.
          </Alert>
        )}

        <Stack spacing={2}>
          <TextField
            label="Vendor Name"
            name="name"
            fullWidth
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            label="Age"
            name="age"
            type="number"
            fullWidth
            value={form.age}
            onChange={handleChange}
          />

          <TextField
            label="Phone Number"
            name="phone_number"
            fullWidth
            value={form.phone_number}
            onChange={handleChange}
          />

          <TextField
            label="Trust Score"
            value={trustScore ?? "No score available"}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!trustScore}
          >
            Save Vendor
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
