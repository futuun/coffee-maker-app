import React from 'react'
import './size.scss'

const Size = React.createClass({
  getInitialState() {
    // best place to store name and cup images?
    return {
      cups: [
        {
          name: 'S',
          path: [
            'M71,97h58c0,33-15,35-15,51H86C86,132,71,130,71,97z',
            'M129,104c5,0,11,2,11,14c0,14-15,16-21,16',
          ],
        },
        {
          name: 'M',
          path: [
            'M64,89h74c0,31-13,54-23,59H87C77,143,64,120,64,89z',
            'M137,95c4,0,14,3,14,15c0,21-16,23-23,23',
          ],
        },
        {
          name: 'XL',
          path: [
            'M63,74c0,26,4,56,14,74h44c10-18,15-48,15-74H63z',
            'M135,89c5,0,17,1.1,17,18c-0.13,16-8.2,26-25,26',
          ],
        },
        {
          name: 'L',
          path: [
            'M64,82c0,16,3,48,15,66h44c12-18,15-50,15-66H64z',
            'M139,89c5,0,14,6,14,16c0,25-11,28-22,28',
          ],
        },
      ], // 1st path is for cup shape, 2nd path is for cup handle
    };
  },

  handleClick(value) {
    // value === name of the cup size
    this.props.saveValues({ size : value });
    this.props.nextView();
  },

  render () {
    let cups = this.state.cups.map((cup, i) => {
      return (
        <div key={ i }
            className={ this.props.viewsValues.size === cup.name
                   ? "cup-size__icon selected"
                   : "cup-size__icon"
            // add class selected to clicked item (for animation purpose)
            // selected item should expand and cover whole section
          }
            onClick={ this.handleClick.bind(this, cup.name) }
        >
          <svg viewBox="0 0 200 160">
            { cup.path.map((path, i) => {
              return <path key={ i } d={ path } />
            }, this) }
          </svg>
          <p>{ cup.name }</p>
        </div>
      );
    });

    return (
      <div className="cup-size">
        { cups }
      </div>
    )
  }
})

export default Size
