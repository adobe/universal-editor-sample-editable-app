import React, { useEffect, useRef, createContext, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import createAnimationTimeline from "../utils/timeline";
ScrollTrigger.defaults({ toggleActions: "play reverse play reverse" });
gsap.defaults({ ease: "power1.inOut" });
gsap.registerPlugin(ScrollTrigger);

export const TimelineProvider = createContext(null);

export const TimelineAnimationWrapper = ({ children }) => {
  const [debugAnim, setDebugAnim] = useState(null);
  const ref = useRef();
  const q = gsap.utils.selector(ref);

  const createTimeline = (timelineArray, timelineSettings, runOnEnd) => {
    createAnimationTimeline(gsap, q, timelineArray, timelineSettings, runOnEnd, debugAnim);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const debugAnimQuery = urlParams.get("debugAnim");
    if (debugAnimQuery === "instant") setDebugAnim("instant");
    // Refresh ScrollTrigger when page switches, fixes snap positions staying through pages
    window.onload = () => ScrollTrigger.refresh();
  }, []);

  return (
    <div className="gsapAnimationsWrapper" ref={ref}>
      <TimelineProvider.Provider value={createTimeline}>{children}</TimelineProvider.Provider>
    </div>
  );
};
