import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LogIn.css';

class LogIn extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onKeyPress = (e) => {
        if (e.which === 13) {
            this.handleSubmit(e);
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('handleSubmit');
        axios.post('/user/login', {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            console.log('login response: ');
            console.log(response);
            if (response.status === 200) {
                //update App.js state
                this.props.updateUser({
                    loggedIn: true,
                    username: response.data.username,
                    id: response.data.id
                });

                // redirect home
                this.setState({
                    redirectTo: '/Dashboard'
                });
            }
          
        }).catch(error => {
            console.log(`login error: ${error}`);
        });
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <form>
                    <div className="con">
                        <header className="head-form" onKeyPress={this.onKeyPress}>
                            <h2 className="login-H2">Log In</h2>
                            <br></br>
                            <h3 className="login-H3">Welcome to Chap!<br/>Please Log in to Continue</h3>
                        </header>
                            <i className="fa fa-user icon"></i>
                            <input
                                className="form-control"
                                placeholder="Username"
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                required
                                autoFocus
                            />
                        <br/>
                            <input
                                className="form-control"
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                required
                            />
                        <br/>
                            <button
                                className="log-in-btn"
                                onClick={this.handleSubmit}
                                type="submit"
                            >Log In</button>
                    </div>
                    <div className="registerDiv">
                        <h3 className="register">New to Chap?<br></br>Click <Link to="/SignUp">HERE</Link> to register</h3>
                    </div>
                </form>
            );
        }
    }
}

export default LogIn;