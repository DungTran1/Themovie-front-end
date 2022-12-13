import { useSearchParams } from "react-router-dom";
import SearchResult from "../../components/SearchResult/SearchResult";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useMediaQuery } from "react-responsive";

import classnames from "classnames/bind";
import styles from "./Search.module.scss";
const cx = classnames.bind(styles);

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMediaQuery({ query: "(max-width:420px)" });
  const query = searchParams.get("query");
  const page = Number(searchParams.get("page")) || 1;
  const currentTab = searchParams.get("currentTab-search-result") || "multi";
  return (
    <div style={{ minHeight: "667px", width: "100%" }} className={cx("search")}>
      {!query && (
        <p className={cx("title")}>
          Find your favourite movies, TV shows, people and more
        </p>
      )}
      <div className={cx({ isQuery: query, searchBox: true })}>
        <SearchBox />
      </div>
      {(query && (
        <SearchResult query={query} page={page} currentTab={currentTab} />
      )) || (
        <div className={cx("img")}>
          <img src="https://moonlight-films.vercel.app/girl.png" alt="" />
        </div>
      )}
    </div>
  );
};

export default Search;
