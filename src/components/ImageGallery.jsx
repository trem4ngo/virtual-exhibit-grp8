import { useState, useEffect, useCallback } from "react";

/**
 * ImageGallery — single-photo scrolling gallery
 *
 * Props:
 *   photos  {Array}   Required. Array of photo objects (see shape below).
 *
 * Photo object shape:
 *   {
 *     id:     number | string   — unique key
 *     title:  string            — caption title
 *     author: string
 *     year:   number | string   — year taken
 *     img:    string            — image URL
 *   }
 *
 * Usage:
 *   <ImageGallery photos={myPhotos} />
 */

export default function ImageGallery({ photos = [] }) {
  const [current, setCurrent] = useState(0);

  const total = photos.length;

  const go = useCallback(
    (dir) => {
      setCurrent((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  const goTo = (i) => setCurrent(Math.max(0, Math.min(total - 1, i)));

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  if (!total) {
    return (
      <div style={styles.empty}>Error: No photos included</div>
    );
  }

  const photo = photos[current];

  return (
    <div style={styles.root}>
      {/* Stage */}
      <div style={styles.stage}>
        {/* Slide strip */}
        <div
          style={{
            ...styles.strip,
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {photos.map((p) => (
            <div key={p.id} style={styles.slide}>
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.imgLink}
                  aria-label={`Visit the ${p.title} website`}
                >
                  <img src={p.img} alt={p.title} style={styles.img} loading="lazy" />
                </a>
              ) : (
                <img src={p.img} alt={p.title} style={styles.img} loading="lazy" />
              )}
            </div>
          ))}
        </div>

        {/* Nav buttons */}
        <button
          style={{ ...styles.navBtn, left: 12 }}
          onClick={() => go(-1)}
          aria-label="Previous photo"
        >
          ‹
        </button>
        <button
          style={{ ...styles.navBtn, right: 12 }}
          onClick={() => go(1)}
          aria-label="Next photo"
        >
          ›
        </button>

        {/* Counter */}
        <span style={styles.counter}>
          {current + 1} / {total}
        </span>

      </div>

      {/* Caption */}
      <div style={styles.caption}>
        <div>
          <div style={styles.captionTitle}>{photo.title}</div>
          {photo.tagline && (
            <div style={styles.captionTagline}>{photo.tagline}</div>
          )}
          <div style={styles.captionMeta}>
            {photo.author} / {photo.year}
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div style={styles.dots}>
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
            style={{
              ...styles.dot,
              background: i === current ? "#111" : "#ccc",
              transform: i === current ? "scale(1.4)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    fontFamily: "sans-serif",
    maxWidth: 800,
    margin: "0 auto",
  },
  stage: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    background: "#f1efe8",
    aspectRatio: "16 / 10",
    width: "100%",
  },
  strip: {
    display: "flex",
    height: "100%",
    transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
  },
  slide: {
    minWidth: "100%",
    height: "100%",
    flexShrink: 0,
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  imgLink: {
    display: "block",
    width: "100%",
    height: "100%",
  },
  navBtn: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.35)",
    background: "rgba(0,0,0,0.35)",
    color: "#fff",
    cursor: "pointer",
    fontSize: 24,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    transition: "background 0.15s, opacity 0.15s",
  },
  counter: {
    position: "absolute",
    bottom: 12,
    right: 14,
    fontSize: 12,
    fontWeight: 500,
    color: "#fff",
    background: "rgba(0,0,0,0.45)",
    padding: "3px 10px",
    borderRadius: 999,
  },
  caption: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  captionTitle: {
    fontSize: 16,
    fontWeight: 500,
    color: "#111",
    marginBottom: 2,
  },
  captionTagline: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#444",
    marginBottom: 4,
  },
  captionMeta: {
    fontSize: 13,
    color: "#666",
  },
  dots: {
    display: "flex",
    gap: 6,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    border: "none",
    padding: 0,
    cursor: "pointer",
    transition: "background 0.2s, transform 0.2s",
  },
  empty: {
    textAlign: "center",
    padding: "3rem",
    color: "#888",
    fontSize: 14,
  },
};
