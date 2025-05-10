import {useEffect, useRef} from 'react';

export default function useCloseableDropdown(callback: () => void) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);

  return ref;
}
