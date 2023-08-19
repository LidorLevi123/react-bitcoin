import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Loader } from './Loader'
import { showErrorMsg } from '../services/event-bus.service'

export function TransferFunds({ contact, onUpdateUserBalance }) {

    const userBalance = useSelector(state => state.userModule.loggedinUser.balance)
    const elInput = useRef(null)
    const elBtn = useRef(null)
    const elLoader = useRef(null)

    async function onTransferFunds(ev) {
        if (ev) ev.preventDefault()
        try {
            const amount = +elInput.current.value
            if(amount < 1 || !amount) {
                showErrorMsg('Invalid amount.')
                return
            } else if(amount > userBalance) {
                showErrorMsg('Insufficient funds.')
                return
            }
            elBtn.current.style.display = 'none'
            elLoader.current.style.display = 'block'
            await onUpdateUserBalance(amount)
            elBtn.current.style.display = 'flex'
            elLoader.current.style.display = 'none'
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <form onSubmit={onTransferFunds} className="transfer-funds">
            <h3>Transfer coins to {contact.name}:</h3>
            <input ref={elInput} className="amount-input" name="number" type="number" placeholder="Amount" required=""></input>
            <h4>Your balance: <span>{userBalance}</span>💵</h4>
            <button ref={elBtn} onClick={onTransferFunds} className='btn-send'>
                <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                        </svg>
                    </div>
                </div>
                <span>Send</span>
            </button>
            <div ref={elLoader} className="circle-loader" hidden></div>
        </form>
    )
}
