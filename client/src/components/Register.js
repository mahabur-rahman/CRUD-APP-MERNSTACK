import React, { useState, useContext } from "react";
import { Form, Row, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
// context
import { addData } from "../context/ContextProvider";

const Register = () => {
  const history = useHistory();
  // context
  const { uData, setUdata } = useContext(addData);

  const [info, setInfo] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    desc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInfo({ ...info, [name]: value });
  };

  // to backend 😋

  const formSubmit = async (e) => {
    e.preventDefault();

    const { name, email, work, address, mobile, desc, age } = info;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        work,
        address,
        mobile,
        desc,
        age,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      console.log("Invalid User");
      alert("Invalid User");
    } else {
      alert("data added");
      history.push("/");
      setUdata(data);
      console.log("data added");
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="text-center">
          <Link to="/" className="text-primary display-6 fw-bold">
            Back to home
          </Link>
        </div>
        <div className="row">
          <div className="col-xl-8 mx-auto">
            <Form method="POST">
              <Row className="mb-3">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={info.name}
                    onChange={handleChange}
                    name="name"
                    type="name"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={info.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="age">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    value={info.age}
                    onChange={handleChange}
                    name="age"
                    type="number"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    value={info.mobile}
                    onChange={handleChange}
                    name="mobile"
                    type="number"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="work">
                  <Form.Label>Work</Form.Label>
                  <Form.Control
                    value={info.work}
                    onChange={handleChange}
                    name="work"
                    type="text"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    value={info.address}
                    onChange={handleChange}
                    name="address"
                    type="address"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <textarea
                    className="form-control"
                    rows="5"
                    value={info.desc}
                    onChange={handleChange}
                    name="desc"
                    type="text"
                  />
                </Form.Group>
              </Row>

              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" onClick={formSubmit}>
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
