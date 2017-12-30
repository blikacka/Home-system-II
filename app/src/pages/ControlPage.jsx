import React, {Component} from 'react'
import { connect } from 'react-redux'
import qs from 'qs'

class ControlPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            message: null
        }
    }

    /**
     * Send control to api
     *
     * @param button
     */
    handleButton = (button) => {
        window.axios.post(`${window.api}/control`, qs.stringify({
            user: this.props.loggedUser.hash,
            button: button
        }))
            .then((data) => {
                this.setState({ message: data.data.data })
            })
    }

    /**
     * Render
     *
     * @returns {XML}
     */
    render() {
        return (
            <div className="control-page">
                <h1>Ovládání</h1>
                <h2>
                    {this.state.message}
                </h2>
                <h3>Zapínání</h3>
                <button className="btn btn-default btn-block"
                        onClick={() => this.handleButton('zap16')}>
                    Zapnout podlahovku
                </button>
                <button className="btn btn-default btn-block"
                        onClick={() => this.handleButton('zap19')}>
                    Zapnout elektrokotel
                </button>
                <button className="btn btn-default btn-block"
                        onClick={() => this.handleButton('zap20')}>
                    Zapnout obehove cerpadlo
                </button>
                <h3>Vypínání</h3>
                <button className="btn btn-default btn-block"
                        onClick={() => this.handleButton('vyp16')}>
                    Vypnout podlahovku
                </button>
                <button className="btn btn-default btn-block"
                        onClick={() => this.handleButton('vyp19')}>
                    Vypnout elektrokotel
                </button>
                <button className="btn btn-default btn-block"
                        onClick={() => this.handleButton('vyp20')}>
                    Vypnout obehove cerpadlo
                </button>
                <h3>Stav</h3>
                <button className="btn btn-default btn-block"
                        onClick={() => this.handleButton('status16')}>
                    Stav podlahovka
                </button>
                <button className="btn btn-default btn-block"
                        onClick={() => this.handleButton('status19')}>
                    Stav elektrokotel
                </button>
                <button className="btn btn-default btn-block"
                        onClick={() => this.handleButton('status20')}>
                    Stav obehove cerpadlo
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { loggedUser: state.loggedUserState.user };
}

export default connect(mapStateToProps)(ControlPage)