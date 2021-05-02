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
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

import EventPopup from './Eventpopup';

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


export default function SidebarForEvents({ plan, handleGoBackToPlans }) {
    const classes = useStyles();

    // dummy information for testing
    const [events, setEvents] = useState([
        { id: 1, name: 'Event1' },
        { id: 2, name: 'Event2' },
        { id: 3, name: 'Event3' },
        { id: 4, name: 'Event4' },
    ]);

    const [addEvent, setAddEvent] = useState(false);
    const [newEventSaved, setNewEventSaved] = useState(false);

    function handleClose() {
        setAddEvent(false);
    }

    function handleSave(newEvent) {
        console.log("save called");
        console.log(newEvent);

        // call the endpoint to store the event in the database 

        setAddEvent(false);
    }

    function handleAddEvent() {
        setAddEvent(true);
    }

    function handleDeleteEvent() {
        console.log("delete event called");
    }

    return (
        <div>
            <List>

                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    className={classes.drawer}
                >
                    <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={() => handleGoBackToPlans()}
                    >
                        <ArrowBackIcon/>
                    </Button>
                    <h1>{plan.name}</h1>
                    <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleAddEvent}
                    >
                        <AddIcon className="plusSign" />
                    </Button>
                </Grid>
            </List>

            {
                addEvent && <EventPopup open={addEvent} handleClose={handleClose} handleSave={handleSave} />
            }
        </div>
    );
}