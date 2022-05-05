import React from 'react'; /*, { useState }*/ 
import Navbar from '../Components/Navbar';

 const Slack = () => {

    // const buttons = document.querySelectorAll('.button');
    // buttons.forEach((button) => {
    //   let target = button.querySelector('.target');
    //   function handleMove(e) {
    //     const x = -50 + (e.pageX - button.offsetLeft - 300 / 2) / 3;
    //     const y = -10 + (e.pageY - button.offsetTop - 100 / 2) / 3;
    
    //     target.style.setProperty('--x', `${ x }px`)
    //     target.style.setProperty('--y', `${ y }px`)
    //   }
    //   button.addEventListener('mousemove', (e) => {
    //     handleMove(e);
    //   });
    //   button.addEventListener('touchmove', (e) => {
    //     handleMove(e.changedTouches[0]);
    //   });
    // });
    
    // const [message, setMsg] = useState('');
    // const handleClick = async () => {
    //   console.log('click');
  
    //   fetch('/api/slack')
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .catch((error) => {
    //       console.error(`Oh no! ${error}`)
    //     })
    //     .then(json => setMsg(json.message)) 
    //     .catch((error) => {
    //       console.error(`Ruh-roh! Couldn't convert the json: ${error}`)
    //     });
    //   ;
    // };

    return (
        <div className='slackPage'>
          <Navbar/>
          <div className='secondaryPages'>
            <button className='slackButton' /*onClick={handleClick}*/>
                <a href="https://slack.com/oauth/v2/authorize?client_id=3099553925446.3329920477507&scope=app_mentions:read,channels:history,chat:write,commands,emoji:read,groups:history,groups:read,im:history,im:read,im:write,mpim:history,incoming-webhook&user_scope=admin">
                  <img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
                </a>
            </button>
            <a href="https://slack.com/oauth/v2/authorize?scope=&amp;user_scope=&amp;redirect_uri=https%3A%2F%2Fwww.slackdailypmn.com&amp;client_id=3099553925446.3329920477507" /* style="align-items:center;color:#000;background-color:#fff;border:1px solid #ddd;border-radius:4px;display:inline-flex;font-family:Lato, sans-serif;font-size:16px;font-weight:600;height:48px;justify-content:center;text-decoration:none;width:236px"*/>
             <svg xmlns="http://www.w3.org/2000/svg" /*style="height:20px;width:20px;margin-right:12px" viewBox="0 0 122.8 122.8"*/>
             <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a"></path>
             <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0"></path>
             <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d"></path>
             <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e"></path></svg>
             Add to Slack</a>
           </div>
        </div>
    )
}

export default Slack;