import React from "react";
import PropTypes from "prop-types";
import { gsap, TweenMax } from "gsap";
import Digits from "./Digits";

interface IState {
  qty: number;
  currentSymbolIndex: number;
}

type IProps = typeof QuoteSide.defaultProps & {
  className?: string;
  qty: number;
  symbols: string[];
  opacity?: number;
  prefix?: string;
};

const countZeroDecimals = (num: number) => {
  return Math.abs(-Math.floor(Math.log(num) / Math.log(10) + 1));
};

class QuoteSide extends React.Component<IProps, IState> {
  timeline: gsap.core.Timeline;
  element: HTMLDivElement;
  qtyElement: Digits;
  symbolElement: HTMLSpanElement;

  static defaultProps = {
    opacity: 1,
    prefix: "",
  };

  static propTypes = {
    className: PropTypes.string,
    qty: PropTypes.number.isRequired,
    symbols: PropTypes.arrayOf(PropTypes.string).isRequired,
    opacity: PropTypes.number,
    prefix: PropTypes.string,
  };

  updateQtyHandler(v1: { qty: number }) {
    this.setState({
      qty: Math.floor(v1.qty),
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

  playQtyChange(qty: number, duration: number) {
    const tween = this.getChangeQtyTween(qty, duration);

    this.timeline.add(tween);
    this.timeline.play();
  }

  generateCommaMoveTween({
    element,
    step,
    duration,
  }: {
    element: string;
    step: number;
    duration: number;
  }): gsap.core.Tween {
    return gsap.to(element, {
      ease: "circ",
      keyframes: [
        {
          duration: duration,
          left: "-=" + step.toFixed(2) + "vh",
        },
      ],
    });
  }

  generateCommaBounceTween({
    element,
    repeat,
    duration,
  }: {
    element: string;
    repeat: number;
    duration: number;
  }): gsap.core.Tween {
    return gsap.to(element, {
      ease: "circ",
      repeat: repeat,
      keyframes: [
        {
          duration: duration / 2,
          top: "1.4vh",
        },
        {
          duration: duration / 2,
          top: "0vh",
        },
      ],
    });
  }

  generateDigitsPaddingTween({
    elements,
    duration,
  }: {
    elements: string;
    duration: number;
  }): gsap.core.Tween {
    const spans = Array.from(document.querySelectorAll(elements)).reverse();
    return gsap.to(spans, {
      duration: duration * spans.length,
      keyframes: [
        {
          duration: duration / 4 / 3,
          paddingLeft: "1.3vh",
        },
        {
          delay: duration / 2,
          duration: duration / 4 / 3,
          paddingLeft: "0vh",
          paddingRight: "1.3vh",
        },
        {
          duration: duration / 4 / 3,
          paddingRight: "0vh",
        },
      ],
      stagger: duration,
    });
  }

  generateZerosTween({
    elements,
    duration,
  }: {
    elements: string;
    duration: number;
  }): gsap.core.Tween {
    const spans = Array.from(document.querySelectorAll(elements));
    return gsap.fromTo(
      spans,
      duration * spans.length,
      {
        scale: 0,
        display: "inline-block",
      },
      {
        duration: duration * spans.length,
        ease: "elastic",
        scale: 1,
        width: "auto",
        stagger: duration,
      }
    );
  }

  generateZerosRemovalTween({
    elements,
    duration,
    decimals,
  }: {
    elements: string;
    duration: number;
    decimals: number;
  }): gsap.core.Tween {
    const spans = Array.from(document.querySelectorAll(elements))
      .splice(decimals)
      .reverse();

    return gsap.fromTo(
      spans,
      duration * spans.length,
      {
        display: "inline-block",
      },
      {
        duration: duration * spans.length,
        ease: "power2",
        scale: 0,
        width: 0,
        opacity: 0,
        stagger: duration,
      }
    );
  }

  getCommaTimeline(
    commaElement: string,
    digitsElements: string,
    decimals = 3,
    duration = 0.4
  ) {
    const timeline = gsap.timeline({});
    const steps = this.state.qty.toString().length;
    const stepLong = 4.42;

    decimals = decimals - countZeroDecimals(this.state.qty / 100000000);

    timeline.addLabel("comma_timeline");

    timeline.add(
      gsap.set(commaElement, {
        scale: 1,
        width: "1.6vh",
        display: "inline-block",
        left: stepLong * steps + 1.8 + "vh",
        position: "absolute",
      })
    );

    for (let i = 0; i < steps; i++) {
      timeline.add(
        this.generateCommaMoveTween({
          element: commaElement,
          step: stepLong,
          duration: duration,
        })
      );
      if (i === decimals) {
        timeline.addLabel("start_zero_removal");
      }
    }

    timeline.add(
      this.generateCommaBounceTween({
        element: commaElement,
        repeat: steps - 1,
        duration: duration,
      }),
      "comma_timeline-=0.01"
    );

    timeline.add(
      this.generateDigitsPaddingTween({
        elements: digitsElements,
        duration,
      }),
      "comma_timeline+=0.1"
    );

    timeline.addLabel("comma_positioned");
    timeline.add(
      gsap.set(commaElement, {
        position: "inherit",
        width: "auto",
      }),
      "comma_positioned"
    );
    timeline.add(
      gsap.set(".mainQuote .side.right .digits.visible", {
        paddingLeft: 0,
      }),
      "comma_positioned"
    );

    timeline.add(
      this.generateZerosTween({
        elements: ".mainQuote .side.right .digits.prefix .digit.number",
        duration,
      })
    );

    timeline.add(
      this.generateZerosRemovalTween({
        elements: ".mainQuote .side.right .digits.visible .digit.number",
        duration,
        decimals,
      }),
      "start_zero_removal"
    );

    // timeline.timeScale(0.3);
    return timeline;
  }

  componentDidMount() {
    this.timeline = gsap.timeline({});
  }

  constructor(props: IProps) {
    super(props);

    this.state = {
      qty: props.qty,
      currentSymbolIndex: 0,
    };
  }

  generateSymbols(symbols: string[]): JSX.Element[] {
    return this.props.symbols.map((symbol, k) => {
      const label = symbol.toLowerCase();
      return (
        <span className={label} key={label}>
          {symbol}
        </span>
      );
    });
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
        <span className="numbers">
          <Digits
            ref={(comp) => {
              this.qtyElement = comp;
            }}
            className="prefix"
            amount={this.props.prefix}
          />
          <Digits
            ref={(comp) => {
              this.qtyElement = comp;
            }}
            className="visible"
            amount={this.state.qty}
          />
        </span>
        <span
          ref={(comp) => {
            this.symbolElement = comp;
          }}
          className="symbol"
        >
          {this.generateSymbols(this.props.symbols)}
        </span>
      </div>
    );
  }
}

export default QuoteSide;
