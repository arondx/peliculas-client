import React from 'react'
import { Dropdown, Avatar, Space, Typography, Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function NavbarDropdown() {
    
    const navigate = useNavigate()

    const items = [
        {
            label: <Space><Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYBcoI23p8BwC502B3cS4nTAn2UVsq5g-E5Dm84vYYE8xTD9dDF9BZvoq-VvSKIu4BSh0&usqp=CAU"></Avatar><Typography>Aarón</Typography></Space>,
            key: '1',
            disabled: true
        },
        {
            label: <Button onClick={() => navigate('/logout')} icon={<LogoutOutlined />}>Log out</Button>,
            key: '2',
        },
    ];
    
    return (
        <Dropdown menu={{ items }} placement="bottomRight">
            <Avatar size="large" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYBcoI23p8BwC502B3cS4nTAn2UVsq5g-E5Dm84vYYE8xTD9dDF9BZvoq-VvSKIu4BSh0&usqp=CAU" />
        </Dropdown>
        )

}

export default NavbarDropdown