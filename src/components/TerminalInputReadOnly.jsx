import React from 'react';
import Textarea from 'react-textarea-autosize';

import '../styles/terminal.scss';

class TerminalInputReadOnly extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTextField() {
    return (
      <Textarea
        className="terminal-input-field read-only"
        spellCheck={false}
        readOnly={true}
        value={this.props.text || ''}/>
    );
  }

  render() {
    return (
      <div className="terminal-input">
        <span className="terminal-input-caret">>>  </span>
        {this.renderTextField()}
      </div>
    );
  }
}

export default TerminalInputReadOnly;
