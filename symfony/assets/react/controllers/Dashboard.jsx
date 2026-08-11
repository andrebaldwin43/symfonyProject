import React from 'react';
import styles from '../../styles/app.css';
import { useState } from 'react';

const columnStyles = 'bg-slate-500 rounded hover:bg-slate-600 hover:scale-105 transition-all duration-300 p-40'

export default function (props) {
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    return (
    <div className={`${theme} min-h-screen  text-slate-900 dark:bg-slate-900 dark:text-white`}>
        <div className="flex items-center justify-between bg-slate-900 text-white dark:bg-slate-900 dark:text-white p-4">
            <div className='font-bold'>Logo</div>

            <div className='hidden sm:flex gap-2'>
                <span className='cursor-pointer'>Home</span>
                <span className='cursor-pointer'>About</span>
                <span className='cursor-pointer'>Contact</span>
                <button className='text-xl cursor-pointer' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                    {theme === 'light' ? '☀️' : '🌙'}
                </button>
            </div>

            <button className='text-xl cursor-pointer sm:hidden' onClick={() => setOpen(!open)}>
                Menu
            </button>
        </div>

        {/* Mobile view */}
        {open && (
            <div className='flex flex-col items-center gap-2 text-slate-900 dark:bg-slate-900 dark:text-white p-4 sm:hidden'>
                <span>Home</span>
                <span>About</span>
                <span>Contact</span>
                <button className='text-xl cursor-pointer sm:hidden' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                    {theme === 'light' ? '☀️' : '🌙'}
                </button>
            </div>
        )}

        <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 dark:bg-slate-900 text-white p-10 gap-30 text-center font-semibold text-2xl sm:text-lg'>
            <div className={columnStyles}>Feature One</div>
            <div className={columnStyles}>Feature Two</div>
            <div className={columnStyles}>Feature Three</div>
            <div className={columnStyles}>Feature Four</div>
        </div>

    </div>

    
);
}
