import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Form from '../components/Form'

function Signin() {

    return (<Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Form title="Sign in" msg="Don't have an account? Sign Up" link="/Signup" />
    </Container>
    );
}

export default Signin;