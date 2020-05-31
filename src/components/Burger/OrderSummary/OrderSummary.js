import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
  const ingSumary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>Order Summary:</p>
      <ul>{ingSumary}</ul>
      <p>
        <strong> Total price: {props.price.toFixed(2)} </strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType='Danger' clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button btnType='Success' clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Fragment>
  );
};

export default OrderSummary;
