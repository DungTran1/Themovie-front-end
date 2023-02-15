import { Link } from "react-router-dom";
import apiConfig from "../../service/apiConfig";
import { Item } from "../../shared/types";

import { AiFillStar } from "react-icons/ai";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import classnames from "classnames/bind";
import styles from "./FilmItem.module.scss";
const cx = classnames.bind(styles);

interface Props {
  children?: React.ReactNode;
  itemPage: Item;
  className?: string;
}
const FilmItem: React.FC<Props> = ({ itemPage, className, children }) => {
  const Element = children ? "div" : Link;

  return (
    <>
      <Element
        className={[className, cx("movie__card")].join(" ")}
        to={!children ? "/" + itemPage.media_type + "/" + itemPage?.id : "#"}
      >
        <div className={cx("card__img")}>
          <LazyLoadImage
            src={
              itemPage.media_type === "person"
                ? apiConfig.w500Image(itemPage.profile_path)
                : apiConfig.w500Image(itemPage.poster_path)
            }
            effect="blur"
            alt=""
          />

          {children}
          <h4>{itemPage?.title || itemPage.name}</h4>
        </div>

        <div className={cx("vote__averge")}>
          <span> {itemPage?.vote_average?.toFixed(1)}</span>

          <AiFillStar />
        </div>
      </Element>
    </>
  );
};

export default FilmItem;
