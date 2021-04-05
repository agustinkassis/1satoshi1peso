import React from 'react'
import PropTypes from 'prop-types'
import { TweenMax } from 'gsap'

class ProgressBar extends React.Component {
  constructor (props) {
    super(props);

    this.element = null;
  }

  getShowTween (duration = 3) {
    const tween = TweenMax.fromTo(this.element, duration, {
      y: -400,
      scale: 0.4,
    }, {
      y: 0,
      scale: 1,
      ease: 'power2.out',
      autoAlpha: 1,
    });

    return tween;
  }

  render () {
    return (
      <section ref={comp => { this.element = comp }} style={{ opacity: this.props.opacity }} id="progress">
        <div>Progreso</div>
        <div className="progress" style={{ height: '50px' } }>
          <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: this.props.progress + '%' } }>{ this.props.progress }%</div>
        </div>
      </section>
    );
  }
}

ProgressBar.defaultProps = {
  opacity: 0,
  progress: 0
};

ProgressBar.propTypes = {
  opacity: PropTypes.number,
  progress: PropTypes.number,
};

export default ProgressBar
