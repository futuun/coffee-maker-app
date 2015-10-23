import React from 'react'
import './type.scss'

const Type = React.createClass({
  getInitialState() {
    return {
      milkTypes: [
        {
          name: 'Cow',
          path: [
            'M48,25c-7,11-5,21,6,30c-10,24,2,23,6-0.5h12C75,78,87,79,78,55c11-9,13-19,6-30',
          ],
        },
        {
          name: 'Soy',
          path: [
            'M85,28c-7-7-19,4-12,12',
            'M70,43c-7-7-19,4-12,12',
            'M55,58c-7-7-19,4-12,12',
            'M38,75l51-51c3,3,3,5,1,7s-2,3-2,6c0,4-4,7-8,7s-7,3-7,7c0,3-3,7-7,7s-8,4-8,8s-3,8-7,8C42,74,45,77,38,75z',
          ],
        },
        {
          name: 'Rice',
          path: [
            'M51,48c4,4,14-6,10-10S47,44,51,48z',
            'M68,36c4,4,14-6,10-10S64,32,68,36z',
            'M63,60c4,4,14-6,10-10S59,56,63,60z',
            'M45,72c4,4,14-6,10-10S41,68,45,72z',
          ],
        },
        {
          name: 'Coconut',
          path: [
            'M67,31c-9-9-34,16-25,25S76,40,67,31z',
            'M38,60c13,13,44-23,34-33C61,16,26,48,38,60z',
            'M72,27c0,0,21,20,3,38s-37-5-37-5',
          ],
        },
      ]
    }
  },

  handleClick(argumentValue) {
    let data = {
      type : argumentValue,
    }
    this.props.saveValues(data);
    this.props.nextView();
  },

  render () {
    let milkTypes = this.state.milkTypes.map((milkType, i) => {
      return(
        <div key={ i }
          className="milk-type__icon"
          onClick= { this.handleClick.bind(this, milkType.name) }>

          <svg viewBox="0 0 115 100">
            { milkType.path.map((path, i) => {
              return <path key={ i } d={ path } />
            }, this) }
          </svg>

          <p>{ milkType.name }</p>
        </div>
      );
    });

    return (
      <div className="milk-type">
        { milkTypes }
      </div>
    )
  }
})

export default Type
