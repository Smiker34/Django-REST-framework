import React from "react";
import { Link } from "react-router-dom";

function MenuItems({ name, href }) {
    return (
        <li key={name} className="Menu_item">
            <Link className="menu-link" to={href}>{name}</Link>
        </li>
    )
}

export default function MenuList({ menuItems }) {
    return (
        <nav className="Menu">
            <ul key="Menu" className="Menu_list">
                {menuItems.map((item) => <MenuItems name={item.name} href={item.href} />)}
            </ul>
        </nav>
    )
}