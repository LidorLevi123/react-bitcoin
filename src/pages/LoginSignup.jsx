import React, { useState } from 'react'
import { Coin } from '../cmps/Coin'
import { Link, useNavigate } from 'react-router-dom'
import { userActions } from '../store/actions/user.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faIdCard, faUser, faKey } from '@fortawesome/free-solid-svg-icons'

export function LoginSignup({ isSignUp }) {

    const [userCreds, setUserCreds] = useState(
        isSignUp ?
            { fullname: '', email: '', username: '', password: '' } :
            { username: '', password: '' }
    )

    const navigate = useNavigate()

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

        setUserCreds(prevCreds => ({
            ...prevCreds,
            [field]: value
        }))
    }

    async function onSignUp(ev) {
        ev.preventDefault()
        try {
            await userActions.signup(userCreds)
            showSuccessMsg(`Signed up successfully!`)
            navigate('/')
        } catch (err) {
            console.log('Could not login', err.message)
            showErrorMsg(`Could not sign up`)
        }
    }

    async function onLogin(ev) {
        ev.preventDefault()
        try {
            const user = await userActions.login(userCreds)
            showSuccessMsg(`Welcome back, ${user.fullname}!`)
            navigate('/')
        } catch (err) {
            console.log('Could not login', err.message)
            showErrorMsg(`Wrong user credentials`)
        }
    }

    return (
        <form className="form_container">
            <div className="logo_container"><Coin /></div>
            <div className="title_container">
                <p className="title">{isSignUp ? 'Create a new Account' : 'Login to your Account'}</p>
                <span className="subtitle">Get started with our app, just create an account and enjoy the experience.</span>
            </div>
            {
                isSignUp &&
                <div className="input_container">
                    <label className="input_label" htmlFor="fullname_field">Fullname</label>
                    <FontAwesomeIcon className='icon' icon={faIdCard} />
                    <input onChange={handleChange} placeholder="Mister Bitcoiner" name="fullname" type="text" className="input_field" id="fullname_field" />
                </div>
            }
            {
                isSignUp &&
                <div className="input_container">
                    <label className="input_label" htmlFor="email_field">Email</label>
                    <FontAwesomeIcon className='icon' icon={faEnvelope} />
                    <input onChange={handleChange} placeholder="misscoin@npmi.ca" name="email" type="text" className="input_field" id="email_field" />
                </div>
            }
            <div className="input_container">
                <label className="input_label" htmlFor="username_field">Username</label>
                <FontAwesomeIcon className='icon' icon={faUser} />
                <input onChange={handleChange} placeholder="misterbc142" name="username" type="text" className="input_field" id="username_field" />
            </div>
            <div className="input_container">
                <label className="input_label" htmlFor="password_field">Password</label>
                <FontAwesomeIcon className='icon' icon={faKey} />
                <input onChange={handleChange} placeholder="Password" name="password" type="password" className="input_field" id="password_field" />
            </div>
            {
                isSignUp ?
                    <>
                        <button onClick={onSignUp} type="submit" className="sign-in_btn">
                            <span>Sign up</span>
                        </button>
                        <hr className="line" />
                        <span>Already have an account? Login here 👇</span>
                        <Link to="/login">
                            <button type="submit" className="sign-in_apl">
                                <span>Login</span>
                            </button>
                        </Link>
                    </> :
                    <>
                        <button onClick={onLogin} type="submit" className="sign-in_btn">
                            <span>Login</span>
                        </button>
                        <hr className="line" />
                        <span>Don't have an account? Sign up here 👇</span>
                        <Link to="/signup">
                            <button type="submit" className="sign-in_apl">
                                <span>Sign up</span>
                            </button>
                        </Link>
                    </>
            }
        </form>
    )
}