import React from 'react';
import { useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';

function SideNav() {
    const [isOpen, setIsOpen] = useState();

    function toggleDrawer() {
        return (event) => {
            setIsOpen(!isOpen);
        };
    }

    return (
        <div>
            <React.Fragment>
                <Button onClick={toggleDrawer()}>
                    <MenuIcon />
                </Button>
                <Drawer anchor="left" open={isOpen} onClose={toggleDrawer()}>
                    <p>Map Plans here</p>
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon onClick={toggleDrawer()} />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </React.Fragment>
        </div>
    );
}

export default SideNav;
