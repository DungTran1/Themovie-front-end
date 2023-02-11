import classnames from "classnames/bind";
import styles from "./MediaChange.module.scss";
const cx = classnames.bind(styles);
interface MediaChangeProps {
  media: string;
  setMedia: React.Dispatch<React.SetStateAction<string>>;
}
const MediaChange: React.FC<MediaChangeProps> = ({ media, setMedia }) => {
  const handleTabChange = (media: string) => {
    localStorage.setItem("currentTab", media);
    setMedia(media);
  };
  return (
    <div className={cx("change")}>
      <button
        className={cx("movie__change", { activeMedia: media === "movie" })}
        onClick={() => handleTabChange("movie")}
      >
        Movie
      </button>

      <button
        className={cx("tv__change", { activeMedia: media === "tv" })}
        onClick={() => handleTabChange("tv")}
      >
        TV
      </button>
    </div>
  );
};

export default MediaChange;
