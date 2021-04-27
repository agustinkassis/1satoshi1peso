import React from 'react'
import PropTypes from 'prop-types'
import { gsap, TweenMax } from 'gsap'

class QuoteSide extends React.Component {
  updateQtyHandler (v1) {
    this.setState({
      qty: Math.floor(v1.qty)
    });
  }

  updateSymbolHandler (v1) {
    this.setState({
      symbol: v1.symbol
    });
  }

  getChangeQtyTween (qty, duration = 3) {
    const v1 = {};
    const tween = TweenMax.fromTo(v1, {
      qty: this.state.qty
    }, {
      qty: qty,
      duration: duration,
      ease: 'power1.inOut',
      onUpdate: this.updateQtyHandler.bind(this, v1),
    });

    return tween;
  }

  getChangeSymbolTween (symbol, duration = 3) {
    const v1 = {};
    const tween = TweenMax.fromTo(v1, {
      symbol: this.state.symbol
    }, {
      symbol: symbol,
      duration: duration,
      onUpdate: this.updateSymbolHandler.bind(this, v1),
    });

    return tween;
  }

  playQtyChange (qty, duration) {
    const tween = this.getChangeQtyTween(qty, duration);

    this.timeline.add(tween);
    this.timeline.play();
  }

  componentDidMount () {
    this.timeline = new gsap.timeline({});
    //
    // const v1 = {};
    // const tween = TweenMax.fromTo(v1, {
    //   qty: 0
    // }, {
    //   qty: 50433,
    //   duration: 3,
    //   //paused: true,
    //   onUpdate: this.updateQtyHandler.bind(this, v1),
    // });
    //
    // this.timeline.add(tween);
    // this.timeline.play();
  }

  constructor (props) {
    super(props);

    this.element = null;
    this.qtyElement = null;
    this.symbolElement = null;

    this.state = {
      qty: props.qty,
      symbol: props.symbol
    };
  }

  render () {
    return (
      <div ref={comp => { this.element = comp }} style={{ opacity: this.props.opacity }} className={ `side ${this.props.className}` }>
        <span ref={comp => { this.qtyElement = comp }} className="qty">
          <span>{ this.state.qty.toLocaleString() }</span>
        </span>
        <span ref={comp => { this.symbolElement = comp }} className="symbol">
          <span>{ this.state.symbol }</span>
        </span>
      </div>
    );
  }
}

QuoteSide.defaultProps = {
  opacity: 1
};

QuoteSide.propTypes = {
  className: PropTypes.string,
  qty: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  opacity: PropTypes.number,
};

export default QuoteSide
