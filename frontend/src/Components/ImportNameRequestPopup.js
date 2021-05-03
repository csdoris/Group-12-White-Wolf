import * as React from 'react';
import { useState, useStyles } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Input from '@material-ui/core/Input';
import styles from '../Styles/ImportNamePopup.module.css';

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
                        <div className={styles.buttonDiv}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleClose()}
                            >
                                Close
                            </Button>
                        </div>
                        <Input
                            placeholder="< Type plan name here >"
                            inputProps={{ 'aria-label': 'description' }}
                            onInput={(e) => {
                                setPlanName(e.target.value);
                            }}
                            value={planName}
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
