import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../shared/firebase";

export const signInWithProvider = (provider: any, type: string) => {
  signInWithPopup(auth, provider).then(async (result) => {
    const user = result.user;

    let token;
    if (type === "facebook") {
      // If logined with facebook, I need to store additional info about "token" because I can only get profile picture "photoURL" from FB API when I add "?access_token={someToken}", so I store that "someToken" is my FireStore
      const credential = FacebookAuthProvider.credentialFromResult(result);
      token = credential?.accessToken;
    }
  });
};
