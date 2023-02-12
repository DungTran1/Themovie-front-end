import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { DetailMovie, DetailTV, FilmInfo } from "../../shared/types";

import { useMediaQuery } from "react-responsive";
import apiConfig from "../../service/apiConfig";

import { MdStarRate, MdOutlineStarRate } from "react-icons/md";

import ReadMore from "../Common/ReadMore";
import { Rating } from "react-simple-star-rating";

import classnames from "classnames/bind";
import styles from "./FilmDetail.module.scss";

const cx = classnames.bind(styles);

const TabInfo: React.FC<FilmInfo> = ({ detail, ...others }) => {
  const isMobile = useMediaQuery({ query: "(max-width:46.25em)" });

  return (
    <Tabs className={`${cx("middle__col")} l-5 md-5 sm-12`}>
      <TabList className={cx("change")}>
        <Tab className={cx("overall")}>Overall</Tab>
        <Tab className={cx("cast")}>Cast</Tab>
        <Tab className={cx("review")}>Reviews</Tab>
        {isMobile && <Tab className={cx("season")}>Seasons</Tab>}
      </TabList>

      <TabPanel className={cx("overall__item")}>
        <h3>
          <i>{detail?.tagline}</i>
        </h3>
        <div className={cx("story")}>
          <h4>Story</h4>
          <ReadMore textLimit={100}>{detail?.overview}</ReadMore>
        </div>
        <div className={cx("detail")}>
          <h4>Detail</h4>
          <p>Status:{detail?.status}</p>
          <p>
            Release Date:
            {(detail as DetailMovie)?.release_date ||
              (detail as DetailTV)?.last_air_date}
          </p>
          <p></p>
        </div>
      </TabPanel>

      <TabPanel className={cx("cast__item")}>
        <div className={cx("scroll")}>
          {others?.credits?.map((item: any, index) => {
            return (
              <div key={index} className={cx("celeb")}>
                <img src={apiConfig.w500Image(item.profile_path)} alt="" />

                <div className={cx("")}>
                  <h4 className={cx("name")}>{item.original_name}</h4>
                  <h4 className={cx("character")}>as {item.character}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </TabPanel>
      {others.reviews && (
        <TabPanel className={cx("review__item")}>
          <div className={cx("scroll")}>
            {others?.reviews?.map((item, index) => {
              return (
                <div key={index} className={cx("celeb")}>
                  <img
                    src={apiConfig.w500Image(item.author_details.avatar_path)}
                    alt="Avatar"
                  />

                  <div className={cx("review__info")}>
                    <div className={cx("info")}>
                      <h4 className={cx("name")}>{item.author}</h4>
                      <Rating
                        iconsCount={10}
                        initialValue={item.author_details.rating}
                        emptyIcon={<MdOutlineStarRate />}
                        fillIcon={<MdStarRate />}
                        readonly={true}
                      />
                    </div>
                    <div className={cx("comment")}>{item.content}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabPanel>
      )}
      {isMobile && <TabPanel>season</TabPanel>}
    </Tabs>
  );
};

export default TabInfo;
