import React from "react";
import { NavLink } from "react-router-dom";

import "./footerStyle.scss"

import logo from "../../../assets/images/logo.png";
import scroll from "../../../assets/images/scroll.png";

function Footer() {

    function scrollUp(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="footer">
            <div className="container footer__org">
                <div className="footer__btn" onClick={() => scrollUp()}>
                    <img src={scroll} alt="Scroll" className="footer__btn-pic" />
                </div>
                <nav className="footer__logo-nav">
                    <NavLink to="" className="footer__logo-wrap">
                        <img src={logo} alt="FooterLogo" className="footer__logo" />
                    </NavLink>
                </nav>
                <nav className="footer__pages-wrap">
                    <NavLink to="" className="footer__link">Homepage</NavLink>
                    <NavLink to="/anime" className="footer__link">Anime</NavLink>
                </nav>
                <p className="footer__p">Copyright ©2022 All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer