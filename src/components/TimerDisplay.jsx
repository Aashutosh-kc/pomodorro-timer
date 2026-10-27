import {useState,useEffect } from "react";
import './TimerDisplay.css'
import { Play,Pause,RotateCcw } from "lucide-react"
export default function Timer({time,title}){

    const [duration,setDuration] = useState(time);
    const [timeleft,setTimeleft] = useState(time);
    const [isRunning,setIsRunning] = useState(false);
    const [isEditing,setIsEditing] = useState(false);
    const [editMin,setEditMin] = useState(Math.floor(time / 60));
    const [editSec,setEditSec] = useState(String(time % 60).padStart(2,"0"));

useEffect(()=>{
    if (!isRunning) return;
    const timeInterval = setInterval(()=>{
        setTimeleft((prev) => {
            if (prev <= 1) {
                setIsRunning(false);
                return 0;
            }
            return prev - 1;
        });
    },1000)

    return () => clearInterval(timeInterval)

},[isRunning]);

    function getFormattedTime(unformattedtime){
        const min = Math.floor(unformattedtime / 60);
        const sec = unformattedtime % 60;
        const FormattedTime = min.toString() + " : " + sec.toString().padStart(2,"0");
        return FormattedTime;
    }

    function startEditing(){
        if (isRunning) return;
        setEditMin(Math.floor(timeleft / 60));
        setEditSec(String(timeleft % 60).padStart(2,"0"));
        setIsEditing(true);
    }

    function handleMinChange(rawValue){
        let digits = rawValue.replace(/\D/g,"");
        if (digits.length > 3) digits = digits.slice(0,3);
        setEditMin(digits === "" ? "" : Number(digits).toString());
    }

    function handleSecChange(rawValue){
        let digits = rawValue.replace(/\D/g,"");
        if (digits.length > 2) digits = digits.slice(-2);
        let num = digits === "" ? 0 : Math.min(59, parseInt(digits,10));
        setEditSec(num.toString().padStart(2,"0"));
    }

    function handleEditKeyDown(e){
        if (e.key === "Enter") confirmEdit();
        if (e.key === "Escape") cancelEdit();
    }

    function confirmEdit(){
        const min = Math.max(0, Number(editMin) || 0);
        const sec = Math.min(59, Math.max(0, Number(editSec) || 0));
        const newDuration = min * 60 + sec;

        setDuration(newDuration);
        setTimeleft(newDuration);
        setIsEditing(false);
    }

    function cancelEdit(){
        setIsEditing(false);
    }

    return(
        <div className="timer-card">
            <h2>{title}</h2>

            {isEditing ? (
                <div
                    className="time-edit"
                    onBlur={(e)=>{
                        if (!e.currentTarget.contains(e.relatedTarget)) confirmEdit();
                    }}
                >
                    <input
                        className="min-input"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={3}
                        value={editMin}
                        onChange={(e)=> handleMinChange(e.target.value)}
                        onKeyDown={handleEditKeyDown}
                        onFocus={(e)=> e.target.select()}
                        autoFocus
                    />
                    <span>:</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={editSec}
                        onChange={(e)=> handleSecChange(e.target.value)}
                        onKeyDown={handleEditKeyDown}
                        onFocus={(e)=> e.target.select()}
                    />
                </div>
            ) : (
                <p onClick={startEditing} title="Click to edit time">
                    {getFormattedTime(timeleft)}
                </p>
            )}

            <div className="main-btns">
                <button className="start-btn" onClick={()=> {setIsRunning((prev)=> (!prev))}}>
                    {isRunning?< Pause />:<Play />}
                </button>
                <button className="reset-btn" onClick={()=>{
                    setTimeleft(duration);
                    setIsRunning(false);
                }}>
                <RotateCcw />
                </button>
            </div>

        </div>
    )

}
