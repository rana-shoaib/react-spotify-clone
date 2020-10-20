import React from "react";
import "../css/components/AlbumCart.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Cookies from "universal-cookie";
import BASE_URL from "../helpers/baseUrl";

function AlbumCart({ img, title, discription, id, isArtist = false }) {
  const [
    { playlist, user, currentSongId, isPlaying, currentPlayingAlbumId },
  ] = useStateValue();
  const [{}, dispatch] = useStateValue();
  const cookies = new Cookies();

  const setPlayList = (id) => {
    if (playlist[currentSongId]?.albumId === id) {
      // if palylist is already set no need to set it agin just paly pause the song
      //console.log(isPlaying);
      dispatch({
        type: "UPDATE_SONG_STATUS",
        item: !isPlaying,
      });
    } else {
      fetch(
        `${BASE_URL}getAlbumInfo.php?id=${id}&token=${cookies.get(
          "loginToken"
        )}`
      )
        .then((respone) => respone.json())
        .then((data) => {
          dispatch({
            type: "SET_PLAYLIST",
            item: data.songs,
          });
          dispatch({
            type: "UPDATE_SONG_STATUS",
            item: true,
          });

          dispatch({
            type: "SET_CURRENT_ALBUM_ID",
            item: data.album.id,
          });
        });
    }
  };

  return (
    <Link
      to={isArtist ? "/artist/" + id : "/album/" + id}
      className="album-container"
      id="album-container"
    >
      <img
        src={img}
        alt={title + " cover image"}
        style={{ borderRadius: isArtist ? "50%" : "" }}
      />
      <div className="album-tittle">
        <p className="white-text">{title}</p>
      </div>
      <div className="album-discription">
        <p className="silvery-text">{discription}</p>
      </div>
      <div
        id="circular-paly-button"
        onClick={(e) => {
          e.preventDefault();
          setPlayList(id);
        }}
        style={{
          visibility: currentPlayingAlbumId == id ? "visible" : "",
          display: isArtist ? "none" : "flex",
        }}
      >
        <i
          className="fas fa-play"
          id="album-floating-play-button"
          style={{
            display:
              isPlaying && currentPlayingAlbumId == id ? "none" : "block",
          }}
        ></i>
        <i
          className="fas fa-pause"
          id="album-floating-pause-button"
          style={{
            display:
              isPlaying && currentPlayingAlbumId == id ? "block" : "none",
          }}
        ></i>
      </div>
    </Link>
  );
}

export default AlbumCart;
