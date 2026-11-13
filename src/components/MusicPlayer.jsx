import './MusicPlayer.css'
import { useRef, useState } from 'react'
import {SixteenthNotes,AudioLines,SquarePlay,CloudUpload,Music2 ,UploadCloud} from "lucide-react"
import ActiveAudio from "./ActiveAudio"
import YoutubePlayer from './YoutubePlayer'
import timerbreak from "../assets/break.jpg"
import writing from "../assets/writing.gif"
import lofi from "../audio/lofibeats.mp3"

export default function MusicPlayer({timer}){
    const [onSelect,setOnSelect] = useState('audio');
    const [customAudio,setCustomAudio] = useState(null);
    const [audioUrl,setAudioUrl] = useState(null);
    const fileInputRef = useRef(null)
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
            {onSelect==="audio" && <>
            <ActiveAudio imagePath={timer === "Pomodoro" ? writing : timerbreak}name="Lofi Beats" audioPath={audioUrl ||lofi } />
            <input type='file' accept='audio/*' 
                className='audio-upload'
                ref={fileInputRef}
                onChange={(e)=>{
                    const file = e.target.files[0];
                    setCustomAudio(file);
                    if (file){
                    setAudioUrl(URL.createObjectURL(file))
                    }
        }}
        />
        <div className="upload-card">
           {!customAudio ? (
    <>
        <div className="upload-icon">
            <UploadCloud size={26} />
        </div>

        <h3 className="upload-headline">Upload your own music</h3>
        <p className="upload-text">
            Choose an audio file from your device.
        </p>

        <button
            className="audio-upload-btn"
            onClick={() => fileInputRef.current.click()}
        >
            Browse files
        </button>
    </>
    ) : (
    <div className="custom-audio">
        <div className="music-icon">
            <Music2 size={26} />
        </div>

        <div className="custom-audio-info">
            <p className="custom-audio-name">{customAudio.name}</p>
            <span>Custom audio</span>
        </div>

        <button
            className="change-audio-btn"
            onClick={() => fileInputRef.current.click()}
        >
            Change file
        </button>
    </div>
)}
        </div>
            </>}
            {onSelect==="youtube" && <YoutubePlayer />}
        </div>
    </div>)
}