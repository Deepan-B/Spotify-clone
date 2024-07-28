import { atom } from "recoil";

export const currentTrackIdState = atom({
    key: "currentTrackIdState",
    default: null
});

export const isPlayingState = atom({
    key :"isPlayingState",
    default: false
})

export const currentUri = atom({
    key: "currentUri",
    default : null
})

export const currentTrack = atom({
    key: "currentTrack",
    default : null
})





