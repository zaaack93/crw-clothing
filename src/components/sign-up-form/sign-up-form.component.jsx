import { useState } from "react"
import { createNewAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";


const initSignUpFormField={
    displayName:"",
    email:"",
    password:"",
    confirmPassword:""
}

const SignUpForm = () => {
    const [signUpFields,setSignUpFields]= useState(initSignUpFormField)
    const {displayName,email,password,confirmPassword} = signUpFields;
    const handleChange = (e) => {
        const {name,value} = e.target;

        //spread fields and edit only one field generic
        setSignUpFields({...signUpFields, [name]:value})
    }

    const resetSignUpForm = () =>{
        setSignUpFields(initSignUpFormField)
    }


    const submitHandle = async (e) =>{
        e.preventDefault();

        if(password != confirmPassword){
            alert("password do not match")
            return;
        }

        try{
            const {user} = await createNewAuthUserWithEmailAndPassword(email,password)
            await createUserDocumentFromAuth(user,{displayName});
            resetSignUpForm()
        }
        catch(e){
            if(e.code == 'auth/email-already-in-use'){
                alert('email already in use');
            }
            else{
                console.log(`user create encoutered an error ${e.message}` )
            }
         }
    }


    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={submitHandle}>
                <FormInput type="text" required name="displayName" value={displayName} onChange={handleChange} displayName="Display name"/>
                <FormInput type="email" required name="email" value={email} onChange={handleChange} displayName="Email"/>
                <FormInput type="password" required name="password" value={password} onChange={handleChange} displayName="Password"/>
                <FormInput type="password" required name="confirmPassword" value={confirmPassword} onChange={handleChange} displayName="Confirm password"/>
                <Button type="submit" >Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm