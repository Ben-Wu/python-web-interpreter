import React from 'react';
import Textarea from 'react-textarea-autosize';

import TerminalInputReadOnly from './TerminalInputReadOnly';
import '../styles/terminal.scss';

class TerminalInput extends TerminalInputReadOnly {

  constructor(props) {
    super(props);

    this.state = {
      currentInput: props.text || '',
      historyPosition: props.history.length,
      pendingInput: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.inputField = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.history.length !== this.props.history.length) {
      this.setState({
        historyPosition: this.props.history.length
      });
    } else if (prevProps.text !== this.props.text) {
      this.setState({
        currentInput: this.props.text
      });
      this.inputField.focus();
    }
  }

  handleInputChange(e) {
    this.setState({currentInput: e.target.value});
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) { // enter
      e.preventDefault();
      e.stopPropagation();
      this.props.onSubmit(this.state.currentInput);
      this.setState({
        currentInput: '',
        pendingInput: ''
      });
    } else if (e.keyCode === 38) { // up
      if (this.state.historyPosition === 0 || this.props.history.length === 0) {
        return;
      }
      const historyPosition = Math.max(this.state.historyPosition - 1, 0);
      const line = this.props.history[historyPosition];
      if (historyPosition === this.props.history.length - 1) {
        this.setState({
          currentInput: line,
          pendingInput: this.state.currentInput,
          historyPosition
        });
      } else {
        this.setState({
          currentInput: line,
          historyPosition
        });
      }
    } else if (e.keyCode === 40) { // down
      if (this.props.history.length === 0) {
        return;
      }
      const historyPosition = Math.min(this.state.historyPosition + 1, this.props.history.length);
      const line = historyPosition === this.props.history.length
        ? this.state.pendingInput
        : this.props.history[historyPosition];
      this.setState({
        currentInput: line,
        historyPosition
      });
    }
  }

  renderTextField() {
    return (
      <Textarea
        className="terminal-input-field"
        spellCheck={false}
        readOnly={false}
        onChange={this.handleInputChange}
        onKeyUp={this.handleKeyUp}
        value={this.state.currentInput}
        autoFocus
        inputRef={tag => {
          this.inputField = tag;
          tag.onkeydown = e => {
            if (e.keyCode === 13) e.preventDefault();
          }
        }}/>
    );
  }
}

export default TerminalInput;
