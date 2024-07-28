import React from 'react'
import "./Sidebaricons.css"

function SidebarIcons({name , icon}) {
  return (
    <div className="sidebaricons">
        <span className="material-icons material-icons-outlined sidebaricons__icon">{icon}</span>
        <p>{name}</p>
    </div>
  )
}

export default SidebarIcons
