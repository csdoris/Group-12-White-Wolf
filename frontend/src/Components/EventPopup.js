import * as React from 'react';
import { useState, useEffect, useMemo } from "react";

import Input from '@material-ui/core/Input';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import DatePicker from "react-datepicker";
import { TimePicker } from '@patternfly/react-core';
import LocationAutoComplete from './LocationAutoComplete';
import throttle from 'lodash/throttle';

import styles from '../Styles/EventPopup.module.css';
import "../Styles/DatePicker.css"
import "../Styles/TimePicker.css"
import "react-datepicker/dist/react-datepicker.css";
import "@patternfly/react-core/dist/styles/base.css";

// style for the modal box
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const autocompleteService = { current: null };
const placeService = { current: null };

export default function EventPopup({event, open, handleClose, handleSave, handleUpdate}) {

    // data needed for creating event 
    const [name, setName] = useState("");
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [timeFrom, setTimeFrom] = useState(convert24HourTo12Hour(dateFrom));
    const [timeTo, setTimeTo] = useState(convert24HourTo12Hour(dateTo));
    const [description, setDescription] = useState("");

    // state for location autocomplete
    const [location, setLocation] = useState(null);
    const [locationInputValue, setLocationInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [validLocation, setValidLocation] = useState(true);

    function getLatAndLongForLocation() {
        if (!placeService.current && window.google) {
            placeService.current = new window.google.maps.places.PlacesService(document.createElement('div'));
        }

        if (!placeService.current) {
            console.log("Cannot initialise the placeService")
        }

        const request = {
            placeId: location.place_id
        };

        if(typeof placeId!=="undefined") {
            placeService.current.getDetails(request, (result, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    const position = result.geometry.location.toJSON();
                
                    const newEvent = {
                        startTime: dateFrom.toJSON(),
                        endTime: dateTo.toJSON(),
                        address: location.description,
                        description: description,
                        lat: position.lat,
                        lng: position.lng
                    }

                    if (name) {
                        newEvent.name = name;
                    }

                    event ? handleUpdate(newEvent) : handleSave(newEvent);
                }
                else {
                    console.log("Cannot get exact location of the place")
                }
            });
        } else {
            const newEvent = {
                startTime: dateFrom.toJSON(),
                endTime: dateTo.toJSON(),
                address: event.address,
                description: description,
                lat: event.lat,
                lng: event.lng
            }

            if (name) {
                newEvent.name = name;
            }

            event ? handleUpdate(newEvent) : handleSave(newEvent);
        }
    }

    function handleSaveButonClicked() {
        // check location is entered 
        if (!location) {
            setValidLocation(false);
            return;
        }
        else {
            setValidLocation(true);
        }

        // get the latitude and longitude of the location
        getLatAndLongForLocation();
    }

    // state for if readonly or editable
    const [viewOnly, setViewOnly] = useState(event!==null);

    function getName() {
        if(viewOnly) {
            return(event.name);
        } else {
            return(name);
        }
    }

    function getDescription() {
        if(viewOnly) {
            return(event.description);
        } else {
            return(description);
        }
    }

    function getLocation() {
        if(viewOnly) {
            return(event.address);
        } else {
            return(location);
        }
    }

    function getTimeTo() {
        if(viewOnly) {
            return(convert24HourTo12Hour(new Date(event.endTime)));
        } else {
            return(timeTo);
        }
    }

    function getTimeFrom() {
        if(viewOnly) {
            return(convert24HourTo12Hour(new Date(event.startTime)));
        } else {
            return(timeFrom);
        }
    }

    function getDateTo() {
        if(viewOnly) {
            return(new Date(event.endTime));
        } else {
            return(dateTo);
        }
    }

    function getDateFrom() {
        if(viewOnly) {
            return(new Date(event.startTime));
        } else {
            return(dateFrom);
        }
    }

    function handleEdit() {
        setName(event.name);
        setDescription(event.description);
        setLocation(event.address);
        setDateFrom(new Date(event.startTime));
        setDateTo(new Date(event.endTime));

        setViewOnly(false)
    }

    // function handleUpdate() {
    //     // TODO: handle updating event
    //     console.log("update");
    // }

    function getButton() {
        if(viewOnly) {
            return(
                <Button variant="contained" color="primary" onClick={() => handleEdit()}>
                    Edit
                </Button>
            )
        } else {
            return(
                <Button variant="contained" color="primary" onClick={() => handleSaveButonClicked()}>
                    Save
                </Button>
            )
        }
    }

    function getWeatherInfo() {
        if(viewOnly) {
            return(
                <div>
                    <p>
                        Temperature: 20C
                        Wind Speed: blah
                    </p>
                </div>
            )
        }
    }

    function handleLocationChange(event, newValue) {
        setOptions(newValue ? [newValue, ...options] : options);
        setLocation(newValue);
    }

    function handleLocationInputValueChange(event, newInputValue) {
        setLocationInputValue(newInputValue);
    }

    // used when initialise the timeTo and timeFrom state
    function convert24HourTo12Hour(date) {
        var hour = date.getHours();
        var minute = date.getMinutes();
        var modifier = "AM";

        if (hour === 0) {
            hour = parseInt(hour) + 12;
        }
        else if ((hour >= 13) && (hour < 24)) {
            hour = parseInt(hour) - 12;
            modifier = "PM";
        }

        const time = hour + ":" + minute + " " + modifier;
        return time;
    }

    function convert12HourTo24Hour(time) {
        // format of time is: 12:00 PM
        // time: 12:00
        // modifier: PM/AM
        var [time, modifier] = time.split(" ");
        var [hour, minute] = time.split(":");
       
        // convert to 24 hours 
        if ((modifier === "AM") && (hour === "12"))  {
            hour = 0;
        }
        else if ((modifier === "PM") && (hour >= 1) && (hour < 12)) {
            hour = parseInt(hour) + 12;
        }

        return [hour, minute];
    }

    function handleDateChange(isDateFrom, newDate) {
        var [hour, minute] = ['', ''];

        if (isDateFrom) {
            [hour, minute] = convert12HourTo24Hour(timeFrom);
        }
        else {
            [hour, minute] = convert12HourTo24Hour(timeTo);
        }

        newDate.setHours(hour);
        newDate.setMinutes(minute);

        if (isDateFrom) {
            // check if DateTo is smaller than date from, if it is, then we update the 
            // day, month and year in DateTo to be the same as the new Date
            if (dateTo.getTime() < newDate.getTime()) {
                var newDateTo = new Date(dateTo.getTime());
                newDateTo.setDate(newDate.getDate());
                newDateTo.setMonth(newDate.getMonth());
                newDateTo.setFullYear(newDate.getFullYear());
                setDateTo(newDateTo);
            }
            setDateFrom(newDate);
        }
        else {
            setDateTo(newDate);
        }
    }

    function handleTimeChange(isTimeFrom, newTime) {
        const [hour, minute] = convert12HourTo24Hour(newTime);

        var newDate = new Date(dateFrom.getTime());
        newDate.setHours(hour);
        newDate.setMinutes(minute);
        
        if (isTimeFrom) {
            // update the dateFrom object
            setTimeFrom(newTime);
            setDateFrom(newDate);
        }
        else {
            // update the dateTo object
            setTimeTo(newTime);
            setDateTo(newDate);
        }
    }

    const fetch = useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    useEffect(() => {
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
                onClose={() => handleClose()}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={styles.modal}>
                        <div className={styles.buttonDiv}> 
                            <CloseIcon 
                                className={styles.closeIcon}
                                color="primary"
                                onClick={() => handleClose()}
                            />
                        </div>
                        <div>
                            <Input
                                fullWidth={true}
                                placeholder="< Insert title here >"
                                inputProps={{ 'aria-label': 'description' }}
                                onInput={e => { setName(e.target.value) }}
                                value={getName()}
                                InputProps={{
                                    readOnly: viewOnly,
                                }}
                            />
                        </div>
                        <div className={styles.timeDiv}>
                            <DatePicker selected={getDateFrom()} onChange={date => handleDateChange(true, date)} disabled={viewOnly} />
                            <TimePicker value={getTimeFrom()} defaultTime={timeFrom} onChange={time => handleTimeChange(true, time)} isDisabled={viewOnly} />
                            <div className={styles.to}>to</div>
                            <DatePicker selected={getDateTo()} onChange={date => handleDateChange(false, date)} disabled={viewOnly} />
                            <TimePicker value={getTimeTo()} defaultTime={timeTo} onChange={time => handleTimeChange(false, time)} isDisabled={viewOnly} />
                        </div>
                        <div>
                            <LocationAutoComplete
                                value={getLocation()}
                                options={options}
                                handleChange={handleLocationChange}
                                handleInputChange={handleLocationInputValueChange}
                                viewOnly={viewOnly}
                            />
                        </div>
                        {validLocation ? null : <div className={styles.textDanger}>Please enter a valid location</div>}
                        <div>
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={4}
                                variant="outlined"
                                onChange={e => setDescription(e.target.value)}
                                value={getDescription()}
                                fullWidth={true}
                                InputProps={{
                                    readOnly: viewOnly,
                                }}
                            />
                        </div>
                        {getWeatherInfo()}
                        <div className={styles.buttonDiv}>
                            {getButton()}
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
