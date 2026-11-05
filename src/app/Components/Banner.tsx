"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion, MotionConfig } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-fade";

import IntroSlide from "./IntroSlide";
import SkillsSlide from "./SkillsSlide";
import ProjectsSlide from "./ProjectsSlide";

const SLIDES = [
  { label: "Introduction", Component: IntroSlide },
  { label: "Skills", Component: SkillsSlide },
  { label: "Projects", Component: ProjectsSlide },
];

const HeroBanner = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  // Real index (ignores Swiper's loop clones). Drives the slide animations and the dots.
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    // reducedMotion="user" switches off movement for users who ask for less motion
    <MotionConfig reducedMotion="user">
      <section
        aria-label="Hero"
        className="relative isolate overflow-hidden bg-[#0B0F19]"
      >
        {/* ---------- Glowing background blobs (stay put while slides change) ---------- */}
        <motion.div
          aria-hidden="true"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-24 top-0 -z-10 h-72 w-72 rounded-full bg-[#3B82F6]/25 blur-3xl sm:h-96 sm:w-96"
        />
        <motion.div
          aria-hidden="true"
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#00E5FF]/15 blur-3xl sm:h-96 sm:w-96"
        />

        {/* ---------- Slider ---------- */}
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          speed={800}
          autoplay={{
            delay: 4500, // 4.5 seconds per slide
            disableOnInteraction: false, // keep rotating after a manual click
            pauseOnMouseEnter: false,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {SLIDES.map(({ label, Component }, i) => (
            <SwiperSlide key={label}>
              <Component isActive={activeIndex === i} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ---------- Pagination dots ---------- */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1">
          {SLIDES.map(({ label }, i) => (
            <button
              key={label}
              type="button"
              onClick={() => swiperRef.current?.slideToLoop(i)}
              aria-label={`Go to slide: ${label}`}
              aria-current={activeIndex === i}
              className="group flex h-6 cursor-pointer items-center px-1  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF]"
            >
              <span
                className={`block h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "w-8 bg-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.9)]"
                    : "w-2.5 bg-[#D1D5DB]/40 group-hover:bg-[#00E5FF]"
                }`}
              />
            </button>
          ))}
        </div>
      </section>
    </MotionConfig>
  );
};

export default HeroBanner;
