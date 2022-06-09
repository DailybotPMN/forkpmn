import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../Styles/home.css';

const Home = () => {

  const buttons = document.querySelectorAll('.button');
    buttons.forEach((button) => {
      let target = button.querySelector('.target');
      function handleMove(e) {
        const x = -50 + (e.pageX - button.offsetLeft - 300 / 2) / 3;
        const y = -10 + (e.pageY - button.offsetTop - 100 / 2) / 3;
    
        target.style.setProperty('--x', `${ x }px`)
        target.style.setProperty('--y', `${ y }px`)
      }
      button.addEventListener('mousemove', (e) => {
        handleMove(e);
      });
      button.addEventListener('touchmove', (e) => {
        handleMove(e.changedTouches[0]);
      });
    });

  return (
    <div>
    <Navbar/>
    <div className="App">
      <header className='App-content'>

        <div className='title'>
          <p>Bienvenue !</p>
        </div>
        
        <img className='icon' src='/icon.png' alt='bot-img'/>

        <button className='button'>
            <div className='pattern'>
              <div className='target inner bg1'></div>
            </div>
            <NavLink to='/Slack' className='homeBtn'>
              <div className='text'>
                  Téléchargez sur Slack
              </div>
            </NavLink>
        </button>

        <button className='button'>
            <div className='pattern'>
              <div className='target inner bg1'></div>
            </div>
            <NavLink to='/Discord' className='homeBtn'>
              <div className='text'>
                  Téléchargez sur Discord
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
