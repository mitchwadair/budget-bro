import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.scss';

import TitleBar from './components/TitleBar/TitleBar.js';
import Content from './components/Content/Content.js'

import Landing from './components/Pages/Landing/Landing';
import CreateProfile from './components/Pages/CreateProfile/CreateProfile';
import Dashboard from './components/Pages/Dashboard/Dashboard';

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
            <Route exact path='/' component={Landing}/>
            <Route path='/createProfile' component={CreateProfile}/>
            <Route path='/dashboard/:id' component={Dashboard}/>
          </Switch>
        </Router>
      </Content>
    </div>
  );
}

export default App;
