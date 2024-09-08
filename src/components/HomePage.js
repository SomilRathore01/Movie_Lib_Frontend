import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SwipeableTextMobileStepper from './TopMovies.js'
import MovieItems from '../MovieItems.js'
import { getAllMovies } from '../api-helpers/api-helpers.js'

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies().then((data)=>setMovies(data.movies))
    .catch((err)=> console.log(err));
  },[]);
  console.log(movies);
  return(
    <>
    <div>
    <Box width={'100vw'} height={'100%'}>
      <SwipeableTextMobileStepper/>
    </Box>

    <Box padding={'5'} margin={"auto"}>
      <Typography variant="h4" textAlign={"center"} color={"white"}>Latest Release</Typography>
    </Box>
    <Box display={"flex"} width={"80%"} justifyContent={"center"} flexWrap={"wrap"} marginLeft={"10vw"}>
      {movies && movies.map((movie, index)=><MovieItems id={movie._id} title={movie.title} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} description={movie.description} actors={movie.actors.join(", ")} key={index}/>)}
    </Box>
    </div>
    </>
  )
}

export default HomePage;