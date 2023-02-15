import { useSearchParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import SearchResult from "../../components/SearchResult/SearchResult";
import SearchBox from "../../components/SearchBox/SearchBox";

import classnames from "classnames/bind";
import styles from "./Search.module.scss";
const cx = classnames.bind(styles);

const Search = () => {
  const [searchParams] = useSearchParams();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width:64em)" });
  const query = searchParams.get("query");
  const page = Number(searchParams.get("page")) || 1;
  const currentTab = searchParams.get("currentTab-search-result") || "multi";
  return (
    <div className={cx("search")}>
      {!query && (
        <p className={cx("title")}>
          Find your favourite movies, TV shows, people and more
        </p>
      )}
      <div className={cx({ isQuery: query, searchBox: true })}>
        {!isTabletOrMobile && <SearchBox />}
      </div>
      {(query && (
        <SearchResult query={query} page={page} currentTab={currentTab} />
      )) || (
        <div className={cx("img")}>
          <img
            src="https://img-cdn.2game.vn/2022/02/21/baki-king-of-souls-hanh-trinh-tro-thanh-ke-manh-nhat-tai-hien-tren-mobile-2.jpg"
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default Search;
