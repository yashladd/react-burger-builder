import React, { Fragment, Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSidedrawer: true,
  };

  sidebarClosedHandler = () => {
    this.setState({ showSidedrawer: false });
  };
  render() {
    return (
      <Fragment>
        <Toolbar />
        <SideDrawer
          closed={this.sidebarClosedHandler}
          open={this.state.showSidedrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}
export default Layout;
