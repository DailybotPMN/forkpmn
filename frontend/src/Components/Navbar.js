import React from 'react';
import Burger from './Burger';
import '../Styles/navBar.css';
import Navigation from './Navigation';

export default function Navbar() {
  return (
    <div className='navBar'>
        <div className='logo'>
        <a href="/" rel="nofollow noopener noreferrer">
        <img src='/icon.png' alt='logo.png' className='logoNav'>
        </img>
        </a>
        </div>
        <Navigation/>
        <Burger/>
    </div>

  )
}
