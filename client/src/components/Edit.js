import React, { useState, useEffect } from "react";
import { Form, Row, Button } from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";

const Edit = () => {
  const history = useHistory();
  // const [getUserData, setGetUserData] = useState([]);
  // console.log(getUserData);

  const { id } = useParams();

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

  // console.log(id);

  const getIndividualUser = async () => {
    const res = await fetch(`/individual/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    // console.log(data);

    if (res.status === 404 || !data) {
      console.log("Invalid User");
    } else {
      setInfo(data);
      console.log("get user data");
    }
  };

  useEffect(() => {
    getIndividualUser();
  }, []);

  // submit data | updated data when click on button
  const updateUser = async (e) => {
    e.preventDefault();

    const { name, email, age, mobile, work, address, desc } = info;

    const res = await fetch(`/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        age,
        mobile,
        work,
        address,
        desc,
      }),
    });

    const mainData = await res.json();
    console.log(mainData);

    if (res.status === 400 || !mainData) {
      alert("Please fill the data");
    } else {
      alert("Update data added successfully");
      history.push("/");
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="text-center">
          <h2 className="text-warning ">Edit Page</h2>
        </div>
        <div className="row">
          <div className="col-xl-8 mx-auto">
            <Form>
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
                <Button variant="primary" type="submit" onClick={updateUser}>
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

export default Edit;
