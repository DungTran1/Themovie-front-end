import { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "./SearchResult.module.scss";
const cx = classnames.bind(styles);
const SearchTab = ({ currentTab }: { currentTab: string }) => {
  const [currentTabParams, setCurrentTabParams] = useSearchParams();
  const [openSearchFilter, setOpenSearchFilter] = useState(true);
  return (
    <div className={cx("search", { openSearchFilter })}>
      <div className={cx("search__tab")}>
        <p>Search Results</p>
        <button onClick={() => setOpenSearchFilter((prev) => !prev)}>
          {openSearchFilter && <FiChevronDown size={20} />}
          {!openSearchFilter && <FiChevronRight size={20} />}
        </button>
      </div>
      <div>
        {[
          { title: "All", key: "multi" },
          { title: "Movie", key: "movie" },
          { title: "TV Show", key: "tv" },
        ].map((item, index) => (
          <p
            key={index}
            className={cx({
              isActive: item.key === currentTab,
            })}
            onClick={() => {
              currentTabParams.set("currentTab-search-result", item.key);
              setCurrentTabParams(currentTabParams);
            }}
          >
            {item.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SearchTab;
