import React from 'react';

import Header from './Header';
import Terminal from './Terminal';

import '../styles/app.scss';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <Terminal/>
      </div>
    );
  }
}

export default App;
