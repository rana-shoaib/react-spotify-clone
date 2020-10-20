import React, { useState } from "react";
import "../css/components/AlbumHader.css";
import { useStateValue } from "../StateProvider";
import likeAlbum from "../handlers/likeAlbum";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
function AlbumHader({
  id,
  title,
  artist,
  discription,
  img,
  likes,
  isRoundedImg,
  songsList,
  albumId,
  showLikeButton = true,
  showOptionsButton = true,
  showNumOfLikes = true,
  showAlbumArt = true,
  isLikedByUser,
  type = "",
}) {
  const [
    {
      isPlaying,
      albumColor,
      playlist,
      currentSong,
      currentPlayingAlbumId,
      tempAlbumId,
    },
  ] = useStateValue();
  const [{}, dispatch] = useStateValue();
  const [{ user }] = useStateValue();
  const cookies = new Cookies();

  const [isAlbumLiked, setIsAlbumLiked] = useState(isLikedByUser);
  const [albumLikes, setAlbumLikes] = useState(parseInt(likes));

  const like = async () => {
    if (user.name) {
      const response = await likeAlbum({
        token: cookies.get("loginToken"),
        albumId: id,
      });
      setIsAlbumLiked(response.isLikedAlbum);
      if (response.isLikedAlbum) {
        setAlbumLikes(albumLikes + 1);
      } else {
        setAlbumLikes(albumLikes + -1);
      }
    } else {
      toast.info("Login to like like this album");
    }
  };
  const setSong = () => {
    if (songsList.length > 0) {
      if (!isPlaying) {
        dispatch({
          type: "SET_PLAYLIST",
          item: songsList,
        });
        console.log(playlist);

        dispatch({
          type: "SET_CURRENT_ALBUM_ID",
          item: tempAlbumId,
        });

        dispatch({
          type: "UPDATE_SONG_STATUS",
          item: true,
        });
      } else {
        dispatch({
          type: "UPDATE_SONG_STATUS",
          item: false,
        });
      }
    }
  };

  return (
    <div>
      <div id="album-hader" style={{ backgroundColor: albumColor }}>
        <div id="left" style={{ display: showAlbumArt ? "block" : "none" }}>
          <img
            src={img}
            alt={title + " cover image"}
            style={{
              borderRadius: isRoundedImg ? "50%" : "0%",
            }}
          />
        </div>

        <div id="right">
          <h4 id="type" className="white-text">
            {type}
          </h4>
          <h1 id="title" className="white-text" title={title}>
            {title}
          </h1>
          <p id="discription" className="silvery-text" title={discription}>
            {discription}
          </p>
          <div id="details">
            <span id="artist" className="white-text">
              {showLikeButton ? artist + " . " : ""}
            </span>
            <span
              id="num-of-likes"
              className="silvery-text"
              style={{ display: showNumOfLikes ? "inline-bolck" : "none" }}
            >
              {albumLikes + " likes"}
            </span>
            <span id="duration" className="silvery-text"></span>
          </div>
        </div>
      </div>
      <div id="controls" style={{ backgroundColor: albumColor }}>
        <div
          className="rounded-paly-button"
          id="album-play-button"
          onClick={setSong}
        >
          <i
            className="fas fa-play"
            style={{
              display:
                isPlaying && currentPlayingAlbumId === albumId
                  ? "none"
                  : "block",
            }}
          ></i>
          <i
            className="fas fa-pause"
            style={{
              display:
                isPlaying && currentPlayingAlbumId === albumId
                  ? "block"
                  : "none",
            }}
          ></i>
        </div>

        <div
          id="album-like-button"
          onClick={like}
          style={{ display: showLikeButton ? "block" : "none" }}
        >
          <i
            className="fas fa-heart"
            style={{ color: isAlbumLiked ? "#1DB954" : "#b3b3b3" }}
          ></i>
        </div>

        <div
          id="album-options-button"
          style={{ display: showOptionsButton ? "block" : "none" }}
        >
          <i className="fas fa-ellipsis-h silvery-text"></i>
        </div>
      </div>
    </div>
  );
}

export default AlbumHader;
