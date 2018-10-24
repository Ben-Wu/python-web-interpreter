import React from 'react';

import '../styles/header.scss';

class Header extends React.Component {
  render() {
    return (
      <div className="app-header">
        <div className="app-header-title">Python Web Interpreter</div>
      </div>
    );
  }
}

export default Header;
