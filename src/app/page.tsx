"use client";

import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.10.38/build/spline-viewer.js"
        ></script>
      </Head>

      <div className="relative min-h-screen">
        {/* Spline Viewer background */}
        <div className="absolute inset-0 z-0">
          <spline-viewer
            url="https://prod.spline.design/bBuOujbqXB6e04L1/scene.splinecode"
            style={{ width: "100%", height: "100%", position: "absolute" }}
          />
        </div>

        {/* Your actual homepage content */}
        <main className="relative z-10 p-8 text-white">
          <h1 className="text-4xl font-bold">Your Career Journey Starts Here</h1>
          <p className="mt-2 text-lg">Find hackathons. Build. Connect.</p>
        </main>
      </div>
    </>
  );
}
