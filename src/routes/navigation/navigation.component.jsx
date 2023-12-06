import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom"

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import './navigation.style.scss'
import { UserContext } from "../../contexts/user.context";
import { SignOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () =>{
    const { currentUser,setCurrentUser } = useContext(UserContext);

    const SignOutHandler = async () =>{
        //wait untile finished
        await SignOutUser()
        setCurrentUser(null)
    }
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                   <CrownLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link to="/shop" className="nav-link">SHOP</Link>
                    
                    { currentUser ? (
                        <span onClick={SignOutHandler} className="pointer">SIGN OUT</span>
                    ) : (
                        <Link to="/auth" className="nav-link">SIGN IN</Link>
                    )}
                </div>
            </div>
            <Outlet></Outlet>
        </Fragment>
    )
}

export default Navigation;