import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { logout } from '../utils/xhr'
import { connect } from 'react-redux'

class Header extends Component {

    render() {
        const { history, user } = this.props
        return (
            <header className="primary-header">
                <h1>Hellou {user.name}</h1>
                <nav>
                    <NavLink to="/admin" exact activeClassName="active">Grafy</NavLink>
                    <NavLink to="/admin/control" activeClassName="active">Ovládání</NavLink>
                    <button onClick={() => {
                        logout().then(() => {
                            history.push('/')
                        })
                    }}>Odhlásit se</button>
                </nav>
            </header>
        )
    }
}

function mapStateToProps(state) {
    return { user: state.loggedUserState.user };
}

export default connect(mapStateToProps)(withRouter(Header))