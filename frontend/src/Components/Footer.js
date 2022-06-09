import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footerMenu'>
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
                <a href='https://discord.com/' target="_blank" rel="nofollow noopener noreferrer">
                <img src='../discord.png' alt='img-discord' style={{width:' 28px'}}></img>
                </a>
                <a href='https://slack.com/intl/fr-fr/' target="_blank" rel="nofollow noopener noreferrer">
                <img src='../slack.png' alt='img-slack' style={{height:' 23px'}}/>
                </a>
            </div>
        </div>
    );
};

export default Footer;