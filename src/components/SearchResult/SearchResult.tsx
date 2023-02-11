import { useQuery } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { getSearchResult } from "../../service/Search";
import { ItemsPage } from "../../shared/types";
import FilmItem from "../FilmItem/FilmItem";
import SearchPagin from "./SearchPagin";
import SearchTab from "./SearchTab";

import classnames from "classnames/bind";
import styles from "./SearchResult.module.scss";
import Loading from "../Loading/Loading";
import { useMediaQuery } from "react-responsive";

const cx = classnames.bind(styles);

const SearchResult = ({
  query,
  page,
  currentTab,
}: {
  query: string;
  page: number;
  currentTab: string;
}) => {
  // const [query, setQuery] = useSearchParams();
  const isMobile = useMediaQuery({ query: "(max-width:46.25em)" });
  const { data, error, isPreviousData, isLoading } = useQuery<ItemsPage, Error>(
    ["search-result", currentTab, query, page],
    () => getSearchResult(currentTab, query, page),
    {
      keepPreviousData: true,
    }
  );
  const changePageHandler = (page: number): string => {
    if (isPreviousData) return "";
    return `/search?query=${encodeURIComponent(
      query
    )}&page=${page}&currentTab-search-result=${currentTab}`;
  };
  return (
    <>
      {(isLoading && <Loading />) || (
        <div className={cx("search__result")}>
          <p>
            Search results for "{query}" ({data?.total_results} results found)
          </p>
          {data && data.results.length === 0 && (
            <div className="">
              <LazyLoadImage src="/error.png" alt="" effect="opacity" />
              <p>There is no such films</p>
            </div>
          )}

          <div className={`${cx("list__film")} row`}>
            {isMobile && <SearchTab currentTab={currentTab} />}
            <ul className="l-9 sm-12 row">
              {data &&
                data.results.map((item) => {
                  return (
                    <li key={item.id} className="l-3 md-4 sm-6">
                      <FilmItem itemPage={item} isLoading={isLoading} />
                    </li>
                  );
                })}
            </ul>
            {!isMobile && <SearchTab currentTab={currentTab} />}
          </div>

          {data && (
            <SearchPagin
              maxPage={data.total_pages}
              currentPage={data.page}
              onChangePage={changePageHandler}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SearchResult;
