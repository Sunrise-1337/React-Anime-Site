import React from "react";
import { Link } from "react-router-dom";
import { AnimeInterface } from "../../../../../interfaces/anime-interface";

import "../../homeStyle.scss"

interface animeListProps {
    animes: AnimeInterface[];
}

function AnimeList(props: animeListProps) {

    const { animes } = props;

    return (
        <div className="home__top-anime">
            <div className="home__top-anime-top-wrap">
                <span className="home__top-anime-span"></span>
                <h2 className="home__top-anime-header">Trending now</h2>
            </div>
            {animes.map(el => 
                <div key={el.mal_id} className="home__anime-wrap">
                    <Link to={'anime/' + el.mal_id} className="home__anime-link">
                        <div className="home__anime-pic-wrap">
                            <img src={el.images.jpg.large_image_url}  alt="AnimePoster" className="home__anime-pic" /> 
                            <h2 className="home__anime-type">{el.type}</h2>
                            <h2 className="home__anime-fav">♥ {el.favorites}</h2>
                        </div>
                        <div className="home__anime-theme-wrap">
                            {
                                !!el.themes.length && el.themes.map(theme => 
                                    <h5 key={theme.name} className="home__anime-topic">{theme.name}</h5>
                                )
                            }
                        </div>
                        <h4 className="home__anime-name">{el.title_english ? el.title_english : el.title}</h4>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default AnimeList