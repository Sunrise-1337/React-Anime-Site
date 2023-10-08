import React from "react";
import { CharacterInterface } from "../../../../../interfaces/character-interface";

import "../../homeStyle.scss"

interface charactersListProps{
    characters: CharacterInterface[]
}

function CharactersList(props: charactersListProps) {

    const { characters } = props;

    return (
        <div className="home__top-char">
            <div className="home__top-char-top-wrap">
                <span className="home__top-char-span"></span>
                <h2 className="home__top-char-header">Top Characters</h2>
            </div>
            {characters.map(char => 
                <div key={char.name} className="home__char-wrap">
                    <img src={char.images.jpg.image_url} alt="CharacterPoster" className="home__char-pic" />
                    <h2 className="home__char-name">{char.name}</h2>
                </div>
            )}
        </div>
    )
}

export default CharactersList