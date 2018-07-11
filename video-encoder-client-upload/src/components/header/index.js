import React from 'react'
import './Header.css';

const header = () => {
    return (
        <div className={'samba-app-header'}>
            <header>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/videos">Videos</a></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default header;