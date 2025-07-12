import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Upload from "./pages/Upload";
import Playlist from "./pages/Playlist";
import { ToastProvider } from "./components/ToastProvider";

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}
