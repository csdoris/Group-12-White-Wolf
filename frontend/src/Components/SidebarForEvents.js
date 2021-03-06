import React, { useState, useContext } from 'react';
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
import { AppContext } from '../AppContextProvider';

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


export default function SidebarForEvents() {
    const classes = useStyles();

    const { plan, setPlan, updatePlanInfo } = useContext(AppContext)
    const { token } = useToken();
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    const [addEvent, setAddEvent] = useState(false);

    const [viewEvent, setViewEvent] = useState(null);

    function handleClose() {
        setAddEvent(false);
        setViewEvent(null);
    }

    function handleSave(newEvent) {
        // call the endpoint to store the event in the database
        axios.post(`/api/plans/${plan._id}`, newEvent, header).then(async (response) => {
            if (response.status === 201) {
                setAddEvent(false);
                await updatePlanInfo(plan._id, token);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleUpdate(updatedEvent) {
        // call the endpoint to update the event in the database
        axios.put(`/api/plans/${plan._id}/${viewEvent._id}`, updatedEvent, header).then(async (response) => {
            if (response.status === 204) {
                setAddEvent(false);
                setViewEvent(null);
                await updatePlanInfo(plan._id, token);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleOpenEvent(event) {
        //Display info about event in the pop up
        setViewEvent(event);
        setAddEvent(true);
    }

    function handleAddEvent() {
        setAddEvent(true);
    }

    function handleDeleteEvent(eventId) {
        axios.delete(`/api/plans/${plan._id}/${eventId}`, header).then(async function () {
            await updatePlanInfo(plan._id, token);
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
                        onClick={() => setPlan(null)}
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
                {plan ? plan.events.length !== 0 ? plan.events.map((event) => (
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
                )) : <p style={{textAlign:'center'}}>No events to display</p> : null}
            </List>

            {
                addEvent && <EventPopup event={viewEvent} weather={null} open={addEvent} handleClose={handleClose} handleSave={handleSave} handleUpdate={handleUpdate} />
            }
        </div>
    );

}