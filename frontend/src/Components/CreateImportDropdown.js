import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';

function CreateImportDropdown({ addPlan }) {
    const [isOpen, setIsOpen] = useState(false);

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

    const importPlan = () => {
        closeDropdown();
        console.log('clicked import');
        console.log('modal opens');
    };

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
        </>
    );
}

export default CreateImportDropdown;