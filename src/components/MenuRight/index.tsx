import classnames from "classnames/bind";
import styles from "./MenuRight.module.scss";

const cx = classnames.bind(styles);

function MenuRight({ children }: { children: JSX.Element }) {
  return (
    <div className={cx("modal__menu", "modal__menu__right")}>{children}</div>
  );
}

export default MenuRight;
