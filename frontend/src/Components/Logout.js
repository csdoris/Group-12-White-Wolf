import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Avatar from '@material-ui/core/Avatar';
import useToken from '../hooks/useToken';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import styles from '../Styles/Logout.module.css'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        position: 'fixed',
        zIndex: '1000',
        right: '2%',
        top: '2%'
    }
}));

export default function Logout({ logout }) {
    const classes = useStyles();
    const axios = require('axios');
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    // for great the user
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const {token, deleteToken} = useToken();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    function handleLogoutButtonClick(e) {
        handleClose(e);
        deleteToken();
        history.push('/login');
    }

    useEffect(() => {
        // get user's name and email 
        const fetchData = async() => {
            try {
                const result = await axios.get("/api/user", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                
                const data = result.data;
                setName(data.name);
                setEmail(data.email);
            } catch (error) {
                // user cannot be found with the authentication token given
                deleteToken();
                history.push('/login');
            }
        };

        fetchData();
    });

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <div>
                <Avatar 
                    className={styles.profile}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}>
                        {name.charAt(0)}
                </Avatar>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} className={styles.menu}>
                                        <div className={styles.greeting}>
                                            <div>Hi {name}</div>
                                            <div>{email}</div>
                                        </div>
                                        <MenuItem onClick={handleLogoutButtonClick}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}
