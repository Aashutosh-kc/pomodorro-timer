import './Header.css'
export default function Header({appName}){
    return(
    <header className='header'>
        <div className="brand">
            <img className="brand-logo"src="src\assets\logo.png" alt="brand-logo" height={36}/>
            <h2 className="brand-name">{appName}</h2>
        </div>
        <a href='https://github.com/Aashutosh-kc/pomodorro-timer' className="github-link">
             <img src = "https://skillicons.dev/icons?i=github" alt="github-logo" height={32}/>
             <p className="github-text">Github</p>
        </a>
    </header>)
}