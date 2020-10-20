import React from "react";
import palylistIcon from "../assets/playlistIcon.svg";
import "../css/components/PlaylistCart.css";
import { useStateValue } from "../StateProvider";
import addSongToPlaylist from "../handlers/addSongToPlaylist";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

function PlylistCart({ title, id }) {
  const [{}, dispatch] = useStateValue();
  const [
    { user, userPlaylists, showAddToPlaylistModel, addToPlaylistData },
  ] = useStateValue();
  const cookies = new Cookies();

  const addToPlaylist = async () => {
    const response = await addSongToPlaylist({
      token: cookies.get("loginToken"),
      songId: addToPlaylistData.songId,
      playlistId: id,
    });

    if (response.isCreated) {
      toast.info("Song Added to Your Playlist");
    } else {
      toast.info(" Unabel to add Song to Your Playlist");
    }
  };

  return (
    <div id="palylist-cart" onClick={addToPlaylist}>
      <div id="playlist-iamge-conatiner">
        <img src={palylistIcon} />
        <i className="fas fa-plus-circle white-text" />
      </div>
      <p className="white-text">{title}</p>
    </div>
  );
}

export default PlylistCart;
