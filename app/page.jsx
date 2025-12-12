import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Upload Video ke Supabase</h1>
      <p>Website sudah aktif!</p>

      <Link href="/upload">
        <button style={{ marginTop: 20, padding: "10px 20px" }}>
          Upload Video
        </button>
      </Link>
    </div>
  );
}
