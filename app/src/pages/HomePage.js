import React from 'react'
import { logout } from '../utils/xhr'

const HomePage = ({ history }) => (
    <div>
        App Home Page
        <br /><br />
        <button onClick={() => {
            logout().then(() => {
                history.push('/')
            })
        }}>Logout</button>
    </div>
)

export default HomePage