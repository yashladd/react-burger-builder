import React, { Fragment, Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSidedrawer: false,
  };

  sidebarClosedHandler = () => {
    this.setState({ showSidedrawer: false });
  };
  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSidedrawer: !prevState.showSidedrawer };
    });
  };
  render() {
    return (
      <Fragment>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
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
