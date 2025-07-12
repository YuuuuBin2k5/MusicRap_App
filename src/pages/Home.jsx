import React, { useState, useEffect } from "react";
import tracks from "../data/infos.json";

import MusicCard from "../components/MusicCard";
import Player from "../components/Player";
import { useToast } from "../components/ToastProvider";

export default function Home() {
  const [current, setCurrent] = useState(null);
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState(() => {
    const saved = localStorage.getItem("likedTracks");
    return saved ? JSON.parse(saved) : {};
  });
  const [playlist, setPlaylist] = useState(() => {
    const saved = localStorage.getItem("playlistTracks");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("likedTracks", JSON.stringify(liked));
  }, [liked]);
  useEffect(() => {
    localStorage.setItem("playlistTracks", JSON.stringify(playlist));
  }, [playlist]);
  useEffect(() => {
    console.log('Tracks loaded:', tracks);
  }, []);

  const handleLike = (title) => {
    setLiked((prev) => {
      const likedNow = !prev[title];
      toast.showToast(likedNow ? "Đã thích bài hát!" : "Đã bỏ thích.", likedNow ? "success" : "info");
      return { ...prev, [title]: likedNow };
    });
  };
  const handleTogglePlaylist = (title) => {
    setPlaylist((prev) => {
      const inNow = !prev[title];
      toast.showToast(inNow ? "Đã thêm vào playlist!" : "Đã xóa khỏi playlist.", inNow ? "success" : "info");
      return { ...prev, [title]: inNow };
    });
  };

  // Safe setCurrent: only set if audio exists, else show toast and reset
  const handleSetCurrent = (track) => {
    if (!track.audio) {
      toast.showToast("Bài hát này không có file audio hoặc dữ liệu không hợp lệ!", "error");
      setCurrent(null);
    } else {
      setCurrent(track);
    }
  };

  const filteredTracks = search
    ? tracks.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.artist.toLowerCase().includes(search.toLowerCase())
      )
    : tracks;

  const hotTracks = tracks.slice(0, 6);
  const recentTracks = tracks.slice(6, 12);

  return (
    <div className="min-h-screen flex relative">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 glass border-r border-zinc-800/50 h-full fixed left-0 top-0 z-30">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Music Rap
            </h1>
          </div>
          <nav className="space-y-2 mb-8">
            {[
              { icon: "🏠", label: "Home" },
              { icon: "🔥", label: "Hot" },
              { icon: "🕒", label: "Recent" },
              { icon: "⭐", label: "Favorites" },
              { icon: "➕", label: "Upload" },
            ].map((item, idx) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 min-h-screen relative z-10 glass p-4 md:p-8" style={{marginTop: 32}}>
        {/* Hero Section */}
        <section className="px-6 pt-10 pb-4 main-gradient rounded-2xl shadow-xl mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Welcome to Music Rap 🎧
          </h2>
          <p className="text-zinc-400 text-lg mb-6 max-w-2xl">
            Enjoy the best rap & chill tracks. Discover, search, and play your favorite music in a modern, beautiful interface.
          </p>
          <div className="flex items-center gap-3 mb-6">
            <input
              type="text"
              placeholder="Search for songs or artists..."
              className="w-full max-w-xs px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </section>
        {/* Hot Tracks */}
        <section className="px-6 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="animate-bounce text-3xl md:text-4xl drop-shadow-glow">🔥</span>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-wide drop-shadow-lg uppercase text-white" style={{textShadow:'0 2px 16px #ff4f9a,0 1px 0 #000'}}>Hot Tracks</h3>
            <span className="ml-2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 to-yellow-400 text-white shadow-lg border-2 border-white/20 animate-pulse">HOT</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 gap-y-16 w-full justify-items-center items-stretch min-h-[420px]" style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0, 1fr))'}}>
            {hotTracks.map((track, idx) => (
              <div key={track.title} className="relative flex flex-col items-center justify-center">
                <MusicCard
                  title={track.title}
                  artist={track.artist}
                  posted={track.posted}
                  artwork={track.artwork || undefined}
                  isActive={current && current.title === track.title}
                  onPlayClick={() => handleSetCurrent(track)}
                  liked={!!liked[track.title]}
                  onLike={e => { e.stopPropagation(); handleLike(track.title); }}
                  inPlaylist={!!playlist[track.title]}
                  onTogglePlaylist={e => { e.stopPropagation(); handleTogglePlaylist(track.title); }}
                  hotRank={idx + 1}
                />
              </div>
            ))}
          </div>
        </section>
        {/* Recently Played */}
        <section className="px-6 mb-10 glass rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-blue-400">🕒</span> Recently Played
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 gap-y-16 w-full justify-items-center items-stretch min-h-[420px]" style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0, 1fr))'}}>
            {recentTracks.map((track) => (
              <MusicCard
                key={track.title}
                title={track.title}
                artist={track.artist}
                posted={track.posted}
                artwork={track.artwork || undefined}
                isActive={current && current.title === track.title}
                onPlayClick={() => handleSetCurrent(track)}
                liked={!!liked[track.title]}
                onLike={e => { e.stopPropagation(); handleLike(track.title); }}
                inPlaylist={!!playlist[track.title]}
                onTogglePlaylist={e => { e.stopPropagation(); handleTogglePlaylist(track.title); }}
              />
            ))}
          </div>
        </section>
        {/* All Tracks Table */}
        <section className="px-6 mb-24 glass rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-green-400">🎼</span> All Tracks
          </h3>
          <div className="overflow-x-auto rounded-xl bg-black/40 backdrop-blur-md p-4">
            <table className="min-w-full text-left text-white">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="py-2 px-3">#</th>
                  <th className="py-2 px-3">Title</th>
                  <th className="py-2 px-3">Artist</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Play</th>
                </tr>
              </thead>
              <tbody>
                {filteredTracks.map((track, idx) => (
                  <tr
                    key={track.title + idx}
                    className={`border-b border-zinc-800 hover:bg-zinc-800/40 transition cursor-pointer ${current && current.title === track.title ? "bg-purple-900/30" : ""}`}
                    onClick={() => handleSetCurrent(track)}
                  >
                    <td className="py-2 px-3">{idx + 1}</td>
                    <td className="py-2 px-3 font-semibold">{track.title}</td>
                    <td className="py-2 px-3">{track.artist}</td>
                    <td className="py-2 px-3 text-zinc-400">{track.posted}</td>
                    <td className="py-2 px-3">
                      <button
                        className="bg-purple-600 hover:bg-purple-700 p-2 rounded-full text-white"
                        onClick={e => { e.stopPropagation(); handleSetCurrent(track); }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                      <button
                        className={`ml-2 ${liked[track.title] ? 'text-pink-500' : 'text-zinc-400'} hover:text-pink-400`}
                        onClick={e => { e.stopPropagation(); handleLike(track.title); }}
                        title="Like"
                      >
                        ♥
                      </button>
                      <button
                        className={`ml-2 ${playlist[track.title] ? 'text-green-400' : 'text-zinc-400'} hover:text-green-400`}
                        onClick={e => { e.stopPropagation(); handleTogglePlaylist(track.title); }}
                        title="Add to Playlist"
                      >
                        {playlist[track.title] ? '✔️' : '+'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Fixed Player */}
        {current && current.audio ? (
          <div className="fixed bottom-0 left-0 right-0 z-50">
            <Player
              src={(() => {
                const raw = current.audio.replace(/^data\//, "/");
                const parts = raw.split("/");
                // encode only the filename
                if (parts.length > 2) {
                  parts[2] = encodeURIComponent(parts[2]);
                  return parts.join("/");
                }
                return raw;
              })()}
              title={current.title}
              artist={current.artist}
              artwork={current.artwork}
            />
          </div>
        ) : current ? (
          (() => {
            // Log error outside of JSX
            console.error('Track data error:', current);
            return (
              <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/80 text-red-400 py-4">
                <span>Lỗi: Không thể phát bài hát này (thiếu file audio hoặc dữ liệu không hợp lệ).</span>
              </div>
            );
          })()
        ) : null}
      </main>
      {/* Decorative Backgrounds */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
