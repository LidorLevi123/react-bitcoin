import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.local.js'

const STORAGE_KEY = 'contact'

_createContacts()

export const contactService = {
    query,
    getById,
    save,
    remove,
    getEmptyContact,
    getTopMoveContacts
}

async function query(filterBy = { txt: '' }) {
    var contacts = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        contacts = contacts.filter(contact => regex.test(contact.name) || regex.test(contact.phone))
    }
    return contacts
}

async function getById(contactId) {
    return storageService.get(STORAGE_KEY, contactId)
}

async function remove(contactId) {
    await storageService.remove(STORAGE_KEY, contactId)
}

async function save(contact) {
    if(contact._id) return await storageService.put(STORAGE_KEY, contact)

    return await storageService.post(STORAGE_KEY, contact)
}

async function getTopMoveContacts(amount) {
    const user = userService.getLoggedinUser()
    const contacts = await query()

    const objMap = user.moves.reduce((map, move) => {
        if(!map[move.toId]) map[move.toId] = 1
        else map[move.toId]++
        return map
    }, {})

    const mapArray = Object.entries(objMap)
    mapArray.sort((a, b) => b[1] - a[1])
    const sortedMap = Object.fromEntries(mapArray)

    const topContacts = []
    let count = 0

    for (const id in sortedMap) { 
        const contact = contacts.find(contact => contact._id === id)
        topContacts.push({ ...contact, movesMade: sortedMap[id] })
        count++
        if(count >= amount) break
    }

    return topContacts
}

function getEmptyContact() {
    return {
        name: '',
        email: '',
        phone: ''
    }
}

function _createContacts() {

    let contacts = utilService.loadFromStorage(STORAGE_KEY)
    if (contacts && contacts.length) return

    contacts = [
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
        {
            "_id": "5a566402abce24c6bfe4699d",
            "name": "Dominique Soto",
            "email": "dominiquesoto@renovize.com",
            "phone": "+1 (807) 551-3258"
        },
        {
            "_id": "5a566402a6499c1d4da9220a",
            "name": "Shana Pope",
            "email": "shanapope@renovize.com",
            "phone": "+1 (970) 527-3082"
        },
        {
            "_id": "5a566402f90ae30e97f990db",
            "name": "Faulkner Flores",
            "email": "faulknerflores@renovize.com",
            "phone": "+1 (952) 501-2678"
        },
        {
            "_id": "5a5664027bae84ef280ffbdf",
            "name": "Holder Bean",
            "email": "holderbean@renovize.com",
            "phone": "+1 (989) 503-2663"
        },
        {
            "_id": "5a566402e3b846c5f6aec652",
            "name": "Rosanne Shelton",
            "email": "rosanneshelton@renovize.com",
            "phone": "+1 (968) 454-3851"
        },
        {
            "_id": "5a56640272c7dcdf59c3d411",
            "name": "Pamela Nolan",
            "email": "pamelanolan@renovize.com",
            "phone": "+1 (986) 545-2166"
        },
        {
            "_id": "5a5664029a8dd82a6178b15f",
            "name": "Roy Cantu",
            "email": "roycantu@renovize.com",
            "phone": "+1 (929) 571-2295"
        },
        {
            "_id": "5a5664028c096d08eeb13a8a",
            "name": "Ollie Christian",
            "email": "olliechristian@renovize.com",
            "phone": "+1 (977) 419-3550"
        },
        {
            "_id": "5a5664026c53582bb9ebe9d1",
            "name": "Nguyen Walls",
            "email": "nguyenwalls@renovize.com",
            "phone": "+1 (963) 471-3181"
        },
        {
            "_id": "5a56640298ab77236845b82b",
    
            "name": "Glenna Santana",
            "email": "glennasantana@renovize.com",
            "phone": "+1 (860) 467-2376"
        },
    ]

    utilService.saveToStorage(STORAGE_KEY, contacts)
}


// Initial data
// ;(async ()=>{
//     await storageService.post(STORAGE_KEY, {vendor: 'Subali Karov 1', price: 180})
//     await storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 240})
// })()