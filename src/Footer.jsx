import React, { useEffect, useRef, useState } from 'react';
import './Footer.css';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import { useRecoilState } from 'recoil';
import {
  isPlayingState,
  currentUriState,
  currentTrackState,
  playlistState,
  currentTrackIdState,
  previousTrackState,
  nextTrackState,
} from './atom/playlistAtom';
import { useDataLayerValue } from './DataLayer.jsx';

function Footer() {
  const [{ token }, dispatch] = useDataLayerValue();
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentUri, setCurrentUri] = useRecoilState(currentUriState);
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [previousTrack, setPreviousTrack] = useRecoilState(previousTrackState);
  const [nextTrack, setNextTrack] = useRecoilState(nextTrackState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const audioRef = useRef(null);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [resetDuration, setResetDuration] = useState(false);

  useEffect(() => {
    console.log('Playlist structure:', playlist);
  }, [playlist]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        if (resetDuration) {
          audioRef.current.currentTime = 0;
          setCurrentTime(0);
          setResetDuration(false);
        }
        audioRef.current.play().catch((error) => {
          console.error('Play error:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePreviousTrack = () => {
    PlaySong(previousTrack);
  };

  const handleNextTrack = () => {
    PlaySong(nextTrack);
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

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (!isShuffle) {
      const shuffledPlaylist = {
        ...playlist,
        tracks: {
          ...playlist.tracks,
          items: shuffleArray([...playlist.tracks.items])
        }
      };
      setPlaylist(shuffledPlaylist);
    }
  };

  const handleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text + ' '.repeat(maxLength - text.length);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current && currentUri) {
      const onLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
        if (isPlaying) {
          audioRef.current.play().catch((error) => {
            console.error('Autoplay error:', error);
          });
        }
        setResetDuration(true);
      };

      audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
      audioRef.current.addEventListener('ended', handleTrackEnd);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadedmetadata', onLoadedMetadata);
          audioRef.current.removeEventListener('ended', handleTrackEnd);
        }
      };
    }
  }, [isPlaying, currentUri]);

  const handleTrackEnd = () => {
    if (isRepeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.error('Play error:', error);
      });
    } else {
      handleNextTrack();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        handlePlayPause();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePlayPause]);

  useEffect(() => {
    if (audioRef.current && currentUri) {
      const onTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      };

      const onLoadedMetadata = () => {
        if (!isPlaying) {
          setResetDuration(true);
        } else {
          setDuration(audioRef.current.duration);
        }
      };

      audioRef.current.addEventListener('timeupdate', onTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', onTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', onLoadedMetadata);
        }
      };
    }
  }, [isPlaying]);

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (audioRef.current) {
      audioRef.current.volume = newValue / 100;
    }
  };

  const handleSeek = (event, newValue) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
      setCurrentTime(newValue);
      setResetDuration(false);

      if (!isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Play error:', error);
        });
      }
    }
  };

  const handleVolumeDown = () => {
    setVolume((prevVolume) => Math.max(prevVolume - 10, 0));
  };

  const handleVolumeUp = () => {
    setVolume((prevVolume) => Math.min(prevVolume + 10, 100));
  };

  const formattedCurrentTime = formatTime(currentTime);
  const formattedTotalTime = formatTime(duration);

  return (
    <div className='footer'>
      <div className='footer__left'>
        <div>
          {currentUri && (
            <audio
              ref={audioRef}
              src={currentUri}
              controls={false}
              autoPlay={isPlaying}
              style={{ position: 'absolute', left: '-1000px' }}
            ></audio>
          )}
          <div className='song_disp'>
            {currentTrack?.track?.album?.images?.[0]?.url && (
              <img src={currentTrack.track.album.images[0].url} alt='' />
            )}
            <div className='names'>
              <p className='name'>{truncateText(currentTrack?.track?.name, 35)}</p>
              <p className='name' style={{ color: 'grey' }}>{currentTrack?.track?.artists?.[0]?.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='song_player'>
        <div className='footer__center'>
          <ShuffleIcon className={`footer-icons shuffle-btn ${isShuffle ? 'active' : ''}`} onClick={handleShuffle} />
          <span className='prev material-icons material-icons-outlined footer-icons' onClick={handlePreviousTrack}>skip_previous</span>
          <span onClick={handlePlayPause} className={`material-icons material-icons-outlined footer-icons play ${isPlaying ? 'pause' : ''}`}>
            {isPlaying ? 'pause_circle_filled' : 'play_circle_filled'}
          </span>
          <span className='next material-icons material-icons-outlined footer-icons' onClick={handleNextTrack}>skip_next</span>
          <RepeatIcon className={`footer-icons loop ${isRepeat ? 'active' : ''}`} onClick={handleRepeat} />
        </div>
        <div className='slider'>
          <span className='run-time'>{formattedCurrentTime}</span>
          <Slider
            size='small'
            value={currentTime}
            max={duration}
            onChange={handleSeek}
            valueLabelDisplay='off'
            color='primary'
          />
          <span className='total-time'>{formattedTotalTime}</span>
        </div>
      </div>
      <div className='footer__right'>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <VolumeDownIcon onClick={handleVolumeDown} />
          </Grid>
          <Grid item xs>
            <Slider
              size='small'
              value={volume}
              onChange={handleVolumeChange}
              aria-label='Volume'
              valueLabelDisplay='auto'
            />
          </Grid>
          <Grid item>
            <VolumeUpIcon onClick={handleVolumeUp} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds === 0) {
    return '0:00';
  }

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const formattedSecs = secs < 10 ? `0${secs}` : secs;

  return `${minutes}:${formattedSecs}`;
};

export default Footer;
