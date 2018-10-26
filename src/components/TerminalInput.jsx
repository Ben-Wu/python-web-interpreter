import React from 'react';
import Textarea from 'react-textarea-autosize';

import '../styles/terminal.scss';

class TerminalInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentInput: this.props.text || '',
      version: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleInputChange(e) {
    this.setState({currentInput: e.target.value});
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.props.onSubmit(this.state.currentInput);
      this.setState({currentInput: ''})
    }
  }

  render() {
    return (
      <div className="terminal-input">
        <span className="terminal-input-caret">>>  </span>
        <Textarea className={`terminal-input-field ${this.props.readOnly ? 'read-only' : ''}`}
                  spellCheck={false}
                  readOnly={this.props.readOnly}
                  onChange={this.handleInputChange}
                  onKeyUp={this.handleKeyUp}
                  value={this.state.currentInput}/>
      </div>
    );
  }
}

export default TerminalInput;
