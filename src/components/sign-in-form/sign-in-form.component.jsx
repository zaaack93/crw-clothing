import { useState } from "react";
import {
  SignInWithAuthUserWithEmailAndPassword,
  createNewAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";

const initSignUpFormField = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [signUpFields, setSignUpFields] = useState(initSignUpFormField);
  const { email, password } = signUpFields;
  const handleChange = (e) => {
    const { name, value } = e.target;

    //spread fields and edit only one field generic
    setSignUpFields({ ...signUpFields, [name]: value });
  };

  const resetSignUpForm = () => {
    setSignUpFields(initSignUpFormField);
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await SignInWithAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetSignUpForm();
    } catch (e) {
        if(e.code==='auth/invalid-credential'){
            alert('Invalid credantials')
        }
      console.log(`user logedIn encoutered an error ${e.message}`);
    }
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithGooglePopup();
      //because it's async step
      const userRefDoc = await createUserDocumentFromAuth(user);
    } catch (e) {
      console.log(`user logedIn encoutered an error ${e.message}`);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={submitHandle}>
        <FormInput
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
          displayName="Email"
        />
        <FormInput
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
          displayName="Password"
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Sign In Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
