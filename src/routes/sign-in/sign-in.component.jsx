import { getRedirectResult } from "firebase/auth";
import {
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
  signInWithGooglePopup,
  auth,
} from "../../utils/firebase/firebase.utils";
import { useEffect } from "react";

const SignIn = () => {
  const signIn = async () => {
    const { user } = await signInWithGooglePopup();
    //because it's async step
    const userRefDoc = await createUserDocumentFromAuth(user);
    console.log(userRefDoc);
  };

  const chechRedirectionState = async () => {
    //auth is singleton it keep track of authentication fro the whole app
    const response = await getRedirectResult(auth);
    if(response){
        const userRefDoc = await createUserDocumentFromAuth(response.user);
        console.log(userRefDoc);
    }
  };

  useEffect(() => {
    chechRedirectionState();
  }, []);
  return (
    <div>
      sign in component
      <button onClick={signIn}>Sign in with google popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with google redirect
      </button>
    </div>
  );
};

export default SignIn;
