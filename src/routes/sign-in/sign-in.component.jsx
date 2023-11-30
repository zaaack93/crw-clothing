import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const signIn = async () =>{
        const response = await signInWithGooglePopup()
        console.log(response)
    }
    return (
        <div>
            sign in component
            <button onClick={signIn}>Sign in with google popup</button>
        </div>
    );
};

export default SignIn;