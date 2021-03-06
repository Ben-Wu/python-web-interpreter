import React from 'react';

import HistoryView from './HistoryView';
import TerminalInput from './TerminalInput';
import TerminalInputReadOnly from './TerminalInputReadOnly';
import TerminalOutput from './TerminalOutput';
import '../styles/terminal.scss';

class Terminal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentInput: '',
      ready: false,
      version: '',
      lines: [],
      inputHistory: [],
    };

    this.handleSubmitLine = this.handleSubmitLine.bind(this);
    this.handleHistorySelected = this.handleHistorySelected.bind(this);
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
      let formattedOutput = null;
      if (typeof currentOutput === 'object') {
        formattedOutput = JSON.stringify(currentOutput);
      } else if (typeof currentOutput === 'function') {
        formattedOutput = currentOutput.toString();
      } else {
        formattedOutput = currentOutput;
      }
      lines.push(this.renderOutputLine(lines.length, formattedOutput, false));
    } catch (e) {
      const currentOutput = e.message.split('\n')
        .map((line, i) => <div className="error" key={i}>{line}</div>);
      lines.push(this.renderOutputLine(lines.length, currentOutput, false));
    }

    const inputHistory = this.state.inputHistory.slice();
    inputHistory.push({
      time: new Date().toLocaleString(),
      text: line
    });

    this.setState({
      inputHistory,
      lines
    });
  }

  handleHistorySelected(text) {
    this.setState({
      currentInput: text
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
      <div className="terminal-text">Initializing Python...</div>
    );
  }

  renderTerminalView() {
    return (
      <div className="terminal-text">
        <div className="terminal-output">Python {this.state.version}</div>
        {this.state.lines}
        <TerminalInput
          onSubmit={this.handleSubmitLine}
          text={this.state.currentInput}
          readOnly={false} history={this.state.inputHistory}/>
      </div>
    );
  }

  renderToolsView() {
    return (
      <div className="terminal-tools">
        <HistoryView
          lines={this.state.inputHistory}
          onLineSelected={this.handleHistorySelected}/>
      </div>
    );
  }

  render() {
    return (
      <div className="terminal">
        {this.state.ready ? this.renderTerminalView() : this.renderPyodideLoadingView()}
        {this.state.ready ? this.renderToolsView() : ''}
      </div>
    );
  }
}

export default Terminal;
