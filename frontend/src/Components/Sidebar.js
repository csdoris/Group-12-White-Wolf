import React, { useState, useEffect } from 'react';
import { Drawer, Button, List, Divider, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Plan from './Plan.js';
import CreateImportDropdown from './CreateImportDropdown.js';
import DeleteDropdown from './deleteDropdown.js';
import { makeStyles } from '@material-ui/core/styles';
import '../Styles/SidebarStyles.css';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: '350px',
    },
}));

function SideNav() {
    const [isOpen, setIsOpen] = useState();
    const classes = useStyles();

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
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    className={classes.drawer}
                >
                    <h1>My plans</h1>
                    <CreateImportDropdown />
                </Grid>
                {allPlans.map((planName) => (
                    <div>
                        <Grid container justify="space-between">
                            <Plan name={planName} />

                            <DeleteDropdown />
                        </Grid>
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
