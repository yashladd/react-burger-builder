import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E mail address',
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        valid: true,
        validation: {},
      },
    },
    formIsValid: false,
    loading: false,
  };
  checkValidaity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }
    return isValid;
  };
  orderHandler = e => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const formData = {};
    for (let elementIdentifier in this.state.orderForm) {
      formData[elementIdentifier] = this.state.orderForm[
        elementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
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
  inputChangedHandler = (e, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormEle = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormEle.value = e.target.value;
    updatedFormEle.valid = this.checkValidaity(
      updatedFormEle.value,
      updatedFormEle.validation
    );
    updatedFormEle.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormEle;
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };
  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(ele => {
          return (
            <Input
              changed={e => this.inputChangedHandler(e, ele.id)}
              key={ele.id}
              elementType={ele.config.elementType}
              elementConfig={ele.config.elementConfig}
              value={ele.config.value}
              invalid={!ele.config.valid}
              shouldValidate={ele.config.validation}
              touched={ele.config.touched}
            />
          );
        })}

        <Button
          btnType='Success'
          clicked={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
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

const mapStateToProps = state => {
  return {
    price: state.totalPrice,
    ings: state.ingredients,
  };
};

export default connect(mapStateToProps)(ContactData);
