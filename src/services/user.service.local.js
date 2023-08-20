import { storageService } from './async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeBalance
}

window.userService = userService

function getUsers() {
    return storageService.query('user')
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update({ _id, balance, moves }) {
    const user = await storageService.get('user', _id)
    user.balance = balance
    user.moves = moves
    await storageService.put('user', user)

    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    userCred.moves = []
    userCred.balance = 100
    // userCred.contacts = _createContacts()
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function changeBalance(amount) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.balance = user.balance + amount || amount
    await update(user)
    return user.balance
}

function saveLocalUser(user) {
    user = {_id: user._id, fullname: user.fullname, email: user.email, imgUrl: user.imgUrl, balance: user.balance, moves: user.moves}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _createContacts() {
    return [
        {
            "_id": "5a56640269f443a5d64b32ca",
            "name": "Ochoa Hyde",
            "email": "ochoahyde@renovize.com",
            "phone": "+1 (968) 593-3824"
        },
        {
            "_id": "5a5664025f6ae9aa24a99fde",
            "name": "Hallie Mclean",
            "email": "halliemclean@renovize.com",
            "phone": "+1 (948) 464-2888"
        },
        {
            "_id": "5a56640252d6acddd183d319",
            "name": "Parsons Norris",
            "email": "parsonsnorris@renovize.com",
            "phone": "+1 (958) 502-3495"
        },
        {
            "_id": "5a566402ed1cf349f0b47b4d",
            "name": "Rachel Lowe",
            "email": "rachellowe@renovize.com",
            "phone": "+1 (911) 475-2312"
        },
    ]
}

// Initial data
// ;(async ()=>{
//     await userService.signup({ fullname: 'Puki Norma', username: 'puki', password:'123', balance: 1000 })
// })()