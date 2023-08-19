// import { contactService } from "../../services/contact.service";
import { contactService } from "../../services/contact.service.local";
import { REMOVE_CONTACT, SET_FILTER_BY, SET_CONTACTS, ADD_CONTACT, UPDATE_CONTACT } from "../reducers/contact.reducer";
import { store } from "../store";

export const contactActions = {
    loadContacts,
    removeContact,
    saveContact,
    setFilterBy
}

async function loadContacts() {
    try {
        const filterBy = store.getState().contactModule.filterBy
        const contacts = await contactService.query(filterBy)
        const action = {
            type: SET_CONTACTS,
            contacts
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }

}

async function removeContact(contactId) {
    try {
        await contactService.remove(contactId)
        const action = {
            type: REMOVE_CONTACT,
            contactId
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }
}

async function saveContact(contact) {
    try {
        await contactService.save(contact)
        const type = contact._id ? UPDATE_CONTACT : ADD_CONTACT
        const action = {
            type,
            contact
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }
}

async function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}
