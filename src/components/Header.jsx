import './Header.css'
import { Hourglass,MoveUpRight } from 'lucide-react'
export default function Header({appName}){
    return(
    <header className='header'>
        <div className="brand">
            <Hourglass className='brand-logo'/>
            <h2 className="brand-name">{appName}</h2>
        </div>
        <a href='https://github.com/Aashutosh-kc/pomodorro-timer' className="github-link">
             <img src = "https://skillicons.dev/icons?i=github" alt="github-logo" height={32}/>
             <p className="github-text"><p>Github</p><MoveUpRight/></p>
        </a>
    </header>)
}