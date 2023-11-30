import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  auth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const signIn = async () => {
    const { user } = await signInWithGooglePopup();
    //because it's async step
    const userRefDoc = await createUserDocumentFromAuth(user);
    console.log(userRefDoc);


  };
  return (
    <div>
      sign in component
      <button onClick={signIn}>Sign in with google popup</button>

      <SignUpForm />
    </div>
  );
};

export default SignIn;
