import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: Component, authenticated: authenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                authenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}