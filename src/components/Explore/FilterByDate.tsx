import { useSearchParams } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "./MenuItem.module.scss";
const cx = classnames.bind(styles);
const FilterByDate = () => {
  const [dateParam, setDateParam] = useSearchParams();
  const handleFilterByDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "from") {
      dateParam.set("from", e.target.value);
      setDateParam(dateParam);
    } else {
      dateParam.set("to", e.target.value);
      setDateParam(dateParam);
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
          onChange={handleFilterByDate}
        />
      </div>
      <div className={cx("date__picker")}>
        <label htmlFor="to">From</label>
        <input type="date" id="to" name="to" onChange={handleFilterByDate} />
      </div>
    </div>
  );
};

export default FilterByDate;
