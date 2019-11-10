import React, {useState} from 'react';
import {Router, Route} from 'react-router-dom'
import './App.scss';

import TitleBar from './components/TitleBar/TitleBar.js';
import Content from './components/Content/Content.js'

function App() {
  const [theme, setTheme] = useState('dark');

  const handleSetTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div className={`App theme-${theme}`}>
      <TitleBar themeChange={handleSetTheme}/>
      <Router>
        <Content>
          HELLO
        </Content>
      </Router>
    </div>
  );
}

export default App;
