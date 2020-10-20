import React, { useEffect, useState } from "react";
import AlbumCart from "./AlbumCart";
import "../css/components/AlbumCartGrid.css";
import BASE_URL from "../helpers/baseUrl";

function HomeGrid() {
  const [apiData, setapiData] = useState([]);
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}api.php`)
      .then((response) => response.json())
      .then((data) => {
        setapiData(data.albums);
        setArtists(data.artists);
      });
  }, []);
  return (
    <>
      <h1 className="section-hading" style={{ marginTop: "20px" }}>
        Most Popular Albums
      </h1>
      <div id="album-cart-grid">
        {apiData.map(({ id, title, discription, artPath }) => {
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
      <h1 className="section-hading">Popular Artists</h1>

      <div id="album-cart-grid">
        {artists.map(({ id, name, img }) => {
          return (
            <AlbumCart
              title={name}
              img={img}
              discription="Artist"
              key={id}
              id={id}
              isArtist={true}
            />
          );
        })}
      </div>
    </>
  );
}

export default HomeGrid;
