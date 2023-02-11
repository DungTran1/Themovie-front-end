import ExploreFilter from "../../components/Explore/ExploreFilter";

import classnames from "classnames/bind";
import styles from "../../components/Explore/MenuFilter.module.scss";
const cx = classnames.bind(styles);
interface MenuFilterProps {
  media: string;
}
const MenuFilter: React.FC<MenuFilterProps> = ({ media }) => {
  return (
    <div className={cx("menu")}>
      <div className="">
        <ExploreFilter media={media} />
      </div>
    </div>
  );
};

export default MenuFilter;
