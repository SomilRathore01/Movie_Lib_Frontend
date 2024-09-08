import axios from "axios";

export const getAllMovies = async() => {
const res = await axios.get("/movie")
.catch((err)=> console.log(err));

if(res.status !== 200){
    return console.log("No Data");
}

const data = await res.data;
return data;
};

export const sendUserAuthRequest = async(data, signup) => {
    const res = await axios.post(`/user/${signup?"signup": "login"}`, {
        name: signup? data.name : "",
        email: data.email,
        password: data.password
    }).catch((err) => console.log(err));

    if(res.status !== 200 && res.status !== 201){
        console.log("Unexpected Error Occured")
    }
    const resData = await res.data;
    return resData;
}

export const sendAdminRequest = async (data) => {
    const res = await axios.post("/admin/login", {
        email: data.email,
        password: data.password,
    })
    .catch((err)=>console.log(err));

    if(res.status !== 200){
        return console.log("Unexpected Error");
    }
    
    const resData = await res.data;
    return resData;
}

export const getMovieDetails = async (id) => {
    const res = await axios.get(`/movie/${id}`)
    .catch((err) => console.log(err));

    if(res.status !== 200){
        return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;
}

export const getAllPlaylists = async (id) => {
    id = localStorage.getItem("userId");
    const res = await axios.get(`/playlist/user/${id}`)
    .catch((err) => console.log(err));

    if(res.status !== 200){
        return console.log("Unexpected Array");
    }
    const resData = await res.data;
    return resData;
};

export const getPlaylistByTitle = async (title) => {
    const res = await axios.get(`/playlist/title/${title}`)
    .catch((err) => console.log(err));
    if (res.status !== 200) {
      return console.log("Playlist not found");
    }
    const resData = await res.data;
    return resData;
  };

export const addMovieinPlaylist = async(data) => {
    const id = data.playlistid;
    const res = await axios.post(`/playlist/${id}`, {movieId: localStorage.getItem("movieId")}) 
    .catch((err) => console.log(err));

    if(res.status !== 201){
        return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;
};

export const addPlaylist = async(data) => {
    const id = localStorage.getItem("userId");
    const res = await axios.post("/playlist/newlist", {title: data, user: id})
    .catch((err) => console.log(err));

    if(res.status !== 200){
        return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;
}

export const getUserDetails = async () => {
    const id = localStorage.getItem("userId");
    const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));
    if (res.status !== 200) {
      return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;
  };

export const moviesofPlaylist = async (data) => {
    const id = data;
    const res = await axios.get(`/playlist/${id}`)
    .catch((err) => console.log(err));

    if(res.status !== 200){
        return console.log("Unexpected Error")
    }
    const resData = await res.data;
    return resData;
}

export const deleteplaylist = async (data) => {
    const id  = data;
    const res = await axios.delete(`/playlist/delete/${id}`)
    .catch((err) => console.log(err));

    if(res.status !== 200){
        return console.log("Unexpected Error")
    }
    const resData = await res.data;
    return resData;
}