import * as React from 'react';
import { useState, useStyles } from "react";

import Input from '@material-ui/core/Input';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import DatePicker from "react-datepicker";
import { TimePicker } from '@patternfly/react-core';
import LocationAutoComplete from './LocationAutoComplete';
import throttle from 'lodash/throttle';

import styles from './EventPopup.module.css';
import "react-datepicker/dist/react-datepicker.css";
import "@patternfly/react-core/dist/styles/base.css";

// style for the modal box
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const autocompleteService = { current: null };

export default function EventPopup() {
    const [open, setOpen] = React.useState(true);

    // data needed for creating event 
    const [title, setTitle] = useState("No Title");
    const [date, setDate] = useState(new Date());
    const [timeFrom, setTimeFrom] = useState("12:00 PM");
    const [timeTo, setTimeTo] = useState("12:00 PM");
    const [description, setDescription] = useState("no description");

    // state for location autocomplete
    const [location, setLocation] = useState(null);
    const [locationInputValue, setLocationInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);

    function handleLocationChange(event, newValue) {
        setOptions(newValue ? [newValue, ...options] : options);
        setLocation(newValue);
    }

    function handleLocationInputValueChange(event, newInputValue) {
        setLocationInputValue(newInputValue);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSave() {
        console.log(title);
        console.log(date);
        console.log(timeFrom);
        console.log(timeTo);
        console.log(location);
        console.log(description);
    }

    const fetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (locationInputValue === '') {
            setOptions(location ? [location] : []);
            return undefined;
        }

        fetch({ input: locationInputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (location) {
                    newOptions = [location];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [location, locationInputValue, fetch]);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div>
                            <Input
                                placeholder="< Insert title here >"
                                inputProps={{ 'aria-label': 'description' }}
                                onInput={e => { setTitle(e.target.value) }}
                            />
                        </div>
                        <div className={styles.dateBox}>
                            <DatePicker selected={date} onChange={date => setDate(date)} />
                            <TimePicker value={timeFrom} defaultTime={timeTo} onChange={time => setTimeFrom(time)} />
                            to
                            <TimePicker value={timeTo} defaultTime={timeFrom} onChange={time => setTimeTo(time)} />
                        </div>
                        <div>
                            <LocationAutoComplete
                                value={location}
                                options={options}
                                handleChange={handleLocationChange}
                                handleInputChange={handleLocationInputValueChange}
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={4}
                                variant="outlined"
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
