import store from '../store'
import qs from 'qs'

export const getLoggedUser = () => {
    return new Promise((resolve, reject) => {
        window.axios.post(`${window.api}/logged-user`, qs.stringify({user: sessionStorage.getItem('loggedUser')}))
            .then((data) => {
                if (data.data.status === 'ok') {
                    store.dispatch({
                        type: 'GET_LOGGED_USER',
                        isLogged: !! data.data.data,
                        user: data.data.data
                    })
                }
                resolve()
            })
            .catch((exception) => {
                store.dispatch({
                    type: 'LOGIN_ERROR',
                    logged: false,
                    isLogged: false,
                    message: exception.response.data.data
                })
                resolve()
            })
    })
}

export const login = (data) => {
    return new Promise((resolve, reject) => {
        window.axios.post(`${window.api}/login`, qs.stringify(data))
            .then((data) => {
                if (data.data.status === 'ok') {
                    store.dispatch({
                        type: 'SET_LOGGED_USER',
                        logged: true,
                        user: data.data.data,
                        message: null
                    })
                }
                resolve()
            })
            .catch((exception) => {
                store.dispatch({
                    type: 'LOGIN_ERROR',
                    logged: false,
                    message: exception.response.data.data
                })
                resolve()
            })
    })
}

export const logout = () => {
    return new Promise((resolve, reject) => {
        let user = {
            hash: null
        }
        store.dispatch({
            type: 'SET_LOGGED_USER',
            logged: false,
            user: user
        })
        resolve()
    })
}