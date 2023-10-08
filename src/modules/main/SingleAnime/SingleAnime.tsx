import React, { useEffect, useState } from "react";

import "./singleAnimeStyle.scss"

import { getRecomendations, getSingleAnime } from "../../../helpers/Api";
import { AnimeInterface } from "../../../interfaces/anime-interface";
import { RecInterface } from "../../../interfaces/rec-interface";
import { useLocation, useParams } from "react-router-dom";
import { ObjectNameInterface } from "../../../interfaces/objectName-interface";
import Player from "./components/Player/Player";
import Recomendations from "./components/Recomendations/Recomendations";
import { useDispatch } from "react-redux";
import { isFav } from "../../../helpers/FavAnimes";
import { toggleAnimeFav } from "../../../redux/modules/favAnimes/reducer";
import classNames from "classnames";

function SingleAnime() {
    const [thisAnime, setThisAnime] = useState<AnimeInterface>(),
        [animeRecs, setAnimeRecs] = useState<RecInterface[]>([]),
        [isReady, setIsReady] = useState<boolean>(false),
        [isFavourite, setIsFavourite] = useState<boolean>(false),
        { id } = useParams();

    let location = useLocation(),
        dispatch = useDispatch(),
        btnClasses = classNames("anime__info-add", {'followed': isFavourite});

    useEffect(() => {
        const fetchData = async () => {
            setIsReady(false)
            setThisAnime((await getSingleAnime(id)))
            setAnimeRecs((await getRecomendations(id)))
            setIsReady(true)
        }
      
        fetchData()
    }, [location])

    useEffect(() => {
        setIsFavourite(isFav(thisAnime?.mal_id))
    }, [thisAnime])

    function toggleFav()  {
        setIsFavourite(!isFavourite);
        dispatch(toggleAnimeFav(thisAnime))
    }

    function getString(arr: ObjectNameInterface[]): string {
        let result: string[] = [];
        arr.forEach(el => {result.push(el.name)})
        return result.join(', ')
    }

    return (
        <>
            {isReady && thisAnime &&
                <div className="container">
                    <div className="singleAnime-wrap">
                        <div className="anime">
                            <div className="anime__info">
                                <img src={thisAnime.images.jpg.large_image_url} alt="Poster" className="anime__info-pic" />
                                <div className="anime__info-text">
                                    <div className="anime__info-text-top">
                                        <div className="anime__info-text-titles">
                                            <h2 className="anime__info-text-title">{thisAnime.title_english ? thisAnime.title_english : thisAnime.title}</h2>
                                            <h3 className="anime__info-text-sub-title">{thisAnime.title_japanese}</h3>
                                        </div>
                                        {!!thisAnime.score &&
                                            <div className="anime__info-text-score">
                                                <h3 className="anime__info-score-rate">{thisAnime.score}/10</h3>
                                                <p className="anime__info-score-users">By {thisAnime.scored_by} users</p>
                                            </div>
                                        }
                                    </div>
                                    <p className="anime__info-desc">{thisAnime.synopsis}</p>
                                    <div className="anime__info-categ">
                                        <ul className="anime__info-categ-list">
                                            <li className="anime__info-categ-item">
                                                <span className="anime__info-categ-span">Type:</span> {thisAnime.type}
                                            </li>
                                            <li className="anime__info-categ-item">
                                                <span className="anime__info-categ-span">Studio:</span> {getString(thisAnime.studios)}
                                            </li>
                                            <li className="anime__info-categ-item">
                                                <span className="anime__info-categ-span">Genres:</span> {getString(thisAnime.genres)}
                                            </li>
                                            {getString(thisAnime.themes) &&
                                                <li className="anime__info-categ-item">
                                                    <span className="anime__info-categ-span">Themes:</span> {getString(thisAnime.themes)}
                                                </li>
                                            }
                                        </ul>
                                        <ul className="anime__info-categ-list">
                                            <li className="anime__info-categ-item">
                                                <span className="anime__info-categ-span">Status:</span> {thisAnime.status}
                                            </li>
                                            {!!thisAnime.airing &&
                                                <li className="anime__info-categ-item">
                                                    <span className="anime__info-categ-span">New episodes on {thisAnime.broadcast.string}</span>
                                                </li>
                                            }
                                            <li className="anime__info-categ-item">
                                                <span className="anime__info-categ-span">Data aired:</span> {thisAnime.aired.string}
                                            </li>
                                            <li className="anime__info-categ-item">
                                                <span className="anime__info-categ-span">Duration:</span> {thisAnime.duration}
                                            </li>
                                            {!!thisAnime.favorites &&
                                                <li className="anime__info-categ-item">
                                                    <span className="anime__info-categ-span">Favourite of {thisAnime.favorites} users</span> 
                                                </li>
                                            }
                                        </ul>
                                    </div>
                                    <button onClick={() => toggleFav()} className={btnClasses}>♥ Favourites</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Player />
                    {!!animeRecs.length && <Recomendations recAnimes={animeRecs} />}
                </div>
            }
        </>
    )
}

export default SingleAnime