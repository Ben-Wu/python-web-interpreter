import React from 'react';

class TerminalOutput extends React.Component {
  render() {
    return (
      <div className={`terminal-output ${this.props.error ? 'error' : ''}`}>
        {this.props.text}
      </div>
    );
  }
}

export default TerminalOutput;