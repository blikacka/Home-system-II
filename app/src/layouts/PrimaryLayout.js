import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PrimaryHeader from '../ui/PrimaryHeader'
import HomePage from '../pages/HomePage'


const PrimaryLayout = ({ match }) => (
    <div className="primary-layout">
        <PrimaryHeader />
        <main>
            <Switch>
                <Route path={`${match.path}`} exact component={HomePage} />
                <Route path={`${match.path}/products`} component={HomePage} />
                <Redirect to={`${match.url}`} />
            </Switch>
        </main>
    </div>
)

export default PrimaryLayout