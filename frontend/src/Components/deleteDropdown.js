import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import ExportICS from '../helpers/ExportICS';

function DeleteDropdown({ name, deleteFunc }) {
    const [isOpen, setIsOpen] = useState(false);
    const [planName, setPlanName] = useState(name);

    const openDropdown = (event) => {
        setIsOpen(event.currentTarget);
    };

    const closeDropdown = () => {
        setIsOpen(null);
    };

    const sharePlan = () => {
        closeDropdown();
        console.log('clicked share');
        console.log('modal opens');
    };

    const exportPlan = () => {
        closeDropdown();
        console.log('clicked export');
        console.log('modal opens');
        // ExportICS(events); //Undo when plan context has been merged in
    };

    const deletePlan = () => {
        closeDropdown();
        console.log('clicked delete');
        console.log('check modal opens');
        console.log(planName);
        deleteFunc(planName);
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
                <MenuItem onClick={sharePlan}>Share</MenuItem>
                <MenuItem onClick={exportPlan}>Export</MenuItem>
                <MenuItem onClick={deletePlan}>Delete</MenuItem>
            </Menu>
        </>
    );
}

export default DeleteDropdown;
