import { Link } from "react-router-dom";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import classnames from "classnames/bind";
import styles from "./SearchResult.module.scss";
const cx = classnames.bind(styles);

interface PaginationProps {
  currentPage: number;
  onChangePage: (page: number) => string;
  maxPage: number;
}
const SearchPagin: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
  maxPage,
}) => {
  return (
    <div className={cx("pagin")}>
      <div>
        {currentPage > 1 && (
          <Link to={onChangePage(currentPage - 1)}>
            <MdArrowBackIos size={25} />
          </Link>
        )}

        {currentPage < 5 ? (
          <>
            {new Array(maxPage < 5 ? maxPage : 5).fill("").map((_, index) => (
              <Link
                key={index}
                to={onChangePage(index + 1)}
                className={cx(currentPage === index + 1 && "currentTab")}
              >
                <div>
                  <p>{index + 1}</p>
                </div>
              </Link>
            ))}
            {maxPage > 5 && (
              <>
                {maxPage > 6 && <span>...</span>}
                <Link
                  to={onChangePage(maxPage)}
                  className={cx(currentPage === maxPage && "currentTab")}
                >
                  <div>
                    <p>{maxPage}</p>
                  </div>
                </Link>
              </>
            )}
          </>
        ) : currentPage > maxPage - 4 ? (
          <>
            <Link
              to={onChangePage(1)}
              className={cx(currentPage === 1 && "currentTab")}
            >
              <p> 1</p>
            </Link>
            <span>. . .</span>
            {[...new Array(5)].map((_, index) => (
              <Link
                key={index}
                to={onChangePage(maxPage - 4 + index)}
                className={cx(
                  currentPage === maxPage - 4 + index && "currentTab"
                )}
              >
                <p> {maxPage - 4 + index}</p>
              </Link>
            ))}
          </>
        ) : (
          <>
            <Link
              to={onChangePage(1)}
              className={cx(currentPage === 1 && "currentTab")}
            >
              <div>
                <p>1</p>
              </div>
            </Link>
            <span>...</span>
            {new Array(5).fill("").map((_, index) => (
              <Link
                key={index}
                to={onChangePage(currentPage - 2 + index)}
                className={cx(
                  currentPage === currentPage - 2 + index && "currentTab"
                )}
              >
                <p> {currentPage - 2 + index}</p>
              </Link>
            ))}
            <span>...</span>
            <Link
              to={onChangePage(maxPage)}
              className={cx(currentPage === maxPage && "currentTab")}
            >
              <p>{maxPage}</p>
            </Link>
          </>
        )}

        {currentPage < maxPage && (
          <Link to={onChangePage(currentPage + 1)}>
            <MdArrowForwardIos size={25} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SearchPagin;
