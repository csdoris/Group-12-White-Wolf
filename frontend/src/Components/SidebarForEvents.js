import React, { useState, useEffect } from 'react';
import {
    Button,
    List,
    Divider,
    Grid
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

import EventPopup from './EventPopup';
import axios from 'axios';
import useToken from '../hooks/useToken';
import SidebarRow from './SidebarRow';

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

    const { token } = useToken();
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    const [events, setEvents] = useState([]);

    useEffect(() => {
        console.log(plan);
        axios.get(`/api/plans/${plan._id}`, header).then(function (resp) {
            setEvents(resp.data.events)
        });
    }, []);


    const [addEvent, setAddEvent] = useState(false);
    const [newEventSaved, setNewEventSaved] = useState(false);

    function handleClose() {
        setAddEvent(false);
    }

    function handleSave(newEvent) {
        console.log("save called");
        console.log(newEvent);

        // call the endpoint to store the event in the database
        axios.post(`/api/plans/${plan._id}`, newEvent, header).then(async (response) => {
            if (response.status === 201) {
                setAddEvent(false);
                const plansResponse = await axios.get(`/api/plans/${plan._id}`, header);
                setEvents(plansResponse.data.events);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleOpenEvent(event) {
        //Display info about event in the pop up @jacinta
        console.log(event);
    }

    function handleAddEvent() {
        setAddEvent(true);
    }
    
    function handleDeleteEvent(eventId) {
        axios.delete(`/api/plans/${plan._id}/${eventId}`, header).then(async function () {
            const plansResponse = await axios.get(`/api/plans/${plan._id}`, header);
            setEvents(plansResponse.data.events);
        });
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
                        <ArrowBackIcon />
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
                {events.map((event) => (
                    <div key={event._id}>
                        <Grid wrap="nowrap" container justify="space-between">
                            <SidebarRow
                                item={event}
                                handleDelete={handleDeleteEvent}
                                handleOnClick={handleOpenEvent}
                                hasExport={false}
                            />
                        </Grid>
                        <Divider />
                    </div>
                ))}
            </List>

            {
                addEvent && <EventPopup eventId={null} open={addEvent} handleClose={handleClose} handleSave={handleSave} />
            }
        </div>
    );
}