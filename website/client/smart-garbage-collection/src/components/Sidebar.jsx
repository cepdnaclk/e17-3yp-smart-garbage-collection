import React from 'react';
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

    }

}));

const links = ['./Overview', './Customize', './SentRequests', './MapView']

// try to improve style adding
const icons = [<SettingsRemoteRoundedIcon fontSize="large" style={{ color: '#E7E7DE' }} />, < SettingsRoundedIcon fontSize="large" style={{ color: '#E7E7DE' }} />, < SendRoundedIcon fontSize="large" style={{ color: '#E7E7DE' }} />, < RoomRoundedIcon fontSize="large" style={{ color: '#E7E7DE' }} />]

function renderIcon(index) {
    return icons[index];
}

export default function Sidebar() {
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
        <User name="Isara" />
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


    </Drawer>);
}