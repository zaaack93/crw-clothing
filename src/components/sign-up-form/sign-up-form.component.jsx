import { useState } from "react"
import { createNewAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const initSignUpFormField={
    displayName:"",
    email:"",
    password:"",
    confirmPassword:""
}

const SignUpForm = () => {
    const [signUpFields,setSignUpFields]= useState(initSignUpFormField)
    const {displayName,email,password,confirmPassword} = signUpFields;
    console.log(email,password)
    const handleChange = (e) => {
        const {name,value} = e.target;

        //spread fields and edit only one field generic
        setSignUpFields({...signUpFields, [name]:value})
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
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={submitHandle}>
                <label>Display Name</label>
                <input type="text" required name="displayName" value={displayName} onChange={handleChange}/>

                <label>Email</label>
                <input type="email" required name="email" value={email} onChange={handleChange}/>

                <label>Password</label>
                <input type="password" required name="password" value={password} onChange={handleChange}/>

                <label>Confirm Password</label>
                <input type="password" required name="confirmPassword" value={confirmPassword} onChange={handleChange}/>


                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm