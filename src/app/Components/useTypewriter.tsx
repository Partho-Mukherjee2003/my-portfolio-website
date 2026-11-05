"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Types `text` out one character at a time while `active` is true.
 * Replays from the start every time the slide becomes active again.
 * Users who prefer reduced motion get the full text immediately.
 */
export function useTypewriter(
  text: string,
  active: boolean,
  speed = 55,
  startDelay = 700,
) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const [wasActive, setWasActive] = useState(active);

  // Reset the counter whenever the slide flips between active and inactive.
  // Updating state during render like this is React's recommended pattern,
  // and it avoids the "setState inside an effect" error.
  if (wasActive !== active) {
    setWasActive(active);
    setCount(0);
  }

  useEffect(() => {
    if (!active || reduceMotion) return;

    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i); // runs inside a timer, not synchronously in the effect
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, active, reduceMotion, speed, startDelay]);

  if (!active) return "";
  if (reduceMotion) return text;
  return text.slice(0, count);
}
