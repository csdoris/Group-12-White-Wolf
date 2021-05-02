import * as React from 'react';
import { useState, useStyles } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import styles from '../Styles/OfflineMapPopup.module.css';

export default function OfflineMapPopup({ open, handleClose, url }) {
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
                        <img src={url}></img>
                        <div className={styles.buttonDiv}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleClose()}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
