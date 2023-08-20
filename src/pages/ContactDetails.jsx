import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { contactService } from '../services/contact.service'
import { contactService } from '../services/contact.service.local'
import { userActions } from '../store/actions/user.actions'
import { Loader } from '../cmps/Loader'
import { TransferFunds } from '../cmps/TransferFunds'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { MovesList } from '../cmps/MovesList'

export function ContactDetails() {

    const user = useSelector(state => state.userModule.loggedinUser)
    const [contact, setContact] = useState(null)
    const [isImgLoaded, setIsImgLoaded] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadContact()
    }, [params.contactId])

    async function loadContact() {
        const contact = await contactService.getById(params.contactId)
        setContact(contact)
        setContactImg(contact)
    }

    async function onUpdateUserBalance(amount) {
        try {
            const move = generateMove(amount)
            await userActions.updateUserBalance(-amount)
            await userActions.updateUserMoves(move)
            showSuccessMsg('Transaction completed.')
        } catch (err) {
            console.log(err.message)
            showErrorMsg('Transaction failed.')
        }
    }

    function setContactImg(contact) {
        const imgUrl = `https://robohash.org/${contact.name}.png?set=set5`
        const img = new Image(imgUrl)

        img.onload = () => { setIsImgLoaded(true) }
        img.src = imgUrl
    }

    function generateMove(amount) {
        return {
            toId: contact._id,
            to: contact.name,
            at: Date.now(),
            amount
        }
    }

    function onBack() {
        navigate('/contact')
    }

    function onEdit() {
        navigate('/contact/edit/' + contact._id)
    }

    if (!contact) return <Loader />

    return (
        <>
            {isImgLoaded ?
                <section className='contact-details'>
                    <section className="actions">
                        <img src="back.png" alt="back.png" onClick={onBack} title='Back' />
                        <h1>{contact.name}</h1>
                        <img src="edit.png" alt="edit.png" onClick={onEdit} title='Edit' />
                    </section>
                    <img className='contact-img' src={`https://robohash.org/${contact.name}.png?set=set5`} />
                    <div className='info'>
                        <h3>Name:</h3> <span>{contact.name}</span>
                        <h3>Email:</h3> <span>{contact.email}</span>
                        <h3>Phone:</h3> <span>{contact.phone}</span>
                    </div>
                    <MovesList moves={user.moves.filter(move => move.toId === contact._id)} contactName={contact.name}/>
                    <TransferFunds contact={contact} onUpdateUserBalance={onUpdateUserBalance} />
                </section>
                : <Loader />
            }
        </>
    )
}
