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


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({


    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

}));

const links = ['./Overview', './Customize', './SentRequests', './MapView']
const icons = [<SettingsRemoteRoundedIcon />, < SettingsRoundedIcon />, < SendRoundedIcon />, < RoomRoundedIcon />]

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
        <div className={classes.toolbar} />
        <Divider />
        <List>
            {['Overview', 'Customize', 'Requests', 'Map view'].map((text, index) => (
                <ListItem button key={text} component={Link} to={links[index]}>
                    <ListItemIcon>{renderIcon(index)}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>

            ))}
        </List>


    </Drawer>);
}