import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField
} from '@mui/material';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Store/Auth/Actiom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  outline: "none"
};

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  birtDate: Yup.string().required("Birth date is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function AuthModel({ open, handleClose }) {
  const dispatch=useDispatch();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      birtDate: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Sign up data:", values);
      dispatch(registerUser(values))
      handleClose(); // Close modal after submit
    }
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Create Account
        </Typography>

        <form className="flex flex-col gap-4">
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />


          <TextField
            fullWidth
            label="Birth Date"
            name="birtDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.birtDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.birtDate && Boolean(formik.errors.birtDate)}
            helperText={formik.touched.birtDate && formik.errors.birtDate}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />

          <Box className="flex justify-center mt-2">
            <Button variant="contained" type="submit" className="px-10 bg-blue-600 hover:bg-blue-700" onClick={formik.handleSubmit}>
              Sign Up
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
