import React from 'react'
import { NavLink } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className="app-header">
            <section className="container">
                <h1>Bit<span className='clrd-txt'>coin</span> Wallet</h1>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/contact">Contacts</NavLink>
                    <NavLink to="/statistic">Statistics</NavLink>
                </nav>
            </section>
        </header>
    )
}
