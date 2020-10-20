import React, { useEffect } from "react";
import "../css/components/Sidebar.css";
import { NavLink, Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import BASE_URL from "../helpers/baseUrl";

function Sidebar() {
  const [{}, dispatch] = useStateValue();
  const [{ userPlaylists, user }] = useStateValue();
  const cookies = new Cookies();
  const showForm = () => {
    if (user.name) {
      dispatch({
        type: "SHOW_HIDE_PLAYLIST_POPUP_FORM",
        item: true,
      });
    } else {
      toast.info("Login to start creating Playlists");
    }
  };

  useEffect(() => {
    fetch(`${BASE_URL}getUserPlaylists.php?token=${cookies.get("loginToken")}`)
      .then((responesen) => responesen.json())
      .then((data) => {
        dispatch({
          type: "SET_USER_PLAYLISTS",
          item: data.playlists,
        });
      });
  }, []);
  return (
    <div id="side-bar-container">
      <img
        id="side-bar-logo"
        src={require("../assets/logo/spotify-icons-logos/logos/O1_RGB/O2_PNG/Spotify_Logo_RGB_White.png")}
      />
      <NavLink
        to="/"
        className="side-bar-menue"
        exact
        activeClassName="side-bar-menue-active"
      >
        <i className="fas fa-home side-bar-icons"></i>
        <p className="silvery-text">Home</p>
      </NavLink>
      <NavLink
        to="/search"
        className="side-bar-menue"
        exact
        activeClassName="side-bar-menue-active"
      >
        <i className="fas fa-search side-bar-icons"></i>
        <p className="silvery-text">Search</p>
      </NavLink>
      <p
        className="silvery-text"
        style={{ fontSize: "11px", letterSpacing: "1px", marginTop: "40px" }}
      >
        PLAYLISTS
      </p>
      <div className="side-bar-menue" onClick={showForm}>
        <div className="create-new-playlist-icon">
          <span>
            <b>+</b>
          </span>
        </div>
        <p className="silvery-text">Create Playlist</p>
      </div>
      <NavLink to="/liked" className="side-bar-menue">
        <div className="liked-song-icon">
          <i className="fas fa-heart"></i>
        </div>
        <p className="silvery-text">Liked Songs</p>
      </NavLink>
      <div className="straight-line"></div>
      <div id="user-created-palylists-container">
        {/* <p className="silvery-text">Playlist 1</p>
        <p className="silvery-text">Playlist 2</p>
        <p className="silvery-text">Playlist 3</p> */}
        {userPlaylists.map(({ id, title }) => {
          return (
            <NavLink
              to={`/playlist/${id}`}
              className="silvery-text"
              exact
              activeClassName="white-text"
            >
              <p>{title}</p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
