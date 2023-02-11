import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

import classnames from "classnames/bind";
import styles from "./Login.module.scss";

const cx = classnames.bind(styles);

function Login() {
  const [changeTab, setChangeTab] = useState(true);

  return (
    <>
      <video autoPlay muted loop id="myVideo" className={cx("video")}>
        <source
          src="https://raw.githubusercontent.com/DungTran1/video/main/darius-king-theme.mp4"
          type="video/mp4"
        />
      </video>
      <div className={cx("overlay")}></div>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("content")}>
            <h1>Sign In To Owl Night</h1>

            {(changeTab && <SignIn setChangeTab={setChangeTab} />) || (
              <SignUp setChangeTab={setChangeTab} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
