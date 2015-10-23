import React from 'react'
import './balance.scss'
import Slider from './slider.js'

var myReq, start = null;

const Balance = React.createClass({
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
    // it looks like i made big ball of mud...
    if (!start) start = timestamp;

    this.setState({ millisecondsPassed : timestamp - start });
    // and thats all here, whole logic is in rendern method #antipattern

    if (this.state.millisecondsPassed < 600) {
      myReq = window.requestAnimationFrame(this.animationFrame);
    }
  },

  handleValue(value) {
    // i don't want to send new value every time when slider was moved
    // i'm goint to send value to the parent componend when someone will
    // click next button
    this.setState({ value : value });
  },

  handleClick() {
    this.props.saveValues({ balance : this.state.value });

    // if this.state.close === true it will send differend object to children
    this.setState({ close : true });

    window.cancelAnimationFrame(myReq);
    start = 0; // restart starting point
    window.requestAnimationFrame(this.animationFrame);

    this.props.nextView();
  },

  render() {
    // i've never did this before so programming by permutation starts here...
    let open = {
      fillLowerWidth: Math.min(this.state.millisecondsPassed / 2, 112),
      fillLowerTransform: 'rotate(0 61 -45)',

      fillUpperOpacity: '1',
      fillUpperTransform: 'translate(0)',

      thumbR: Math.min(this.state.millisecondsPassed / 20 , 9),
      thumbPos: 'translate(0)',
    };

    var close = {
      fillLowerWidth: 112,
      fillLowerTransform: 'rotate('+Math.min(this.state.millisecondsPassed / 3.2, 90)+' 61 -45)',

      fillUpperOpacity: Math.min(1 - this.state.millisecondsPassed / 100, 1),
      fillUpperTransform: 'translate(0)',

      thumbR: 9,
      thumbPos: 'translate(-'+ Math.min(this.state.millisecondsPassed / 3 , this.state.value) + ')',
    };
    // end of gas factory...

    return(
      <div className="milk-balance">
        <p>{ this.state.value + '%' }</p>

        <Slider
          styles={ this.state.close ? close : open }
          frame={ this.state.millisecondsPassed }
          handleValue={ this.handleValue }
          value={ this.state.value }
        />

        <button className="next" onClick={ this.handleClick }>NEXT</button>
      </div>
    )
  }
})

export default Balance
