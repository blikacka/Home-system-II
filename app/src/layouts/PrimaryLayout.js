import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from '../ui/Header'
import HomePage from '../pages/HomePage'
import ControlPage from '../pages/ControlPage'

const PrimaryLayout = ({ match }) => (
    <div className="primary-layout">
        <Header />
        <main>
            <Switch>
                <Route path={`${match.path}`} exact component={HomePage} />
                <Route path={`${match.path}/control`} component={ControlPage} />
                <Redirect to={`${match.url}`} />
            </Switch>
        </main>
    </div>
)

export default PrimaryLayout