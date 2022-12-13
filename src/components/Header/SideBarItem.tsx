import { NavLink } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classnames.bind(styles);
interface Props {
  icon: JSX.Element;
  title: string;
  to: string;
  shrink: boolean;
  onClick: (e: React.MouseEvent) => void;
}
const SideBarItem: React.FC<Props> = ({ icon, title, to, shrink, onClick }) => {
  return (
    <>
      <NavLink
        to={to}
        className={(nav) => {
          return cx("item__link", { active: nav.isActive });
        }}
        onClick={onClick}
      >
        {icon}
        {!shrink && <h3>{title}</h3>}
      </NavLink>
    </>
  );
};

export default SideBarItem;
