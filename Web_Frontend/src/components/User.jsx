//import React, { useState, useContext } from 'react';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import userImg from '../images/user.png'
import { auto } from 'async';
//import { AuthContext } from '../helpers/AuthContext';

const useStyles = makeStyles((theme) => ({

    user: {
        // marginLeft: theme.spacing(5),

        margin: 'auto',
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(1),
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    text: {
        // margin: 'auto',
        // marginTop: theme.spacing(2),
        // // marginBottom: theme.spacing(5),
        textAlign: 'center'

    }

}));

export default function User(props) {
    //const { authState } = useContext(AuthContext);
    const classes = useStyles();
    // if (authState) {
    //     return (<div><Avatar className={classes.user} alt={props.name} src={userImg} />
    //         <h3 className={classes.text}>{props.name}</h3></div >);
    // }
    // else {
    //     return null;
    // }
    return (<div><Avatar className={classes.user} alt={props.name} src={userImg} />
        <h3 className={classes.text}>{props.name}</h3></div >);
}
