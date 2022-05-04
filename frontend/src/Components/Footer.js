import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='menu'>
            <NavLink to='/' className='footerBtn'>
                Accueil
            </NavLink>
            <NavLink to='/Discord' className='footerBtn'>
                Discord
            </NavLink>
            <NavLink to='/Slack' className='footerBtn'>
                Slack
            </NavLink>
            <NavLink to='/Contact' className='footerBtn'>
                Contact
            </NavLink>
            </div>
            <div className='networks'>
                <img src='../discord.png' alt='img-discord' style={{width:' 28px'}}/>
                <img src='../slack.svg' alt='img-slack'/>
            </div>
        </div>
    );
};

export default Footer;