import React, { useState, useRef } from "react";

import FilmItem from "../../components/FilmItem/FilmItem";
import MediaChange from "../../components/MediaChange/MediaChange";

import { MdOutlineBorderColor, MdDoneAll } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";

import { Item } from "../../shared/types";
import { postUser } from "../../service/axiosConfig";
import { useAppSelector } from "../../store/hooks";

import classnames from "classnames/bind";
import styles from "./Personal.module.scss";
import Loading from "../Loading/Loading";
const cx = classnames.bind(styles);

interface PersonalProps {
  name: string;
  film: Item[] | undefined;
  refetch: any;
  media: string;
  setMedia: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}
const Personal: React.FC<PersonalProps> = ({
  name,
  film,
  refetch,
  media,
  setMedia,
  isLoading,
}) => {
  const user = useAppSelector((state) => state.auth.current);
  const [edit, setEdit] = useState<boolean>(false);
  const [check, setCheck] = useState<number[]>([]);
  const checkRef = useRef([]) as any;

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value);
    e.stopPropagation();
    if (check.includes(id) && Number.isInteger(id)) {
      setCheck((prev) => {
        const newCheck = [...prev];
        const check = newCheck.findIndex((item) => item === id);
        newCheck.splice(check, 1);
        return [...newCheck];
      });
    } else {
      setCheck((prev) => [...prev, id]);
    }
  };

  const handleSelectAll = () => {
    if (check.length === Object.keys(checkRef.current).length) {
      setCheck([]);
    } else {
      setCheck([
        ...Object.keys(checkRef.current).map((key: string) => Number(key)),
      ]);
    }
  };
  const handleClear = async () => {
    await postUser(name + "/delete/movie", {
      movieIds: check,
      uid: user?.uid,
    });
    refetch();
    setCheck([]);
  };

  return (
    <>
      <div className={cx("film__list")}>
        <div className={cx("header")}>
          <div className={cx("title")}>FILMS I WATCHED</div>
        </div>
        <div>
          <MediaChange media={media} setMedia={setMedia} />
          <div className={cx("edit")}>
            {!edit && (
              <div onClick={() => setEdit(true)}>
                <MdOutlineBorderColor />
                <span>Edit</span>
              </div>
            )}
            {edit && (
              <>
                <div onClick={handleSelectAll}>
                  <MdDoneAll color="#4e4eff" />
                  <span>Select All</span>
                </div>
                <div onClick={handleClear}>
                  <AiOutlineDelete color="#0cc90a" />
                  <span>Clear</span>
                </div>
                <div
                  onClick={() => {
                    setEdit(false);
                    setCheck([]);
                  }}
                >
                  <FcCancel />
                  <span>Cancel</span>
                </div>
              </>
            )}
          </div>
        </div>
        {isLoading && <Loading />}
        <div className={`${cx("list")} row`}>
          {!isLoading &&
            film?.map((itm) => {
              return (
                <React.Fragment key={itm.id}>
                  <FilmItem itemPage={itm} className="l-3 sm-6">
                    {edit && (
                      <>
                        <label htmlFor={itm.id.toString()}></label>
                        <input
                          id={itm.id.toString()}
                          ref={(el) => (checkRef.current[itm.id] = el)}
                          checked={check.includes(itm.id)}
                          className={cx("checkbox")}
                          type="checkbox"
                          value={itm.id}
                          onChange={handleChecked}
                        />
                        {/* <Overlay /> */}
                      </>
                    )}
                  </FilmItem>
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default Personal;
