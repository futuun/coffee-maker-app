import React from 'react'
import './main.scss'

import Size from './size.js'

var viewsValues = {
  size    : null,
  type    : null,
  balance : null,
  foam    : null,
} // for value selected in child components

const App = React.createClass({
  getInitialState() {
    return {
      currentView: 0
    };
  },

  nextView() {
    this.setState({ currentViewr : currentView + 1 });
  },

  saveValues(value) {
    return () => {
      viewsValues = assign({}, viewsValues, value)
    }.bind(this)();
  },

  render () {
    let title = ['Size', 'Milk Type', 'Milk Balance', 'Foam'];


    return (
      <div className="coffee-app">
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

              default: null;
            }
          })()}
        </div>
      </div>
    )
  }
})

export default App
