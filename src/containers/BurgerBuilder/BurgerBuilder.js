import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';

export class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      meat: 0,
      cheese: 0,
    },
  };
  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <div>Build contols</div>
      </Fragment>
    );
  }
}

export default BurgerBuilder;
