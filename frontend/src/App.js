import React from 'react';
import './App.css';
import Slack from './Components/Slack';
import Discord from './Components/Discord';
import './Components/components.css';

const App = () => {
  
  return (
    <div className="App">
      <header className="App-header">
      <p>Bienvenue !</p>
        <img src='/icon.png' alt='bot-img'/>

        <Discord/>
        <Slack/>
      </header>
    </div>
  );
}

export default App;
