import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom"

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import './navigation.style.scss'

const Navigation = () =>{
    return (
        <Fragment>
            <div className="navigation">
                
                <Link className="logo-container" to="/">
                   <CrownLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link to="/shop" className="nav-link">SHOP</Link>
                    <Link to="/sign-in" className="nav-link">SIGN IN</Link>
                </div>
            </div>
            <Outlet></Outlet>
        </Fragment>
    )
}

export default Navigation;