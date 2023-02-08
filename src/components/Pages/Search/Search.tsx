import React, { useEffect, useState } from "react";

import "./searchStyle.scss"

import { getSearchResults } from "../../../helpers/Api";
import { AnimeInterface } from "../../../interfaces/anime-interface";
import { Link, useLocation } from "react-router-dom";
import useQuery from "../../../hooks/useQuery";

function SingleAnime() {
    const [resultAnimes, setResultAnimes] = useState<AnimeInterface[] | null>([]);

    let location = useLocation(),
        query = useQuery();

    useEffect(() => {
        const fetchData = async () => {
            setResultAnimes((await getSearchResults(query.get("request"))))
            console.log(query.get("request"))
        }
      
        fetchData()
    }, [location])

    return (
        <div className="search container">
            {resultAnimes && resultAnimes.length
                ? (
                    resultAnimes.map(anime =>
                    <Link to={'/anime/' + anime.mal_id} className="search__anime-link">
                        <div className="search__anime">
                            <img src={anime.images.jpg.large_image_url} alt="Anime-poster" className="search__anime-pic" />
                            <div className="search__anime-text">
                                <h2 className="search__anime-header">{anime.title}</h2>
                                <p className="search__anime-desc">{anime.synopsis}</p>
                            </div>
                        </div>
                    </Link>
                    )
                ) 
                : ( 
                    <h2 className="search__no-res">No results found</h2>
                )
            }
        </div>
    )
}

export default SingleAnime