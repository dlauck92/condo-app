import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/LogIn/LogIn';
// import SecretRoute from './components/SecretRoute/SecretRoute';
import Cards from './components/Cards/Cards';
import AboutCards from './components/AboutUs/AboutUs';
import axios from 'axios'


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      id:'',
      redirectTo: '/LogIn',
      sideDrawerOpen: false
  
    }

    // this.getUser = this.getUser.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    // this.getUser();
    // redirect home
    this.setState({
      redirectTo: '/LogIn'
    });
  }

  updateUser(userObject) {
    this.setState(userObject);
    console.log(userObject);
  }

  getUser() {
    axios.get('/user').then(response => {
      console.log('Get user response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username

        });
        console.log(response.data.user);
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }

  // state = {
  //   sideDrawerOpen: false
  // };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }
    return (
      <Router>
        <div style={{ height: '100%' }}>
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
          <SideDrawer show={this.state.sideDrawerOpen} />
          {backdrop}
          <main style={{ marginTop: '64px' }}>
            <Switch>
              <Route
                exact path='/'
                component={Dashboard}
              />
              <Route
               exact path='/Dashboard' 
               component={Cards} 
               />
              <Route
               exact path='/About' 
               component={AboutCards} 
               />
              <Route
                path='/LogIn'
                render={(props) => <LogIn {...props} updateUser={this.updateUser} />}
              />
              <Route
                path='/SignUp'
                render={(props) => <SignUp {...props} />}
              />
               <Route 
                exact path='/Dashboard'  
                component={Dashboard} 
              />
               <Route 
                exact path='/Form' 
                render={(props) => <Form {...props} id = {this.state.id} updateUser={this.updateUser} />}
              />
              {/* <SecretRoute
                isAuthenticated={this.state.loggedIn}
                exact path="/Dashboard"
                component={Dashboard} 
                /> */}
              {/* <SecretRoute
                isAuthenticated={this.state.loggedIn}
                exact path="/Form"
                component={Form} 
               /> */}
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;