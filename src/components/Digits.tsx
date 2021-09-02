import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import { TweenMax } from "gsap";

type IProps = {
  amount?: number;
};

type ValidIndexType =
  | "integer"
  | "comma"
  | "delimiter"
  | "belowzero"
  | "number"
  | "digit";

class Digits extends React.Component<IProps> {
  element: HTMLElement;

  static propTypes = {
    amount: PropTypes.number,
  };

  generateAmount(amount: number): ReactElement[] {
    const str = amount.toLocaleString("es", {
      maximumFractionDigits: 8,
    });

    const spanArr: ReactElement[] = [];
    let isInteger = true;

    str.split("").forEach((num, i) => {
      const classes: ValidIndexType[] = ["digit"];
      if (num === ",") {
        isInteger = false;
        classes.push("comma");
      } else {
        classes.push(isInteger ? "integer" : "belowzero");
      }
      num === "." && classes.push("delimiter");

      !isNaN && classes.push("number");

      const spanElement = (
        <span className={classes.join(" ")} key={i}>
          {num}
        </span>
      );
      spanArr.push(spanElement);
    });

    return spanArr;
  }

  getShowTween(duration = 3) {
    const tween = TweenMax.fromTo(
      this.element,
      duration,
      {
        y: -400,
        scale: 0.4,
      },
      {
        y: 0,
        scale: 1,
        ease: "power2.out",
        autoAlpha: 1,
      }
    );

    return tween;
  }

  render() {
    return (
      <span className="qty digits">
        {this.generateAmount(this.props.amount)}
      </span>
    );
  }
}

export default Digits;
