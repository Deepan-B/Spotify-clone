import React, { useEffect, useState } from 'react'
import "./Body.css"
import { useDataLayerValue } from './DataLayer'
import { useRecoilState, useRecoilValue } from 'recoil';
import {playlistIdState , playlistState} from './atom/playlistAtom'
import Songs from './songs';


const colors = [
  "#FF6347", "#FFA500", "#FFFF00", "#32CD32", "#1E90FF",
  "#8A2BE2", "#800000", "#FFFFFF", "#000000", "#FF4500",
  "#FFD700", "#008000", "#0000FF", "#4B0082", "#DC143C",
  "#FF8C00", "#FF1493", "#00BFFF", "#9400D3", "#008080",
  "#FF69B4", "#DAA520", "#32CD32", "#4169E1", "#FF0000"
];

export default function Body() {
  const [{playlists},dispatch] = useDataLayerValue();
  const [color,setcolor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);

  const [playlist,setPlaylist] = useRecoilState(playlistState);

  useEffect(()=> {
    setcolor(colors[Math.floor(Math.random() * colors.length)])
  },[playlistId])


  return (
    <div className='body'>
    <section className='top_body' style={{backgroundImage: `linear-gradient(to top, black, ${color})`}}>
       
      <img src={playlist?.images?.[0]?.url} alt='img' ></img>
      <div className='text'>
      <p className='playlist_name'>{playlist?.name}</p>
      <p className='create'>Created by : {playlist?.owner.display_name}</p>
      </div>
     </section>
     <Songs />
    </div>
  )
}

