const client_id ="cff1435933304f819d28aaff9f524573";

const redirect_link ='http://localhost:3000/'

const end_point ="https://accounts.spotify.com/authorize"

const scopes =[
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "user-read-recently-played",
    "user-read-playback-position",
    "playlist-read-private",
]

export const loginUrl =`${end_point}?client_id=${client_id}&redirect_uri=${redirect_link}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;



export const getToken = () => {
    return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
    },{});

}


