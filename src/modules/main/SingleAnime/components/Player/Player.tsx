import React from "react";

import "./playerStyle.scss"
import videoLink from "../../../../../assets/video/rick-astley-never-gonna-give-you-up.mp4"

function Player() {

    return (
        <div className="player">
            <video className="player__video" controls src={videoLink} poster="https://cutt.ly/pCGqeiM"></video>
        </div>
    )
}

export default Player