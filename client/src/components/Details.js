import React, { useState, useEffect } from "react";
// profile img
import profile from "../img/profile.jpg";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useParams, useHistory } from "react-router-dom";

const DetailsPage = () => {
  const history = useHistory();
  const [getUserData, setGetUserData] = useState([]);
  const { id } = useParams();
  // console.log(id);
  console.log(getUserData);

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
      setGetUserData(data);
      console.log("get user data");
    }
  };

  useEffect(() => {
    getIndividualUser();
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
      history.push("/");
    }
  };

  return (
    <>
      <div>
        <h2 className="text-center">Welcome {getUserData.name}</h2>

        <hr />

        <div className="card">
          <div className="d-flex justify-content-center">
            <Link to={`/edit/${getUserData._id}`}>
              <FaRegEdit className="text-warning" />
            </Link>
            <button onClick={() => deleteUser(getUserData._id)}>
              <FaTrashAlt className="text-danger mx-3" />
            </button>
          </div>
          <img src={profile} alt="Profile" height="50" width="50" />
          <div className="card-body">
            <div className="d-flex">
              <div>
                <h4>Name : {getUserData.name}</h4>
                <h4>Age : {getUserData.age}</h4>
                <h4>Email : {getUserData.email}</h4>
                <h4>Work : {getUserData.work}</h4>
              </div>
              <div>
                <h4>Mobile : {getUserData.mobile}</h4>
                <h4>Location : {getUserData.address}</h4>
                <h4>Desc : {getUserData.desc}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
