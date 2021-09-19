import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Form from '../components/Form'

function Signin() {

    return (<Container component="main" maxWidth="xs" >
        <CssBaseline />
        {/* nextPage should be Dashboard if sign in is succesful, if not error page */}
        <Form title="Sign in" msg="Don't have an account? Sign Up" link="/Signup" nextPage="/Dashboard" />
    </Container>
    );
}

export default Signin;