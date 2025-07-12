export default function Upload() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-white">
      <h2 className="text-2xl font-bold mb-4">🎵 Upload Track</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Title" className="w-full p-2 bg-zinc-800 rounded" />
        <input type="text" placeholder="Artist" className="w-full p-2 bg-zinc-800 rounded" />
        <input type="file" accept="audio/*" className="w-full p-2 bg-zinc-800 rounded" />
        <input type="file" accept="image/*" className="w-full p-2 bg-zinc-800 rounded" />
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">Upload</button>
      </form>
    </div>
  );
}
