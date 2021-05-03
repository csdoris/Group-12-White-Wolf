import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import ImportICS from '../helpers/ImportICS';
import ImportNameRequestPopup from './ImportNameRequestPopup';

function CreateImportDropdown({ addPlan, addImportedPlan }) {
    const [isOpen, setIsOpen] = useState(false);
    const [importing, setImporting] = useState(false);
    const [contents, setContents] = useState(null);

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
        let contents = await ImportICS();
        if (contents) {
            setImporting(true);
            setContents(contents);
        }
    };

    function handleClose() {
        setImporting(false);
    }

    function handleSave(name) {
        console.log('save called');
        setImporting(false);
        addImportedPlan(name, contents);
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
