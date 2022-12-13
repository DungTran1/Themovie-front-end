import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import classnames from "classnames/bind";
import styles from "./MenuItem.module.scss";
import { useSearchParams } from "react-router-dom";
const cx = classnames.bind(styles);

const options = [
  { value: "popularity", label: "Most Popular" },
  { value: "vote_average", label: "Most Rating" },
  { value: "primary_release_date", label: "Most Recent" },
];
const SortBy: React.FC = () => {
  const [sortDrop, setSortDrop] = useState<boolean>(true);
  const [sortParam, setSortParam] = useSearchParams();
  useEffect(() => {});
  const handleChangeOption = (
    e: SingleValue<{
      value: string;
      label: string;
    }>
  ) => {
    sortParam.set("sort_by", e?.value as string);
    setSortParam(sortParam);
  };
  return (
    <div className={cx("sort", { active: sortDrop })}>
      <div>
        <h4 className={cx("title")}>Sort</h4>
        <div className={cx("icon")} onClick={() => setSortDrop(!sortDrop)}>
          {(sortDrop && <KeyboardArrowDownIcon />) || <NavigateNextIcon />}
        </div>
      </div>
      <hr />
      <div className={cx("sort__dropdown")}>
        <div className={cx("")}>
          <Select
            className={cx("select")}
            onChange={handleChangeOption}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};

export default SortBy;
