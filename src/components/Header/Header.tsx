import React, {useState} from "react";
import { Link, NavLink } from "react-router-dom";

import "./headerStyle.scss"

import logo from "../../assets/images/logo.png"
import search from "../../assets/images/search.png"
import profile from "../../assets/images/prof.png"
import ham from "../../assets/images/ham.png"
import cross from "../../assets/images/cross.png"

function Header() {
    const [isMobMenu, setIsMobMenu] = useState<boolean>(false);
    const [searchRequest, setSearchRequest] = useState<string>('');

    return (
        <header className="header">
            <div className="container header__org">
                <div className="header__wrap">
                    <nav className="header__logo-nav">
                        <Link to="" className="header__logo-wrap">
                            <img src={logo} alt="Logo" className="header__logo" />
                        </Link>
                    </nav>
                    <nav className="header__pages-wrap">
                        <NavLink to="" className={({ isActive }) => ("header__link" + (isActive ? " active" : ''))}>Homepage</NavLink>
                        <NavLink to="/anime" className={({ isActive }) => ("header__link" + (isActive ? " active" : ''))}>Anime</NavLink>
                    </nav>
                </div>
                <div className="header__right-side">
                    <div className="header__search-wrap">
                        <div className="header__form" role="search">
                            <input  onChange={(e) => setSearchRequest(e.target.value)} 
                                    value={searchRequest} type="text" 
                                    className="header__search" placeholder="Search" />
                        </div>
                        <Link to={"/search?request=" + searchRequest}>
                            <img src={search} alt="Search" className="header__search-icon" />
                        </Link>
                    </div>
                    <nav className="header__prof-nav">
                        <Link to="/auth" className="header__prof-link">
                            <img src={profile} alt="Profile" className="header__prof" />
                        </Link>
                    </nav>
                    <div onClick={() => setIsMobMenu(!isMobMenu)} className="header__mob-btn">
                        Menu
                        <img src={ham} alt="Ham" className="header__mob-pic" />
                    </div>
                    {isMobMenu && 
                        <div className="header__mob-close">
                            <nav className="container header__mob-nav">
                                <img onClick={() => setIsMobMenu(!isMobMenu)} src={cross} alt="Cross" className="header__mob-exit" />
                                <ul className="header__mob-menu">
                                    <li className="header__mob-li">
                                        <Link to="" className="header__mob-link">
                                            <p className="header__mob-link-text">Homepage</p>
                                        </Link>
                                    </li>
                                    <li className="header__mob-li">
                                        <Link to="/anime" className="header__mob-link">
                                            <p className="header__mob-link-text">Anime</p>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header