import React from 'react'
import './balance.scss'
import Slider from './slider.js'

const Balance = React.createClass({
  getInitialState() {
    return {
      value: 0,
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
    this.props.nextView();
  },

  render() {
    return(
      <div className="milk-balance">
        <p>{ this.state.value + '%' }</p>

        <Slider
          handleValue={ this.handleValue }
          value={ this.state.value }
        />

        <button className="next" onClick={ this.handleClick }>NEXT</button>
      </div>
    )
  }
})

export default Balance
