import store from '../store'
import qs from 'qs'

export const getLoggedUser = () => {
    setTimeout(() => {
        store.dispatch({
            type: 'GET_LOGGED_USER'
        })
    }, 500)
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
                    console.log('....')
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
        setTimeout(() => {
            store.dispatch({
                type: 'SET_LOGGED_USER',
                logged: false
            })
            resolve()
        }, 500)
    })
}