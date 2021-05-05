import React from 'react';
import Button from '@material-ui/core/Button';

import '../Styles/planStyle.css';
import DeleteExportDropdown from './DeleteExportDropdown';

function SidebarRow({ item, handleDelete, handleOnClick, hasExport = true }) {

    return (
        <>
            <Button
                style={{ justifyContent: "flex-start" }}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={() => { handleOnClick(item) }}
                fullWidth={true}
            >
                <h3>{item.name}</h3>
            </Button>
            <DeleteExportDropdown id={item._id} deleteFunc={handleDelete} showExport={hasExport} />
        </>
    );
}

export default SidebarRow;
