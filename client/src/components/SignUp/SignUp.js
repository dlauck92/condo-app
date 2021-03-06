import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom'
import axios from 'axios';
import './SignUp.css';

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            name: '',
            email: '',
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
            name: this.state.name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            
        }).then(response => {
            console.log("signup" + response);
            if (!response.data.error) {
                alert("Registration successful!!")
                console.log('successful signup');
                this.setState({
                    loggedIn: true,
                    redirectTo: '/LogIn'
                });
            } else {
                console.log('username already taken');
                alert("It looks like that username has been taken. Try again.");
            }
        }).catch(error => {
            console.log('sign up error: ');
            console.log(error);
            alert("It looks like something went wrong with your registration. Please try again.");
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
                <form>
                    <div className="con">
                        <div className="form-signup">
                        <i className="fas fa-lock"></i>
                        <div className="SignupForm" onKeyPress={this.onKeyPress}>
                            <h1 className="register-H3">Register to Chap!</h1>
                            <label className="sr-only" htmlFor="name">Name</label>
                            <input
                                className="form-control"
                                placeholder="Name"
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                required
                                autoFocus
                            />
                            <br />
                            <label className="sr-only" htmlFor="email">Email</label>
                            <input
                                className="form-control"
                                placeholder="Email"
                                type="text"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                required
                                autoFocus
                            />
                            <br />
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
                            <br/>
                            <button
                                className="sign-in-btn"
                                onClick={this.handleSubmit}
                                type="submit"
                            >Sign Up!</button>
                        </div>
                        </div>
                    </div>
                </form>
            );
        }
    }
}

export default SignUp;
