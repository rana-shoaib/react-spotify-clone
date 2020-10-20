import React, { useState, useEffect } from "react";
import "../css/components/SingleSong.css";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
import SongPopupOptions from "./SongPopupOptions";

function SingleSong({
  id,
  title,
  artist,
  duration,
  artistId,
  artPath,
  showSongArt = false,
  songList,
  songId,
}) {
  const [{}, dispatch] = useStateValue();
  const [
    { isPlaying, currentSongId, playlist, tempAlbumId, temPlaylist },
  ] = useStateValue();

  const setSong = (id) => {
    console.log(songList);
    dispatch({
      type: "SET_PLAYLIST",
      item: songList,
    });
    dispatch({
      type: "SET_CURRENT_SONG_ID",
      item: id,
    });

    dispatch({
      type: "UPDATE_SONG_STATUS",
      item: true,
    });

    dispatch({
      type: "SET_CURRENT_ALBUM_ID",
      item: tempAlbumId,
    });
  };

  const toggelSongStatus = () => {
    dispatch({
      type: "UPDATE_SONG_STATUS",
      item: !isPlaying,
    });
  };

  const showSongOption = (e, id) => {
    const x = e.nativeEvent.clientX;
    const y = e.nativeEvent.clientY;
    let data = {
      cordinates: {
        x: x,
        y: y,
      },
    };
    data.songId = id;
    /*finding wether song is already liked or not and we will check it from temp playlist 
    because the use may or may not be listning to this album so we can't reference it from 
    reagular playlist*/
    temPlaylist.map((obj) => {
      if (obj.id == id) {
        data.isLiked = obj.isLikedByUser;
      }
    });

    dispatch({
      type: "SONGS_OPTION_DATA",
      item: data,
    });
  };

  const hideSongOptions = (e) => {
    if (e.target.classList[0] != "option") {
      dispatch({
        type: "SONGS_OPTION_DATA",
        item: {},
      });
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", hideSongOptions);
  }, []);

  return (
    <div
      id={
        playlist[currentSongId]?.id == songId
          ? "single-song-container-active"
          : "single-song-container"
      }
      className="active"
    >
      <div id="left">
        <i className="fas fa-music silvery-text" id="music-icon"></i>
        <i
          className="fas fa-play white-text"
          id="song-play-button"
          style={{
            display:
              isPlaying && playlist[currentSongId]?.id == songId ? "none" : "",
          }}
          onClick={() => {
            setSong(id);
          }}
        ></i>
        <i
          className="fas fa-pause white-text"
          id="song-play-button"
          style={{
            display:
              isPlaying && playlist[currentSongId]?.id == songId
                ? "block"
                : "none",
          }}
          onClick={toggelSongStatus}
        ></i>
        {showSongArt ? <img src={artPath} id="art" /> : ""}
        <div id="song-details">
          <h3 id="title" className="white-text">
            {title}
          </h3>
          <Link
            to={`/artist/${artistId}`}
            id="artsist"
            className="silvery-text"
          >
            {artist}
          </Link>
        </div>
      </div>
      <div id="right">
        <div
          id="song-options"
          onClick={(e) => {
            showSongOption(e, songId);
          }}
        >
          <i className="fas fa-ellipsis-h white-text"></i>
        </div>
        <p id="song-duration" className="silvery-text">
          {duration}
        </p>
      </div>
    </div>
  );
}

export default SingleSong;
