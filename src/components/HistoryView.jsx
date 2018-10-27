import React from 'react';

import '../styles/history.scss';

class HistoryView extends React.Component {
  render() {
    const icon = this.props.collapsed ? '▴' : '▾';

    return (
      <div className="history-view">
        <div className="header">
          <div className="title">History</div>
          <div className="icon">{icon}</div>
        </div>
        <div className="line-container">
          {this.props.lines.map((line, i) =>
            <div className="history-line" key={i}>
              <span className="caret">>> </span>{line}
            </div>
          )}
        </div>
      </div>
    );
  }

}

export default HistoryView;
