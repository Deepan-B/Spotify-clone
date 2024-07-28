import React, { useState } from 'react';
import "./Sidebar.css";
import SidebarIcons from './SidebarIcons';
import { useDataLayerValue } from './DataLayer';
import Playlist_disp from './Playlist_disp';

export default function Sidebar() {
  const [{ playlists }, dispatch] = useDataLayerValue();
  const [isopen, Setisopen] = useState(false);

  const toggleSidebar = () => {
    Setisopen(!isopen);
  };
  // console.log(isopen);

  return (
    <>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isopen ? "X" : "<"} 
      </button>
      <div className={`sidebar ${isopen ? 'open' : 'closed'}`}>
        <div className='side_top'>
          <SidebarIcons icon="home" name="Home" />
          <SidebarIcons icon="search" name="Search" />
        </div>
        <div className='side_bottom'>
          <div className='library'>
            <SidebarIcons icon="library_music" name="Your Playlists" />
          </div>
          <div className='library_list' onClick={toggleSidebar}>
            <Playlist_disp playlists={playlists.items} />
          </div>
        </div>
      </div>
    </>
  );
}
