import React from 'react';
import Burger from './Burger';
import '../Styles/navBar.css';
import Navigation from './Navigation';

export default function Navbar() {
  return (
    <div className='navBar'>
        <div className='logo'>
        <img src='/icon.png' alt='logo.png' className='logoNav' href='../Layouts/Home.js'>
        </img>
        </div>
        <Navigation/>
        <Burger/>
    </div>

  )
}
