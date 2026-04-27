import { useEffect, useState } from "react";

// Premium automotive hero slides – using existing car images
import bmw5 from "@/assets/cars/bmw5.jpg";
import eclass from "@/assets/cars/eclass.jpg";
import q5 from "@/assets/cars/q5.jpg";
import camry from "@/assets/cars/camry.jpg";
import passat from "@/assets/cars/passat.jpg";
import hero from "@/assets/hero.jpg";

const SLIDES = [hero, eclass, bmw5, q5, camry, passat];

// Ken Burns variants – each slide gets a different slow pan/zoom direction
const KB_VARIANTS = [
  "kb-zoom-in-center",
  "kb-pan-right",
  "kb-zoom-in-left",
  "kb-pan-left",
  "kb-zoom-out-center",
  "kb-pan-right",
];

const SLIDE_DURATION = 6000; // ms each slide stays
const FADE_DURATION = 1200;  // ms crossfade

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setPrev(current);
      setFading(true);
      const next = (current + 1) % SLIDES.length;

      // After crossfade completes, clear prev
      setTimeout(() => {
        setCurrent(next);
        setPrev(null);
        setFading(false);
      }, FADE_DURATION);
    }, SLIDE_DURATION);

    return () => clearInterval(id);
  }, [current]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Previous slide – fades out */}
      {prev !== null && (
        <div
          key={`prev-${prev}`}
          className="absolute inset-0"
          style={{
            opacity: fading ? 0 : 1,
            transition: `opacity ${FADE_DURATION}ms ease-in-out`,
          }}
        >
          <img
            src={SLIDES[prev]}
            alt=""
            className={`hero-slide-img ${KB_VARIANTS[prev]}`}
          />
        </div>
      )}

      {/* Current slide – fades in */}
      <div
        key={`curr-${current}`}
        className="absolute inset-0"
        style={{
          opacity: fading ? 1 : 1,
          transition: `opacity ${FADE_DURATION}ms ease-in-out`,
        }}
      >
        <img
          src={SLIDES[current]}
          alt=""
          className={`hero-slide-img ${KB_VARIANTS[current]}`}
        />
      </div>

      {/* Layered dark overlays for text readability + cinematic mood */}
      {/* Bottom-to-top gradient – strongest at bottom where text sits */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30" />
      {/* Left-side vignette – text area is left-aligned */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      {/* Top bar dark fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
      {/* Subtle color tint – cool blue atmosphere */}
      <div className="absolute inset-0 bg-blue-950/20 mix-blend-multiply" />
    </div>
  );
}
