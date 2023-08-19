import { store } from "../store";
// import { userService } from '../../services/user.service'
import { userService } from '../../services/user.service.local'

export const userActions = {
    login,
    signup,
    logout,
    updateUserBalance,
    updateUserMoves
}

async function login(userCred) {
    try {
        const user = await userService.login(userCred)
        store.dispatch({ type: 'SET_LOGGEDIN_USER', user})
        return user
    } catch (err) {
        console.log('userActions: Error in login', err)
        throw err
    }
}

async function signup(userCred) {
    try {
        const user = await userService.signup(userCred)
        if(!user) return
        store.dispatch({ type: 'SET_LOGGEDIN_USER', user})
        return user
    } catch (err) {
        console.log('userActions: Error in signup', err)
        throw err
    }
}

async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: 'SET_LOGGEDIN_USER', user: null})
    } catch (err) {
        console.log('userActions: Error in logout', err)
        throw err
    }
}

async function updateUserBalance(amount) {
    try {
        const { loggedinUser } = store.getState().userModule
        const userToUpdate = {
            ...loggedinUser,
            balance: loggedinUser.balance + amount
        }
        const user = await userService.update(userToUpdate)
        store.dispatch({ type: 'SET_LOGGEDIN_USER', user })
        return user.balance
    } catch (error) {
        console.log('userActions: Error in update', err)
        throw err
    }
}

async function updateUserMoves(move) {
    try {
        const { loggedinUser } = store.getState().userModule
        const { moves } = loggedinUser
        moves.unshift(move)
        const userToUpdate = {
            ...loggedinUser,
            moves: moves
        }
        const user = await userService.update(userToUpdate)
        store.dispatch({ type: 'SET_LOGGEDIN_USER', user })
    } catch (error) {
        console.log('userActions: Error in update', err)
        throw err
    }
}