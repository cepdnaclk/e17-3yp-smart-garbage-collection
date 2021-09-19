// for search filter toggle button options above the table
// functionality is not implemented

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ToggleButton from './ToggleButton';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    main: {
        display: 'flex',
        alignItems: 'center',

    }
}));

export default function ButtonBar(props) {
    const classes = useStyles();

    return (<div> <Grid container spacing={1} className={classes.main}>
        <Grid item xs={6}>
            <Paper component="form" className={classes.root}>
                <IconButton className={classes.iconButton} aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <InputBase
                    className={classes.input}
                    placeholder={props.placeholder}
                    inputProps={{ 'aria-label': 'search by unit id' }}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />


            </Paper>
        </Grid>
        <Grid item xs={6}>
            {props.isView === 'yes' ? <ToggleButton /> : null}

        </Grid>
    </Grid>
    </div>
    );
}
