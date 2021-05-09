import React, { useState, useContext } from 'react';
import {
    Drawer,
    List,
    Divider,
    Grid,
    TextField,
    Slide,
    Button
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import CreateImportDropdown from './CreateImportDropdown.js';
import { makeStyles } from '@material-ui/core/styles';
import '../Styles/SidebarStyles.css';
import SidebarForEvents from './SidebarForEvents.js';
import { SidebarContext } from '../helpers/SidebarContextProvider.js';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { AppContext } from '../AppContextProvider.js';
import axios from 'axios';
import useToken from '../hooks/useToken.js';
import SidebarRow from './SidebarRow.js';

const useStyles = makeStyles(() => ({
    drawer: {
        width: '350px',
    },
    openButton: {
        backgroundColor: 'grey',
        position: 'absolute',
        zIndex: '1200',
        opacity: '70%',
        '&:hover': { cursor: 'pointer', opacity: '100%' },
    },
    closeButton: {
        position: 'absolute',
        left: '350px',
        backgroundColor: 'grey',
        zIndex: '1200',
        opacity: '70%',
        '&:hover': { cursor: 'pointer', opacity: '100%' },
    },
    cancelButton: {
        float: 'right',
    },
}));

function SideNav() {
    
    const { isOpen, setIsOpen} = useContext(SidebarContext);
    const classes = useStyles();

    const {plans, setPlans, plan, setPlan } = useContext(AppContext);

    const token = useToken().token;
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    const [addingPlan, setAddingPlan] = useState(false);
    const [newPlanName, setNewPlanName] = useState('');


    function toggleDrawer() {
        return () => {
            setIsOpen(!isOpen);
            handleCancel();
        };
    }

    function addPlanRow() {
        setAddingPlan(true);
    }

    function handleCancel() {
        setAddingPlan(false);
    }

    function submitPlanName(e) {
        if (e.key === 'Enter') {
            setAddingPlan(false);

            axios.post('/api/plans', { name: newPlanName }, header).then( async function () {
                const plansResponse = await axios.get('/api/plans', header);
                setPlans(plansResponse.data);
            });
        }
    }
    
    function deletePlanRow(planId) {
        axios.delete(`/api/plans/${planId}`, header).then( async function () {
            const plansResponse = await axios.get('/api/plans', header);
            setPlans(plansResponse.data);
        });
    }

    // handles the situation when a plan is clicked
    function navigateToPlan(plan) {
        handleCancel();

        axios.get(`/api/plans/${plan._id}`, header).then(function (resp) {
            setPlan(resp.data)
            console.log(resp.data.events);
        });
    }

    function handleGoBackToPlans() {
        setPlan(null);
    }

    const handleClickAway = () => {
        setAddingPlan(false);
    };

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
                    <CreateImportDropdown addPlan={addPlanRow} />
                </Grid>
                {plans.map((plan) => (
                    <div key={plan._id}>
                        <Grid wrap="nowrap" container justify="space-between">
                            <SidebarRow
                                item={plan}
                                handleDelete={deletePlanRow}
                                handleOnClick={navigateToPlan}
                            />
                        </Grid>
                        <Divider />
                    </div>
                ))}
                {addingPlan && (
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <Grid>
                            <Grid item>
                                <TextField
                                    id="outlined-basic"
                                    label="Type plan name here..."
                                    placeholder="Type plan name here..."
                                    variant="filled"
                                    className={classes.drawer}
                                    autoFocus
                                    onChange={ (e) => {setNewPlanName(e.target.value)}}
                                    onKeyDown={submitPlanName}
                                    inputProps={{ "data-testid": "add-plan-input" }}  
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={handleCancel}
                                    className={classes.cancelButton}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </ClickAwayListener>
                )}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment>
                <ArrowRightIcon
                    onClick={toggleDrawer()}
                    className={classes.openButton}
                    style={{ fontSize: 48 }}
                />
                {/* content in the sideabr */}
                <Drawer
                    anchor="left"
                    open={isOpen}
                    onClose={toggleDrawer()}
                    variant="persistent"
                >
                    {plan == null ? (
                        listPlans()
                    ) : (
                        <SidebarForEvents
                            plan={plan}
                            handleGoBackToPlans={handleGoBackToPlans}
                        />
                    )}
                </Drawer>
                {isOpen && (
                    <Slide
                        direction="right"
                        in={isOpen}
                        mountOnEnter
                        unmountOnExit
                    >
                        <ArrowLeftIcon
                            onClick={toggleDrawer()}
                            className={classes.closeButton}
                            style={{ fontSize: 48 }}
                        />
                    </Slide>
                )}
            </React.Fragment>
        </div>
    );
}

export default SideNav;
