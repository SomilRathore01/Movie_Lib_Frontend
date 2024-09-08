import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, FormLabel, List, ListItem, Menu, MenuItem, Modal, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { Fragment, useEffect, useState } from 'react'
import { addMovieinPlaylist, addPlaylist, deleteplaylist, getAllPlaylists, moviesofPlaylist } from '../../api-helpers/api-helpers';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  height: 250,
  background: 'linear-gradient(to right, #FEFFD2, #FFBF78)',
  border: '2px solid #000',
  borderRadius: '5vh',
  boxShadow: 24,
  p: 4,
};

const Playlists = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [expandedPlaylistId, setExpandedPlaylistId] = useState(null);
  const [movies, setMovies] = useState([]);

  const [playlists, setplaylists] = useState();
  const [title, setTitle] = React.useState('');

  const handleToggle = (playlistId) => {
    if (expandedPlaylistId === playlistId) {
      // If the playlist is already expanded, collapse it
      setExpandedPlaylistId(null);
    } else {
      // Fetch the movies for the clicked playlist
      moviesofPlaylist(playlistId).then((res) => {
        console.log(res);
        
        setMovies((prevMovies) => ({
          ...prevMovies,
          [playlistId]: res || []
        }));
        console.log(res);
        setExpandedPlaylistId(playlistId);
      }).catch((err) => console.error('Failed to fetch movies:', err));
    }
  };

  const handleSubmit2 = (e, playlistid, playlisttitle) => {
    e.preventDefault();
    console.log(playlistid);
    console.log(playlisttitle);
    addMovieinPlaylist({ playlistid, playlisttitle });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlaylist(title).then((newplaylist) => {
      setplaylists((prevplaylist) => [...prevplaylist, { ...newplaylist, title }]);
      setTitle('');
      handleClose(true);
    }).catch(e => console.log(e));
    console.log(title);
  }

  const handleDelete = (playlistId) => {
    deleteplaylist(playlistId).then(() => {
      setplaylists(playlists.filter((playlist) => playlist._id !== playlistId));
    }).catch((err) => console.log(err));
  };


  useEffect(() => {
    getAllPlaylists()
      .then((res) => {
        setplaylists(res.playlists);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Box height={'120vh'}>
        {playlists && (<Fragment>
          <Typography padding={5} sx={{ color: "white", fontWeight: "fontWeightBold", fontSize: "3rem" }}>
            Your Playlists
          </Typography>
          <Button onClick={handleOpen} sx={{ margin: "5vh", marginTop: "0", width: "12vw", height: "6vh", border: "1px solid #353b42", background: "#353b42", color: "#e4e9eb", fontWeight: "fontWeightBold", ":hover": { background: "#e4e9eb", color: "#353b42" } }}>
            <AddIcon /> New Playlist
          </Button>
          <Box>
            {playlists && playlists.map((playlist, index) => (
              <Card key={index} sx={{ display: 'flex', justifyContent: 'space-between', width: "40vw", margin: "auto", background: "linear-gradient(to right, #640D6B, #B51B75, #E65C19, #F8D082)", marginBottom: "2vh" }}>
                <CardContent>
                  <Typography fontSize={'1.5rem'} fontWeight={'fontWeightBold'} color={"white"}>
                    {playlist.title}
                    {localStorage.setItem(index, JSON.stringify(playlist._id))}
                  </Typography>
                </CardContent>
                <CardActions>
                  
                  <form onSubmit={(e) => handleSubmit2(e, playlist._id, playlist.title)}>
                  {expandedPlaylistId === playlist._id && (
                    <List sx={{ paddingLeft: 3, paddingTop: 2 }}>
                      {playlist.movietitle && playlist.movietitle.length > 0 ? (
                        playlist.movietitle.map((movie, movieIndex) => (
                          <ListItem key={movieIndex} sx={{ padding: '0.5vh 0', color: "white", fontWeight: "bold" }}>
                            {movie}
                          </ListItem>
                        ))
                      ) : (
                        <Typography sx={{ paddingLeft: 2, fontWeight: "bold", color: "white" }}>
                          No movies in this playlist.
                        </Typography>
                      )}
                    </List>
                  )}
                    <Button onClick={() => handleToggle(playlist._id)} sx={{ color: "white" }}>
                    <ExpandMoreIcon />
                  </Button>
                    <Button type='submit' sx={{ color: "white", fontWeight: "fontWeightBold" }}>
                      <addMovieinPlaylist id={playlist._id} title={playlist.title} movieId movietitle />
                      <AddIcon />
                    </Button>
                    <Button color='warning' fontWeight='fontWeightBold' onClick={() => handleDelete(playlist._id)}>
                      <DeleteIcon />
                    </Button>
                  </form>
                </CardActions>
              </Card>
            ))};
          </Box>
        </Fragment>)}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">

          <Box sx={style}>
            <Typography variant='h6' fontWeight={'fontWeightBold'}>
              Create New Playlist
            </Typography>
            <Box padding={6} display={'flex'} justifyContent={'center'} flexDirection={'column'} width={200} borderRadius={'10'}>
              <form onSubmit={handleSubmit}>
                <FormLabel sx={{ color: "black", marginTop: 1 }}><strong>Playlist Name</strong></FormLabel>
                <TextField onChange={(e) => setTitle(e.target.value)} sx={{ marginBottom: '2vh', fontWeight: "fontWeightBold" }} variant='standard' type='text' value={title} name='title' />
                <div style={{ display: "inline-flex", justifyContent: "space-around" }}>
                  <Button sx={{ marginTop: "4vh", width: "8vw", height: "6vh", border: "1px solid #FF7D29", background: "#FF7D29", color: "#e4e9eb", fontWeight: "fontWeightBold", ":hover": { background: "#FFEEA9", color: "#FF7D29" } }} type='submit'>Submit</Button>
                  <Button onClick={handleClose} sx={{ margin: "4vh", width: "8vw", height: "6vh", border: "1px solid #FF7D29", background: "#FF7D29", color: "#e4e9eb", fontWeight: "fontWeightBold", ":hover": { background: "#FFEEA9", color: "#FF7D29" } }} type='submit'>Close</Button>
                </div>
              </form>
            </Box>
          </Box>
        </Modal>

      </Box>
    </>
  )
}

export default Playlists
