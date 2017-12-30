import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import AuthorizedRoute from './AuthorizedRoute'
import store from './store'

import UnauthorizedLayout from './layouts/UnauthorizedLayout'
import PrimaryLayout from './layouts/PrimaryLayout'

const App = props => (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/auth" component={UnauthorizedLayout} />
                    <AuthorizedRoute path="/admin" component={PrimaryLayout} />
                    <Redirect to="/auth" />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
)

export default App