import { useEffect, useState } from "react";

function useDebounce(value: string | number, delay: number) {
  const [valueDebounce, setValueDebounce] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setValueDebounce(value);
    }, delay);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return valueDebounce;
}

export default useDebounce;
