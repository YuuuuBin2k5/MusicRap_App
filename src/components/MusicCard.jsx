import { motion } from "framer-motion";
import { Heart, Share2 } from "lucide-react";
import Player from "./Player"; // Adjust the import path as necessary

const fallbackImg = "/images/s2.png";

export default function MusicCard({ title, artist, posted, artwork, isActive, onPlayClick, liked, onLike, inPlaylist, onTogglePlaylist, current }) {
  return (
    <motion.div
      className={`glass rounded-2xl overflow-hidden shadow-2xl w-[260px] sm:w-[220px] p-4 flex flex-col items-center gap-2 border-2 ${isActive ? 'border-purple-500' : 'border-transparent'} transition-all duration-300 relative min-h-[390px] max-h-[390px] mb-12`}
      whileHover={{ scale: 1.05 }}>
      <div className="relative group flex flex-col items-center w-full pt-2">
        <div className="w-full flex justify-center">
          <img
            src={artwork || fallbackImg}
            alt={title}
            className="w-24 h-24 object-cover rounded-2xl border-4 border-purple-400 shadow-lg group-hover:scale-105 group-hover:shadow-pink-400/40 transition-all duration-300 bg-zinc-900"
            onError={e => { e.target.onerror = null; e.target.src = fallbackImg; }}
          />
        </div>
        <button
          onClick={onPlayClick}
          className="absolute top-2 right-2 bg-gradient-to-tr from-pink-500 to-purple-600 p-2 rounded-full shadow-lg shadow-purple-800/50 text-white hover:scale-110 transition-all border-2 border-white/30 z-10"
          title="Play"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center text-white mt-3 w-full">
        <h3 className="text-base font-bold text-center line-clamp-2 drop-shadow-lg w-full break-words max-h-[44px] overflow-hidden">{title}</h3>
        <p className="text-sm text-purple-200 font-medium text-center line-clamp-1 w-full break-words">{artist}</p>
        <p className="text-xs text-zinc-400 mt-1">{posted}</p>
      </div>
      <div className="flex items-center justify-center gap-4 pt-4 w-full border-t border-zinc-700 mt-auto text-lg pb-4">
        <button
          className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 text-xl ${liked ? 'bg-pink-500/20 text-pink-400' : 'hover:bg-pink-400/10 hover:text-pink-300 text-zinc-300'}`}
          onClick={onLike}
          title="Like"
        >
          <Heart className="w-5 h-5" fill={liked ? '#ec4899' : 'none'} />
        </button>
        <button
          className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 text-xl ${inPlaylist ? 'bg-green-500/20 text-green-400' : 'hover:bg-green-400/10 hover:text-green-300 text-zinc-300'}`}
          onClick={onTogglePlaylist}
          title="Add to Playlist"
        >
          {inPlaylist ? '✔️' : '+'}
        </button>
        <button
          className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-blue-400/10 hover:text-blue-300 text-zinc-300 transition-all duration-200"
          title="Share"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
      {/* Không render Player mini trong card để tránh xung đột */}
    </motion.div>
  );
}
