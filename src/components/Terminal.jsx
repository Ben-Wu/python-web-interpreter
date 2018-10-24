import React from 'react';

import '../styles/terminal.scss';

class Terminal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentInput: '',
      currentOutput: '',
      error: false,
      ready: false,
      version: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    languagePluginLoader.then(() => {
      pyodide.runPython('print("Python ready to use")');
      pyodide.runPython('import sys');
      const version = pyodide.runPython('sys.version');
      this.setState({
        ready: true,
        version
      });
    });
  }

  handleInputChange(e) {
    this.setState({currentInput: e.target.value});
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      console.log(this.state.currentInput);
      try {
        const currentOutput = window.pyodide.runPython(this.state.currentInput);
        this.setState({
          error: false,
          currentOutput
        });
      } catch (e) {
        const currentOutput = e.message.split('\n').map(line => <div className="error" key={line}>{line}</div>);
        this.setState({
          error: true,
          currentOutput
        });
      }
    }
  }

  renderPyodideLoadingView() {
    return (
      <div>Initializing Python...</div>
    );
  }

  renderTerminalView() {
    return (
      <div>
        <div className="terminal-output">Python {this.state.version}</div>
        <span>>>  </span>
        <input className="terminal-input" type="text" onChange={this.handleInputChange}
               onKeyUp={this.handleKeyUp}/>
        <div className={`terminal-output ${this.state.error ? 'error' : ''}`}>
          {this.state.currentOutput}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="terminal">
        {this.state.ready ? this.renderTerminalView() : this.renderPyodideLoadingView()}
      </div>
    );
  }
}

export default Terminal;
