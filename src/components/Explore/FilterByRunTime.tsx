import { useState, useEffect } from "react";
import useDebounce from "../../hooks";
import { useSearchParams } from "react-router-dom";
import { Slider } from "@mui/material";

import classnames from "classnames/bind";
import styles from "./MenuItem.module.scss";
const cx = classnames.bind(styles);

const FilterByRunTime = () => {
  const [params, setParams] = useSearchParams();
  const [runtime, setRunTime] = useState<number>(0);
  const debounce = useDebounce(runtime, 600);
  useEffect(() => {
    if (debounce === 0) {
      params.delete("runtime");
      setParams(params);
    } else {
      params.set("runtime", `${debounce}`);
      setParams(params);
    }
  }, [debounce]);
  const handleTime = (e: Event) => {
    console.log(e);
    setRunTime(Number((e as any).target.value));
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
        <Slider
          onChange={handleTime}
          aria-label="Temperature"
          defaultValue={0}
          // getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={10}
          max={180}
        />
      </div>
    </div>
  );
};

export default FilterByRunTime;
