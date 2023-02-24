import { createContext, useEffect, useState } from "react";
import { debounce } from "../utils";

export const WindowSizeProvider = createContext(null);

export default function ResizeListener({ children }) {
  const [size, setSize] = useState({ width: null, height: null });

  const handleResize = debounce(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, 100);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    setSize({ width: window.innerWidth, height: window.innerHeight });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // adding handleResize causes endless re-renders

  return <WindowSizeProvider.Provider value={size}>{children}</WindowSizeProvider.Provider>;
}
