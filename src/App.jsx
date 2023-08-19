import './assets/scss/global.scss'
import React, { useEffect } from 'react'
import { Navigate, NavLink, Route, HashRouter as Router, Routes } from 'react-router-dom'
import { userService } from './services/user.service.local'

import { HomePage } from './pages/HomePage'
import { StatisticPage } from './pages/StatisticPage'
import { ContactPage } from './pages/ContactPage'
import { ContactDetails } from './pages/ContactDetails'
import { ContactEdit } from './pages/ContactEdit'
import { UserMsg } from './cmps/UserMsg'
import { LoginSignup } from './cmps/LoginSignup'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'

function RouteGuard({ children }) {
    const user = userService.getLoggedinUser()
    if (!user) return <Navigate to="/" />
    return <>{children}</>
}

function App() {

    return (
        <>
            <Router>
                <section className="main-app">
                    <AppHeader />
                    <main className="container">
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/statistic' element={<StatisticPage />} />
                            <Route path='/contact' element={<ContactPage />} />
                            <Route path='/contact/:contactId' element={<RouteGuard><ContactDetails /></RouteGuard>} />
                            <Route path='/contact/edit/:id?' element={<RouteGuard><ContactEdit /></RouteGuard>} />
                            <Route path='/signup/' element={<LoginSignup isSignUp={true} />} />
                            <Route path='/login/' element={<LoginSignup isSignUp={false} />} />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
            <UserMsg />
        </>
    )
}

export default App
