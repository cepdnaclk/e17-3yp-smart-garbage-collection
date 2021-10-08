import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import chartImg from '../images/chart.png';
import SelectCollector from './SelectCollector';
import SelectBin from './SelectBin';
import Button from '@material-ui/core/Button';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    img: {
        width: theme.spacing(50),
        height: theme.spacing(40),
    },
    grids: {
        marginTop: theme.spacing(8)
    },
    paper2: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    button: {
        backgroundColor: '#008891',
        margin: theme.spacing(1),
        marginTop: theme.spacing(8),
    },
}));

export default function BarChart() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3} className={classes.grids}>

                <Grid item xs={6}>
                    <Paper className={classes.paper}><img src={chartImg} alt="chart image" className={classes.img}></img></Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper2}>
                        <h2>Unit 1: Miriswatta</h2>
                        <SelectBin />
                        <SelectCollector />

                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            className={classes.button}
                            startIcon={<SendRoundedIcon />}
                        >
                            Assign
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
