import React from 'react';

import '../styles/header.scss';

class Header extends React.Component {
  render() {
    return (
      <div className="app-header">
        <div className="app-header-title">Python Web Interpreter</div>
        <a className="source-link" href="https://github.com/Ben-Wu/python-web-interpreter">
          View Source
        </a>
      </div>
    );
  }
}

export default Header;
