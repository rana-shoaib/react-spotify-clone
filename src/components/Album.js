import React, { useEffect, useState } from "react";
import AlbumHader from "./AlbumHader";
import AlbumSongConatiner from "./AlbumSongConatiner";
import { useStateValue } from "../StateProvider";
import Cookies from "universal-cookie";
import BASE_URL from "../helpers/baseUrl";

function Album({ match }) {
  const [album, setAlbum] = useState([]);
  const [song, setSong] = useState([]);
  const [{}, dispatch] = useStateValue();
  const [{ playlist, user, currentPlayingAlbumId }] = useStateValue();
  const cookies = new Cookies();

  useEffect(() => {
    fetch(
      `${BASE_URL}getAlbumInfo.php?id=${match.params.id}&token=${cookies.get(
        "loginToken"
      )}`
    )
      .then((respone) => respone.json())
      .then((data) => {
        //
        setAlbum([data.album]);
        setSong(data.songs);
        dispatch({
          type: "SET_TEMP_ALBUM_ID",
          item: data.album.id,
        });
        dispatch({
          type: "SET_TEMP_PALYLIST",
          item: data.songs,
        });
        dispatch({
          type: "SET_ALBUM_COLOR",
          item: data.album.albumColor,
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
      {album.map((album) => {
        return (
          <AlbumHader
            id={album.id}
            title={album.title}
            artist={album.artist}
            discription={album.discription}
            likes={album.likes}
            img={album.artPath}
            key={album.id}
            id={album.id}
            songsList={song}
            albumId={album.id}
            isLikedByUser={album.isLikedByUser}
            type="album"
          />
        );
      })}
      <AlbumSongConatiner data={song} songsList={song} />
    </div>
  );
}

export default Album;
