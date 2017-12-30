import qs from 'qs'

const initialState = {
    pending: true,
    logged: false,
    user: null,
    message: null
}

const loggedUserReducer = (state = initialState, action) => {

    if (action.type === 'GET_LOGGED_USER') {
        return Object.assign({}, state, {
            pending: false,
            logged: action.isLogged,
            user: action.user
        })
    }

    if (action.type === 'SET_LOGGED_USER') {
        return Object.assign({}, state, {
            pending: false,
            logged: action.logged,
            user: action.user,
            loggedUser: sessionStorage.setItem('loggedUser', action.user.hash)
        })
    }

    if (action.type === 'LOGIN_ERROR') {
        return Object.assign({}, state, {
            message: action.message
        })
    }

    return state
}

export default loggedUserReducer