import React from 'react'

export function BackDrop() {

    function onCloseMenu() {
        document.body.classList.remove('menu-open')
    }

    return (
        <section className="backdrop" onClick={onCloseMenu}></section>
    )
}