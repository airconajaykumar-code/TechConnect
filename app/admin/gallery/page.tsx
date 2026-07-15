"use client";

import { useState, useEffect, useRef } from "react";

type MediaItem = {
  id: string;
  type: "image" | "video";
  dataUrl: string;
  caption: string;
  category: string;
  createdAt: string;
};

const CATEGORIES = ["CCTV", "Broadband", "Networking", "Electrical", "Smart Home"];

function loadGallery(): MediaItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("tc_gallery");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveGallery(items: MediaItem[]) {
  localStorage.setItem("tc_gallery", JSON.stringify(items));
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadMode, setUploadMode] = useState<"image" | "video">("image");
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setItems(loadGallery());
  }, []);

  function refresh() {
    setItems(loadGallery());
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be under 5MB");
      return;
    }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      const newItem: MediaItem = {
        id: Date.now().toString(),
        type: "image",
        dataUrl,
        caption,
        category,
        createdAt: new Date().toISOString(),
      };
      const all = loadGallery();
      all.unshift(newItem);
      saveGallery(all);
      setCaption("");
      setUploading(false);
      refresh();
      if (fileRef.current) fileRef.current.value = "";
    };
    reader.readAsDataURL(file);
  }

  function handleVideoAdd() {
    if (!videoUrl.trim()) return;
    const newItem: MediaItem = {
      id: Date.now().toString(),
      type: "video",
      dataUrl: videoUrl.trim(),
      caption,
      category,
      createdAt: new Date().toISOString(),
    };
    const all = loadGallery();
    all.unshift(newItem);
    saveGallery(all);
    setCaption("");
    setVideoUrl("");
    refresh();
  }

  function deleteItem(id: string) {
    const all = loadGallery().filter((i) => i.id !== id);
    saveGallery(all);
    refresh();
  }

  function getYouTubeEmbed(url: string) {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Gallery Management</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400 dark:text-gray-500">Upload project photos and videos</p>
      </div>

      <div className="mb-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Add New Media</h2>

        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setUploadMode("image")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              uploadMode === "image"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            }`}
          >
            Upload Photo
          </button>
          <button
            onClick={() => setUploadMode("video")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              uploadMode === "video"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            }`}
          >
            Add Video Link
          </button>
        </div>

        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. 4K CCTV Installation at Ambedkar Nagar"
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {uploadMode === "image" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">Photo (max 5MB)</label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="mt-1 w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
              />
              {uploading && <p className="mt-2 text-sm text-blue-600">Uploading...</p>}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                YouTube Video URL
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100"
              />
              <button
                onClick={handleVideoAdd}
                disabled={!videoUrl.trim()}
                className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Add Video
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.length === 0 && (
          <div className="col-span-full rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-12 text-center text-gray-400 dark:text-gray-500">
            No media uploaded yet. Add your first project photo or video above.
          </div>
        )}
        {items.map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white shadow-sm dark:shadow-gray-900/50 dark:bg-gray-800">
            {item.type === "image" ? (
              <img
                src={item.dataUrl}
                alt={item.caption}
                className="h-52 w-full object-cover"
              />
            ) : (
              <div className="flex h-52 items-center justify-center bg-gray-900">
                {getYouTubeEmbed(item.dataUrl) ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeEmbed(item.dataUrl)}`}
                    className="h-full w-full"
                    allowFullScreen
                  />
                ) : (
                  <p className="text-sm text-gray-400 dark:text-gray-500">Invalid video URL</p>
                )}
              </div>
            )}
            <div className="p-4">
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                {item.category}
              </span>
              <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">{item.caption}</p>
            </div>
            <button
              onClick={() => deleteItem(item.id)}
              className="absolute right-2 top-2 rounded-lg bg-red-500 px-3 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
