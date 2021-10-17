import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ isAuth: isAuth, component: Component, ...rest }) {
    return (
        <div>
            <Route {...rest}
                render={(props) => {
                    if (isAuth) {
                        return <Component />
                    } else {
                        <Redirect to={{ pathname: "/Signin", state: { from: props.location } }} />
                        // <Redirect to='/Signin' />
                    }
                }}
            />
        </div>
    )
};