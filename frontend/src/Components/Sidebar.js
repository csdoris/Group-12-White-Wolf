import React, { useState, useEffect, useContext } from 'react';
import {
    Drawer,
    Button,
    List,
    Divider,
    Grid,
    TextField,
    IconButton,
    Slide,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import Plan from './Plan.js';
import CreateImportDropdown from './CreateImportDropdown.js';
import { makeStyles } from '@material-ui/core/styles';
import '../Styles/SidebarStyles.css';
import SidebarForEvents from './SidebarForEvents.js';
import { AppContext } from '../helpers/AppContextProvider.js';

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

function SideNav({ view, deleteFunc }) {
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

    const { planName, setPlanName } = useContext(AppContext);
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

    function setPlanNameFunc(e) {
        console.log(e.target.value);
        setNewPlanName(e.target.value);
    }

    function submitPlanName(e) {
        if (e.key === 'Enter') {
            setAddingPlan(false);
            setAllPlans([...allPlans, { id: 3, name: newPlanName }]);
        }
    }

    function deletePlan(name) {
        console.log(name);
        let matchingPlanName = (element) => element.name === name;
        let indexOfPlan = allPlans.findIndex(matchingPlanName);
        setAllPlans([
            ...allPlans.slice(0, indexOfPlan),
            ...allPlans.slice(indexOfPlan + 1),
        ]);
        if (planName === name) {
            deleteFunc();
            setPlanName(null);
        }
    }

    useEffect(() => {
        if (view) {
            handleGoBackToPlans()
        }
    }, [view]);

    // handles the situation when a plan is clicked
    function navigateToPlan(id, name) {
        const planClick = {
            id: id,
            name: name,
        };
        console.log(view);
        if (view == 0) {
            setPlanShown(planClick);
        }
        setPlanName(name);
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
                    <CreateImportDropdown addPlan={addPlan} />
                </Grid>
                {allPlans.map((planName) => (
                    <div key={planName.name}>
                        <Grid container justify="space-between">
                            <Plan
                                name={planName}
                                deletePlan={deletePlan}
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
                        onChange={setPlanNameFunc}
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
