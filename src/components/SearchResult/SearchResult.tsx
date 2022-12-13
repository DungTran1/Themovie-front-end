import { useQuery } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { getSearchResult } from "../../service/tmdbApi/Search";
import { ItemsPage } from "../../shared/types";
import FilmItem from "../FilmItem/FilmItem";
import SearchPagin from "./SearchPagin";
import SearchTab from "./SearchTab";

import classnames from "classnames/bind";
import styles from "./SearchResult.module.scss";
import Loading from "../Loading/Loading";

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
  // const isMobile = useMediaQuery({ query: "(max-width:420px)" });
  const { data, error, isPreviousData, isLoading } = useQuery<ItemsPage, Error>(
    ["search-result", currentTab, query, page],
    () => getSearchResult(currentTab, query, page),
    {
      keepPreviousData: true,
    }
  );
  console.log(isLoading);
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
            <div className="flex flex-col items-center mb-12">
              <LazyLoadImage
                src="/error.png"
                alt=""
                effect="opacity"
                className="w-[600px]"
              />
              <p className="text-white text-3xl mt-5">There is no such films</p>
            </div>
          )}

          <div className={cx("list__film")}>
            <ul>
              {data &&
                data.results.map((item) => (
                  <li key={item.id}>
                    <FilmItem itemPage={item} loading={isLoading} />
                  </li>
                ))}
            </ul>
            <SearchTab currentTab={currentTab} />
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
