import React from 'react';

import '../styles/terminal.scss';

class Terminal extends React.Component {

  handleLineInput(e) {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      console.log(e.target.value);
    }
  }

  render() {
    return (
      <div className="terminal">
        Terminal
        <input type="text" onKeyPress={this.handleLineInput}/>
      </div>
    );
  }
}

export default Terminal;
