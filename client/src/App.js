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
import SecretRoute from './components/SecretRoute/SecretRoute';
import Cards from './components/Cards/Cards';
import axios from 'axios';
import Maintenance from './components/Maintenance/Maintenance';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
// import Wrapper from './components/Wrapper/index';
// import Background from './component/Background/Background';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
    }

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }

  state = {
    sideDrawerOpen: false
  };

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
        {/* <Wrapper>  */}
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
          <SideDrawer show={this.state.sideDrawerOpen} />
          {backdrop}
          <main style={{ marginTop: '64px' }}>
            <Switch>
              <Route exact path='/LogIn' component={LogIn} />
              <Route exact path='/SignUp' component={SignUp} />
              {/* <Route exact path='/Dashboard' component={Dashboard} />
              <Route exact path='/Form' component={Form} /> */} 
             <SecretRoute
              isAuthenticated={this.state.loggedIn}
              exact path="/Dashboard"
              component={Dashboard} />
              <Route exact path='/Maintenance' component={Maintenance} />
              <Route exact path='/Contact' component={Contact} />
              <Route exact path='/Dashboard' component={Dashboard}  />
              <Route exact path='/Form' component={Form} />
              <Route exact path='/About' component={About} />
              <SecretRoute
              isAuthenticated={this.state.loggedIn}
              exact path="/Maintenance"
              component={Maintenance}
            />
             <SecretRoute 
              isAuthenticated={this.state.loggedIn}
              exact path="/Dashboard" 
              component={Dashboard}
            />
             <SecretRoute
              isAuthenticated={this.state.loggedIn}
              exact path="/Form"
              component={Form}
            />
            <SecretRoute
                isAuthenticated={this.state.loggedIn}
                path="/Maintenance"
                component={Maintenance}
              />
            </Switch>
          </main>
          <Cards />
          <Footer />
          {/* </Wrapper> */}
        </div>
      </Router>
      
    );

  }
}

export default App;
