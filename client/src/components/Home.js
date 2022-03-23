import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
// react icon
import { FaEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
// context
import { addData } from "../context/ContextProvider";

const Home = () => {
  // context
  const { uData, setUdata } = useContext(addData);

  const [getUserData, setGetUserData] = useState([]);

  console.log(getUserData);
  const history = useHistory();

  const registerRoute = () => {
    history.push("/register");
  };

  const getData = async (e) => {
    const res = await fetch("/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      console.log("Invalid User");
    } else {
      setGetUserData(data);
      console.log("get user data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // delete user
  const deleteUser = async (id) => {
    const res = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 400 || !data) {
      alert("Failed Delete");
    } else {
      alert("Deleted Successful");
      getData();
    }
  };

  return (
    <>
      {uData ? (
        <div
          class="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Success</strong> User added successfully
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        ""
      )}

      <div className="container my-5">
        <div className="text-end mb-4">
          <button className="btn btn-primary" onClick={registerRoute}>
            + Add Data
          </button>
        </div>

        {/* table start */}
        <Table striped bordered hover>
          <thead className="bg-dark text-light">
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            {getUserData.map((user, id) => {
              const { name, email, work, mobile, _id } = user;
              return (
                <tr>
                  <td>{id + 1}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{work}</td>
                  <td>{mobile}</td>
                  <td>
                    <Link to={`/view/${_id}`} className="text-success">
                      <FaEye />
                    </Link>
                    <Link to={`/edit/${_id}`} className="text-warning mx-3">
                      <FaRegEdit />
                    </Link>
                    <button
                      className="text-danger"
                      onClick={() => deleteUser(_id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Home;
