import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Grid
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  outline: "none"
};

export default function SignUpForm({ open, handleClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    birtDate: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Sign Up Data:", formData);
    // TODO: Gửi formData tới API backend
    handleClose(); // đóng modal sau khi đăng ký
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="sign-up-modal-title"
    >
      <Box sx={style}>
        <Typography id="sign-up-modal-title" variant="h5" component="h2" textAlign="center" gutterBottom>
          Create Account
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Student ID"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Birth Date"
              name="birtDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.birtDate}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
