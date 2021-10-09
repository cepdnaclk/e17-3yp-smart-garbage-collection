import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { signupSchema } from '../Validations/SignupValidation';

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

function Signup() {

    let history = useHistory();

    const classes = useStyles();

    // const [fnameReg, setFameReg] = useState('');
    // const [lnameReg, setLameReg] = useState('');
    // const [usernameReg, setUsernameReg] = useState('');
    // const [passwordReg, setPasswordReg] = useState('');


    // const register = () => {
    //     Axios.post("http://localhost:3001/Signup", {
    //         adminfname: fnameReg,
    //         adminlname: lnameReg,
    //         adminusername: usernameReg,
    //         adminpassword: passwordReg,
    //     }).then((response) => {
    //         if (response.data.error) alert(response.data.error);
    //         else {
    //             history.push("/Signin");
    //         }
    //     });
    // }


    const onSubmit = async (event) => {
        event.preventDefault()
        let formData = {
            firstName: event.target[0].value,
            lastName: event.target[2].value,
            username: event.target[4].value,
            password: event.target[6].value
        }
        console.log(formData);
        const isValid = await signupSchema.isValid(formData);
        console.log(isValid);
    }

    return (<Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>

            <form className={classes.form} onSubmit={onSubmit}>

                <Grid container spacing={2} className={classes.form}>
                    <Grid item xs={12} sm={6}>

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
                        // onChange={(e) => {
                        //     setFameReg(e.target.value);
                        // }}

                        />


                    </Grid>
                    <Grid item xs={12} sm={6}>

                        <TextField
                            variant="outlined"
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"

                        // take user input
                        // onChange={(e) => {
                        //     setLameReg(e.target.value);
                        // }}

                        />

                    </Grid></Grid>



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

                // onChange={(e) => {
                //     setUsernameReg(e.target.value);
                // }}


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

                // onChange={(e) => {
                //     setPasswordReg(e.target.value);
                // }}
                />



                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                // onClick={register}
                // onClick={onSubmit}

                >
                    Sign Up
                </Button>
                <Grid container>

                    <Grid item>
                        <Link href="/Signin" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </div >

    </Container>
    );
}

export default Signup;