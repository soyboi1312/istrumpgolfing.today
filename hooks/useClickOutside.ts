// hooks/useClickOutside.ts
import { useEffect, RefObject } from "react";

interface ClickOutsideHandler {
  (value: boolean): void;
}

/**
 * Hook to detect clicks outside a referenced element.
 * When a click outside is detected and isActive is true, calls handler(false).
 */
const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: ClickOutsideHandler,
  isActive: boolean
) => {
  useEffect(() => {
    if (!isActive) return;

    const handleClick = (event: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, handler, isActive]);
};

export default useClickOutside;
