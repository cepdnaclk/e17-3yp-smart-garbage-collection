// Temporary page to add the graph view

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Appbar from '../components/Appbar'
import Sidebar from '../components/Sidebar'
import BarChart from '../components/BarChart';
import ButtonBar from '../components/ButtonBar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },

}));

export default function Overview() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Appbar section="Overview"></Appbar>
            <Sidebar />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <ButtonBar placeholder='Search by Unit Id' isView='yes' />
                <BarChart />


            </main>
        </div>
    );
}