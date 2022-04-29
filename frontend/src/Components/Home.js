import React from 'react';
import { NavLink } from 'react-router-dom';
import './home.css';
import './components.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Home = () => {
  
  return (
    <div>
    <Navbar/>

    <div className="App">

      <header className="App-content">
        <div className='title'>
          <p>Bienvenue !</p>
        </div>
        <img src='/icon.png' alt='bot-img'/>
        <button className='button'>
            <div className='pattern'>
            <div className="target inner bg1"></div>
            </div>
            <NavLink to="/Slack" className="nav-active">
            <div className='text'>
                Téléchargez Slack
            </div>
            </NavLink>
        </button>
        <button className='button'>
            <div className='pattern'>
            <div className="target inner bg1"></div>
            </div>
            <NavLink to="/Discord" className="nav-active">
            <div className='text'>
                Téléchargez Discord
            </div>
            </NavLink>
        </button>
      </header>
      <Footer/>
    </div>
    </div>
  );
}

export default Home;
