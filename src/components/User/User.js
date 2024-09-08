import React from 'react'
import Authform from './Authform'
import { sendUserAuthRequest } from '../../api-helpers/api-helpers'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store'
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data);
    
    dispatch(userActions.login());
    localStorage.setItem("userId", data.id);
    navigate("/");
  }

  const getData = (data) => {
    console.log(data);
    sendUserAuthRequest(data.Inputs, data.signup)
    .then(onResReceived)
    .catch((err) => console.log(err));
  }

  return (
    <div>
      <Authform onSubmit={getData} isAdmin={false}/>
    </div>
  )
}

export default User
