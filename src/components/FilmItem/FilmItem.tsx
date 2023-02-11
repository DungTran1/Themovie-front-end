import { Link } from "react-router-dom";
import apiConfig from "../../service/apiConfig";
import { AiFillStar } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import classnames from "classnames/bind";
import styles from "./FilmItem.module.scss";
import { Item } from "../../shared/types";

const cx = classnames.bind(styles);
interface Props {
  children?: any;
  itemPage: Item;
  isLoading: boolean;
  className?: string;
}
const FilmItem: React.FC<Props> = ({
  itemPage,
  isLoading,
  className,
  children,
}) => {
  return (
    <>
      {children && (
        <div className={[className, cx("movie__card")].join(" ")}>
          <div className={cx("card__img")}>
            {(isLoading && (
              <Skeleton
                height="180px"
                width="100%"
                borderRadius="10px"
                baseColor="grey"
              />
            )) || (
              <LazyLoadImage
                src={
                  itemPage.media_type === "person"
                    ? apiConfig.w500Image(itemPage.profile_path)
                    : apiConfig.w500Image(itemPage.poster_path)
                }
                effect="blur"
                alt=""
              />
            )}
            {children}
            {!isLoading && <h4>{itemPage?.title || itemPage.name}</h4>}
          </div>
          {!isLoading && (
            <div className={cx("vote__averge")}>
              <span> {itemPage?.vote_average.toFixed(1)}</span>

              <AiFillStar />
            </div>
          )}
        </div>
      )}
      {!children && (
        <Link
          className={[className, cx("movie__card")].join(" ")}
          to={"/" + itemPage.media_type + "/" + itemPage?.id}
        >
          {isLoading && (
            <Skeleton
              height="180px"
              width="100%"
              borderRadius="10px"
              baseColor="grey"
            />
          )}
          {!isLoading && (
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
              {!isLoading && <h4>{itemPage?.title || itemPage.name}</h4>}
            </div>
          )}
          {!isLoading && (
            <div className={cx("vote__averge")}>
              <span> {itemPage?.vote_average?.toFixed(1)}</span>

              <AiFillStar />
            </div>
          )}
        </Link>
      )}
    </>
  );
};

export default FilmItem;
