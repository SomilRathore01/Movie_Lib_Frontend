import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
// import { fetchPlaylists } from './api-helpers/api-helpers';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MovieItems = ({ title, releaseDate, posterUrl, id, description, actors, userid }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    localStorage.setItem("movieId", id);
  }

  // const [playlists, setPlaylists] = useState([]);

  // useEffect(() => {
  //   fetchPlaylists()
  //   .then((data) => setPlaylists(data.playlists))
  //   .catch((err) => console.log(err));
  // }, []);

  return (
    <Card sx={{ margin: 2, width: 270, height: 320, background: "gray", color: "white", borderRadius: 5, ":hover": { boxShadow: "0px 5px 5px #e3e3e3" } }}>
      <img height={"50%"} width={"100%"} src={posterUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.white">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleOpen} sx={{ margin: "auto", border: "1px solid #353b42", borderRadius: "5vh", background: "#353b42", color: "#e4e9eb", fontWeight: "fontWeightBold", ":hover": { background: "#e4e9eb", color: "#353b42" } }} size="small">View Details</Button>
        <Button onClick={handleClick} LinkComponent={Link} to={`/playlists/${id}`} sx={{ margin: "auto", border: "1px solid #353b42", borderRadius: "5vh", background: "#353b42", color: "#e4e9eb", fontWeight: "fontWeightBold", ":hover": { background: "#e4e9eb", color: "#353b42" } }} size="small">Add to Playlist</Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <img margin={'0'} height={"50%"} width={"100%"} src={posterUrl} alt={title} />
            <Typography id="modal-modal-title" variant="h4">
              <strong>{title}</strong><br />
            </Typography>
            <Typography id="modal-modal-title" variant="p">
              <strong>Released on:</strong> {new Date(releaseDate).toDateString()}<br />
              <strong>Movie Type:</strong> {description}<br />
              <strong>Cast: </strong>{actors}<br />
            </Typography>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "3vh" }}>
              <Button onClick={handleClose} sx={{ width: "9vw", margin: "auto", border: "1px solid #353b42", background: "skyblue", color: "black", fontWeight: "fontWeightBold", ":hover": { background: "#e4e9eb", color: "#353b42" } }} size="small">Close</Button>
              <Button onClick={handleClick} LinkComponent={Link} to={`/playlists/${id}`} sx={{ width: "9vw", margin: "auto", border: "1px solid #353b42", background: "skyblue", color: "black", fontWeight: "fontWeightBold", ":hover": { background: "#e4e9eb", color: "#353b42" } }} size="small">Add To Playlist</Button>
            </div>
          </Box>
        </Modal>

      </CardActions>
    </Card>
  )
}

export default MovieItems
