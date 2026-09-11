import styles from '../../styles/app.css';
import { useState, React } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Weather from './Weather';
import cloudyImage from '../../img/cloudy.jpg';
import darkRainImage from '../../img/dark_rain.jpg';
import darkSkyImage from '../../img/dark_sky.jpg';
import lightRainImage from '../../img/light_rain.jpg';
import sunnyImage from '../../img/sunny.jpg';
import tStormImage from '../../img/thunderstorm.jpg';

const BACKGROUNDS = {
  cloudy: cloudyImage,
  darkRain: darkRainImage,
  darkSky: darkSkyImage,
  lightRain: lightRainImage,
  sunny: sunnyImage,
  tStorm: tStormImage,
};

const columnStyles = 'bg-slate-500 rounded hover:bg-slate-600 hover:scale-105 transition-all duration-300 '

export default function App() {
    const [theme, setTheme] = useState('light');
    const [background, setBackground] = useState('');

    const handleToggleTheme = (newTheme) => {
        setTheme(newTheme);
    };
console.log(background)
    return (
    <div className={`${theme} min-h-screen  text-slate-900 dark:bg-slate-900 dark:text-white`}>
        <Navbar currentTheme={theme} onToggleTheme={handleToggleTheme} />

        <div className='container min-h-screen mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 dark:bg-slate-900 p-10 gap-30 text-center font-semibold text-2xl sm:text-lg'>
            <div 
                style={{ backgroundImage: `url(${BACKGROUNDS[background]})` }}  
                className={`${columnStyles} bg-cover ${background.toLowerCase().includes('dark') ? 'text-white' : 'text-black'}`}>
                <Weather onSelectImage={setBackground} />
            </div>
            <div className={columnStyles}>Feature Two</div>
            <div className={columnStyles}>Feature Three</div>
            <div className={columnStyles}>Feature Four</div>
        </div>

    </div>

    
);
}
