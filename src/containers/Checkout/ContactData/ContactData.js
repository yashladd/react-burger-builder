import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

export class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };
  orderHandler = e => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'YL',
        address: {
          street: 'xyz',
          zipcode: '231231',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };
  render() {
    let form = (
      <form action=''>
        <input
          className={classes.Input}
          type='text'
          name='name'
          placeholder='Enter name'
        />
        <input
          className={classes.Input}
          type='text'
          name='email'
          placeholder='Enter name'
        />
        <input
          className={classes.Input}
          type='text'
          name='street'
          placeholder='Enter name'
        />
        <input
          className={classes.Input}
          type='text'
          name='postal'
          placeholder='Enter name'
        />
        <Button btnType='Success' clicked={this.orderHandler}>
          ORDER NOW
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
