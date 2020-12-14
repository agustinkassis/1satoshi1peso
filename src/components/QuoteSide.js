import React from 'react'
import PropTypes from 'prop-types'

class QuoteSide extends React.Component {
  render () {
    return (
      <div className={ this.props.className }>
        <span className="qty">{ this.props.qty }</span>
        <span className="symbol">
          <span>{ this.props.symbol }</span>
        </span>
      </div>
    );
  }
}

QuoteSide.propTypes = {
  className: PropTypes.string,
  qty: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
};

export default QuoteSide
