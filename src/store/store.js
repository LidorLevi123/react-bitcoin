import { combineReducers, legacy_createStore as createStore } from 'redux'
import { contactReducer } from './reducers/contact.reducer'
import { userReducer } from './reducers/user.reducer'

const rootReducer = combineReducers({
    contactModule: contactReducer,
    userModule: userReducer,
})

export const store = createStore(rootReducer)

window.gStore = store