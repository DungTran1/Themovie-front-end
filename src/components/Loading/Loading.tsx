import { ThreeCircles } from "react-loader-spinner";

const Loading = () => {
  return (
    <ThreeCircles
      height="100"
      width="100"
      color="#4fa94d"
      wrapperStyle={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: "999",
      }}
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
      // wrapperClass={cx("progress-bar-wrapper")}
    />
  );
};

export default Loading;
