import { Link } from "react-router-dom";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import classnames from "classnames/bind";
import styles from "./SearchResult.module.scss";
interface PaginationProps {
  currentPage: number;
  onChangePage: (page: number) => string;
  maxPage: number;
}
const cx = classnames.bind(styles);
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
                className={`tw-pagination-btn ${
                  currentPage === index + 1 && "!bg-primary text-white"
                }`}
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
                  className={`tw-pagination-btn ${
                    currentPage === maxPage && "!bg-primary text-white"
                  }`}
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
              className={`tw-pagination-btn ${
                currentPage === 1 && "!bg-primary text-white"
              }`}
            >
              1
            </Link>
            <span>. . .</span>
            {[...new Array(5)].map((_, index) => (
              <Link
                key={index}
                to={onChangePage(maxPage - 4 + index)}
                className={`tw-pagination-btn ${
                  currentPage === maxPage - 4 + index &&
                  "!bg-primary text-white"
                }`}
              >
                <div>
                  <p> {maxPage - 4 + index}</p>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <>
            <Link
              to={onChangePage(1)}
              className={`tw-pagination-btn ${
                currentPage === 1 && "!bg-primary text-white"
              }`}
            >
              <div>
                {" "}
                <p>1</p>
              </div>
            </Link>
            <span>...</span>
            {new Array(5).fill("").map((_, index) => (
              <Link
                key={index}
                to={onChangePage(currentPage - 2 + index)}
                className={`tw-pagination-btn ${
                  currentPage === currentPage - 2 + index &&
                  "!bg-primary text-white"
                }`}
              >
                <div>
                  <p> {currentPage - 2 + index}</p>
                </div>
              </Link>
            ))}
            <span>...</span>
            <Link
              to={onChangePage(maxPage)}
              className={`tw-pagination-btn ${
                currentPage === maxPage && "!bg-primary text-white"
              }`}
            >
              <div>
                <p>{maxPage}</p>
              </div>
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
