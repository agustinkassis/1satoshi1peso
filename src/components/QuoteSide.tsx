import React from "react";
import PropTypes from "prop-types";
import { gsap, TweenMax } from "gsap";
import Digits from "./Digits";

interface IState {
  symbol: string;
  qty: number;
}

type IProps = typeof QuoteSide.defaultProps & {
  className?: string;
  qty: number;
  symbol: string;
  opacity?: number;
};

class QuoteSide extends React.Component<IProps, IState> {
  timeline: gsap.core.Timeline;
  element: HTMLDivElement;
  qtyElement: Digits;
  symbolElement: HTMLSpanElement;

  static defaultProps = {
    opacity: 1,
  };

  static propTypes = {
    className: PropTypes.string,
    qty: PropTypes.number.isRequired,
    symbol: PropTypes.string.isRequired,
    opacity: PropTypes.number,
  };

  updateQtyHandler(v1: { qty: number }) {
    this.setState({
      qty: Math.floor(v1.qty),
    });
  }

  updateSymbolHandler(v1: { symbol: string }) {
    this.setState({
      symbol: v1.symbol,
    });
  }

  getChangeQtyTween(qty: number, duration = 3) {
    const v1 = { qty: 0 };
    const tween = TweenMax.fromTo(
      v1,
      {
        qty: this.state.qty,
      },
      {
        qty: qty,
        duration: duration,
        ease: "power1.inOut",
        onUpdate: this.updateQtyHandler.bind(this, v1),
      }
    );

    return tween;
  }

  getChangeSymbolTween(symbol: string, duration = 3) {
    const v1 = { symbol: "usd" };
    const tween = TweenMax.fromTo(
      v1,
      {
        symbol: this.state.symbol,
      },
      {
        symbol: symbol,
        duration: duration,
        onUpdate: this.updateSymbolHandler.bind(this, v1),
      }
    );

    return tween;
  }

  playQtyChange(qty: number, duration: number) {
    const tween = this.getChangeQtyTween(qty, duration);

    this.timeline.add(tween);
    this.timeline.play();
  }

  componentDidMount() {
    // eslint-disable-next-line new-cap
    this.timeline = gsap.timeline({});
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

  constructor(props: IProps) {
    super(props);

    this.state = {
      qty: props.qty,
      symbol: props.symbol,
    };
  }

  render() {
    return (
      <div
        ref={(comp) => {
          this.element = comp;
        }}
        style={{ opacity: this.props.opacity }}
        className={`side ${this.props.className}`}
      >
        <Digits
          ref={(comp) => {
            this.qtyElement = comp;
          }}
          amount={this.state.qty}
        />
        <span
          ref={(comp) => {
            this.symbolElement = comp;
          }}
          className="symbol"
        >
          <span>{this.state.symbol}</span>
        </span>
      </div>
    );
  }
}

export default QuoteSide;
