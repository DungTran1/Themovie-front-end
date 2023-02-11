import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import { AiOutlineMenu } from "react-icons/ai";
import { CiFacebook } from "react-icons/ci";
import Header from "../../components/Header";
import classnames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import SearchBox from "../../components/SearchBox/SearchBox";
const cx = classnames.bind(styles);
interface Props {
  children: JSX.Element;
}
const DefaultLayout: React.FC<Props> = ({ children }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width:1024px)" });
  const [menuPopUp, setMenuPopUp] = useState(false);
  return (
    <>
      <div className="bg__color">
        <div
          className={cx({
            body__wrapp__content: true,
            noFlex: isTabletOrMobile,
          })}
        >
          <ToastContainer />
          <Header setMenuPopUp={setMenuPopUp} />
          {isTabletOrMobile && (
            <div className={`${cx("logo")} row`}>
              <div className={`${cx("logo__img")} md-5 sm-5`}>
                <img
                  src={require("../../assets/1140-morning-night-owl.jpg")}
                  alt=""
                />
                <p className={cx("firtname")}>
                  Night<span className={cx("lastname")}>Owl</span>
                </p>
              </div>
              <div className="md-5 sm-5">
                <SearchBox />
              </div>
              <button
                onClick={() => setMenuPopUp(!menuPopUp)}
                className="md-2 sm-2"
              >
                <AiOutlineMenu />
              </button>
            </div>
          )}
          {children}
        </div>

        {isTabletOrMobile && (
          <div className={cx("mobile__menu", { shrink: menuPopUp })}>
            <Header setMenuPopUp={setMenuPopUp} />
          </div>
        )}
        <footer className="footer">
          <div>
            <div className="row">
              <div className="col l-3 sm-6">
                <h2>Email</h2>
                <p>trantuandungzzz@gmail.com</p>
              </div>
              <div className="col l-3 sm-6">
                <h2>GET SOCIAL</h2>
                <p>
                  Follow me on
                  <a href="https://www.facebook.com/dung.trantuan.7771">
                    <strong>FACEBOOK</strong>
                  </a>
                </p>
              </div>
              <div className="col l-3 sm-6">
                <h2>GET IN TOUCH</h2>
                <p>My Duc, Ha Noi</p>
              </div>
              <div className="col l-3 sm-6">
                <h2>PROJECT INQUIRIES</h2>
                <p>We loves you</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default DefaultLayout;
