import { useState, useEffect } from "react";
import Player from "../components/Player";
import infos from "../data/infos.json";
import MusicCard from "../components/MusicCard";

export default function Playlist() {
  const [playlist, setPlaylist] = useState(() => {
    const saved = localStorage.getItem("playlistTracks");
    return saved ? JSON.parse(saved) : {};
  });
  const [liked, setLiked] = useState(() => {
    const saved = localStorage.getItem("likedTracks");
    return saved ? JSON.parse(saved) : {};
  });
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    localStorage.setItem("playlistTracks", JSON.stringify(playlist));
  }, [playlist]);
  useEffect(() => {
    localStorage.setItem("likedTracks", JSON.stringify(liked));
  }, [liked]);

  const handleLike = (title) => {
    setLiked((prev) => ({ ...prev, [title]: !prev[title] }));
  };
  const handleTogglePlaylist = (title) => {
    setPlaylist((prev) => {
      const updated = { ...prev };
      if (updated[title]) {
        delete updated[title];
      } else {
        updated[title] = true;
      }
      return updated;
    });
  };

  const playlistTracks = infos.filter(track => playlist[track.title]);
  const currentTrack = infos.find(t => t.title === current);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-white">My Playlist</h1>
      {playlistTracks.length === 0 ? (
        <div className="text-zinc-400">Your playlist is empty.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {playlistTracks.map(track => (
            <MusicCard
              key={track.title}
              title={track.title}
              artist={track.artist}
              posted={track.posted}
              artwork={track.artwork}
              isActive={current === track.title}
              onPlayClick={() => setCurrent(track.title)}
              liked={!!liked[track.title]}
              onLike={e => { e.stopPropagation(); handleLike(track.title); }}
              inPlaylist={!!playlist[track.title]}
              onTogglePlaylist={e => { e.stopPropagation(); handleTogglePlaylist(track.title); }}
            />
          ))}
        </div>
      )}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player
            src={currentTrack.audio}
            title={currentTrack.title}
            artist={currentTrack.artist}
            artwork={currentTrack.artwork}
          />
        </div>
      )}
    </div>
  );
}
