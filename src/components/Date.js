import React from 'react'
import PropTypes from 'prop-types'
import { TweenMax } from 'gsap'

class Date extends React.Component {
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
      <section ref={comp => { this.element = comp }} style={{ opacity: this.props.opacity }} id="date">
        <h1>Hoy 20 de Noviembre, 13:25</h1>
      </section>
    );
  }
}

Date.defaultProps = {
  opacity: 0
};

Date.propTypes = {
  opacity: PropTypes.number,
};

export default Date
