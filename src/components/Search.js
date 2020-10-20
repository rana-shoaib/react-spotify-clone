import React, { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import AlbumCart from "../components/AlbumCart";
import "../css/components/AlbumCartGrid.css";
import GenreGridContainer from "./GenreGridContainer";
import BASE_URL from "../helpers/baseUrl";

function Search({ history, match }) {
  const [{ searchQuery }] = useStateValue();
  const [{}, dispatch] = useStateValue();
  const [searchedAlbums, setSearchedAlbums] = useState([]);
  const [noSearchResults, setNoSearchResults] = useState(false);

  const getSarchResults = (param) => {
    fetch(`${BASE_URL}serach.php?query=${param}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchedAlbums(data.albums);
        if (data.albums.length > 0) {
          setNoSearchResults(false);
        } else {
          setNoSearchResults(true);
        }
        // history.push(`/search/${searchQuery.trim()}`);
      });
  };
  useEffect(() => {
    if (searchQuery.trim() != "") {
      getSarchResults(searchQuery);
    }
  }, [searchQuery]);
  useEffect(() => {
    dispatch({
      type: "SHOW_HIDE_SEARCH_BOX",
      item: true,
    });
    return () => {
      dispatch({
        type: "SHOW_HIDE_SEARCH_BOX",
        item: false,
      });
    };
  }, []);
  return (
    <div>
      <div style={{ display: searchQuery.trim() == "" ? "block" : "none" }}>
        <GenreGridContainer />
      </div>
      <h1
        className="section-hading"
        style={{
          display:
            searchedAlbums.length > 0 && searchQuery != "" ? "block" : "none",
        }}
      >
        Albums
      </h1>
      <h1
        className="section-hading"
        style={{
          display: noSearchResults && searchQuery != "" ? "block" : "none",
        }}
      >
        Nothing found agianst your searched term "{searchQuery}"
      </h1>
      <div
        id="album-cart-grid"
        style={{
          display: searchQuery.trim() == "" ? "none" : "grid",
          gridTemplateColumns: "repeat(auto-fit, 170px)",
        }}
      >
        {searchedAlbums.map(({ id, title, discription, artPath }) => {
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

export default Search;
