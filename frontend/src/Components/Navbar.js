import React from 'react';
import Burger from './Burger';
import './navBar.css';

export default function Navbar() {
  return (
    <div className='navBar'>
        <div className='logo'>
        <img src='/icon.png' alt='logo.png' className='logoNav'></img>
        </div>
        <Burger/>
    </div>

  )
}
