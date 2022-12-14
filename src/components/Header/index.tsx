import React, { useRef } from "react";
import firebase from "firebase/compat/app";
import { useLocation, useNavigate } from "react-router-dom";
import { singleUrl } from "../../config/routes";

import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginIcon from "@mui/icons-material/Login";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SideBarItem from "./SideBarItem";
import { useDispatch, useSelector } from "react-redux";

import classnames from "classnames/bind";
import styles from "./Header.module.scss";

import { useMediaQuery } from "react-responsive";
import distance from "../../service/axiosConfig";
import { distance2 } from "../../service/axiosConfig";
import { logOut } from "../../reducer/currentUserSlice";
import { RootState } from "../../app/index";
const cx = classnames.bind(styles);

function Header({
  menu,
}: {
  menu: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) {
  const user = useSelector(
    (state: RootState) => state.currentUserReducer.current
  );
  const [menuPop, setMenuPop] = menu;
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isMobile = useMediaQuery({ query: "(max-width:420px)" });
  const scrollRef = useRef(null);
  let shrink: boolean;
  if (
    pathname.includes("discover") ||
    pathname.includes("movie") ||
    pathname.includes("tv")
  ) {
    shrink = true;
  } else {
    shrink = false;
  }
  const notify = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      toast.error("You must to Sign in !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        closeButton: true,
      });
    } else {
      setMenuPop(false);
    }
  };
  const sideBar = [
    {
      bigTitle: "Menu",
      Items: [
        {
          icon: <HomeOutlinedIcon />,
          title: "Home",
          shrink: shrink && !isMobile,
          to: singleUrl.home,
          onClick: () => setMenuPop(false),
        },
        {
          icon: <ExploreOutlinedIcon />,
          title: "Discover",
          shrink: shrink && !isMobile,
          to: singleUrl.explore,
          onClick: () => setMenuPop(false),
        },
        {
          icon: <SearchOutlinedIcon />,
          title: "Search",
          shrink: shrink && !isMobile,
          to: singleUrl.search,
          onClick: () => setMenuPop(false),
        },
      ],
    },
    {
      bigTitle: "Personal",
      Items: [
        {
          icon: <BookmarkAddOutlinedIcon />,
          title: "Bookmark",
          shrink: shrink && !isMobile,
          to: singleUrl.bookmark,
          onClick: notify,
        },
        {
          icon: <HistoryOutlinedIcon />,
          title: "History",
          shrink: shrink && !isMobile,
          to: singleUrl.history,
          onClick: notify,
        },
      ],
    },
    {
      bigTitle: "General",
      Items: [
        {
          icon: <AccountCircleOutlinedIcon />,
          title: "Profile",
          shrink: shrink && !isMobile,
          to: singleUrl.profile,
          onClick: notify,
        },
        {
          icon: (user && <LogoutOutlinedIcon />) || <LoginIcon />,
          title: (user && "Sign Out") || "Sign In",
          shrink: shrink && !isMobile,
          to: (user && null) || "/login",
          onClick: async (e: any) => {
            if (user) {
              e.preventDefault();
              firebase.auth().signOut();
              const res = await distance2.post(`/login/signout`);
              dispatch(logOut());
              console.log(res.data);
              window.location.reload();
            }
          },
        },
      ],
    },
  ];
  return (
    <div
      className={cx("modal__menu__left", {
        shrink: shrink && !isMobile,
      })}
    >
      <div ref={scrollRef}>
        {!isMobile && (
          <div className={cx("logo")}>
            <div className={cx("logo__img")}>
              <img src="https://moonlight-films.vercel.app/logo.png" alt="" />
            </div>
            {(!shrink || isMobile) && (
              <div className={cx("logo__name")}>
                <span className={cx("firtname")}>Night</span>
                <span className={cx("lastname")}>Owl</span>
              </div>
            )}
          </div>
        )}
        {sideBar.map((item, index) => {
          return (
            <div className={cx("menu")} key={index}>
              {(!shrink || isMobile) && <h2>{item.bigTitle}</h2>}
              <div className={cx("menu__items")}>
                {item.Items.map((item, index) => (
                  <div className={cx("item")} key={index * 3.14}>
                    <SideBarItem
                      icon={item.icon}
                      title={item.title}
                      shrink={item.shrink}
                      to={item.to}
                      onClick={item.onClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Header;
