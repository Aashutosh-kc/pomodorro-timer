import './MusicPlayer.css'
import { useState } from 'react'
import {SixteenthNotes,AudioLines,SquarePlay,Volume2,VolumeX} from "lucide-react"
import ActiveAudio from "./ActiveAudio"
import YoutubePlayer from './YoutubePlayer'
import timerbreak from "../assets/break.jpg"
import writing from "../assets/writing.gif"
import lofi from "../audio/lofibeats.mp3"

export default function MusicPlayer({timer}){
    const [onSelect,setOnSelect] = useState('audio');
    return(
    <div className="music-player">
        <div className="title">
            <SixteenthNotes />
            <h2>Music Player</h2>
        </div>
        <div className="selection-bar">
            <div className={onSelect==="audio" ? "option selected" : "option"} onClick={() => setOnSelect('audio')}>
                <AudioLines /><span>Audio</span>
            </div>
            <div className={onSelect==="youtube" ? "option selected" : "option"}  onClick={() => setOnSelect('youtube')}>
                <SquarePlay />
                <span>YouTube</span>
            </div>
        </div>
        <div className="selected-audio">
            {onSelect==="audio" && <ActiveAudio imagePath={timer === "Pomodoro" ? writing : timerbreak}name="Lofi Beats" audioPath={lofi} />}
            {onSelect==="youtube" && <YoutubePlayer />}
        </div>
    </div>)
}