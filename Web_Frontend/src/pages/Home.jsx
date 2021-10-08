import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import headingImg from '../images/headingImg.jpg'


const useStyles = makeStyles((theme) => ({
    root: {
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(8),
            width: theme.spacing(140),
            height: theme.spacing(65),
        },

    },
    margin: {
        margin: theme.spacing(1),
        backgroundColor: '#00587A',
    },
    img: {
        width: theme.spacing(50),
        height: theme.spacing(40),
    },
    grids: {
        marginLeft: theme.spacing(9),
        marginTop: theme.spacing(6)

    }
}));

export default function Home() {
    const classes = useStyles();

    return (<div className={classes.root}>

        <Paper elevation={3} >
            <Grid container spacing={1} className={classes.grids}>
                <Grid item xs={6}>
                    <h1 className="main-heading">Smart Garbage <br></br>Collection</h1>
                    <Button variant="contained" color="primary" href="/Signin" size="large" className={classes.margin}>
                        Sign in
                    </Button>

                    <Button variant="contained" color="primary" href="/Signup" size="large" className={classes.margin}>
                        Sign up
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <img src={headingImg} alt="heading image" className={classes.img}></img>
                </Grid>
            </Grid>
        </Paper>


    </div>

    );
}
