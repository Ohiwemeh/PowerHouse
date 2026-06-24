"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { createClient } from "@/lib/supabase";

type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  media_type: "image" | "video";
  url: string;
  category: string;
  featured: boolean;
  published_at: string;
};

const categories = ["General", "Events", "Workshops", "Advocacy", "Community"];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "General",
    featured: false,
    media_type: "image" as "image" | "video",
  });
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (k: string, v: string | boolean) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  async function loadItems() {
    const supabase = createClient();
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("published_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  function handleFileSelect(file: File) {
    setSelectedFile(file);
    const isVideo = file.type.startsWith("video/");
    set("media_type", isVideo ? "video" : "image");
    if (!isVideo) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }
    if (!form.title.trim()) {
      setError("Please enter a title.");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    const supabase = createClient();
    const ext = selectedFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, selectedFile, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      setError("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    const { error: insertError } = await supabase.from("gallery").insert({
      title: form.title,
      description: form.description || null,
      category: form.category,
      featured: form.featured,
      media_type: form.media_type,
      url: urlData.publicUrl,
    });

    if (insertError) {
      setError("Failed to save record: " + insertError.message);
      setUploading(false);
      return;
    }

    setSuccess("Uploaded successfully!");
    setForm({ title: "", description: "", category: "General", featured: false, media_type: "image" });
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    await loadItems();
    setUploading(false);
    setTimeout(() => setSuccess(""), 4000);
  }

  async function handleDelete(item: GalleryItem) {
    if (!confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    setDeleting(item.id);

    const supabase = createClient();
    const fileName = item.url.split("/").pop();

    if (fileName) {
      await supabase.storage.from("gallery").remove([fileName]);
    }

    await supabase.from("gallery").delete().eq("id", item.id);
    await loadItems();
    setDeleting(null);
  }

  async function toggleFeatured(item: GalleryItem) {
    const supabase = createClient();
    await supabase
      .from("gallery")
      .update({ featured: !item.featured })
      .eq("id", item.id);
    await loadItems();
  }

  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);

  const counts: Record<string, number> = { All: items.length };
  categories.forEach((c) => {
    counts[c] = items.filter((i) => i.category === c).length;
  });

  return (
    <div className="px-5 py-8 sm:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-extrabold text-navy">Gallery Manager</h1>
        <p className="mt-1 text-sm text-navy/55">
          Upload photos and videos. Featured items appear on the homepage.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
        {/* Upload form */}
        <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm lg:sticky lg:top-8 lg:self-start">
          <h2 className="font-heading text-base font-bold text-navy mb-5">Upload New Media</h2>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 flex items-center gap-2"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {success}
            </motion.div>
          )}

          <form onSubmit={handleUpload} className="space-y-4">
            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
                dragOver
                  ? "border-brand bg-brand/5"
                  : selectedFile
                  ? "border-green-300 bg-green-50"
                  : "border-navy/15 hover:border-brand/40 hover:bg-mist"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
              />

              {preview ? (
                <div className="w-full">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={400}
                    height={200}
                    className="mx-auto max-h-40 w-full rounded-xl object-cover"
                  />
                  <p className="mt-2 text-xs text-green-700 font-semibold">
                    {selectedFile?.name}
                  </p>
                </div>
              ) : selectedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs text-green-700 font-semibold">{selectedFile.name}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <svg className="h-10 w-10 text-navy/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-medium text-navy/50">
                    Drag & drop or click to select
                  </p>
                  <p className="text-xs text-navy/30">Images and videos supported</p>
                </div>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/70">
                Title
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Tax Reform Workshop Lagos"
                className="w-full rounded-xl border border-navy/15 bg-mist px-4 py-3 text-sm text-navy placeholder:text-navy/35 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/70">
                Description (optional)
              </label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Brief description of this photo or video..."
                className="w-full rounded-xl border border-navy/15 bg-mist px-4 py-3 text-sm text-navy placeholder:text-navy/35 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/70">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className="w-full rounded-xl border border-navy/15 bg-mist px-4 py-3 text-sm text-navy focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2.5 cursor-pointer rounded-xl border border-navy/15 bg-mist px-4 py-3">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => set("featured", e.target.checked)}
                    className="h-4 w-4 rounded accent-brand"
                  />
                  <span className="text-sm font-medium text-navy">Featured</span>
                </label>
                <p className="mt-1 text-[10px] text-navy/40 px-1">Shows on homepage</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="w-full rounded-full bg-navy py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy/90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Uploading...
                </span>
              ) : (
                "Upload to Gallery"
              )}
            </button>
          </form>
        </div>

        {/* Gallery grid */}
        <div>
          {/* Filter tabs */}
          <div className="mb-5 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  filter === cat
                    ? "bg-navy text-white"
                    : "bg-white border border-navy/15 text-navy/60 hover:border-navy/30 hover:text-navy"
                }`}
              >
                {cat}
                {(counts[cat] ?? 0) > 0 && (
                  <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    filter === cat ? "bg-white/20 text-white" : "bg-navy/8 text-navy/40"
                  }`}>
                    {counts[cat]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 rounded-full border-2 border-navy/20 border-t-brand animate-spin" />
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-navy/10 bg-white text-center">
              <p className="font-heading text-sm font-bold text-navy/40">No media yet</p>
              <p className="mt-1 text-xs text-navy/30">Upload your first photo or video using the form.</p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <motion.div layout className="grid gap-4 sm:grid-cols-2">
              <AnimatePresence>
                {filtered.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm"
                  >
                    <div className="relative h-44 bg-mist">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                      />
                      {item.media_type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow">
                            <svg className="h-4 w-4 text-navy ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      {item.featured && (
                        <div className="absolute top-2 left-2">
                          <span className="rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-bold text-navy">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-heading text-sm font-bold text-navy truncate">
                            {item.title}
                          </p>
                          {item.description && (
                            <p className="text-xs text-navy/50 mt-0.5 line-clamp-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <span className="shrink-0 rounded-full bg-mist px-2.5 py-0.5 text-[10px] font-semibold text-navy/50">
                          {item.category}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleFeatured(item)}
                          className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                            item.featured
                              ? "bg-brand/15 text-brand-600 hover:bg-brand/25"
                              : "bg-mist text-navy/50 hover:bg-navy/8 hover:text-navy"
                          }`}
                        >
                          {item.featured ? "Unfeature" : "Set Featured"}
                        </button>
                        <button
                          type="button"
                          disabled={deleting === item.id}
                          onClick={() => handleDelete(item)}
                          className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                        >
                          {deleting === item.id ? (
                            <span className="flex items-center gap-1">
                              <span className="h-3 w-3 rounded-full border border-red-400 border-t-transparent animate-spin" />
                              Deleting
                            </span>
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}