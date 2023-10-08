import React, { useEffect, useState } from "react";

import "./homeStyle.scss"

import { getRandomAnime, getTopAnimes, getTopCharacters } from "../../../helpers/Api";
import { AnimeInterface } from "../../../interfaces/anime-interface";
import { CharacterInterface } from "../../../interfaces/character-interface";

import Slider from "./components/Slider/Slider";
import AnimeList from "./components/AnimeList/AnimeList";
import CharactersList from "./components/CharactersList/CharactersList";

function Home() {
    const [topAnimes, setTopAnimes] = useState<AnimeInterface[]>([]),
        [topCharacters, setTopCharacters] = useState<CharacterInterface[]>([]),
        [randAnimes, setRandAnimes] = useState<AnimeInterface[]>([]);

    let isLoaded: boolean = false;
    
    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData (): Promise<void> {
        setTopAnimes((await getTopAnimes()))
        setTopCharacters((await getTopCharacters()))

        await Promise.all([getRandomAnime(), getRandomAnime(), getRandomAnime()])
            .then(res => { 
                // Prevention of the second fetch
                if(!isLoaded) {
                    setRandAnimes(res); 
                    isLoaded = true
                }
            })
    }

    return (
        <div className="container">
            {randAnimes.length && <Slider animes={randAnimes} />}
            <div className="home">
                {!!topAnimes.length && <AnimeList animes={topAnimes} />}    
                {!!topCharacters.length && <CharactersList characters={topCharacters} />}
            </div>
        </div>
    )
}

export default Home