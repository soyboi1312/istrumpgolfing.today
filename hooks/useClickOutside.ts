// hooks/useClickOutside.ts
import { useEffect, useRef, RefObject } from "react";

interface ClickOutsideHandler {
  (value: boolean): void;
}

/**
 * Hook to detect clicks outside a referenced element.
 * When a click outside is detected and isActive is true, calls handler(false).
 * Uses useRef for handler to avoid unnecessary re-subscriptions.
 */
const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: ClickOutsideHandler,
  isActive: boolean
) => {
  // Store handler in ref to avoid re-subscribing on every render
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!isActive) return;

    const handleClick = (event: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handlerRef.current(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, isActive]);
};

export default useClickOutside;
