import React, { useEffect } from 'react'
import "./Playlist_disp.css"
import { useState } from 'react';
import {playlistIdState , playlistState} from './atom/playlistAtom'
import { useRecoilState } from 'recoil';
import SpotifyWebApi from 'spotify-web-api-js';




function Playlist_disp(props) {
  const Spotify = new SpotifyWebApi();
  const [playlistId,setplaylistId] = useRecoilState(playlistIdState);
  const [playlist,setPlaylist] = useRecoilState(playlistState);

  useEffect(()=> {
    Spotify.getPlaylist(playlistId).then((data) => {
      setPlaylist(data)
    }).catch((error) => {
      console.error(error); 
    });
    
  },[playlistId])

  return (
    props.playlists?.map( (item) => {
        return (
        <div className='playlist_disp' key={item.id} onClick={()=>setplaylistId(item.id)}>
        <img src={item.images[0]?.url} />
        <p className='playlist_text'>{item.name}</p>
      </div>
      );
    })
    
  )
}

export default Playlist_disp
