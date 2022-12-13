import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { DetailMovie, DetailTV, FilmInfo } from "../../shared/types";
import { useMediaQuery } from "react-responsive";
import apiConfig from "../../service/apiConfig";

import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import classnames from "classnames/bind";
import styles from "./FilmDetail.module.scss";
import ScrollContainer from "react-indiana-drag-scroll";
import ReadMore from "../Common/ReadMore";
const cx = classnames.bind(styles);

const TabInfo: React.FC<FilmInfo> = ({ detail, ...others }) => {
  const isMobile = useMediaQuery({ query: "(max-width:420px)" });

  return (
    <Tabs className={cx("middle__col")}>
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
        <ScrollContainer className={cx("scroll")} horizontal={false}>
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
        </ScrollContainer>
      </TabPanel>
      <TabPanel className={cx("review__item")}>
        <ScrollContainer
          className={cx("scroll")}
          horizontal={false}
          hideScrollbars={false}
        >
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
                      max={10}
                      defaultValue={item.author_details.rating}
                      precision={0.5}
                      emptyIcon={<StarBorderIcon />}
                      readOnly
                    />
                  </div>
                  <div className={cx("comment")}>{item.content}</div>
                </div>
              </div>
            );
          })}
        </ScrollContainer>
      </TabPanel>
      {isMobile && <TabPanel>season</TabPanel>}
    </Tabs>
  );
};

export default TabInfo;
