import { useEffect } from "react";

const useClickOutside = (refs, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutside = refs.every(
        (ref) =>
          ref.current &&
          ref.current.contains &&
          !ref.current.contains(event.target)
      );

      if (isOutside) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, callback]);
};

export { useClickOutside };
