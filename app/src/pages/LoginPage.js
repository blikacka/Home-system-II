import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {login} from '../utils/xhr'
import { connect } from 'react-redux'

class LoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            message: null
        }
    }

    changeInput = (element, event) => {
        this.setState({[element]: event.target.value})
    }

    render() {
        const {history} = this.props

        return (
            <div>
                <h1>Login Page</h1>
                <p>
                    For this example application, we cannot visit <Link to="/app">/app</Link> until we are logged in.
                    Clicking the "Login" button will simulate a login by setting Redux state. This example compliments
                    the CSS-Tricks article I wrote for <a target="_blank" href="https://css-tricks.com/react-router-4/">React
                    Router 4</a>.
                </p>
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
                        history.push('/app')
                    })
                }}>Login
                </button>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return { message: state.loggedUserState.message };
}

export default connect(mapStateToProps)(withRouter(LoginPage))