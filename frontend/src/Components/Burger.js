import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Burger() {

    const [showLinks, setShowLinks] = useState(false)
    const active_burger = () => {
        setShowLinks(!showLinks)
        console.log("ça click")
    }

  return (
    <div onClick={active_burger} className={`button_burger ${showLinks ? "active span" : ""}`}> 
            <span></span>
            <nav className={`nav_burger ${showLinks ? "burger-open" : "burger-close"}`}>
            <NavLink to="/" className="nav-active">
                Accueil
            </NavLink>
            <NavLink to="/Discord" className="nav-active">
                Discord
            </NavLink>
            <NavLink to="/Slack" className="nav-active">
                Slack
            </NavLink>
            <NavLink to="/Contact" className="nav-active">
                Contact
            </NavLink>
            </nav>
    </div>
  )
}
