import React from 'react'
import './login.css'
import {loginUrl} from "./Spotify"

export default function Login() {
  return (
    <div className='login'>
      <p>Welcome to Deepan's spotify</p>
      <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/folder_920_201707260845-1.png' alt='spotify'></img>
      <a href={loginUrl}>Login with spotify😉</a>
    </div>
  )
}
