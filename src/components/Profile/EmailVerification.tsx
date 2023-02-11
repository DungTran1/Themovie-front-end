import classnames from "classnames/bind";
import styles from "../../scss/ModuleScss/Profile.module.scss";
const cx = classnames.bind(styles);
const EmailVerification = () => {
  return (
    <div className={cx("verified")}>
      <h4>Your account is verified</h4>
      <button>Send me verification email</button>
    </div>
  );
};

export default EmailVerification;
