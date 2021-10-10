import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddRemoveForm from './AddRemoveForm';
import SystemSettingsForm from './SystemSettingsForm';
import UpdateSettingsForm from './UpdateSettingsForm';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(10),
        textAlign: 'left',
        backgroundColor: 'white',
    },
}));

export default function CustomizeForm() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                <Grid item xs={4}>
                    <h2>Add or Remove Units</h2>
                    <Paper className={classes.paper}>

                        <AddRemoveForm />
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <h2>System Settings</h2>
                    <Paper className={classes.paper}>
                        <Grid container>
                            <Grid item xs={6}> <SystemSettingsForm /></Grid>
                            <Grid item xs={6}> <UpdateSettingsForm /></Grid>
                        </Grid>


                    </Paper>
                </Grid>

            </Grid>
        </div>
    );
}