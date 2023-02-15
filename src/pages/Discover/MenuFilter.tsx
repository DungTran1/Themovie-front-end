import DiscoverFilter from "../../components/Discover/DiscoverFilter";

import classnames from "classnames/bind";
import styles from "../../components/Discover/MenuFilter.module.scss";
const cx = classnames.bind(styles);
interface MenuFilterProps {
  media: string;
}
const MenuFilter: React.FC<MenuFilterProps> = ({ media }) => {
  return (
    <div className={cx("menu")}>
      <div className="">
        <DiscoverFilter media={media} />
      </div>
    </div>
  );
};

export default MenuFilter;
