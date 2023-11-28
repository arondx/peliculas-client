import React from 'react'
import Sider from 'antd/es/layout/Sider'
import { Grid } from 'antd';
import NavsiderMenu from './navsider-menu';
const { useBreakpoint } = Grid;

function Navsider() {

    const screens = useBreakpoint();

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            style={{
                height: '100%',
                zIndex: 50,
                position: screens.lg ? "relative" : "absolute"
            }}>
            <NavsiderMenu />
        </Sider>
  )
}

export default Navsider