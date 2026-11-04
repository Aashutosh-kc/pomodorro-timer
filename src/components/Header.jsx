import './Header.css'
import { Hourglass,MoveUpRight } from 'lucide-react'

export default function Header({appName}){
    return(
    <header className='header'>
        <a href="/" className="brand">
        <img alt="App logo" src="/logo.svg" height={40} />
        <h2 className="brand-name">{appName}</h2>
        </a>
        <a href='https://github.com/Aashutosh-kc/pomodorro-timer' className="github-link">
             <img src = "https://skillicons.dev/icons?i=github" alt="github-logo" height={32}/>
             <p className="github-text"><span>Github</span><MoveUpRight/></p>
        </a>
    </header>)
}