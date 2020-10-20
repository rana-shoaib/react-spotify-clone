import React, { useState, useEffect } from "react";
import "../css/components/Hader.css";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function Hader() {
  const [{}, dispatch] = useStateValue();
  const [{ showSearchBox, albumColor, user }] = useStateValue();
  const [showAccountOptions, setShowAccountAptions] = useState(false);
  const cookies = new Cookies();
  const handleSearch = (e) => {
    dispatch({
      type: "UPDATE_SEARCH_QUERY",
      item: e.target.value.trim(),
    });
  };

  const toggelShowAccountOptions = (e) => {
    setShowAccountAptions(!showAccountOptions);
  };

  const logout = () => {
    cookies.remove("loginToken");
    dispatch({
      type: "LOGIN_STATUS",
      item: false,
    });
    dispatch({
      type: "SET_USER",
      item: {},
    });
  };

  return (
    <div id="header-container" style={{ backgroundColor: albumColor }}>
      <div id="back-and-forward-container">
        <div
          id="back-button-circle"
          onClick={() => {
            window.history.back();
          }}
        >
          <i className="fas fa-chevron-left"></i>
        </div>
        <div
          id="forward-button-circle"
          onClick={() => {
            window.history.forward();
          }}
        >
          <i className="fas fa-chevron-right"></i>
        </div>
        <div
          id="hader-search-box"
          style={{ display: showSearchBox ? "flex" : "none" }}
        >
          <i className="fas fa-search"></i>
          <input
            placeholder="search album arist or song"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div
        id="user-avatar-container"
        onClick={toggelShowAccountOptions}
        style={{ display: user.name ? "flex" : "none" }}
      >
        <img src={user.avatarPath} alt="avatar" />
        <span className="white-text">{user.name}</span>
        <i
          className={
            showAccountOptions
              ? "fas fa-caret-up white-text"
              : "fas fa-caret-down white-text"
          }
        ></i>
      </div>
      <div
        id="hader-login-button"
        style={{ display: user.name ? "none" : "block" }}
      >
        <Link to="/register">log in</Link>
      </div>
      <div
        id="account-option-continer"
        onClick={toggelShowAccountOptions}
        style={{ display: showAccountOptions ? "block" : "none" }}
      >
        <div className="menue" id="account">
          Account
        </div>
        <div className="menue" id="profile">
          Profile
        </div>
        <div className="menue" id="logout" onClick={logout}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default Hader;
