import React, { useEffect, useState } from "react";
import AlbumHader from "./AlbumHader";
import AlbumSongConatiner from "./AlbumSongConatiner";
import { useStateValue } from "../StateProvider";
import Cookies from "universal-cookie";
import randomcolor from "randomcolor";
import BASE_URL from "../helpers/baseUrl";

function Playlist(props) {
  const [album, setAlbum] = useState([]);
  const [song, setSong] = useState([]);
  const [{}, dispatch] = useStateValue();
  const [{ playlist, user, currentPlayingAlbumId }] = useStateValue();
  const cookies = new Cookies();

  useEffect(() => {
    fetch(
      `${BASE_URL}getPlaylistInfo.php?playlistId=${
        props.match.params.id
      }&token=${cookies.get("loginToken")}`
    )
      .then((respone) => respone.json())
      .then((data) => {
        setAlbum([{ id: data.id, title: data.title }]);
        setSong(data.songs);
        dispatch({
          type: "SET_TEMP_ALBUM_ID",
          item: data.id,
        });
        dispatch({
          type: "SET_TEMP_PALYLIST",
          item: data.songs,
        });
        dispatch({
          type: "SET_ALBUM_COLOR",
          item: randomcolor(),
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
  }, [props.match.params.id]);
  return (
    <div>
      {album.map((album) => {
        return (
          <AlbumHader
            title={album.title}
            artist={user.name}
            key={album.id}
            id={album.id}
            songsList={song}
            albumId={album.id}
            type="playlist"
            showLikeButton={false}
            showOptionsButton={false}
            showNumOfLikes={false}
            showAlbumArt={false}
          />
        );
      })}
      <AlbumSongConatiner data={song} songsList={song} />
    </div>
  );
}

export default Playlist;
