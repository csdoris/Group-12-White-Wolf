import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import '../Styles/planStyle.css';
import DeleteDropdown from './deleteDropdown';

function Plan({name, deletePlan, navigateToPlan}) {
    const [planName, setName] = useState(name.name);
    const [id, setId] = useState(name.id)     // this is currently a dummy value 
    const [link, setLink] = useState();

    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={() => {navigateToPlan(id, planName)}}
            >
                <h3>{planName}</h3>
            </Button>
            <DeleteDropdown name={planName} deleteFunc={deletePlan}/>
        </>
    );
}

export default Plan;
