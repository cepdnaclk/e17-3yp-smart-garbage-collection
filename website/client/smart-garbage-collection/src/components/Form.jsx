import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';

// try to implement password visibility 


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#00587A',
    },
    form: {
        // width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#00587A',
    },


}));

function NameBoxes() {
    const classes = useStyles();

    const [fnameReg, setFameReg] = useState('');
    const [lnameReg, setLameReg] = useState('');

    // http 
    const register = () => {
        Axios.post("http://localhost:3002/Signup", {
            adminfname: fnameReg,
            adminlname: lnameReg,
        }).then((response) => {
            console.log(response);
        });
    }

    return (<Grid container spacing={2} className={classes.form}><Grid item xs={12} sm={6}>
        <TextField
            autoComplete="fname"
            name="firstName"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus

            // take user input
            onChange={(e) => {
                setFameReg(e.target.value);
            }}

        />
    </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"

                // take user input
                onChange={(e) => {
                    setLameReg(e.target.value);
                }}

            />
        </Grid></Grid>);
}

function Form(props) {
    const classes = useStyles();

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const register = () => {
        Axios.post("http://localhost:3002/Signup", {
            adminusername: usernameReg,
            adminpassword: passwordReg,
        }).then((response) => {
            console.log(response);
        });
    }

    return (

        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {props.title}
            </Typography>
            {props.title === 'Sign Up' ? NameBoxes() : null}
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus

                    // take user input
                    onChange={(e) => {
                        setUsernameReg(e.target.value);
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"

                    // take user input
                    onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }}
                />


                {/* <FormControlLabel ### REMEMBER ME
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    href={props.nextPage}
                    onClick={register}
                >
                    {props.title}
                </Button>
                <Grid container>
                    {/* <Grid item xs> ### FORGOT PW
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
                    <Grid item>
                        <Link href={props.link} variant="body2">
                            {props.msg}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div >
    );
}

export default Form;