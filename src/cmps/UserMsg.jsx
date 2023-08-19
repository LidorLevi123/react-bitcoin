import React, { useEffect, useState, useRef } from 'react'
import { eventBus } from '../services/event-bus.service'

export function UserMsg() {

    const [msg, setMsg] = useState({ txt: '', type: 'success' })
    const userMsg = useRef(null)

    useEffect(() => {
        eventBus.on('show-msg', showMsg)
    }, [])

    function showMsg(msg) {
        setMsg(msg)
        flashMsg()
    }

    function flashMsg() {
        userMsg.current.classList.add('active')
        setTimeout(() => userMsg.current.classList.remove('active'), 5000)
        setTimeout(() => setMsg(prevMsg => ({ ...prevMsg, txt: '' })), msg.timeout || 5500);
    }

    return (
        <>
            {
                <section ref={userMsg} className={'user-msg ' + msg.type} >
                    {msg.txt}
                </section >
            }
        </>
    )
}
