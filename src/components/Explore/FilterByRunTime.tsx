/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import useDebounce from "../../store/hooks";
import { useSearchParams } from "react-router-dom";

import classnames from "classnames/bind";
import styles from "./MenuFilter.module.scss";
const cx = classnames.bind(styles);
const MAX_RUNTIME = 200;
const GAP = 20;
const FilterByRunTime = () => {
  const [params, setParams] = useSearchParams();
  const [minRunTime, setMinRunTime] = useState<number>(0);
  const [maxRunTime, setMaxRunTime] = useState<number>(MAX_RUNTIME);
  const debounceMin = useDebounce(minRunTime, 600);
  const debounceMax = useDebounce(maxRunTime, 600);
  useEffect(() => {
    params.set("minRunTime", `${debounceMin}`);
    params.set("maxRunTime", `${debounceMax}`);
    setParams(params);
  }, [debounceMin, debounceMax]);
  const handleTime = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.name === "min-range") {
      setMinRunTime(Number(target.value));
    } else {
      if (Number(target.value) < minRunTime) {
        setMaxRunTime(minRunTime + GAP);
      } else {
        setMaxRunTime(Number(target.value));
      }
    }
  };
  return (
    <div className={cx("runtime")}>
      <h4>Runtime</h4>
      <div className={cx("distance")}>
        <div className={cx("from")}>
          <span>From 0 min</span>
        </div>
        <div className={cx("to")}>
          <span>To 180 min</span>
        </div>
      </div>
      <div className={cx("slider")}>
        <div>
          <input
            type="range"
            min="0"
            max={MAX_RUNTIME}
            step="10"
            name="min-range"
            value={minRunTime}
            onChange={handleTime}
          />
        </div>
        <div>
          <input
            type="range"
            min="0"
            max={MAX_RUNTIME}
            step="10"
            name="max-range"
            value={maxRunTime}
            onChange={handleTime}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterByRunTime;
