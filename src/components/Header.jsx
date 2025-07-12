import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-black text-white shadow-md sticky top-0 z-50">
      <h1 className="text-2xl font-bold tracking-tight">🎧 MusicVerse</h1>
      <nav className="space-x-6 text-sm">
        <Link to="/" className="hover:text-purple-400">Home</Link>
        <Link to="/favorites" className="hover:text-purple-400">Favorites</Link>
        <Link to="/playlist" className="hover:text-purple-400">Playlist</Link>
        <Link to="/upload" className="hover:text-purple-400">Upload</Link>
      </nav>
    </header>
  );
}