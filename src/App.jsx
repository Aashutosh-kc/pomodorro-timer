import { useState } from "react";
import "./App.css";
import "./index.css";
import Timer from "./components/TimerDisplay";
import MusicPlayer from "./components/MusicPlayer";
import Header from "./components/Header";

function App() {
    const [timer, setTimer] = useState("Pomodoro");

    return (
        <div className="app">
        <Header appName="Pomodoro Timer"/>
        <div className="dashboard">
            <div className="all-timer">
                <div className="timer-selector">
                    <button
                        className={timer === "Pomodoro" ? "selected" : "unselected"}
                        onClick={() => setTimer("Pomodoro")}
                    >
                        Pomodoro
                    </button>

                    <button
                        className={timer === "Short Break" ? "selected" : "unselected"}
                        onClick={() => setTimer("Short Break")}
                    >
                        Short Break
                    </button>

                    <button
                        className={timer === "Long Break" ? "selected" : "unselected"}
                        onClick={() => setTimer("Long Break")}
                    >
                        Long Break
                    </button>
                </div>

                {timer === "Pomodoro" && (
                    <Timer time={1500} title="Pomodoro" />
                )}

                {timer === "Short Break" && (
                    <Timer time={300} title="Short Break" />
                )}

                {timer === "Long Break" && (
                    <Timer time={600} title="Long Break" />
                )}
            </div>

            <MusicPlayer />
        </div>
        </div>
    );
}

export default App;