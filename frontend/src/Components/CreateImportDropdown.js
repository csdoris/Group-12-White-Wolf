import React, { useState } from 'react';
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
        addPlan();
    };

    //Button click handler to call import ICS function and show name popup when ICS file has been read in
    const importPlan = async () => {
        closeDropdown();
        let importedEvents = await ImportICS();
        if (importedEvents) {
            setImporting(true);
            setImportedEvents(importedEvents);
        }
    };

    function handleClose() {
        setImporting(false);
    }

    //Save the imported events and call a passed down function
    function handleSave(name) {
        addImportedPlan(name, importedEvents);
        setImporting(false);
    }

    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={openDropdown}
                data-testid="plus-button"
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
                <MenuItem onClick={importPlan}>Import ICS file</MenuItem>
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
