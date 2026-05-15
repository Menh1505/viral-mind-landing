"use client";
import { useEffect, useRef, useState, type CSSProperties, type VideoHTMLAttributes } from "react";

type Source = { src: string; type: string };

interface LazyVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "src"> {
  src: string;
  sources?: Source[];
  /** Load when near viewport (default). Use eager for above-the-fold hero. */
  eager?: boolean;
  rootMargin?: string;
  pauseWhenHidden?: boolean;
  wrapperStyle?: CSSProperties;
}

export default function LazyVideo({
  src,
  sources,
  eager = false,
  rootMargin = "300px",
  pauseWhenHidden = true,
  className = "",
  style,
  wrapperStyle,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  ...rest
}: LazyVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!eager) return;
    const start = () => setShouldLoad(true);
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(start, { timeout: 300 });
      return () => cancelIdleCallback(id);
    }
    const id = requestAnimationFrame(start);
    return () => cancelAnimationFrame(id);
  }, [eager]);

  useEffect(() => {
    if (eager) return;
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
        } else if (pauseWhenHidden) {
          videoRef.current?.pause();
        }
      },
      { rootMargin, threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, rootMargin, pauseWhenHidden]);

  useEffect(() => {
    setReady(false);
    const video = videoRef.current;
    if (shouldLoad && video) video.load();
  }, [src, shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!shouldLoad || !video) return;

    const onReady = () => {
      setReady(true);
      if (autoPlay) void video.play().catch(() => {});
    };

    video.addEventListener("canplay", onReady);
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) onReady();

    return () => video.removeEventListener("canplay", onReady);
  }, [shouldLoad, src, autoPlay]);

  return (
    <div ref={rootRef} className="absolute inset-0" style={wrapperStyle} aria-hidden>
      <div className="absolute inset-0 bg-[#05050a]" />
      <video
        ref={videoRef}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload={shouldLoad ? "metadata" : "none"}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
          ready ? "opacity-100" : "opacity-0"
        } ${className}`}
        style={style}
        {...rest}
      >
        {shouldLoad &&
          (sources?.length
            ? sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)
            : <source src={src} type="video/mp4" />)}
      </video>
    </div>
  );
}
