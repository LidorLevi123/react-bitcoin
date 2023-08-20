import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { contactActions } from '../store/actions/contact.actions'
import { utilService } from '../services/util.service'
import { userService } from '../services/user.service.local'
import { showErrorMsg } from '../services/event-bus.service'

export function ContactPage() {

    const contacts = useSelector(state => state.contactModule.contacts)
    const filterBy = useSelector(state => state.contactModule.filterBy)

    const navigate = useNavigate()

    useEffect(() => {
        const user = userService.getLoggedinUser()
        if(!user) {
            navigate('/')
            showErrorMsg('You must be logged in to view this section!')
        }
    }, [])

    useEffect(() => {
        contactActions.loadContacts()
    }, [filterBy])

    function onChangeFilter(filterBy) {
        utilService.debounce(()=> { contactActions.setFilterBy(filterBy) }, 500)()
    }

    if (!contacts) return

    return (
        <section className="contact-page">
            <h1>Contacts</h1>
            <div>
                <ContactFilter onChangeFilter={onChangeFilter} filterBy={filterBy}/>
                <Link to="/contact/edit" className="nice-button">Add new contact</Link>
            </div>
            <ContactList contacts={contacts} />
        </section>
    )
}
