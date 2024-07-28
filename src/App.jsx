import React, { useEffect, useState } from 'react';
import Login from './Login';
import { getToken } from './Spotify.jsx';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player.jsx';
import { useDataLayerValue } from './DataLayer.jsx';

export default function App() {
  const [{user,token}, dispatch] = useDataLayerValue();

  const Spotify = new SpotifyWebApi();

  useEffect( () => {
    const hash = getToken();
    window.location.hash = "";
    const _token = hash.access_token;

    if(_token){
      dispatch({
        type: "SET_TOKEN",
        token : _token
      })
      Spotify.setAccessToken(_token)

      Spotify.getMe().then(dispatch({
        type : "SET_USER",
        user:user
      }))

      Spotify.getUserPlaylists().then((playlists) =>{
         dispatch({
          type : "SET_PLAYLIST",
          playlists : playlists
         })
      })

    }
  } , []);



  return (
    <div className="main">
      {(token) ? <Player /> : <Login />}
    </div>
  );
}
