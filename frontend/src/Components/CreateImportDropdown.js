import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import ImportNameRequestPopup from './ImportNameRequestPopup';
import ImportICS from '../helpers/ImportICS';

function CreateImportDropdown({ addPlan, addImportedPlan }) {
    const [isOpen, setIsOpen] = useState(false);
    const [importing, setImporting] = useState(false);
    const [importedEvents, setImportedEvents] = useState(null);

    const openDropdown = (event) => {
        setIsOpen(event.currentTarget);
    };

    const closeDropdown = () => {
        setIsOpen(null);
    };

    const createPlan = () => {
        closeDropdown();
        console.log('clicked create');
        console.log('modal opens');
        addPlan();
    };

    const importPlan = async () => {
        closeDropdown();
        console.log('clicked import');
        console.log('modal opens');
        let importedEvents = await ImportICS();
        if (importedEvents) {
            console.log(importedEvents);
            setImporting(true);
            setImportedEvents(importedEvents);
        }
    };

    function handleClose() {
        setImporting(false);
    }

    function handleSave(name) {
        console.log('save called');
        addImportedPlan(name, importedEvents);
        setImporting(false);
    }

    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={openDropdown}
            >
                <AddIcon className="plusSign" />
            </Button>
            <Menu
                anchorEl={isOpen}
                keepMounted
                open={Boolean(isOpen)}
                onClose={closeDropdown}
            >
                <MenuItem onClick={createPlan}>Create</MenuItem>
                <MenuItem onClick={importPlan}>Import</MenuItem>
            </Menu>
            {importing && (
                <ImportNameRequestPopup
                    open={importing}
                    handleClose={handleClose}
                    handleSave={handleSave}
                ></ImportNameRequestPopup>
            )}
        </>
    );
}

export default CreateImportDropdown;
