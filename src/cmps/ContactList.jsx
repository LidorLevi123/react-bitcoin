import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ContactPreview } from './ContactPreview'

export function ContactList({ contacts }) {

    const navigate = useNavigate()

        return (
            <ul className='contact-list clean-list'>
                {
                    contacts.map(contact =>
                        <li onClick={() => navigate(contact._id)} key={contact._id}>
                            <ContactPreview contact={contact} />
                        </li>
                    )
                }
            </ul>
        )
}
