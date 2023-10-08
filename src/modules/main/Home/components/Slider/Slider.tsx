import React, { useState } from "react";

import "./sliderStyle.scss"

import { AnimeInterface } from "../../../../../interfaces/anime-interface";
import { Link } from "react-router-dom";
import { Carousel } from 'antd';
import Arrow from "./Arrow/Arrow";

interface sliderProps {
    animes: AnimeInterface[];
}

function Slider(props: sliderProps) {
    const [nsfwDisabled, setNsfwDisabled] = useState<boolean>(true);

    const {animes} = props,
    
    checkLine = (el: string) => {
        let check = el.split(' ').splice(0,20)
        let reg = /[ \. | \, | \; | \! | \?]/
        if (reg.test(check[check.length-1])) {
            check[check.length-1] = check[check.length-1].replace(reg, '')
        }
        return check.join(' ') + '...'
    },

    nsfwCheck = (rating: string) => {
        return /(^Rx)|(mild nudity)/i.test(rating) && nsfwDisabled
    }; 

    return (
        <div id="mainCarousel">
            <Carousel arrows={true} prevArrow={Arrow("right")} nextArrow={Arrow("left")} autoplay dotPosition="bottom">
                {animes.map(el => 
                    <div key={el.mal_id} className="carousel__slide">
                        {nsfwCheck(el.rating) &&
                            <div onClick={() => setNsfwDisabled(false)} className="carousel__hide">
                                <h3 className="carousel__hide-header">NSFW content</h3>
                                <p className="carousel__hide-para">Do you want to allow it?</p>
                            </div>
                        }
                        <img className="pic" src={el.images.jpg.large_image_url} alt={el.title}/>
                        <div className="carousel__text-wrap">
                            <div className="carousel__header">{el.title_english ? el.title_english : el.title}</div>
                            <div className="carousel__para">{el.synopsis ? checkLine(el.synopsis) : ''}</div>
                            <Link to={"/anime/" + el.mal_id}>
                                <button className="carousel__btn">Watch &gt;</button>
                            </Link>
                        </div>
                    </div>
                )}
            </Carousel>
        </div>
    )
}

export default Slider