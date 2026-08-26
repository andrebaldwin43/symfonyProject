import styles from '../../styles/app.css';
import { useState, React } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const columnStyles = 'bg-slate-500 rounded hover:bg-slate-600 hover:scale-105 transition-all duration-300 p-40'

export default function App(theme) {
    const [open, setOpen] = useState(false);
    // const [theme, setTheme] = useState('light');
    return (
    <div className={`${theme} min-h-screen  text-slate-900 dark:bg-slate-900 dark:text-white`}>
        <Navbar />
        <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 dark:bg-slate-900 text-white p-10 gap-30 text-center font-semibold text-2xl sm:text-lg'>
            <div className={columnStyles}>Feature One</div>
            <div className={columnStyles}>Feature Two</div>
            <div className={columnStyles}>Feature Three</div>
            <div className={columnStyles}>Feature Four</div>
        </div>

    </div>

    
);
}
