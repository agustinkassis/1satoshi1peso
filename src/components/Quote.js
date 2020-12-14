import React from 'react'
import PropTypes from 'prop-types'

import { TweenMax, TimelineLite } from "gsap"

import QuoteSide from './QuoteSide'

class Quote extends React.Component {
  constructor (props) {
    super(props);

    this.leftSide = null;
    this.rightSide = null;
  }

  componentDidMount () {
  }

  render () {
    return (
      <div className="quote">
        <QuoteSide ref={comp => { this.leftSide = comp }} className="left" qty={ this.props.left.qty } symbol={ this.props.left.symbol } />
        <span className="equal">=</span>
        <QuoteSide ref={comp => { this.rightSide = comp }} className="right" qty={ this.props.right.qty } symbol={ this.props.right.symbol } />
      </div>
    );
  }
}

Quote.propTypes = {
  left: PropTypes.exact(QuoteSide.propTypes).isRequired,
  right: PropTypes.exact(QuoteSide.propTypes).isRequired,
};

export default Quote
