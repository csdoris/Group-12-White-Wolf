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
import useToken from '../hooks/useToken';
import EventPopup from './Eventpopup';
import axios from 'axios';
import useToken from '../hooks/useToken';

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
        const url = "/api/plans/" + plan.id;
        axios.post(url, newEvent, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 201) {
                setAddEvent(false);
            }
        }).catch((error) => {
            console.log(error);
        });
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
                        <Grid container justify="space-between">
                            <PlanRow
                                plan={event}
                                deletePlan={handleDeleteEvent}
                                navigateToPlan={() => { }}
                            />
                        </Grid>
                        <Divider />
                    </div>
                ))}
            </List>

            {
                addEvent && <EventPopup open={addEvent} handleClose={handleClose} handleSave={handleSave} />
            }
        </div>
    );
}