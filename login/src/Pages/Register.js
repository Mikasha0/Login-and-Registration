import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function Register() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required Field!"),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Required Field"),
    password: Yup.string().required("Required Field"),
  });

  const onSubmit = (values) => {
    console.log(values);
    axios.post("http://localhost:4100/register",{
      user:values.username,
      email: values.email,
      pass: values.password
    }).then(()=>{
      console.log("success")
    })
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="container w-50 my-3">
          <div className="first-container">
            <label className="form-label" style={{color:'green'}}>Username</label>
            <Field
              className="form-control"
              placeholder="Enter your username"
              type="text"
              name="username"
            />
          </div>
          <div className="userError my-2" style={{color: "red"}}>
            <ErrorMessage name="username"/>
          </div>
          <div className="second-container my-2">
            <label className="form-label" style={{color:'green'}}>Email</label>
            <Field
              className="form-control"
              placeholder="Enter your email address"
              type="text"
              name="email"
            />
          </div>
          <div className="userError my-2" style={{color: "red"}}>
            <ErrorMessage name="email"/>
          </div>
          <div className="third-container">
            <label className="form-label" style={{color:'green'}}>Password</label>
            <Field
              className="form-control"
              placeholder="Enter your password"
              type="password"
              name="password"
            />
          </div>
          <div className="userError my-2" style={{color: "red"}}>
            <ErrorMessage name="password"/>
          </div>
          <button type="submit" className="btn btn-warning my-3">
            Register
          </button>
        </div>
      </Form>
    </Formik>
  );
}
