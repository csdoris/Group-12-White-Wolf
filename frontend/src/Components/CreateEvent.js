import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Plus } from 'react-bootstrap-icons';

function CreateEventDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const openDropdown = (event) => {
        setIsOpen(event.currentTarget);
    };

    const closeDropdown = () => {
        setIsOpen(null);
    };

    const createPlan = () => {
        setIsOpen(null);
        console.log('clicked create');
        console.log('modal opens');
    };

    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={openDropdown}
            >
                <Plus className="plusSign" />
            </Button>
            <Menu
                anchorEl={isOpen}
                keepMounted
                open={Boolean(isOpen)}
                onClose={closeDropdown}
            >
                <MenuItem onClick={createPlan}>Create</MenuItem>
            </Menu>
        </>
    );
}

export default CreateEventDropdown;
