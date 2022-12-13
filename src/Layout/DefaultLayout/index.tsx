import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import MenuIcon from "@mui/icons-material/Menu";
import Header from "../../components/Header";
import classnames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
const cx = classnames.bind(styles);
interface Props {
  children: JSX.Element;
}
const DefaultLayout: React.FC<Props> = ({ children }) => {
  const isMobile = useMediaQuery({ query: "(max-width:420px)" });
  const [menuPop, setMenuPop] = useState(false);
  return (
    <>
      <div className="bg__color">
        <div className={cx({ body__wrapp__content: true, noFlex: isMobile })}>
          <ToastContainer />
          <Header menu={[menuPop, setMenuPop]} />
          {isMobile && (
            <div className={cx("logo")}>
              <div className={cx("logo__img")}>
                <img src="https://moonlight-films.vercel.app/logo.png" alt="" />
                <p className={cx("firtname")}>
                  Night<span className={cx("lastname")}>Owl</span>
                </p>
              </div>
              <button onClick={() => setMenuPop(!menuPop)}>
                <MenuIcon />
              </button>
            </div>
          )}
          {children}
        </div>

        {isMobile && (
          <div className={cx("mobile__menu", { shrink: menuPop })}>
            <Header menu={[menuPop, setMenuPop]} />
          </div>
        )}
        <footer style={{ height: "10rem", backgroundColor: "black" }}></footer>
      </div>
    </>
  );
};

export default DefaultLayout;
