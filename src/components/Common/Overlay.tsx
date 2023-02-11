import classnames from "classnames/bind";
import styles from "./Overlay.module.scss";

const cx = classnames.bind(styles);
const Overlay = () => {
  return <div className={cx("overlay")}></div>;
};

export default Overlay;
