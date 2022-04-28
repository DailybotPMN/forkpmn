import React, { useState } from 'react'

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
        <div>
            <button className='button' onClick={handleClick}>
                <div className='pattern'>
                <div class="target inner bg1"></div>
                </div>
                <div className='text'>
                Téléchargez Discord
                </div>
            </button>
            <p>{message}</p>
        </div>
    )
}

export default Discord;