import React, { useEffect, useState } from "react";
import MusicCard from "./MusicCard";

const MusicList = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("/data/infos.json")
      .then((res) => res.json())
      .then(setSongs)
      .catch(console.error);
  }, []);

  return (
    <div className="px-6 py-10 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {songs.map((song, idx) => (
        <MusicCard key={idx} song={song} />
      ))}
    </div>
  );
};

export default MusicList;
