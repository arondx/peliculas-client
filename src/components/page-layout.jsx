
import { Outlet } from "react-router-dom"

import { Layout } from 'antd'
const { Content } = Layout

import Navbar from "./navigation/navbar/navbar"
import Navsider from "./navigation/navsider/navsider"


import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/auth-slice"

const PageLayout = () => {

    const token = useSelector(selectCurrentToken)

    return (
        <main className="App" style={{
            height: '100%'
        }}>
            <Layout style={{
                height: '100%'
            }}>
                <Navbar token={token} />
                <Layout>
                    {token && <Navsider />}
                    <Content
                        style={{
                            paddingInline: 24,
                            marginInline: 'auto',
                            marginTop: 56,
                            maxWidth: 1200,
                        }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </main>
    )
}

export default PageLayout