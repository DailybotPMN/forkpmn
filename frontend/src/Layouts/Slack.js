import React from 'react'; /*, { useState }*/ 
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import '../Styles/secondaryPages.css';

const Slack = () => {

    return (
        <div className='slackPage'>
          <Navbar/>
          <div className='secondaryPages vh'>
            <div className='description'>
              <p>Tu veux téléchargez le bot afin qu'il t'aide au quotidien sur ton channel Slack ?</p>
              <p>C'est par ici !</p>
            </div>
            <button className='slackButton'>
                <a href="https://slack.com/oauth/v2/authorize?client_id=3099553925446.3329920477507&scope=app_mentions:read,channels:history,chat:write,commands,emoji:read,groups:history,groups:read,im:history,im:read,im:write,mpim:history,incoming-webhook&user_scope=admin">
                  <img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
                </a>
            </button>
           </div>
           <Footer/>
        </div>
    )
}

export default Slack; 