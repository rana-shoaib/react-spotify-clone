import React from "react";
import "../css/components/GenreCart.css";

function GenreCart({ title = "", img, bgColor }) {
  return (
    <div id="genre-cart" style={{ backgroundColor: bgColor }}>
      <h6 id="genre-title">{title}</h6>
      <img id="genre-img" src={img} alt={title} />
    </div>
  );
}

export default GenreCart;
