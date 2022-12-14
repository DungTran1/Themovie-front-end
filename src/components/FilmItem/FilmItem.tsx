import { Link } from "react-router-dom";
import apiConfig from "../../service/apiConfig";
import StarIcon from "@mui/icons-material/Star";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import classnames from "classnames/bind";
import styles from "./FilmItem.module.scss";
import { singleUrl } from "../../config/routes";
import { Item, ItemsPage } from "../../shared/types";

const cx = classnames.bind(styles);
interface Props {
  itemPage: any;
  loading: boolean;
}
const FilmItem: React.FC<Props> = ({ itemPage, loading }) => {
  return (
    <Link
      to={
        singleUrl[itemPage.media_type as keyof typeof singleUrl] +
          "/" +
          itemPage?.id || "null"
      }
    >
      <div className={cx("movie__card")}>
        <div className={cx("card__img")}>
          {(loading && (
            <Skeleton
              height="100%"
              width="100%"
              borderRadius="1rem"
              baseColor="transparent"
            />
          )) || (
            <LazyLoadImage
              src={apiConfig.w500Image(itemPage?.poster_path)}
              effect="blur"
              alt=""
            />
          )}

          {!loading && <h2>{itemPage?.original_title}</h2>}
        </div>
        {!loading && (
          <div className={cx("vote__averge")}>
            <span> {itemPage?.vote_average}</span>

            <StarIcon />
          </div>
        )}
      </div>
    </Link>
  );
};

export default FilmItem;
