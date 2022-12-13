import classnames from "classnames/bind";
import styles from "./ButtonComp.module.scss";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const cx = classnames.bind(styles);

function ButtonComp({
  to,
  href,
  onClick,
  children,
  className,
  leftIcon,
  rightIcon,
  ...otherProps
}: any) {
  let Element: any = Button;
  const props = {
    onClick,
    ...otherProps,
  };

  // Remove event listener when btn is disabled
  // if (disabled) {
  //   Object.keys(props).forEach((key) => {
  //     if (key.startsWith("on") && typeof props[key] === "function") {
  //       delete props[key];
  //     }
  //   });
  // }

  if (href) {
    Element = "a";
    props.href = href;
  } else if (to) {
    Element = Link;
    props.to = to;
  }
  const classes = cx("wrapper", {
    [className]: className,
  });
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default ButtonComp;
