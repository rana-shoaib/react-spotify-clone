import React, { useEffect, useState } from "react";
import AlbumHader from "./AlbumHader";
import AlbumSongConatiner from "./AlbumSongConatiner";
import { useStateValue } from "../StateProvider";
import Cookies from "universal-cookie";
import BASE_URL from "../helpers/baseUrl";

function Liked({ match }) {
  const [song, setSong] = useState([]);
  const [{}, dispatch] = useStateValue();
  const [{ playlist, user, currentPlayingAlbumId }] = useStateValue();
  const cookies = new Cookies();

  useEffect(() => {
    fetch(`${BASE_URL}getLikedSongs.php?token=${cookies.get("loginToken")}`)
      .then((respone) => respone.json())
      .then((data) => {
        setSong(data.songs);
        dispatch({
          type: "SET_TEMP_ALBUM_ID",
          item: 87,
        });

        dispatch({
          type: "SET_ALBUM_COLOR",
          item: "#393260",
        });

        dispatch({
          type: "SET_TEMP_PALYLIST",
          item: data.songs,
        });
      });

    return () => {
      dispatch({
        type: "SET_ALBUM_COLOR",
        item: "#121212",
      });

      dispatch({
        type: "SET_TEMP_ALBUM_ID",
        item: currentPlayingAlbumId,
      });
    };
  }, []);
  return (
    <div>
      <AlbumHader
        title="Liked Songs"
        artist={user.name ? user.name : ""}
        img="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
        songsList={song}
        albumId={87}
        type="playlist"
        showLikeButton={false}
        showOptionsButton={false}
        showNumOfLikes={false}
      />
      <AlbumSongConatiner data={song} songsList={song} />
    </div>
  );
}

export default Liked;
