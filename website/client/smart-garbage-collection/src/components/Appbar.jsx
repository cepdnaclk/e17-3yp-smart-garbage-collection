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
        backgroundColor: '#0F3057',
    },

}));

export default function Appbar(props) {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar} >
            <Toolbar>
                <Typography variant="h6" noWrap>
                    {props.section}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}