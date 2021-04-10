import React, { useState, useEffect } from 'react';
import {
    Drawer,
    Button,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { Plus, ThreeDotsVertical } from 'react-bootstrap-icons';
import Plan from './Plan.js';

function SideNav() {
    const [isOpen, setIsOpen] = useState();
    const [allPlans, setAllPlans] = useState([
        'Plan1',
        'Plan2',
        'Plan3',
        'Plan4',
    ]);

    function toggleDrawer() {
        return (event) => {
            setIsOpen(!isOpen);
        };
    }

    const listPlans = () => (
        <div onClick={toggleDrawer()}>
            <List>
                {allPlans.map((planName) => (
                    <div>
                        <Button className="planName" href="#text-buttons">
                            {planName}{' '}
                        </Button>
                        <Button>
                            <Plus className="plusSign" />
                        </Button>
                        <Button>
                            <ThreeDotsVertical className="threeDots" />
                        </Button>
                        <Divider />
                    </div>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment>
                <Button onClick={toggleDrawer()}>
                    <MenuIcon />
                </Button>
                <Drawer anchor="left" open={isOpen} onClose={toggleDrawer()}>
                    <h1>My plans</h1>
                    {listPlans()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

export default SideNav;
