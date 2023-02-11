import { useState } from "react";
import { useMediaQuery } from "react-responsive";

import { MdKeyboardArrowDown, MdNavigateNext } from "react-icons/md";

import FilterByGenre from "./FilterByGenre";
import FilterByRunTime from "./FilterByRunTime";
import FilterByDate from "./FilterByDate";

import classnames from "classnames/bind";
import styles from "./MenuFilter.module.scss";
const cx = classnames.bind(styles);
interface FilterByProps {
  media: string;
}
const FilterBy: React.FC<FilterByProps> = ({ media }) => {
  const isMobile = useMediaQuery({ maxWidth: "520px" });
  const [filterDrop, setFilterDrop] = useState<boolean>(!isMobile && true);
  return (
    <div className={cx("filter", { active: filterDrop })}>
      <div onClick={() => setFilterDrop(!filterDrop)}>
        <h4 className={cx("title")}>Filter</h4>
        <div className={cx("icon")}>
          {(filterDrop && <MdKeyboardArrowDown />) || <MdNavigateNext />}
        </div>
      </div>
      <hr />
      <div className={cx("filter__dropdown")}>
        <FilterByGenre media={media} />
        <FilterByRunTime />
        <FilterByDate />
      </div>
    </div>
  );
};

export default FilterBy;
