import Debounce from "../../store/hooks";
import TippyHeadless from "@tippyjs/react/headless";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import classnames from "classnames/bind";
import styles from "./SearchBox.module.scss";
import { useEffect, useRef, useState } from "react";

import FilmItem from "../FilmItem/FilmItem";
import { getSearchKeyword } from "../../service/Search";
const cx = classnames.bind(styles);

function SearchBox() {
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyWord, setSearchKeyWord] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef() as any;
  const searchTiming = Debounce(searchInput, 300);
  useEffect(() => {
    setSearchKeyWord([]);
    if (!(searchTiming as string).trim()) {
      setSearchKeyWord([]);
      return;
    }

    setLoading(true);
    const fetch = async () => {
      const res = await getSearchKeyword(searchInput.trim());
      setSearchKeyWord(res);
      setLoading(false);
    };
    fetch();
  }, [searchTiming]);

  const handleClickOutside = () => {
    return setShowResult(false);
  };
  const handleClearBtn = () => {
    setSearchInput("");
    setSearchKeyWord([]);
    inputRef.current.focus();
  };
  const handleChange = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    if (!value.startsWith(" ")) {
      setSearchInput(value);
    }
  };
  return (
    <TippyHeadless
      visible={showResult && searchKeyWord.length > 0}
      placement="bottom"
      interactive
      onClickOutside={handleClickOutside}
      render={(attrs) => (
        <div className={cx(["search-result"])} {...attrs}>
          <ul>
            {searchKeyWord.map((data, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    navigate(`/search?query=${encodeURIComponent(data)}`);
                    setSearchKeyWord([]);
                  }}
                >
                  <BiSearch size={25} color="#0088ff" />
                  <p> {data}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    >
      <div className={cx("input")}>
        <div className={cx("search__icon")}>
          <button
            onClick={() =>
              navigate(`/search?query=${encodeURIComponent(searchTiming)}`)
            }
          >
            <BiSearch size={25} />
          </button>
        </div>
        <input
          ref={inputRef}
          value={searchInput}
          onFocus={() => setShowResult(true)}
          onChange={handleChange}
          placeholder="Search"
        />
        {searchInput && (
          <div className={cx("close__search")} onClick={handleClearBtn}>
            <AiOutlineCloseCircle size="25" color="#7e7e7e" />
          </div>
        )}
      </div>
    </TippyHeadless>
  );
}

export default SearchBox;
