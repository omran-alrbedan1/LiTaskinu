import { RefObject, useEffect } from "react";

export function useAutoScroll<T extends HTMLElement>(
  deps: unknown[],
  endRef: RefObject<T>,
  delayMs = 120
) {
  useEffect(() => {
    const id = setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, delayMs);

    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
