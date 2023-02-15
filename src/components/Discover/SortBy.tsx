import { useState } from "react";

import Select, { SingleValue } from "react-select";
import { useSearchParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { MdKeyboardArrowDown, MdNavigateNext } from "react-icons/md";

import classnames from "classnames/bind";
import styles from "./MenuFilter.module.scss";
const cx = classnames.bind(styles);

const options = [
  { value: "popularity", label: "Most Popular" },
  { value: "vote_average", label: "Most Rating" },
  { value: "primary_release_date", label: "Most Recent" },
];
const SortBy: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: "520px" });
  const [sortDrop, setSortDrop] = useState<boolean>(!isMobile && true);
  const [sortParam, setSortParam] = useSearchParams();
  const handleChangeOption = (
    e: SingleValue<{
      value: string;
      label: string;
    }>
  ) => {
    sortParam.set("sort_by", e?.value as string);
    setSortParam(sortParam);
  };

  const customStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: "#49494b",
      boxShadow: "none",
      border: 0,
    }),
    option: (styles: any, { isSelected }: any) => ({
      ...styles,
      backgroundColor: isSelected ? "#989898" : "#49494b",
    }),

    singleValue: (provided: any) => {
      return { ...provided, color: "white" };
    },

    menu: (styles: any) => ({
      ...styles,
      backgroundColor: "#49494b",
    }),
  };
  return (
    <div className={cx("sort", { active: sortDrop })}>
      <div onClick={() => setSortDrop(!sortDrop)}>
        <h4 className={cx("title")}>Sort</h4>
        <div className={cx("icon")}>
          {(sortDrop && <MdKeyboardArrowDown />) || <MdNavigateNext />}
        </div>
      </div>
      <hr />
      <div className={cx("sort__dropdown")}>
        <div>
          <Select
            isSearchable={false}
            styles={customStyles}
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
