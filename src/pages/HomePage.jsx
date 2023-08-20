import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { contactService } from '../services/contact.service.local'
import { bitcoinService } from '../services/bitcoin.service'
import { userActions } from '../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { MovesList } from '../cmps/MovesList'
import { useSelector } from 'react-redux'
import { Chart } from '../cmps/Chart'
import { Loader } from '../cmps/Loader'

export function HomePage() {

    const user = useSelector(state => state.userModule.loggedinUser)

    const [userBTC, setUserBTC] = useState(null)
    const [chartsData, setChartsData] = useState(null)
    const [topContacts, setTopContacts] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }
        loadChartsData()
        getRate(user.balance)
        getTopContacts()
    }, [])

    async function getRate(coins) {
        const rate = await bitcoinService.getRate(coins)
        setUserBTC(rate)
    }

    async function loadChartsData() {
        const data = await bitcoinService.getChartsData()
        setChartsData(data)
    }

    async function onAddFunds() {
        try {
            const amount = 25
            const userBalance = await userActions.updateUserBalance(amount)
            await getRate(userBalance)
            showSuccessMsg('Added more funds')
        } catch (err) {
            console.log('Could not add funds', err.message);
            showErrorMsg('Could not add more funds')
        }
    }

    async function getTopContacts() {
        const topContacts = await contactService.getTopMoveContacts(3)
        setTopContacts(topContacts)
    }

    function onLogout() {
        userActions.logout()
        navigate('/login')
        showSuccessMsg('See you soon!')
    }

    if (!user || !topContacts || !chartsData) <Loader />
    return (
        <section className="home-page">
            <div>
                <h1>Hello {user.fullname}!</h1>
                <h3><img src="coin.png" alt="" /> Coins: {user.balance}</h3>
                <h3><img src="bitcoin.png" alt="" /> BTC: {userBTC}</h3>
                <div>
                    <button className='home-button' onClick={onLogout}>Logout</button>
                    <button onClick={onAddFunds} className='nice-button'>Add more funds</button>
                </div>
            </div>
            <div>
                <h1>Top 3 contacts recieved coins from you</h1>
                <section className='contacts'>
                    {
                        topContacts.length ?
                            topContacts.map(c =>
                                <article key={c._id} onClick={()=> {navigate('/contact/' + c._id)}}>
                                    <img src={`https://robohash.org/${c.name}.png?set=set5`} alt="" />
                                    <span className='name'>{c.name}</span>
                                    <span>Transactions: {c.movesMade}</span>
                                </article>
                            ) : <h2>No transactions made</h2>
                    }
                </section>
            </div>
            <div>
                <h1>Your last 3 moves</h1>
                <MovesList moves={user.moves.slice(0, 3)} />
            </div>
            <div>
                <Chart chartsData={chartsData} type={'marketPrice'}/>
            </div>
        </section>
    )
}
