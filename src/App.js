import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.js";
import HomePage from "./components/HomePage.js";
import Admin from "./components/Admin/Admin.js";
import User from "./components/User/User.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./store/index.js";
import Playlists from "./components/Playlists/Playlists.js";
import Profile from "./components/Profile/Profile.js";

function App() {

  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);

  useEffect(() => {
    if(localStorage.getItem("userId")){
      dispatch(userActions.login());
    }else if(localStorage.getItem("adminId")){
      dispatch(adminActions.login());
    }
  }, [dispatch]);

  return (
    <>
    <div style={{background:"linear-gradient(#0F0F0F, #232D3F, #005B41)"}}>
      <Header/>
      <section>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/playlists/:id" element={<Playlists/>} />
          <Route path="/profile/:id" element={<Profile/>} />
        </Routes>
      </section>
      </div>
    </>
  );
}

export default App;
