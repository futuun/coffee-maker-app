import React from 'react'
import './foam.scss'
import Slider from './slider.js'

var myReq, start = null;

const Foam = React.createClass({
  getInitialState() {
    return {
      value: 0,
      millisecondsPassed: 0,
      close: false
    }
  },

  componentDidMount() {
    start = null;
    // start animation right after component mount
    myReq = window.requestAnimationFrame(this.animationFrame);
  },

  componentWillUnmount() {
    // stop animation before unmounting
    window.cancelAnimationFrame(myReq);
  },

  animationFrame(timestamp) {
    if (!start) start = timestamp;

    this.setState({ millisecondsPassed : timestamp - start });
    // well it's not realy a frame,

    if (this.state.millisecondsPassed < 600) {
      myReq = window.requestAnimationFrame(this.animationFrame);
    }
  },

  handleValue(value) {
    this.setState({ value : value });
  },

  handleClick() {
    this.props.saveValues({ foam : this.state.value });
    // if this.state.close === true it will send differend object to children
    this.setState({ close : true });

    window.cancelAnimationFrame(myReq);
    start = 0; // restart starting point
    myReq = window.requestAnimationFrame(this.animationFrame);

    this.props.nextView();
  },

  render() {
    let open = {
      fillLowerWidth: 112,
      fillLowerTransform: 'rotate(0)',

      fillUpperOpacity: '1',
      fillUpperTransform: 'translate(0)',

      thumbR: 9,
      thumbPos: 'translate('
          + Math.max(112 - this.state.millisecondsPassed / 3, 0)
          + ')',
    };

    let close = {
      fillLowerWidth: 112,
      fillLowerTransform: 'scale('+Math.max(1 - this.state.millisecondsPassed / 200, 0) +',1)',

      fillUpperOpacity: '1',
      fillUpperTransform: 'scale('+ Math.max(1 - this.state.millisecondsPassed / 200, 0) +',1)',

      thumbR: Math.max(this.state.millisecondsPassed > 200 ? 20 - this.state.millisecondsPassed / 20 : 9, 0),
      thumbPos: 'translate(-'+ Math.min(this.state.millisecondsPassed / 3 , this.state.value) + ')',
    };

    return(
      <div className="foam">
        <div className="foam__adjust">

          <Slider
            styles={ this.state.close ? close : open }
            frame={ this.state.millisecondsPassed }
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
