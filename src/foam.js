import React from 'react'
import './foam.scss'
import Slider from './slider.js'

const Foam = React.createClass({
  getInitialState() {
    return {
      value: 0
    }
  },

  handleValue(value) {
    this.setState({ value : value });
  },

  handleClick() {
    this.props.saveValues({ foam : this.state.value });
    this.props.nextView();
  },

  render() {
    return(
      <div className="foam">
        <div className="foam__adjust">

          <Slider
            handleValue={ this.handleValue }
            value={ this.state.value }
          />

          <div className="foam__adjust__cup">
            <svg viewBox="0 0 150 100">
              <path d="m 28,6 c 0,32 9,69 19,84 l 56,0 C 113,75 122,38 122,6"/>
              <path d="m122,15c33,3 21,60 -9,55"/>

              <path d="m 37,5 c 0,25 4,50 14,75 l 47,0 C 108,55 113,30 113,5 Z" fill="url(#foam)"/>
                <defs>
                  <linearGradient id="foam" x1="100%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="#fff" offset={ this.state.value + '%' }/>
                    <stop stopOpacity="0" offset={ this.state.value + '%' }/>
                  </linearGradient>
                </defs>
            </svg>
            <div className="value">{ this.state.value + '%' }</div>
          </div>
        </div>

        <button className="next" onClick={ this.handleClick }>NEXT</button>
      </div>
    )
  }
})

export default Foam
