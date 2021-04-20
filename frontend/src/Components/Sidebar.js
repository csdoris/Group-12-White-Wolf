import React, { useState, useEffect } from 'react';
import {
    Drawer,
    Button,
    List,
    Divider,
    Grid,
    TextField,
    IconButton,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import Plan from './Plan.js';
import CreateImportDropdown from './CreateImportDropdown.js';
import { makeStyles } from '@material-ui/core/styles';
import '../Styles/SidebarStyles.css';
import SidebarForEvents from './SidebarForEvents.js';

const useStyles = makeStyles(() => ({
    drawer: {
        width: '350px',
    },
    openButton: {
        backgroundColor: 'lightgrey',
    },
    closeButton: {
        position: 'absolute',
        left: '350px',
        backgroundColor: 'lightgrey',
    },
}));

function SideNav() {
    const [isOpen, setIsOpen] = useState();
    const [planShown, setPlanShown] = useState(null);
    const classes = useStyles();

    // information and function to control plans 
    const [allPlans, setAllPlans] = useState([
        { id: 1, name: 'Plan1' },
        { id: 2, name: 'Plan2' },
        { id: 3, name: 'Plan3' },
        { id: 4, name: 'Plan4' },
    ]);

    const [addingPlan, setAddingPlan] = useState(false);
    const [newPlanName, setNewPlanName] = useState('');

    function toggleDrawer() {
        return (event) => {
            setIsOpen(!isOpen);
        };
    }

    function addPlan() {
        setAddingPlan(true);
    }

    function setPlanName(e) {
        console.log(e.target.value);
        setNewPlanName(e.target.value);
    }

    function submitPlanName(e) {
        if (e.key === 'Enter') {
            setAddingPlan(false);
            setAllPlans([...allPlans, { name: newPlanName }]);
        }
    }

    function deletePlan(planName) {
        console.log(planName);
        let planIndex = 0;
        allPlans.forEach((plan, index) => {
            if (plan.name === planName) {
                planIndex = index;
            }
        });
        console.log(planIndex);
        let temp = allPlans;
        temp.splice(planIndex, 1);
        setAllPlans(temp);
    }

    // handles the situation when a plan is clicked 
    function navigateToPlan(id, name) {
        const planClick = {
            id: id,
            name: name
        };
        setPlanShown(planClick);
    };

    function handleGoBackToPlans() {
        setPlanShown(null);
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
                    <CreateImportDropdown addPlan={addPlan} />
                </Grid>
                {allPlans.map((planName) => (
                    <div>
                        <Grid container justify="space-between">
                            <Plan name={planName} deletePlan={deletePlan} navigateToPlan={navigateToPlan}/>
                        </Grid>
                        <Divider />
                    </div>
                ))}
                {addingPlan && (
                    <TextField
                        id="outlined-basic"
                        label="Type plan name here..."
                        placeholder="Type plan name here..."
                        variant="filled"
                        className={classes.drawer}
                        autoFocus
                        onChange={setPlanName}
                        onKeyDown={submitPlanName}
                    />
                )}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment>
                <Button onClick={toggleDrawer()} className={classes.openButton}>
                    <ArrowRightIcon />
                </Button>

                {/* content in the sideabr */}
                <Drawer
                    anchor="left"
                    open={isOpen}
                    onClose={toggleDrawer()}
                    variant="persistent"
                >
                    {
                        planShown == null ? listPlans() : <SidebarForEvents plan={planShown} handleGoBackToPlans={handleGoBackToPlans}/>
                    }
                </Drawer>
                {isOpen && (
                    <Button
                        onClick={toggleDrawer()}
                        className={classes.closeButton}
                    >
                        <ArrowLeftIcon />
                    </Button>
                )}
            </React.Fragment>
        </div>
    );
}

export default SideNav;
