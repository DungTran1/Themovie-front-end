import ExploreFilter from "../../components/Explore/ExploreFilter";

import classnames from "classnames/bind";
import styles from "../../components/Explore/MenuItem.module.scss";
const cx = classnames.bind(styles);

function MenuItem() {
  return (
    <div className={cx("menu")}>
      <ExploreFilter />
    </div>
  );
}

export default MenuItem;
