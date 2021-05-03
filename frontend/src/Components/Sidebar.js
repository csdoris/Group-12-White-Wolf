import React, { useState, useContext } from 'react';
import {
    Drawer,
    List,
    Divider,
    Grid,
    TextField,
    Slide,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import PlanRow from './PlanRow.js';
import CreateImportDropdown from './CreateImportDropdown.js';
import { makeStyles } from '@material-ui/core/styles';
import '../Styles/SidebarStyles.css';
import SidebarForEvents from './SidebarForEvents.js';
import { AppContext } from '../AppContextProvider.js';
import axios from 'axios';
import useToken from '../hooks/useToken.js';


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
}));

function SideNav() {
    const [isOpen, setIsOpen] = useState();
    const [planShown, setPlanShown] = useState(null);
    const classes = useStyles();

    const {plans, setPlans} = useContext(AppContext);

    const token = useToken().token;
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    const [addingPlan, setAddingPlan] = useState(false);
    const [newPlanName, setNewPlanName] = useState('');


    function toggleDrawer() {
        return (event) => {
            setIsOpen(!isOpen);
        };
    }

    function addPlanRow() {
        setAddingPlan(true);
    }

    function setPlanName(e) {
        console.log(e.target.value);
        setNewPlanName(e.target.value);
    }

    async function submitPlanName(e) {
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
        setPlanShown(plan);
    }

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
                    <CreateImportDropdown addPlan={addPlanRow} />
                </Grid>
                {plans.map((plan) => (
                    <div key={plan._id}>
                        <Grid container justify="space-between">
                            <PlanRow
                                plan={plan}
                                deletePlan={deletePlanRow}
                                navigateToPlan={navigateToPlan}
                            />
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
                <ArrowRightIcon
                    onClick={toggleDrawer()}
                    className={classes.openButton}
                    style={{ fontSize: 40 }}
                />

                {/* content in the sideabr */}
                <Drawer
                    anchor="left"
                    open={isOpen}
                    onClose={toggleDrawer()}
                    variant="persistent"
                >
                    {planShown == null ? (
                        listPlans()
                    ) : (
                        <SidebarForEvents
                            plan={planShown}
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
                            style={{ fontSize: 40 }}
                        />
                    </Slide>
                )}
            </React.Fragment>
        </div>
    );
}

export default SideNav;
