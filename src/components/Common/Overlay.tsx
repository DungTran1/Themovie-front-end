import classnames from "classnames/bind";
import styles from "./Overlay.module.scss";
const cx = classnames.bind(styles);

interface OverlayProps {
  handleClickOutside?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}
const Overlay: React.FC<OverlayProps> = ({ handleClickOutside }) => {
  return <div className={cx("overlay")} onClick={handleClickOutside}></div>;
};

export default Overlay;
