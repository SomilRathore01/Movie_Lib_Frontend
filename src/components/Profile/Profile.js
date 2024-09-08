import React, { Fragment, useEffect, useState } from 'react'
import { getAllPlaylists, getUserDetails } from '../../api-helpers/api-helpers';
import { Box, Card, CardContent, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile = () => {
    const [playlists, setPlaylists] = useState();
    const [user, setUser] = useState();
    useEffect(() => {
        getAllPlaylists()
        .then((res) => setPlaylists(res.playlists))
        .catch((err) => console.log(err));
    
    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);
    console.log(playlists);
  return (
    <Box width={'100%'} height={"100vh"} display={"flex"}>
        <Fragment>
            {" "}
            {user && (
            <Box width={'30%'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <AccountCircleIcon sx={{fontSize: '10rem', color: "white", marginLeft:"20vh"}} />
            <Typography
              padding={1}
              width={"auto"}
              textAlign={"center"}
              color={"white"}
              fontWeight={"fontWeightBold"}
            >
              Name: {user.name}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              color={"white"}
              fontWeight={"fontWeightBold"}
            >
              Email: {user.email}
            </Typography>
        </Box>
            )}
        {playlists && (
        <Box width={'70%'}>
            <Typography>
                Your Playlists
            </Typography>
            <Box>
          {playlists && playlists.map((playlist, index) => (
              <Card key={index} sx={{ display: 'flex', justifyContent: 'space-between', width: "30vw", margin: "auto", background: "linear-gradient(to right, #640D6B, #B51B75, #E65C19, #F8D082)", marginBottom: "2vh" }}>
                <CardContent>
                  <Typography fontSize={'1.5rem'} fontWeight={'fontWeightBold'} color={"white"}>
                    {playlist.title}
                    {localStorage.setItem(index, JSON.stringify(playlist._id))}
                  </Typography>
                </CardContent>
              </Card>
          ))};
          </Box>
        </Box>
        )}
        </Fragment>
    </Box>
  )
}

export default Profile
