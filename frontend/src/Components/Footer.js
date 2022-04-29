import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <NavLink to="/" className="footerBtn">
                Accueil
            </NavLink>
            <NavLink to="/Discord" className="footerBtn">
                Discord
            </NavLink>
            <NavLink to="/Slack" className="footerBtn">
                Slack
            </NavLink>
            <NavLink to="/Contact" className="footerBtn">
                Contact
            </NavLink>
        </div>
    );
};

export default Footer;