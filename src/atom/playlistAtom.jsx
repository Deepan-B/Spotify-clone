import { atom } from "recoil"

export const isPlayingState = atom({
    key: 'isPlayingState',
    default: false,
  });

export const playlistState = atom({
    key:"playlistState",
    default : null,
})


export const playlistIdState = atom({
    key : "playlistIdState",
    default : '37i9dQZF1DWYztMONFqfvX'
})

export const currentUriState = atom({
    key: "currentUriState",
    default : null
})

export const currentTrackState = atom({
    key: "currentTrackState",
    default : null
})

export const previousTrackState = atom({
    key: "previousTrackState",
    default : null
})

export const nextTrackState = atom({
    key: "nextTrackState",
    default : null
})

export const currentTrackIdState = atom({
    key: 'currentTrackIdState',
    default: null,
  });