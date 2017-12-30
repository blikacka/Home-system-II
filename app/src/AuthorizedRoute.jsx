import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getLoggedUser } from './utils/xhr'

class AuthorizedRoute extends Component {

    componentWillMount() {
        getLoggedUser()
    }

    render() {
        const { component: Component, pending, logged, ...rest } = this.props

        return (
            <Route {...rest} render={props => {
                if (pending) return <div>Načítání...</div>
                return logged
                    ? <Component {...props} />
                    : <Redirect to="/auth/login" />
            }} />
        )
    }
}

const stateToProps = ({ loggedUserState }) => ({
    pending: loggedUserState.pending,
    logged: loggedUserState.logged
})

export default connect(stateToProps)(AuthorizedRoute)
