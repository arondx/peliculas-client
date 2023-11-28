import { useState } from "react"
import { Menu } from 'antd'
import { VideoCameraOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

function NavsiderMenu() {
    const [current, setCurrent] = useState();

    const items = [
        getItem('Películas', 'sub1', <img src="icon/videocam.svg" />, [
            getItem(<Link to="/listarpeliculas">Listar peliculas</Link>, '1'),
            getItem(<Link to="/crearpelicula">Crear película</Link>, '2'),
        ]),
        getItem('Géneros', 'sub2', <img src="icon/category.svg" />, [
            getItem('Lista', '3'),
            getItem(<Link to="/creargenero">Crear género</Link>, '4'),
        ]),
    ]

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };


    return (
        <Menu
            onClick={onClick}
            items={items}
            theme="dark"
            mode="inline" />
    )
}

export default NavsiderMenu