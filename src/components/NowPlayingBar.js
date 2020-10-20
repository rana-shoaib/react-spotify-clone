import React, { useEffect, useState } from "react";
import "../css/components/NowPlayingBar.css";
import { useStateValue } from "../StateProvider";
import formatTime from "../helpers/formatTime";
import likeSong from "../handlers/likeSong";
import Cookies from "universal-cookie";
import isBuffering from "../helpers/isBuffering";

function NowPlayingBar() {
  const [{ playlist, user, currentSongId, isPlaying }] = useStateValue();
  const [{}, dispatch] = useStateValue();
  const [songTimebarWidth, setSongTimebarWidth] = useState(0);
  const [songFormattedCurrentTime, setSongFormattedCurrentTime] = useState(
    "0:00"
  );
  const [isShuffelOn, setIsSuffelOn] = useState(false);
  const [isRpeatlOn, setIsRepeatOn] = useState(false);
  const cookies = new Cookies();
  const [showSongLoadingIndicator, setShowSongLoadingIndicator] = useState(
    false
  );
  const [volumePercentage, setVolumePercentage] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [volumeBeforeMuted, setVolumeBeforeMuted] = useState(1);

  let audio;

  const toggelSongStatus = () => {
    dispatch({
      type: "UPDATE_SONG_STATUS",
      item: !isPlaying,
    });
  };

  const previousSong = () => {
    dispatch({
      type: "SET_CURRENT_SONG_ID",
      item: currentSongId > 0 ? currentSongId - 1 : playlist.length - 1,
    });
  };

  const seekSong = (e) => {
    audio = document.getElementById("currentPlayingSong");
    let percentageClicked =
      (e.offsetX /
        document.getElementById("songTimeBarContainer").offsetWidth) *
      100;
    audio.currentTime = (audio.duration * percentageClicked) / 100;
  };

  const toggelSuffelSong = () => {
    setIsSuffelOn(!isShuffelOn);
    setIsRepeatOn(false);
  };

  const toggelRepeatSong = () => {
    setIsRepeatOn(!isRpeatlOn);
    setIsSuffelOn(false);
  };

  useEffect(() => {
    audio = document.getElementById("currentPlayingSong");
    isPlaying ? audio.play() : audio.pause();
  }, [currentSongId, isPlaying, playlist]);

  useEffect(() => {
    setSongTimebarWidth(0);

    audio.addEventListener("timeupdate", () => {
      setSongTimebarWidth((audio.currentTime / audio.duration) * 100);
      setSongFormattedCurrentTime(formatTime(audio.currentTime));
    });
  }, [currentSongId]);

  useEffect(() => {
    audio = document.getElementById("currentPlayingSong");
    document
      .getElementById("songTimeBarContainer")
      .addEventListener("click", (e) => {
        seekSong(e);
      });
  }, []);

  const nextSong = (forceNext = false) => {
    const audio = document.getElementById("currentPlayingSong");
    if (!forceNext) {
      if (isShuffelOn) {
        let randomNumber = Math.floor(Math.random() * playlist.length);
        if (randomNumber != currentSongId) {
          dispatch({
            type: "SET_CURRENT_SONG_ID",
            item: randomNumber,
          });
        } else {
          audio.currentTime = 0;
          audio.play();
        }
      } else if (isRpeatlOn) {
        // dispatch({
        //   type: "SET_CURRENT_SONG_ID",
        //   item: currentSongId,
        // });
        audio.currentTime = 0;
        audio.play();
      } else {
        dispatch({
          type: "SET_CURRENT_SONG_ID",
          item: currentSongId < playlist.length - 1 ? currentSongId + 1 : 0,
        });
      }
    } else {
      dispatch({
        type: "SET_CURRENT_SONG_ID",
        item: currentSongId < playlist.length - 1 ? currentSongId + 1 : 0,
      });
    }
  };
  //like song
  const toggelLikeSong = async () => {
    if (cookies.get("loginToken")) {
      if (playlist[currentSongId].id) {
        const response = await likeSong({
          token: cookies.get("loginToken"),
          songId: playlist[currentSongId].id,
        });

        let temp = playlist;
        temp[currentSongId].isLikedByUser = response.isLikedSong;
        dispatch({
          type: "SET_PLAYLIST",
          item: temp,
        });
      }
    }
  };
  // loading indicator
  useEffect(() => {
    if (playlist[currentSongId].id) {
      setShowSongLoadingIndicator(true);
    }
    const audio = document.getElementById("currentPlayingSong");
    audio.addEventListener("canplay", () => {
      setShowSongLoadingIndicator(false);
    });
  }, [playlist, currentSongId]);

  const adgestVolume = (e) => {
    const audio = document.getElementById("currentPlayingSong");
    const ratio =
      e.nativeEvent.offsetX /
      document.getElementById("volumeBarContainer").offsetWidth;
    audio.volume = ratio;
    setVolumePercentage(ratio * 100);

    //if user  try to change the volume and the song is muted it should unmute
    audio.muted = false;
    setIsMuted(false);
  };

  const toggelMute = () => {
    const audio = document.getElementById("currentPlayingSong");
    if (!isMuted) {
      setVolumeBeforeMuted(audio.volume);
      audio.muted = true;
      setVolumePercentage(0);
      setIsMuted(true);
    } else {
      audio.volume = volumeBeforeMuted;
      audio.muted = false;
      setVolumePercentage((volumeBeforeMuted / 1) * 100);
      setIsMuted(false);
    }
  };

  return (
    <div id="nowplayingBarContainer">
      <div id="nowplayingBarLeft">
        <img
          src={playlist[currentSongId]?.artPath}
          id="nowplayingSonAlbumArtwork"
        />
        <div>
          <p id="nowPlayingSongTittle" className="white-text">
            {playlist[currentSongId]?.title}
          </p>

          <p id="nowPlayingSongAlbumName" className="silvery-text">
            {playlist[currentSongId]?.album}
          </p>
          <i
            className="fas fa-heart"
            id="likeSongButton"
            onClick={toggelLikeSong}
            style={{
              color: playlist[currentSongId]?.isLikedByUser
                ? "#1db954"
                : "#b3b3b3",
            }}
          ></i>
        </div>
      </div>
      <div id="nowplayingBarCenter">
        <div id="songControlsConatiner">
          <i
            className="fas fa-random controlIcon"
            id="shuffle"
            onClick={toggelSuffelSong}
            style={{ color: isShuffelOn ? "#1db954" : "#b3b3b3" }}
          ></i>
          <i
            className="fas fa-step-backward controlIcon"
            id="backward"
            onClick={previousSong}
          ></i>
          <div
            id="loading-indicator"
            style={{ display: showSongLoadingIndicator ? "block" : "none" }}
          ></div>
          <i
            className="fas fa-play-circle controlIcon"
            id="play"
            style={{ display: isPlaying ? "none" : "block" }}
            onClick={toggelSongStatus}
          ></i>
          <i
            className="fas fa-pause-circle controlIcon"
            id="pause"
            style={{ display: isPlaying ? "block" : "none" }}
            onClick={toggelSongStatus}
          ></i>
          <i
            className="fas fa-step-forward controlIcon"
            id="forward"
            onClick={() => {
              nextSong(true);
            }}
          ></i>
          <i
            className="fas fa-retweet controlIcon"
            id="reapeat"
            onClick={toggelRepeatSong}
            style={{ color: isRpeatlOn ? "#1db954" : "#b3b3b3" }}
          ></i>
        </div>
        <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
          <span id="songCurrentTime" className="silvery-text">
            {songFormattedCurrentTime}
          </span>
          <div id="songTimeBarContainer">
            <div
              id="songTimeBar"
              style={{ width: songTimebarWidth + "%" }}
            ></div>
            <div
              id="songTimeBarCircle"
              style={{ left: songTimebarWidth + "%" }}
            ></div>
          </div>
          <span id="songTotalTime" className="silvery-text">
            {playlist[currentSongId]?.duration}
          </span>
        </div>
      </div>
      <div id="nowplayingBarRight">
        <i
          className="fas fa-volume-up controlIcon"
          id="fullVolume"
          onClick={toggelMute}
          style={{
            display: volumePercentage > 50 && !isMuted ? "block" : "none",
          }}
        ></i>
        <i
          className="fas fa-volume-down controlIcon"
          id="volumeDown"
          onClick={toggelMute}
          style={{
            display:
              volumePercentage < 50 && volumePercentage != 0 && !isMuted
                ? "block"
                : "none",
          }}
        ></i>
        <i
          className="fas fa-volume-mute controlIcon"
          id="volumeMute"
          onClick={toggelMute}
          style={{ display: isMuted ? "block" : "none" }}
        ></i>
        <i
          className="fas fa-volume-off controlIcon"
          id="volumeZero"
          style={{
            display: volumePercentage == 0 && !isMuted ? "block" : "none",
          }}
        ></i>
        <div id="adjustVolumeContainer">
          <div id="volumeBarContainer" onClick={adgestVolume}>
            <div id="volumeBar" style={{ width: volumePercentage + "%" }}></div>
            <div id="circle" style={{ left: volumePercentage + "%" }}></div>
          </div>
        </div>
      </div>
      <audio
        id="currentPlayingSong"
        src={playlist[currentSongId]?.songUrl}
        onEnded={() => {
          nextSong(false);
        }}
      ></audio>
    </div>
  );
}

export default NowPlayingBar;
