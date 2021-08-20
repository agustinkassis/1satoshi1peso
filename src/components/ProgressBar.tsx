import React from "react";
import PropTypes from "prop-types";
import { TweenMax } from "gsap";
import { LinearProgress } from "@material-ui/core";

type IProps = typeof ProgressBar.defaultProps & {
  opacity?: number;
  progress?: number;
};

class ProgressBar extends React.Component<IProps> {
  element: HTMLElement;

  static defaultProps = {
    opacity: 0,
    progress: 0,
  };

  static propTypes = {
    opacity: PropTypes.number,
    progress: PropTypes.number,
  };

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
      <section
        ref={(comp) => {
          this.element = comp;
        }}
        style={{ opacity: this.props.opacity }}
        id="progress"
      >
        <div>Progreso</div>

        <LinearProgress
          style={{ height: "45px" }}
          variant="determinate"
          value={this.props.progress}
        />
      </section>
    );
  }
}

export default ProgressBar;
