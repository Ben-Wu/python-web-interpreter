import React from 'react';

import '../styles/history.scss';

class HistoryView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };

    this.onHeaderClicked = this.onHeaderClicked.bind(this);
  }

  onHeaderClicked() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const icon = this.state.collapsed ? '▴' : '▾';

    return (
      <div className="history-view">
        <div className="header" onClick={this.onHeaderClicked}>
          <div className="title">History</div>
          <div className="icon">{icon}</div>
        </div>
        <div className={`line-container ${this.state.collapsed ? 'collapsed' : ''}`}>
          {this.props.lines.map((line, i) =>
            <div className="history-line" key={i}
                 onClick={() => this.props.onLineSelected(line)}>
              <span className="caret">>> </span>{line}
            </div>
          )}
        </div>
      </div>
    );
  }

}

export default HistoryView;
