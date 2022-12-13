import { useState } from "react";
import FilterByGenre from "./FilterByGenre";
import FilterByRunTime from "./FilterByRunTime";
import FilterByDate from "./FilterByDate";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import classnames from "classnames/bind";
import styles from "./MenuItem.module.scss";
const cx = classnames.bind(styles);
const FilterBy = () => {
  const [filterDrop, setFilterDrop] = useState<boolean>(true);
  return (
    <div className={cx("filter", { active: filterDrop })}>
      <div>
        <h4 className={cx("title")}>Filter</h4>
        <div className={cx("icon")} onClick={() => setFilterDrop(!filterDrop)}>
          {(filterDrop && <KeyboardArrowDownIcon />) || <NavigateNextIcon />}
        </div>
      </div>
      <hr />
      <div className={cx("filter__dropdown")}>
        <FilterByGenre />
        <FilterByRunTime />
        <FilterByDate />
      </div>
    </div>
  );
};

export default FilterBy;
