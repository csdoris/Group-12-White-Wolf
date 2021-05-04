import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import ExportICS from '../helpers/ExportICS';
import { SidebarContext } from '../helpers/SidebarContextProvider';

function DeleteExportDropdown({id, deleteFunc, showExport = true }) {
    const [isOpen, setIsOpen] = useState(false);
    const {events} = useContext(SidebarContext)

    const openDropdown = (event) => {
        setIsOpen(event.currentTarget);
    };

    const closeDropdown = () => {
        setIsOpen(null);
    };

    const exportPlan = () => {
        closeDropdown();
        ExportICS(events);
    };

    const deletePlan = () => {
        closeDropdown();
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
