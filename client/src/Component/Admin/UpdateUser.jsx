import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../Home/MetaData/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./Sidebar";
import { useParams } from "react-router-dom";
import Loader from "../Layout/Loader/Loading";
import {  getUserDetails, updateUser } from "../../Actions/User"

const UpdateUser = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams()
  const { loading, error, user } = useSelector(state => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector(state => state.profile);



// const userId = params.id;

  useEffect(() => {
 
    if (error) {
      alert.error(error)
   
      dispatch({ type: "CLEAR_ERROR" })
    }
    if (updateError) {
      alert.error(updateError)
      dispatch({ type: "CLEAR_ERROR" })
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "CLEAR_MESSAGE" })
    }
    dispatch(getUserDetails(params.id));
  }, [dispatch, alert, error, message, updateError, params.id]);

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [role, setRole] = useState(user && user.role);

  


  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUser(params.id, name, email, role));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
          
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;