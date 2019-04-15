import React from "react";
import { Route, Redirect } from 'react-router-dom';

const SecretRoute = ({ component: Component, isAuthenticated, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/LogIn",
                                state: { from: props.location }
                            }}
                        />
                    )

            }
        />
    );
}

export default SecretRoute;