import React from "react";

import { Link } from "react-router-dom";
import { RecInterface } from "../../../../../interfaces/rec-interface";

import "./recomendationsStyle.scss"

interface recProps {
    recAnimes: RecInterface[];
}

function Recomendations(props: recProps) {

    const {recAnimes} = props;

    return (
        <div className="recc">
            <div className="recc__top-wrap">
                <span className="recc__top-span"></span>
                <h2 className="recc__top-header">You may also like:</h2>
            </div>
            {recAnimes.map(rec =>
                <div key={rec.entry.mal_id} className="recc__anime-wrap" >
                    <Link to={'/anime/' + rec.entry.mal_id}>
                        <img className="recc__anime-pic" src={rec.entry.images.jpg.large_image_url} alt="Poster"/>
                        <h2 className="recc__anime-name">{rec.entry.title}</h2>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Recomendations