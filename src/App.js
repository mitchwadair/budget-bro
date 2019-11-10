import React from 'react';
import './App.scss';

import TitleBar from './components/TitleBar/TitleBar.js';
import Content from './components/Content/Content.js'

function App() {
  return (
    <div className="App">
      <TitleBar/>
      <Content>
        HELLO
      </Content>
    </div>
  );
}

export default App;
