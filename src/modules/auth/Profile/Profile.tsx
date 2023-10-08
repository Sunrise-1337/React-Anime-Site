import React, { useEffect } from "react";

import "./profileStyle.scss"
import cross from "../../../assets/images/deleteCross.png"

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FavAnimeInterface } from "../../../interfaces/authBlockInterfaces/favAnime-interface";
import { deleteAnimeFav, updateFavAnimes } from "../../../redux/modules/favAnimes/reducer";
import { logOutUser } from "../../../helpers/Users";
import stateInterface from "../../../redux/interfaces/favAnimesInterfaces/state";

function Profile() {
    const navigate = useNavigate(),
        dispatch = useDispatch(),
        favAnimes = useSelector((state: stateInterface) => state.favouriteAnimes.currentFavAnimes);

    let user = JSON.parse(localStorage.getItem('CurUser') as string);

    useEffect(() => {
        if (!Boolean(user)) navigate('/auth')
    }, [])

    function logOut() {
        logOutUser()
        dispatch(updateFavAnimes())
        navigate('/auth')
    };

    function deleteFromFavs(event: React.MouseEvent, anime: FavAnimeInterface) {
        event.preventDefault()
        dispatch(deleteAnimeFav(anime))
    }

    return (
        <div className="container">
            {!!user &&
                <div className="profile">
                    <div className="profile__user">
                        <div onClick={() => logOut()} className="profile__user-logout">Log Out</div>
                        <img className="profile__user-pic" src="https://cutt.ly/4ViE9ff" alt="profile__user-pic" />
                        <div className="profile__user-login">{user.login}</div>
                    </div>
                    <div className="profile__favs">
                        <div className="profile__favs-top-wrap">
                            <span className="profile__favs-span"></span>
                            <h2 className="profile__favs-header">Your favourites</h2>
                        </div>
                        {!!favAnimes && favAnimes.map(anime =>
                            <div key={anime.id} className="profile__favs-wrap">
                                <div onClick={(event) => deleteFromFavs(event, anime)} className="profile__favs-like">
                                    <img className="profile__favs-like-pic" src={cross} alt="profile__favs-like-pic" />
                                </div>
                                <Link className="profile__favs-anime" to={'../../anime/' + anime.id}>
                                    <img className="profile__favs-anime-image" src={anime.src} alt="AnimePoster" />
                                    <h2 className="profile__favs-anime-header">{anime.name}</h2>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default Profile