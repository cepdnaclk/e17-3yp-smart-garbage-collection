import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        backgroundColor: '#00587A',
    },
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

}));

function Home() {

    const classes = useStyles();
    return <div className={classes.paper}>
        <h1 className="main-heading">Smart Garbage Collection</h1>

        <Button variant="contained" color="primary" href="/Signin" size="large" className={classes.margin}>
            Sign in
        </Button>
        <Button variant="contained" color="primary" href="/Signup" size="large" className={classes.margin}>
            Sign up
        </Button></div>;
}

export default Home;