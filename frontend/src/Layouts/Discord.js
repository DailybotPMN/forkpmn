import React, { useState } from 'react'
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import '../Styles/button.css';
import '../Styles/secondaryPages.css';

 const Discord = () => {
    const [message, setMsg] = useState('');
    const handleClick = async () => {
      console.log('click');
  
      fetch('/api/discord')
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.error(`Oh no! ${error}`)
        })
        .then(json => setMsg(json.message)) 
        .catch((error) => {
          console.error(`Ruh-roh! Couldn't convert the json: ${error}`)
        });
      ;
    };

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
        <div className='discordPage'>
          <Navbar/>
          <div className='secondaryPages vh'>
            <div className='description'>
                <p>Tu veux téléchargez le bot afin qu'il t'aide au quotidien sur ton channel Discord ?</p>
                <p>C'est par ici !</p>
              </div>
            <button className='button discordButton' onClick={handleClick}>
                <div className='pattern'>
                <div className='target inner bg1'></div>
                </div>
                <div className='text'>
                  <a href="https://discord.com/api/oauth2/authorize?client_id=983640856600920124&permissions=8&scope=bot">
                Téléchargez Discord
                </a>
                </div>
            </button>
            <p>{message}</p>
            </div>
            <Footer/>
        </div>
    )
}

export default Discord;