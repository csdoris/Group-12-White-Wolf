import * as React from 'react';
import { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import styles from '../Styles/ImportNamePopup.module.css';
import { Grid, TextField } from '@material-ui/core';

export default function ImportNameRequestPopup({
    open,
    handleClose,
    handleSave,
}) {
    const [planName, setPlanName] = useState();
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
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <h1 className={styles.heading}>Name your plan</h1>
                            
                            <CloseIcon
                                className={styles.closeIcon}
                                color="primary"
                                onClick={() => handleClose()}
                            />
                        </Grid>

                        <TextField
                            id="outlined-basic"
                            label="Type plan name here..."
                            placeholder="< Type plan name here >"
                            variant="filled"
                            autoFocus
                            onChange={(e) => {
                                setPlanName(e.target.value);
                            }}
                        />
                        <div className={styles.buttonDiv}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleSave(planName)}
                            >
                                Import
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
