import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Form from '../components/Form'

function Signup() {

    return (<Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Form title="Sign Up" msg="Already have an account? Sign in" link="/Signin" />
    </Container>
    );
}

export default Signup;