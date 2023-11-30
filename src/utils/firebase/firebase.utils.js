// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth,signInWithCredential,signInWithPopup,GoogleAuthProvider } from "firebase/auth"
import { getFirestore,getDoc,setDoc,doc } from "@firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// const firebaseConfig = {
//     apiKey: "AIzaSyBSsCvEkDdzO3F3rxW07Qmnln-28dQV7FE",
//     authDomain: "crwn-db-57e4a.firebaseapp.com",
//     projectId: "crwn-db-57e4a",
//     storageBucket: "crwn-db-57e4a.appspot.com",
//     messagingSenderId: "644929113782",
//     appId: "1:644929113782:web:7d0338de893fefc3b36017"
//   };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = new getAuth();
export const signInWithGooglePopup = () =>  signInWithPopup(auth,provider) 

export const db = getFirestore();
export const createUserDocumentFromAuth = async (authUser) => {
    // we need to see if there's a document reference
    // create user reference Doc preparation for the creation
    const userRefDoc = doc(db,'users',authUser.uid)

    //to check if there's an instance of this document or not
    const userSnapData= await getDoc(userRefDoc);
    if(!userSnapData.exists()){
        const {email,displayName}=authUser;
        try{
            await setDoc(userRefDoc,{email,displayName,createAt:new Date()})
        }
        catch(e){
            console.log(`Failed to create user: ${e.message}`)
        }
    }

    return userSnapData
    //if user data doens't exist
    //create / set the document with the data for userAuth in my collecion


    //if user data exist
    //return user snap data
}