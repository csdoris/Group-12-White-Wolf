import * as React from 'react';

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

export default function ViewEventPopup({eventId, open, handleClose}) {
    function getTitle() {
        return("Trip");
    }

    function getDescription() {
        return("Gonna go camping?");
    }

    function getLocation() {
        return("3 Symonds Street, Auckland");
    }

    function getTimeTo() {
        return("3:35 PM")
    }

    function getTimeFrom() {
        return("2:30 PM")
    }

    function getDateTo() {
        return(new Date());
    }

    function getDateFrom() {
        return(new Date());
    }

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
                                inputProps={{ 'aria-label': 'description' }}
                                value={getTitle()}
                                disabled
                            />
                        </div>
                        <div className={styles.timeDiv}>
                            <DatePicker selected={getDateFrom()} disabled />
                            <TimePicker defaultTime={getTimeFrom()} isDisabled={true} />
                            <div className={styles.to}>to</div>
                            <DatePicker selected={getDateTo()} disabled />
                            <TimePicker defaultTime={getTimeTo()} isDisabled={true} />
                        </div>
                        <div>
                            <TextField
                                value={getLocation()}
                                fullWidth={true}
                                disabled
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={4}
                                variant="outlined"
                                value={getDescription()}
                                fullWidth={true}
                                disabled
                            />
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
