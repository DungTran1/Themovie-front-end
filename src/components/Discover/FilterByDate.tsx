import { useSearchParams } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "./MenuFilter.module.scss";
const cx = classnames.bind(styles);
const FilterByDate = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleFilterByDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "from") {
      searchParams.set("from", e.target.value);
      setSearchParams(searchParams);
    } else {
      searchParams.set("to", e.target.value);
      setSearchParams(searchParams);
    }
  };

  return (
    <div className={cx("release-date")}>
      <div className={cx("date__picker")}>
        <label htmlFor="from">From</label>
        <input
          type="date"
          id="from"
          name="from"
          value={searchParams.get("from") || "2022-01-01"}
          onChange={handleFilterByDate}
        />
      </div>
      <div className={cx("date__picker")}>
        <label htmlFor="to">To</label>
        <input
          type="date"
          id="to"
          name="to"
          value={searchParams.get("to") || "2023-03-03"}
          onChange={handleFilterByDate}
        />
      </div>
    </div>
  );
};

export default FilterByDate;
