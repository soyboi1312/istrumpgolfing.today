// hooks/useClickOutside.ts
import { useEffect, RefObject, DependencyList } from "react";

interface ClickOutsideHandler {
  (value: boolean): void;
}

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: ClickOutsideHandler,
  dependencies: DependencyList
) => {
  useEffect(() => {
    const handleClick = (event: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(false);
      }
    };

    if (dependencies.some((dep) => dep)) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, dependencies);
};

export default useClickOutside;
