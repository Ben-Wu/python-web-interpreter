import React from 'react';

import TerminalInput from './TerminalInput';
import TerminalInputReadOnly from './TerminalInputReadOnly';
import TerminalOutput from './TerminalOutput';
import '../styles/terminal.scss';

class Terminal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentOutput: '',
      error: false,
      ready: false,
      version: '',
      lines: [],
      inputHistory: [],
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
    const lines = this.state.lines.slice();
    lines.push(this.renderInputLine(lines.length, line));

    if (line.trim() === '') {
      this.setState({lines});
      return;
    }

    try {
      const currentOutput = window.pyodide.runPython(line);
      console.log(currentOutput);
      lines.push(this.renderOutputLine(lines.length, currentOutput, false))
    } catch (e) {
      const currentOutput = e.message.split('\n')
        .map((line, i) => <div className="error" key={i}>{line}</div>);
      lines.push(this.renderOutputLine(lines.length, currentOutput, false));
    }

    const inputHistory = this.state.inputHistory.slice();
    inputHistory.push(line);

    this.setState({
      inputHistory,
      lines
    });
  }

  renderInputLine(key, text) {
    return (
      <TerminalInputReadOnly key={key} text={text}/>
    );
  }

  renderOutputLine(key, text, error) {
    return (
      <TerminalOutput key={key} text={text} error={error}/>
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
        <TerminalInput onSubmit={this.handleSubmitLine} text={this.state.currentInput}
                       readOnly={false} history={this.state.inputHistory}/>
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
