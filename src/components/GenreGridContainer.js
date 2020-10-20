import React from "react";
import GenreCart from "./GenreCart";
import "../css/components/GenreGridContainer.css";
import genreList from "../helpers/genreList";

function GenreGridContainer() {
  return (
    <div id="genre-grid-container">
      {genreList.map(({ title, img, bgColor }) => {
        return (
          <GenreCart title={title} img={img} bgColor={bgColor} key={title} />
        );
      })}
    </div>
  );
}

export default GenreGridContainer;
