import React from 'react'

export function ContactPreview({ contact }) {

    return (
        <article className="contact-preview">
            <img src={`https://robohash.org/${contact.name}.png?set=set5`} alt="" />
            <h4>{contact.name}</h4>
            <h5>{contact.phone}</h5>
        </article>
    )
}
