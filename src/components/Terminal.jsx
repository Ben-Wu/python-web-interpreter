import React from 'react';

import TerminalInput from './TerminalInput';
import '../styles/terminal.scss';

class Terminal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentOutput: '',
      error: false,
      ready: false,
      version: '',
      lines: []
    };

    this.handleSubmitLine = this.handleSubmitLine.bind(this);
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

  handleSubmitLine(line) {
    console.log(line);
    const lines = this.state.lines.slice();
    lines.push(this.renderInputLine(line.slice(0, line.length - 1)));
    this.setState({lines});
    /*
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
     */
  }

  renderInputLine(text) {
    return (
      <TerminalInput readOnly={true} text={text}/>
    );
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
        {this.state.lines}
        {<TerminalInput onSubmit={this.handleSubmitLine} text={this.state.currentInput} readOnly={false}/>}
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
