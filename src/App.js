import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

export class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/auth' exact component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/orders' exact component={asyncOrders} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/auth' exact component={asyncAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
