import React, { useEffect, useState } from "react";
import AlbumHader from "./AlbumHader";
import AlbumSongConatiner from "./AlbumSongConatiner";
import AlbumCart from "./AlbumCart";
import { useStateValue } from "../StateProvider";
import Cookies from "universal-cookie";
import randomcolor from "randomcolor";
import BASE_URL from "../helpers/baseUrl";

function Artist({ match }) {
  const [album, setAlbum] = useState([]);
  const [song, setSong] = useState([]);
  const [artistInfo, setArtistInfo] = useState({});
  const [{}, dispatch] = useStateValue();
  const [{ playlist, user }] = useStateValue();
  const cookies = new Cookies();

  useEffect(() => {
    fetch(
      `${BASE_URL}getArtistInfo.php?id=${match.params.id}&token=${cookies.get(
        "loginToken"
      )}`
    )
      .then((respone) => respone.json())
      .then((data) => {
        setAlbum(data.albums);
        setSong(data.songs);
        setArtistInfo(data.artist);
        // dispatch({
        //   type: "SET_PLAYLIST",
        //   item: data.songs,
        // });
        dispatch({
          type: "SET_TEMP_ALBUM_ID",
          item: 99,
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
  }, []);

  useEffect(() => {
    return () => {
      dispatch({
        type: "SET_ALBUM_COLOR",
        item: "#121212",
      });
    };
  }, []);
  return (
    <div>
      <AlbumHader
        title={artistInfo.name}
        artist={artistInfo.id}
        img={artistInfo.img}
        isRoundedImg={true}
        key={artistInfo.id}
        songsList={song}
        albumId={99}
        showLikeButton={false}
        showNumOfLikes={false}
        type="artist"
      />
      <h1 className="section-hading">Songs</h1>
      <AlbumSongConatiner data={song} showSongArt={true} songsList={song} />;
      <h1 className="section-hading">Albums</h1>
      <div
        id="album-cart-grid"
        style={{ gridTemplateColumns: "repeat(auto-fit, 170px)" }}
      >
        {album.map(({ id, title, discription, artPath }) => {
          return (
            <AlbumCart
              title={title}
              img={artPath}
              discription={discription}
              key={id}
              id={id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Artist;
