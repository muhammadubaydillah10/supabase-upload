"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function UploadPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [video, setVideo] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!video) {
      alert("Pilih video dulu");
      return;
    }

    setLoading(true);
    setStatus("Mengupload video...");

    const fileName = `${Date.now()}-${video.name}`;

    // Upload ke Supabase Storage
    const { data, error } = await supabase.storage
      .from("videos")
      .upload(fileName, video);

    if (error) {
      setStatus("Gagal upload");
      setLoading(false);
      return;
    }

    // Simpan metadata ke table
    await supabase.from("videos").insert({
      title: title,
      description: desc,
      file_path: fileName,
      status: "pending",
    });

    setStatus("Berhasil upload!");
    setLoading(false);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Upload Video</h1>

      <input
        type="text"
        placeholder="Judul video"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <textarea
        placeholder="Deskripsi"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
        style={{ display: "block", marginBottom: 10 }}
      />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Mengupload..." : "Upload"}
      </button>

      <p>{status}</p>
    </div>
  );
}
