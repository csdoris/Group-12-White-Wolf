import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ThreeDotsVertical } from 'react-bootstrap-icons';

function DeleteDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const openDropdown = (event) => {
        setIsOpen(event.currentTarget);
    };

    const closeDropdown = () => {
        setIsOpen(null);
    };

    const exportPlan = () => {
        setIsOpen(null);
        console.log('clicked export');
        console.log('modal opens');
    };

    const deletePlan = () => {
        setIsOpen(null);
        console.log('clicked delete');
        console.log('check modal opens');
        console.log('plan deleted');
    };

    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={openDropdown}
            >
                <ThreeDotsVertical className="threeDots" />
            </Button>
            <Menu
                anchorEl={isOpen}
                keepMounted
                open={Boolean(isOpen)}
                onClose={closeDropdown}
            >
                <MenuItem onClick={exportPlan}>Export</MenuItem>
                <MenuItem onClick={deletePlan}>Delete</MenuItem>
            </Menu>
        </>
    );
}

export default DeleteDropdown;
