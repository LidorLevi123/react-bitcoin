import { userService } from "../../services/user.service.local"

const initialState = {
    loggedinUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {

        case 'SET_LOGGEDIN_USER': {
            return {
                ...state,
                loggedinUser: (action.user) ? { ...action.user } : null
            }
        }
        default:
            return state
    }
}