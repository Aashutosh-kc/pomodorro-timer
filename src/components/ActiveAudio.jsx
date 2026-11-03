import './ActiveAudio.css' 
import {Play,Pause,SkipForward,SkipBack, Volume2, VolumeX} from "lucide-react"
import {useRef,useState} from "react"

export default function ActiveAudio({imagePath,name,audioPath}){

    const audioRef = useRef(null);
    const [isPlaying,setIsPlaying] = useState(false)
    const [isMuted,setIsMuted] = useState(false);
    const [volume,setVolume] = useState(1);

    function syncVolume(muted,newVolume){
        setIsMuted(muted);
        setVolume(newVolume);
    }

    function togglePlay(){
        if (audioRef.current.paused){
            audioRef.current.play();
        }
        else{
            audioRef.current.pause();
        }
    }

    function toggleMute(){
            audioRef.current.muted = !audioRef.current.muted;
    }
    return(
    <div className="active-audio">
        <img className="audio-cover" src={imagePath} alt="audio-cover" />
        <p className='audio-name'>{name}</p>
        <audio src={audioPath} ref={audioRef} onPlay={()=>setIsPlaying(true)} onPause={()=> setIsPlaying(false) } onVolumeChange={()=>syncVolume(audioRef.current.muted,audioRef.current.volume)} loop>
        </audio>
        <div className="audio-btns">
            <SkipBack />
           <button onClick={() => togglePlay()} aria-label='Pause'>
            {isPlaying?<Pause />:<Play />} 
            </button>
            <SkipForward />
        </div>
        <div className='audio-volume'>
        <button className='volume-btn' onClick={()=>toggleMute()} aria-label='Volume'>{isMuted || volume === 0 ?<VolumeX />: <Volume2 />}</button>
        <input type='range' onChange={(e)=>{audioRef.current.volume = Number(e.target.value)}} className="audio-bar" max="1" step={0.01} value={volume}/>
        </div>
    </div>)
}