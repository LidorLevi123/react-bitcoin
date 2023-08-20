import React, { useEffect, useState } from 'react'
// import { contactService } from '../services/contact.service'
import { contactService } from '../services/contact.service.local'
import { useNavigate, useParams } from 'react-router-dom'
import { contactActions } from '../store/actions/contact.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

export function ContactEdit() {

    const [contact, setContact] = useState(contactService.getEmptyContact())
    const [contactName, setContactName] = useState('')
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadContact()
    }, [])

    async function loadContact() {
        const contactId = params.id
        try {
            if (contactId) {
                const contact = await contactService.getById(contactId)
                setContact(contact)
                setContactName(contact.name)
            }
        } catch (error) {
            console.log('error:', error)
        }
    }

    async function onRemoveContact() {
        try {
            await contactActions.removeContact(contact._id)
            showSuccessMsg(`Removed contact: ${contact.name}`)
            navigate('/contact/')
        } catch (err) {
            showErrorMsg(`Could not remove contact`)
            console.log('error:', err)
        }
    }

    async function onSaveContact(ev) {
        ev.preventDefault()
        try {
            await contactActions.saveContact(contact)
            showSuccessMsg('Contact saved successfully!')
            onBack()
        } catch (err) {
            showErrorMsg(`Could not save contact`)
            console.log(err.message)
        }
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = (+value || '')
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }

        setContact(prevContact => ({
            ...prevContact,
            [field]: value
        }))
    }

    function onBack() {
        contact._id
            ? navigate('/contact/' + contact._id)
            : navigate('/contact/')
    }

    const { name, email, phone } = contact

    return (
        <section className='contact-edit'>
            <section className="actions">
                <img src="back.png" alt="" onClick={onBack} title='Back' />
                <h1>{contact._id ? contactName : 'Add Contact'}</h1>
                {
                    contact._id ?
                        <img src="delete.png" alt="" onClick={onRemoveContact} title='Delete' /> :
                        <img src="delete.png" alt="" onClick={onRemoveContact} title='Delete' hidden />
                }
            </section>
            <form onSubmit={onSaveContact} >
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" />

                <label htmlFor="email">Email</label>
                <input onChange={handleChange} value={email} type="text" name="email" id="email" />

                <label htmlFor="phone">Phone</label>
                <input onChange={handleChange} value={phone} type="text" name="phone" id="phone" />

                <button className='nice-button full'>Save</button>
            </form>
        </section>
    )
}
