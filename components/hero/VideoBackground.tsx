"use client";

import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force muted state immediately to ensure autoplay works
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    // Set attributes for mobile compatibility
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const attemptPlay = async () => {
      if (!video) return;

      try {
        video.muted = true;
        if (video.paused) {
          await video.play();
        }
      } catch {
        // Retry after a delay
        setTimeout(attemptPlay, 300);
      }
    };

    const handleLoadedData = () => attemptPlay();
    const handleCanPlay = () => attemptPlay();
    const handleCanPlayThrough = () => attemptPlay();
    const handleLoadedMetadata = () => attemptPlay();

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Initial play attempt
    attemptPlay();

    // Multiple retry attempts
    const retries = [100, 300, 500, 1000, 2000];
    const retryTimeouts = retries.map((delay) =>
      setTimeout(attemptPlay, delay),
    );

    // Try to play on user interaction (scroll, touch, etc.)
    const handleUserInteraction = () => {
      attemptPlay();
    };

    window.addEventListener("scroll", handleUserInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("touchstart", handleUserInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("click", handleUserInteraction, {
      once: true,
      passive: true,
    });

    // Intersection Observer - play when video enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video.paused) {
            attemptPlay();
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(video);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      window.removeEventListener("scroll", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("click", handleUserInteraction);
      retryTimeouts.forEach((timeout) => clearTimeout(timeout));
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden bg-black"
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        autoPlay
        controls={false}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        {...({
          "webkit-playsinline": "true",
          "x-webkit-airplay": "deny",
          disablePictureInPicture: true,
        } as any)}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black/60 pointer-events-none" /> */}

      {/* Gradient overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black pointer-events-none" /> */}
    </div>
  );
}
