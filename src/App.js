import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.scss';

import TitleBar from './components/TitleBar/TitleBar.js';
import Content from './components/Content/Content.js'

import Home from './components/Pages/Home/Home';

function App() {
  const [theme, setTheme] = useState('dark');

  const handleSetTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div className={`App theme-${theme}`}>
      <TitleBar themeChange={handleSetTheme}/>
      <Content>
        <Router>
          <Switch>
            <Route path='/' component={Home}/>
          </Switch>
        </Router>
      </Content>
    </div>
  );
}

export default App;
