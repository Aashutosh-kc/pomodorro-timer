import './YoutubePlayer.css';
import { useState } from 'react';
export default function YoutubePlayer(){

    const [urlInput,setUrlInput] = useState('');
    const [playingUrl,setPlayingUrl] = useState("https://www.youtube.com/embed/n61ULEU7CO0");
    const [error,setError] = useState('');

    function getEmbedUrl(anyUrl){
        try{
            const url = new URL(anyUrl);
            const id = url.searchParams.get('v');
            if(!id){
                setError("Enter a valid youtube link")
                return;
            }
            return (`https://youtube.com/embed/${id}`)
            
        }
        catch{
            setError('Invalid Url');
            return null;
        }
    }

    function handleSubmit(){
        if (urlInput.trim() === "")
        {
            setError("Empty url");
            return;
        }
        setError('')        
        const result = getEmbedUrl(urlInput);
        if(result){
            setPlayingUrl(result);
        }
        
    }
    return(
        <div className='youtube-player'>
            <div className='input-field'>
                <input className='url-input' 
                    onChange={(e)=>setUrlInput(e.target.value)} 
                    onKeyDown={(e) => {if (e.key ==="Enter"){
                        handleSubmit();
                    }}}
                    value={urlInput} 
                    placeholder='Paste a YouTube video or playlist link...'/>
                <button onClick={handleSubmit}>Play</button>
            </div>
            {error && <p>{error}</p>}
            <iframe className="youtube-iframe" src={playingUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
            </iframe>
        </div>
    )
}