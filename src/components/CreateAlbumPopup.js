import React, { useState, useEffect } from "react";
import "../css/components/CreateAlbumPopup.css";
import { useStateValue } from "../StateProvider";
import createPlaylist from "../handlers/createPlaylist";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

function CreateAlbumPopup() {
  const [{}, dispatch] = useStateValue();
  const [{ showPopupPlaylistForm, userPlaylists }] = useStateValue();
  const [playlistName, setPlaylistName] = useState("");
  const cookies = new Cookies();
  useEffect(() => {
    setPlaylistName("");
  }, []);
  const closeForm = () => {
    dispatch({
      type: "SHOW_HIDE_PLAYLIST_POPUP_FORM",
      item: false,
    });
    setPlaylistName("");
  };
  const handelInputChange = (e) => {
    setPlaylistName(e.target.value);
  };
  const createPlaylist1 = async () => {
    dispatch({
      type: "SHOW_HIDE_PLAYLIST_POPUP_FORM",
      item: false,
    });
    const response = await createPlaylist({
      token: cookies.get("loginToken"),
      playlistName: playlistName,
    });

    if (response.isCreated) {
      let temp = userPlaylists;
      temp.push({
        id: response.id,
        title: response.title,
      });
      dispatch({
        type: "SET_USER_PLAYLISTS",
        item: temp,
      });
      toast.info(`Playlist ${response.title} has been created`);
    }
  };
  return (
    <div
      id="create-album-poup"
      style={{ display: showPopupPlaylistForm ? "block" : "none" }}
    >
      <div id="inner">
        <div className="close" onClick={closeForm}></div>
        <h1 className="white-text">Create new playlist</h1>
        <div id="playlist-name-input-field">
          <div id="inner-input">
            <p className="white-text">Playlist Name</p>
            <input
              type="text"
              autoComplete="false"
              placeholder="New Playlist"
              value={playlistName}
              onChange={handelInputChange}
            />
          </div>
        </div>
        <div id="button-conatiner">
          <button onClick={closeForm}>Cancel</button>
          <button onClick={createPlaylist1}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default CreateAlbumPopup;
