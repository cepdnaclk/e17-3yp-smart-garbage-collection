import React, { useState, useContext } from 'react';
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
import { signinSchema } from '../Validations/SigninValidation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from '../helpers/AuthContext';

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

function Signin() {

    const { setAuthState } = useContext(AuthContext);
    let history = useHistory();

    const classes = useStyles();

    // const [usernameReg, setUsernameReg] = useState('');
    // const [passwordReg, setPasswordReg] = useState('');


    // const login = () => {
    //     Axios.post("http://localhost:3001/Signin", {
    //         adminusername: usernameReg,
    //         adminpassword: passwordReg,
    //     }).then((response) => {
    //         if (response.data.error) alert(response.data.error);
    //         else {
    //             history.push("/Dashboard");
    //         }
    //     });
    // }

    // connect yup and react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signinSchema),
    });

    // if validations are passed
    const submitForm = (data) => {
        Axios.post("http://54.197.72.211:5000/Signin", {
            adminusername: data['username'],
            adminpassword: data['password'],
        }).then((response) => {
            if (response.data.error) alert(response.data.error);
            else {
                //console.log(response);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("name", response.data.name);
                setAuthState(true);
                history.push("/Dashboard");
            }
        });
    }



    return (<Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>

            <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
                <TextField
                    data-testid="usernameInput"
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
                    {...register('username')}

                />
                <div className='error' data-testid="errorUsername">{errors.username?.message}</div>
                <TextField
                    data-testid="passwordInput"
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
                    {...register('password')}

                />
                <div className='error' data-testid="errorPassword">{errors.password?.message}</div>

                <Button
                    data-testid="signinButton"
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}


                // onClick={login}
                >
                    Sign in
                </Button>
                <Grid container>

                    <Grid item>
                        <Link href="/Signup" variant="body2">
                            Don't have an account? Sign Up
                        </Link>
                    </Grid>

                </Grid>
            </form>

        </div >

    </Container>
    );
}

export default Signin;