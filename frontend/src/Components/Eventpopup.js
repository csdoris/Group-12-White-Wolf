import * as React from 'react';
import { useState, useStyles } from "react";
import Input from '@material-ui/core/Input';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function EventPopup() {

    // data needed for creating event 
    const [title, setTitle] = useState(null);
    const [data, setDate] = useState(null);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [location, setLocation] = useState(null);
    const [description, setDescription] = useState(null);

    const [open, setOpen] = React.useState(true);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                                value={title}
                                onInput={e => {setTitle(e.target.value)}}
                            />
                        </div>
                        <div>
                            
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
