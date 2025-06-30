// hooks/useViewportHeight.ts
import { useEffect } from "react";

export function useViewportHeight() {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh(); // set on load
    window.addEventListener("resize", setVh); // update on resize
    return () => window.removeEventListener("resize", setVh);
  }, []);
}
