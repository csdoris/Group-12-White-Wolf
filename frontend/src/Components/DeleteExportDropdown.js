import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import ExportICS from '../helpers/ExportICS';

function DeleteExportDropdown({id, deleteFunc, showExport = true }) {
    const [isOpen, setIsOpen] = useState(false);

    const openDropdown = (event) => {
        setIsOpen(event.currentTarget);
    };

    const closeDropdown = () => {
        setIsOpen(null);
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
        console.log(id)
        deleteFunc(id);
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
               {showExport && <MenuItem onClick={exportPlan}>Export</MenuItem> }
                <MenuItem onClick={deletePlan}>Delete</MenuItem>
            </Menu>
        </>
    );
}

export default DeleteExportDropdown;
