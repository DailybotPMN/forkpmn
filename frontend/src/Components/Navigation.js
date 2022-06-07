import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
<div className='navigation'>
<NavLink to='/' className='nav-active'>
    Accueil
</NavLink>
<NavLink to='/Discord' className='nav-active'>
    Discord
</NavLink>
{/* <NavLink to='/Slack' className='nav-active'>
    Slack
</NavLink> */}
<NavLink to='/Contact' className='nav-active'>
    Contact
</NavLink>
</div>
    );
};

export default Navigation;