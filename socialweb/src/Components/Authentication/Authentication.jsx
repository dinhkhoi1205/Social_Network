import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthModel from "./AuthModel";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useDispatch } from "react-redux";
import { loginUser } from "../../Store/Auth/Actiom";

const validationSchema=Yup.object().shape({
    email:Yup.string().email("Invalid email").required("Email is required"),
    password:Yup.string().required("Password is required")
})

const Authentication = () => {
  const [openAuthModel, setOpenAuthModel] =useState(false);
  const handleOpenAuthModel =()=>setOpenAuthModel(true);
  const handleCloseAuthModel = ()=>setOpenAuthModel(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();

    const formik=useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema,
        onSubmit:(values)=>{
            dispatch(loginUser(values))
            console.log("form value", values)
        }
    })

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Student Social Network
        </h2>

        <TextField
          fullWidth
          label="Email"
          type="email"
          name="email"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button
          variant="contained"
          fullWidth
          className="mt-6 bg-blue-600 hover:bg-blue-700"
          type="submit"
          onClick={formik.handleSubmit}
        >
          Log in
        </Button>

        <Typography
          variant="body2"
          className="text-center mt-4 text-gray-600"
        >
          Don't have an account?
          <span
            className="text-blue-600 font-medium cursor-pointer ml-1"
            onClick={handleOpenAuthModel}
          >
            Create Account
          </span>
        </Typography>

        <AuthModel open={openAuthModel} handleClose={handleCloseAuthModel}/>
      </div>
    </div>
  );
};

export default Authentication;
