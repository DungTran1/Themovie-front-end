import { EMBED_TO, IMAGE_URL } from "./constants";
import { toast, ToastOptions } from "react-toastify";
// export const resizeImage = (
//   imageUrl: string,
//   width: string = "original"
// ): string => `${IMAGE_URL}/${width}${imageUrl}`;

export const embedMovie = (id: number): string => `${EMBED_TO}/movie?id=${id}`;
export const embedTV = (id: number, season: number, episode: number): string =>
  `${EMBED_TO}/tv?id=${id}&s=${season}&e=${episode}`;

export const calculateTimePassed = (time: number): string => {
  const unit = {
    year: 12 * 30 * 7 * 24 * 60 * 60 * 1000,
    month: 30 * 7 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };

  const diff = Date.now() - time;
  for (const key in unit) {
    if (diff > unit[key as keyof typeof unit]) {
      const timePassed = Math.floor(diff / unit[key as keyof typeof unit]);
      return `${timePassed} ${key}`;
    }
  }

  return "Just now";
};
const POSITIONTOAST: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
export const toastMessage = (type: string, message: string) => {
  if (type === "error") {
    return toast[type](message, POSITIONTOAST);
  } else if (type === "success") {
    return toast[type](message, POSITIONTOAST);
  }
  return;
};
export const convertErrorCodeToMessage = (errorCode: string) => {
  if (errorCode === "auth/email-already-in-use")
    return "Your email is already in use.";
  else if (errorCode === "auth/user-not-found")
    return "Your email may be incorrect.";
  else if (errorCode === "auth/wrong-password")
    return "Your password is incorrect.";
  else if (errorCode === "auth/invalid-email") return "Your email is invalid";
  else if (errorCode === "auth/too-many-requests")
    return "You request too many times!";
  else return "Something weird happened.";
};

export const getRandomAvatar = (): string => {
  const avatars = [
    "https://i.ibb.co/8cZYmhn/catface.jpg",
    "https://i.ibb.co/Qr5nS22/catface-5.jpg",
    "https://i.ibb.co/nwwPfcG/catface-6.jpg",
    "https://i.ibb.co/gR4G4Q9/catface-3.jpg",
    "https://i.ibb.co/51ZQTGW/dogface-8.png",
    "https://i.ibb.co/2gPWqs8/dogface-9.png",
  ];

  return avatars[Math.floor(Math.random() * avatars.length)];
};
