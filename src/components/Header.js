import React, { useEffect, useState } from 'react'
import { AppBar, Autocomplete, Tab, Tabs, TextField, Toolbar, } from '@mui/material'
import { Box } from '@mui/material'
import OndemandVideoSharpIcon from '@mui/icons-material/OndemandVideoSharp';
import { getAllMovies } from '../api-helpers/api-helpers.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store/index.js';

// const dummyArray = ["Iron Man", "Captain America", "The Avengers", "Civil War", "Age of Ultron", "Doctor Strange"]
const Header = () => {
    const id = localStorage.getItem("userId");
    const dispatch = useDispatch();
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [value, setValue] = useState([])
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        getAllMovies()
            .then((data) => setMovies(data.movies))
            .catch((err) => console.log(err));
    }, []);

    const logout = (isAdmin) => {
        dispatch(isAdmin? adminActions.logout(): userActions.logout())
    }

    return (
        <AppBar sx={{ bgcolor: "#282828", position: "sticky" }}>
            <Toolbar>
                <Box width={'20%'}>
                    <OndemandVideoSharpIcon />
                </Box>
                <Box width={"30%"} marginRight={"20%"}>
                    <Autocomplete
                        sx={{ borderRadius: "10vw", paddingLeft: "5%", color: "white" }}
                        freeSolo
                        options={movies && movies.map((option) => option.title)}
                        renderInput={(params) => <TextField variant='standard' {...params} placeholder="Search Across Movies" sx={{ input: { color: "white" }, width: "90%" }} />}
                    />
                </Box>
                <Box display={'flex'}>
                    <Tabs
                        sx={{ cursor: "pointer", backgroundColor: "#282828", color: "white", fontWeight: "fontWeightBold" }}
                        value={value} onChange={(e, val) => setValue(val)}>
                        {!isAdminLoggedIn && !isUserLoggedIn &&
                            (<>
                                <Tab LinkComponent={Link} to="/user" label="User" sx={{ color: "white" }} />
                                <Tab LinkComponent={Link} to="/admin" label="Admin" sx={{ color: "white" }} />
                            </>
                            )}
                        {isUserLoggedIn && (<>
                            <Tab LinkComponent={Link} to={`/profile/${id}`} label="Profile" sx={{ color: "white" }} />
                            <Tab LinkComponent={Link} to={`/playlists/${id}`} label="Playlists" sx={{ color: "white" }} />
                            <Tab onClick={() => logout(false)} LinkComponent={Link} to="/" label="Logout" sx={{ color: "white" }} />
                        </>)}
                        {isAdminLoggedIn && (<>
                            <Tab LinkComponent={Link} to="/profile" label="Profile" sx={{ color: "white" }} />
                            <Tab LinkComponent={Link} to={`/playlists/${id}`} label="Playlists" sx={{ color: "white" }} />
                            <Tab onClick={() => logout(true)} LinkComponent={Link} to="/" label="Logout" sx={{ color: "white" }} />
                        </>)}
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
