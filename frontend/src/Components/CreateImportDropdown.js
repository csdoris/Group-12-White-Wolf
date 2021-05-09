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
    const [fileName, setFileName] = useState();

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

    //Button click handler to call import ICS function and show name popup when ICS file has been read in
    const importPlan = () => {
        closeDropdown();
        console.log('clicked import');
        console.log('modal opens');
        setImporting(true);
    };

    function handleClose() {
        setImporting(false);
    }

    //Save the imported events and call a passed down function
    function handleSave(name) {
        console.log('save called');
        console.log(name);
        //Check empty string, null string, undefined string, string containing only spaces
        if (
            name === '' ||
            name == null ||
            name == undefined ||
            name.replace(/\s/g, '').length == 0
        ) {
        } else {
            addImportedPlan(name, importedEvents);
            setImporting(false);
        }
    }

    async function handlePickFile() {
        let {importedEvents,
            fileName} = await ImportICS();
        setFileName(fileName);
        console.log(importedEvents + ' events')
        setImportedEvents(importedEvents);
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
                    handlePickFile={handlePickFile}
                    fileName={fileName}
                ></ImportNameRequestPopup>
            )}
        </>
    );
}

export default CreateImportDropdown;
