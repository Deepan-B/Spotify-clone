import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  isPlayingState,
  currentTrackIdState,
  currentUriState,
  currentTrackState,
  previousTrackState,
  nextTrackState,
  playlistState
} from './atom/playlistAtom';
import './Songs.css';
import millisToMinutesAndSeconds from './time.js';
import SpotifyWebApi from 'spotify-web-api-js';

export default function Songs() {
  const spotifyApi = new SpotifyWebApi();

  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentUri, setCurrentUri] = useRecoilState(currentUriState);
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [previousTrack, setPreviousTrack] = useRecoilState(previousTrackState);
  const [nextTrack, setNextTrack] = useRecoilState(nextTrackState);

  const playlist = useRecoilValue(playlistState);

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text + ' '.repeat(maxLength - text.length);
  };

  const PlaySong = (track) => {
    const trackIndex = playlist.tracks.items.findIndex((item) => item.track.id === track.track.id);

    if (trackIndex !== -1) {
      setCurrentTrackId(track.track.id);
      setCurrentUri(track.track.preview_url);
      setCurrentTrack(track);
      setIsPlaying(!!track.track.preview_url);

      const previousIndex = trackIndex > 0 ? trackIndex - 1 : playlist.tracks.items.length - 1;
      setPreviousTrack(playlist.tracks.items[previousIndex]);

      const nextIndex = trackIndex < playlist.tracks.items.length - 1 ? trackIndex + 1 : 0;
      setNextTrack(playlist.tracks.items[nextIndex]);
    } else {
      alert('Sorry, we are not having resources. Try another song.');
    }
  };

  return (
    <div className='songs'>
      {playlist?.tracks.items.map((track) => (
        <div key={track?.track?.id} className='song_wrap' onClick={() => PlaySong(track)}>
          <div className='song'>
            <img src={track?.track?.album.images[0].url} alt='img' />
            <div className='artist'>
              <p className='text'>{truncateText(track?.track?.name, 20)}</p>
              <p>{truncateText(track?.track?.artists[0].name)}</p>
            </div>
          </div>
          <div className='song_right'>
            <p className='movie'>{truncateText(track?.track?.album.name, 20)}</p>
            <p>{millisToMinutesAndSeconds(track?.track?.duration_ms)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
