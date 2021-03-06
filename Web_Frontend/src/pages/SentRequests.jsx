import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Appbar from '../components/Appbar'
import Sidebar from '../components/Sidebar'
import TempTable2 from '../components/TempTable2';
// import ButtonBar from '../components/ButtonBar';
import { withRouter } from 'react-router-dom';


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

function SentRequests() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Appbar section="Sent Requests"></Appbar>
            <Sidebar />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {/* <ButtonBar placeholder='Search by Request Id' isView='no' /> */}
                <TempTable2 />

            </main>
        </div>
    );
}

export default withRouter(SentRequests);