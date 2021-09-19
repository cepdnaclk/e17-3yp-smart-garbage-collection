import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor: '#008891',
    },
    text: {
        color: 'white',
        fontFamily: '"Righteous", cursive',
    }

}));

export default function Appbar(props) {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar} >
            <Toolbar>
                <Typography variant="h4" noWrap className={classes.text}>
                    {props.section}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}