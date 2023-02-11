import React from "react";

import { Link } from "react-router-dom";

import apiConfig from "../../service/apiConfig";

import { Item } from "../../shared/types";

import { MdMoreVert } from "react-icons/md";

import styles from "./FilmSuggestion.module.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);

interface RightbarFilmsProps {
  films: Item[] | undefined;
  type: string;
  limitNumber?: number;
  isLoading: boolean;
  className?: string;
}
const FilmSuggestion: React.FC<RightbarFilmsProps> = ({
  films,
  type,
  limitNumber,
  isLoading,
  className = "",
}) => {
  return (
    <>
      <div className={`${cx("menu")}`}>
        <div className={cx("type")}>
          <h3>{type}</h3>
          <MdMoreVert />
        </div>
        <div className="row ">
          {(films as Item[])?.slice(0, limitNumber).map((item: Item) => {
            return (
              <Link
                key={item.id}
                to={"/" + item.media_type + "/" + item.id}
                className={`${cx("wrapper")} l-12 md-4 sm-6`}
              >
                <div className={cx("img")}>
                  <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
                <div className={cx("info")}>
                  <h3>{item.original_title || item.name}</h3>
                  <h4>{item.release_date || item.first_air_date}</h4>
                  <button>{item.vote_average.toFixed(1)}</button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Link to="/discover">
        <div className={`${cx("seeing__more")} l-o-3 md-o-3 sm-o-3`}>
          See More
        </div>
      </Link>
    </>
  );
};
export default FilmSuggestion;
