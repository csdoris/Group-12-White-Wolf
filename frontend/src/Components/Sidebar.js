import React, { useState, useEffect } from 'react';
import { Drawer, Button, List, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Plan from './Plan.js';
import CreateImportDropdown from './CreateImportDropdown.js';
import DeleteDropdown from './deleteDropdown.js';
import CreateEventDropdown from './CreateEvent.js';
import '../Styles/SidebarStyles.css';

function SideNav() {
    const [isOpen, setIsOpen] = useState();

    const [allPlans, setAllPlans] = useState([
        { name: 'Plan1' },
        { name: 'Plan2' },
        { name: 'Plan3' },
        { name: 'Plan4' },
    ]);

    function toggleDrawer() {
        return (event) => {
            setIsOpen(!isOpen);
        };
    }

    const listPlans = () => (
        <div>
            <List>
                <h1>
                    My plans
                    <CreateImportDropdown />
                </h1>

                {allPlans.map((planName) => (
                    <div>
                        <Plan name={planName} />
                        <CreateEventDropdown />
                        <DeleteDropdown />
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
                    {listPlans()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

export default SideNav;
