import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { MdOutlineExplore } from "react-icons/md";
import {
  AiOutlineSearch,
  AiOutlineHistory,
  AiOutlineHome,
} from "react-icons/ai";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { RiAccountCircleLine } from "react-icons/ri";
import { FiLogOut, FiLogIn } from "react-icons/fi";

import { signOut } from "firebase/auth";

import { useAppSelector } from "../../store/hooks";
import { logOut } from "../../reducer/currentUserSlice";
import { auth } from "../../shared/firebase";
import { toastMessage } from "../../shared/utils";

import SideBarItem from "./SideBarItem";

import classnames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classnames.bind(styles);

interface HeaderProp {
  setHeaderPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  sideBarRef?: any;
}
const Header: React.FC<HeaderProp> = ({ setHeaderPopUp, sideBarRef }) => {
  const user = useAppSelector((state) => state.auth.current);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isMobile = useMediaQuery({ query: "(max-width:46.25em)" });
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
      toastMessage("error", "You must be logged in!");
    } else {
      setHeaderPopUp(false);
    }
  };
  const sideBar = [
    {
      bigTitle: "Menu",
      Items: [
        {
          icon: <AiOutlineHome />,
          title: "Home",
          shrink: shrink && !isMobile,
          to: "/",
          onClick: () => setHeaderPopUp(false),
        },
        {
          icon: <MdOutlineExplore />,
          title: "Discover",
          shrink: shrink && !isMobile,
          to: "/discover",
          onClick: () => setHeaderPopUp(false),
        },
        {
          icon: <AiOutlineSearch />,
          title: "Search",
          shrink: shrink && !isMobile,
          to: "/search",
          onClick: () => setHeaderPopUp(false),
        },
      ],
    },
    {
      bigTitle: "Personal",
      Items: [
        {
          icon: <BsFillBookmarkHeartFill />,
          title: "Bookmark",
          shrink: shrink && !isMobile,
          to: "/bookmark",
          onClick: notify,
        },
        {
          icon: <AiOutlineHistory />,
          title: "History",
          shrink: shrink && !isMobile,
          to: "/history",
          onClick: notify,
        },
      ],
    },
    {
      bigTitle: "General",
      Items: [
        {
          icon: <RiAccountCircleLine />,
          title: "Profile",
          shrink: shrink && !isMobile,
          to: "/profile",
          onClick: notify,
        },
        {
          icon: (user && <FiLogOut />) || <FiLogIn />,
          title: (user && "Sign Out") || "Sign In",
          shrink: shrink && !isMobile,
          to: (user && null) || "/login",
          onClick: async (
            e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
          ) => {
            if (user) {
              e.preventDefault();
              signOut(auth)
                .then((e) => {
                  // Sign-out successful.
                  dispatch(logOut());
                  navigate("/");
                })
                .catch((error) => {
                  // An error happened.
                  console.log(error);
                });
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
      ref={sideBarRef}
    >
      <div ref={scrollRef}>
        {!isMobile && (
          <div className={cx("logo")}>
            <div className={cx("logo__img")}>
              <img
                src={require("../../assets/1140-morning-night-owl.jpg")}
                alt=""
              />
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
};

export default Header;
