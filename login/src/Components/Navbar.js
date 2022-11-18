import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function Navbar() {
  const [show, setShow] = useState(false);

  const [verLogin, setVerLogin] = useState("");

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required Field!"),
    password: Yup.string().required("Required Field!"),
  });

  const onSubmit = (values) => {
    console.log(values);
    axios
      .post("http://localhost:4100/login", {
        user: values.username,
        pass: values.password,
      })
      .then((response) => {
        if (response.data.message) {
          setVerLogin(response.data.message);
        } else {
          setVerLogin(response.data[0].username);
        }
      });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/register" className="nav-link active">
                Register
              </Link>
            </li>
          </ul>
          <Button variant="primary mx-3" onClick={handleShow}>
            Login
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <div className="first-field">
                    <label className="form-label" style={{ color: "green" }}>
                      Username
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Enter Your username"
                    />
                  </div>
                  <div className="errorUser my-1" style={{ color: "red" }}>
                    <ErrorMessage name="username" />
                  </div>
                  <div className="second-field my-2">
                    <label className="form-label" style={{ color: "green" }}>
                      Password
                    </label>
                    <Field
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter Your password"
                    />
                  </div>
                  <div className="errorPass my-1" style={{ color: "red" }}>
                    <ErrorMessage name="password" />
                  </div>
                  <div className="userStatus">
                    <h6 className="text-center"> {verLogin}</h6>
                  </div>
                  <Modal.Footer className="my-3">
                    <button className="btn btn-warning">Login</button>
                  </Modal.Footer>
                </Form>
              </Formik>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </nav>
  );
}
