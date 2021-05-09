import * as React from 'react';
import { useState, useStyles } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Input from '@material-ui/core/Input';
import styles from '../Styles/ImportNamePopup.module.css';
import { Grid, TextField } from '@material-ui/core';

export default function ImportNameRequestPopup({
    open,
    handleClose,
    handleSave,
    handlePickFile,
    fileName,
}) {
    const [planName, setPlanName] = useState();
    const [inputField, setInputField] = useState();

    function handleChange(input) {
        if (input.replace(/\s/g, '').length == 0) {
            setInputField(null)
        } else {
            setInputField(input);
        }
    }

    return (
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
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <h1 className={styles.heading}>Name your plan</h1>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleClose()}
                        >
                            Close
                        </Button>
                    </Grid>

                    <TextField
                        id="outlined-basic"
                        label="Type plan name here..."
                        placeholder="< Type plan name here >"
                        variant="filled"
                        autoFocus
                        error={!inputField}
                        helperText={!inputField ? 'Invalid name' : ''}
                        onChange={(e) => {
                            setPlanName(e.target.value);
                            handleChange(e.target.value);
                        }}
                    />
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <p>{fileName}</p>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handlePickFile}
                        >
                            Upload an ICS file
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSave(planName)}
                        >
                            Import
                        </Button>
                    </Grid>
                </div>
            </Fade>
        </Modal>
    );
}
