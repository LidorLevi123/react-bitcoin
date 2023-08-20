import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export function AppHeader() {

    function onMenuOpen() {
        document.body.classList.add('menu-open')
    }

    function onMenuClose() {
        document.body.classList.remove('menu-open')
    }

    return (
        <header className="app-header">
            <section className="container">
            <NavLink className="logo" to="/"><h1>Bit<span className='clrd-txt'>coin</span> Wallet</h1></NavLink>
                <nav>
                    <NavLink to="/" onClick={onMenuClose}>Home</NavLink>
                    <NavLink to="/contact" onClick={onMenuClose}>Contacts</NavLink>
                    <NavLink to="/statistic" onClick={onMenuClose}>Statistics</NavLink>
                </nav>
                <FontAwesomeIcon className='menu-icon' onClick={onMenuOpen} icon={faBars} style={{fontSize: '30px'}} />
            </section>
        </header>
    )
}
