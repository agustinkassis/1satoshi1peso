import React from "react";
import PropTypes from "prop-types";

import { TimelineMax, Elastic } from "gsap";

import QuoteSide from "./QuoteSide";

export interface SideProps {
  qty: number;
  symbol: string;
}

type IProps = {
  left: SideProps;
  right: SideProps;
  autoplay?: boolean;
  opacity?: number;
};

class Quote extends React.Component<IProps> {
  leftSide: QuoteSide;
  rightSide: QuoteSide;
  element: HTMLDivElement;
  equal: HTMLSpanElement;

  static defaultProps = {
    autoplay: true,
    opacity: 0,
  };

  static propTypes = {
    left: PropTypes.exact(QuoteSide.propTypes).isRequired,
    right: PropTypes.exact(QuoteSide.propTypes).isRequired,
    autoplay: PropTypes.bool,
    opacity: PropTypes.number,
  };

  getShowTween(duration = 3) {
    const timeline = new TimelineMax();

    timeline.fromTo(
      this.leftSide.element,
      1,
      {
        opacity: 0,
        scale: 0.3,
      },
      {
        origin: "top right",
        opacity: 1,
        scale: 1,
        rotation: 360,
        ease: "power2.out",
        autoAlpha: 1,
      },
      "start"
    );

    timeline.fromTo(
      this.equal,
      0.5,
      {
        opacity: 0,
        x: -20,
      },
      {
        opacity: 1,
        x: 0,
        // scale: 1,
        ease: "power2.in",
        autoAlpha: 1,
      },
      "-=0.3"
    );

    timeline.fromTo(
      this.rightSide.element,
      1.2,
      {
        opacity: 0,
        x: 60,
      },
      {
        x: 0,
        opacity: 1,
        ease: Elastic.easeOut,
        autoAlpha: 1,
      },
      "+=0.2"
    );

    return timeline;
  }

  render() {
    return (
      <div
        ref={(comp) => {
          this.element = comp;
        }}
        className="quote"
      >
        <QuoteSide
          ref={(comp) => {
            this.leftSide = comp;
          }}
          opacity={this.props.opacity}
          className="left"
          qty={this.props.left.qty}
          symbol={this.props.left.symbol}
        />

        <span
          ref={(comp) => {
            this.equal = comp;
          }}
          style={{ opacity: this.props.opacity }}
          className="equal"
        >
          =
        </span>

        <QuoteSide
          ref={(comp) => {
            this.rightSide = comp;
          }}
          opacity={this.props.opacity}
          className="right"
          qty={this.props.right.qty}
          symbol={this.props.right.symbol}
        />
      </div>
    );
  }
}

export default Quote;
