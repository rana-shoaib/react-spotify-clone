import React, { useState } from "react";
import "../css/components/AlbumSongConatiner.css";
import SingleSong from "./SingleSong";

function AlbumSongConatiner({ data, showSongArt, songsList }) {
  let songCount = 0;
  return (
    <div id="album-song-container">
      {data.map(({ title, artist, album, duration, id, artistId, artPath }) => {
        return (
          <SingleSong
            title={title}
            duration={duration}
            artist={artist}
            album={album}
            key={id}
            artistId={artistId}
            id={songCount++}
            songId={id}
            artPath={artPath}
            showSongArt={showSongArt}
            songList={songsList}
          />
        );
      })}
    </div>
  );
}

export default AlbumSongConatiner;
