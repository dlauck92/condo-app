import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        //request to server here (add new username/password)
        axios.post('/user', {
            username: this.state.username,
            password: this.state.password,
        }).then(response => {
            console.log("signeup" + response);
            if (!response.data.error) {
                console.log('successful signup');
                this.setState({
                    loggedIn: true,
                    redirectTo: '/LogIn'
                });
            } else {
                console.log('username already taken');
            }
        }).catch(error => {
            console.log('sign up error: ');
            console.log(error);
        });
    }
    onKeyPress = (e) => {
        if (e.which === 13) {
            this.handleSubmit(e);
            console.log('do validate');
        }
    }
    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="form-signup">
                    <i className="fas fa-lock"></i>
                    <div className="SignupForm" onKeyPress={this.onKeyPress}>
                        <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                        <label className="sr-only" htmlFor="username">Username</label>
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
                        <br />
                        <label className="sr-only" htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />
                        <br />
                        <button
                            className="button"
                            onClick={this.handleSubmit}
                            type="submit"
                        >Sign up</button>
                    </div>
                </div>

            );
        }
    }
}

export default SignUp;