import React from 'react'
import './main.scss'

import Size from './size.js'
import Type from './type.js'
import Balance from './balance.js'
import Foam from './foam.js'

// while compiling Object.assign with babel i've got weird error in IE,
// i was to lazy to debug this issues properly so i've used this polifir instead
import assign from 'object-assign'

var viewsValues = {
  size    : null,
  type    : null,
  balance : null,
  foam    : null,
} // for value selected in child components

const App = React.createClass({
  getInitialState() {
    return {
      currentView: 0,
      modifier: ' open'
    };
  },

  nextView() {
    this.setState({ modifier : ' close' });
    setTimeout(() => {
      this.setState({ currentView : this.state.currentView + 1 });

      // if it was last view go to first one
      if (this.state.currentView === 3) this.setState({ currentView : 0 });
      this.setState({ modifier : ' open' });
    }, 300);

    // simply add class 'close' to app, wait 300ms and then go to next view
    // it may seem dumb but adding listners to animationend will
    // drastically affect performance...
  },

  saveValues(value) {
    return () => {
      viewsValues = assign({}, viewsValues, value)
    }.bind(this)();
  },

  render () {
    let title = ['Size', 'Milk Type', 'Milk Balance', 'Foam'];

    return (
      <div className={'coffee-app' + this.state.modifier}>
        <div className="coffee-app__title">
          <p>{ title[this.state.currentView] }</p>
        </div>

        <div className="coffee-app__content">
          {(() => { // IIFE
            switch (this.state.currentView) {
              case 0:
                return (
                  <Size viewsValues={ viewsValues }
                        nextView={ this.nextView }
                        saveValues={ this.saveValues } />
                );

              case 1:
                return(
                  <Type viewsValues={ viewsValues }
                        nextView={ this.nextView }
                        saveValues={ this.saveValues } />
                );

              case 2:
                return(
                  <Balance viewsValues={ viewsValues }
                           nextView={ this.nextView }
                           saveValues={ this.saveValues } />
                );

              case 3:
                return(
                  <Foam viewsValues={ viewsValues }
                        nextView={ this.nextView }
                        saveValues={ this.saveValues } />
                );

              default: null;
            }
          })()}
        </div>
      </div>
    )
  }
})

export default App
