import React from 'react'
import './slider.scss'

const Slider = React.createClass({ // Poltergeist object
  // milk balance and foam have almost identical slider so there is no need
  // for writing the same code twice, i'm going just pass this one to this two
  handleChange(event) {
    // onChange/onInput doesn't work in IE https://github.com/facebook/react/issues/554
    // since this func will be invoked on mouse move
    // we have to make sure that value got changed since last assignment
    if (event.target.value === this.props.value) return;

    // unary plus operator will parse event.target.value to number
    this.props.handleValue( + event.target.value);
  },

  render() {
    return (
      <div className="slider">
        <input className="slider__root" type="range" min="0" max="100"
            value={ this.props.value }
            onChange={ this.handleChange }
            onMouseMove={ this.handleChange }
        />
        <svg className="slider__svg" viewBox="0 0 112 20">
          <rect y="7.5" rx="2" ry="2" height="5" fill="#6df"
              width="112"
          />
          <rect y="4.5" xy="5" ry="5" height="11" width="112"
              fill="url(#fill--upper)"
          />
          <circle cy="10" fill="#eee" r="9"
              cx={ this.props.value + 6 }
          />
          <defs>
            <linearGradient id="fill--upper" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop stopColor="#eee" offset={ this.props.value + '%' }/>
              <stop stopOpacity="0" offset={ this.props.value + '%' }/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  }
})

export default Slider
