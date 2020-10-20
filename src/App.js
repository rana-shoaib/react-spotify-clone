import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import NowPlayingBar from "./components/NowPlayingBar";
import HomeGrid from "./components/HomeGrid";
import Hader from "./components/Hader";
import Album from "./components/Album";
import Search from "./components/Search";
import Artist from "./components/Artist";
import Register from "./Register";
import Liked from "./components/Liked";
import AddToPlaylistModel from "./components/AddToPlaylistModel";
import CreateAlbumPopup from "./components/CreateAlbumPopup";
import SongPopupOptions from "./components/SongPopupOptions";
import Playlist from "./components/Playlist";
import { Switch, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import getUserInfo from "./handlers/getUserInfo";
import { useStateValue } from "./StateProvider";
import { ToastContainer } from "react-toastify";

function App() {
  const cookies = new Cookies();
  const [{}, dispatch] = useStateValue();
  const [{ user, isLogin }] = useStateValue();
  const setUserInfo = async () => {
    const data = await getUserInfo(cookies.get("loginToken"));
    dispatch({
      type: "SET_USER",
      item: data,
    });

    dispatch({
      type: "LOGIN_STATUS",
      item: true,
    });
  };
  useEffect(() => {
    if (cookies.get("loginToken")) {
      setUserInfo();
    }
  }, [isLogin]);
  return (
    <>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route path="*">
          <Hader />
          <Sidebar />
          <NowPlayingBar />
          <CreateAlbumPopup />
          <SongPopupOptions />
          <AddToPlaylistModel />
        </Route>
      </Switch>
      <div id="main-content">
        <ToastContainer position="bottom-center" autoClose={3000} />
        <Switch>
          <Route exact path="/" component={HomeGrid} />
          <Route exact path="/album/:id" component={Album} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/search/:query" component={Search} />
          <Route exact path="/artist/:id" component={Artist} />
          <Route exact path="/liked" component={Liked} />
          <Route exact path="/playlist/:id" component={Playlist} />
        </Switch>
      </div>
    </>
  );
}

export default App;
