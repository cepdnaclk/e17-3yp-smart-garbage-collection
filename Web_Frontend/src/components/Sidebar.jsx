//import React from 'react';
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom'
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import SettingsRemoteRoundedIcon from '@material-ui/icons/SettingsRemoteRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import User from './User';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../helpers/AuthContext';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({


    drawer: {
        width: drawerWidth,
        flexShrink: 0,

    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#0F3057',

    },
    // necessary for content to be below app bar
    // toolbar: theme.mixins.toolbar,

    text: {
        color: '#E7E7DE',

        fontFamily: '"Righteous", cursive', // didn't work

    },
    button: {
        marginTop: theme.spacing(3),

    }

}));

const links = ['./Overview', './Customize', './SentRequests', './MapView']

// try to improve style adding
const icons = [<SettingsRemoteRoundedIcon fontSize="large" style={{ color: '#E7E7DE' }} />, < SettingsRoundedIcon fontSize="large" style={{ color: '#E7E7DE' }} />, < SendRoundedIcon fontSize="large" style={{ color: '#E7E7DE' }} />, < RoomRoundedIcon fontSize="large" style={{ color: '#E7E7DE' }} />]

function renderIcon(index) {
    return icons[index];
}

export default function Sidebar() {
    const { authState, setAuthState } = useContext(AuthContext);
    let history = useHistory();

    const signout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        setAuthState(false);
        history.push("/");
    }

    const classes = useStyles();
    return (<Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
            paper: classes.drawerPaper,
        }}
        anchor="left"
    >
        {/* <div className={classes.toolbar} /> */}
        {/* name must be passed */}
        <User name={localStorage.getItem("name")} />
        <Divider />
        <List>
            {['Overview', 'Customize', 'Sent Requests', 'Map view'].map((text, index) => (
                <ListItem button key={text} component={Link} to={links[index]}>
                    <ListItemIcon>{renderIcon(index)}</ListItemIcon>
                    {/* //h1 tag added  */}
                    <h1><ListItemText primary={text} className={classes.text} /></h1>
                </ListItem>

            ))}
        </List>
        {authState === true ? <Button
            variant="contained"
            color="default"
            size="small"
            startIcon={<PowerSettingsNewRoundedIcon />}
            className={classes.button}
            onClick={signout}
        >
            Log out
        </Button> :
            null}




    </Drawer>);
}