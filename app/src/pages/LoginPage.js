import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {login} from '../utils/xhr'
import { connect } from 'react-redux'

import MainLogo from '../css/logo_big.png'

class LoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            message: null
        }
    }

    /**
     * Set input values to state
     *
     * @param element
     * @param event
     */
    changeInput = (element, event) => {
        this.setState({[element]: event.target.value})
    }

    /**
     * Render
     *
     * @returns {XML}
     */
    render() {
        const {history} = this.props

        return (
            <div className="login-page">
                <div>
                    <img src={MainLogo} alt="Skynet" />
                </div>
                {this.props.message}
                <form>
                    <input type="text"
                           placeholder="Email"
                           value={this.state.login}
                           onChange={(event) => this.changeInput('email', event)}
                    />
                    <input type="password"
                           placeholder="Heslo"
                           value={this.state.password}
                           onChange={(event) => this.changeInput('password', event)}
                    />
                </form>

                <button onClick={() => {
                    login({email: this.state.email, password: this.state.password}).then(() => {
                        history.push('/admin')
                    })
                }}>Přihlásit se
                </button>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return { message: state.loggedUserState.message };
}

export default connect(mapStateToProps)(withRouter(LoginPage))