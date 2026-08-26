import styles from '../../styles/app.css';
import { useState, React } from 'react';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    
    return (
        <nav>
            <div className="flex items-center justify-between bg-slate-900 text-white dark:bg-slate-900 dark:text-white p-4">
                <div className='font-bold'>Logo</div>

                <div className='hidden sm:flex gap-2'>
                    <span className='cursor-pointer'>Home</span>
                    {/* <Link to="/about">Go to About Page</Link> */}
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
        </nav>

        
    );
}