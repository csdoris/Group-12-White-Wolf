import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import ExportICS from '../helpers/ExportICS';
import useToken from '../hooks/useToken';
import axios from 'axios';

function DeleteExportDropdown({id, deleteFunc, showExport = true }) {
    const [isOpen, setIsOpen] = useState(false);
    const token = useToken().token;
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    const openDropdown = (event) => {
        setIsOpen(event.currentTarget);
    };

    const closeDropdown = () => {
        setIsOpen(null);
    }

    //Button click handler to retrieve events of the plan user wants to export
    const exportPlan = () => {
        closeDropdown();
        console.log('clicked export');
        console.log('modal opens');
        axios.get(`/api/plans/${id}`, header).then(function (resp) {
            ExportICS(resp.data.events); //Calls export function passing in list of events
        });
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
