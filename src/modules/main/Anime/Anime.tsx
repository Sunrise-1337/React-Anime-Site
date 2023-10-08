import React, { useEffect, useState } from "react";

import "./animeStyle.scss"

import { Link } from "react-router-dom";
import { CompareRecInterface } from "../../../interfaces/compareRec-interface";
import { getCompareRecomendations } from "../../../helpers/Api";

function Anime() {
    const [animeRecs, setAnimeRecs] = useState<CompareRecInterface[]>([]);

    useEffect(() => {
        fetchData()
    }, [])

    
    async function fetchData (): Promise<void> {
        setAnimeRecs((await getCompareRecomendations()))
    }

    return (
        <div className="rec">
            {animeRecs.map((anime) =>
                <div key={anime.content} className="rec__reccom">
                    <h2 className="rec__header">{anime.content}</h2>
                    {anime.entry.map(rec =>
                        <Link to={'/anime/'+ rec.mal_id} className="rec__anime-link">
                            <div className="rec__anime-wrap">
                                <img src={rec.images.jpg.large_image_url} alt="RecPoster" className="rec__pic" />
                                <h2 className="rec__title">{rec.title}</h2>
                            </div>
                        </Link>
                    )}
                </div>
            )}
        </div>
    )
}

export default Anime