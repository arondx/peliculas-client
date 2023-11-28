import React from 'react'
import { Header } from 'antd/es/layout/layout'
import { Typography } from 'antd'
import NavbarDropdown from './navbar-dropdown'

function Navbar({
    token
}) {
    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
            <Typography style={{ color: 'white', letterSpacing: 4, fontSize: 20 }}>PELÍCULAS</Typography>
            {token && <NavbarDropdown /> }
        </Header>
    )
}

export default Navbar