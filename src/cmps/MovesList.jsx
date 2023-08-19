import React from 'react'
import { utilService } from '../services/util.service'

export function MovesList({ moves, contactName }) {

    return (
        <ul className='moves-list clean-list'>
            {
                moves.length ?
                <>
                    {contactName ? <h1>Your moves with {contactName}</h1> : null}
                    {
                        moves.map(move =>
                            <li key={move.at}>
                                <span>To: {contactName ? contactName : move.to}</span>
                                <span>At: {utilService.getDate(move.at)}</span>
                                <span>Amount: {move.amount}</span>
                                <hr />
                            </li>
                        )
                    }
                </> : <h2>No moves made</h2>
            }
        </ul>
    )
}
