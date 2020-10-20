import React, { useEffect } from "react";
import "../css/components/SongPopupOptions.css";
import { useStateValue } from "../StateProvider";
import likeSong from "../handlers/likeSong";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

function SongPopupOptions() {
  const [{ songOptionnsData, playlist, temPlaylist }] = useStateValue();
  const [{}, dispatch] = useStateValue();
  const [{ user }] = useStateValue();
  const cookies = new Cookies();

  const toggelLikeSong = async () => {
    const songId = songOptionnsData.songId;
    dispatch({
      type: "SONGS_OPTION_DATA",
      item: {},
    });
    if (user.name) {
      const response = await likeSong({
        token: cookies.get("loginToken"),
        songId: songId,
      });
      /*Now we are going to update the staus liked or not by finding the the song in 
      temp as well as well as in regular playlisr*/
      //   let temp = playlist;
      //   temp[currentSongId].isLikedByUser = response.isLikedSong;
      let temp = playlist;
      temp.map((obj, i) => {
        if (obj.id == songId) {
          temp[i].isLikedByUser = response.isLikedSong;
          dispatch({
            type: "SET_PLAYLIST",
            item: temp,
          });
        }
      });

      temp = temPlaylist;
      temp.map((obj, i) => {
        if (obj.id == songId) {
          temp[i].isLikedByUser = response.isLikedSong;
        }
      });
      dispatch({
        type: "SET_TEMP_PALYLISTT",
        item: temp,
      });

      //show status to user
      if (response.isLikedSong) {
        toast.info("Added to your Liked Songs 💚");
      } else {
        toast.info("Remove from your Liked Songs ");
      }
    } else {
      toast.info("Login to add this song to your Liked Songs ");
    }
  };

  const showAddToPlaylistModel = () => {
    if (user.name) {
      dispatch({
        type: "SHOW_HIDE_ADD_TO_PLAYLIST_MODEL",
        item: true,
      });

      dispatch({
        type: "ADD_TO_PLAYLIST_DATA",
        item: { songId: songOptionnsData.songId },
      });
    } else {
      toast.info("Login to start creating Playlists");
    }
  };
  return (
    <div
      id="song-popup-options-conatiner"
      style={{
        left: songOptionnsData.cordinates?.x - 200,
        top: songOptionnsData.cordinates?.y - 140,
        display: songOptionnsData.cordinates ? "block" : "none",
      }}
    >
      <div id="save-liked-songs" className="option" onClick={toggelLikeSong}>
        <p className="option silvery-text">
          {songOptionnsData.isLiked
            ? "Remove from your Liked Songs"
            : "Save to your Liked Songs"}
        </p>
      </div>

      <div
        id="add-to-playlist"
        className="option"
        onClick={showAddToPlaylistModel}
      >
        <p className="option silvery-text">Add to Playlist</p>
      </div>

      <div id="copy-song-link" className="option">
        <p className="option silvery-text">Copy Song Link</p>
      </div>
    </div>
  );
}

export default SongPopupOptions;
