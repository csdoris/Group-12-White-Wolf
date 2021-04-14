import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import '../Styles/planStyle.css';
import DeleteDropdown from './deleteDropdown';

function Plan({name, deletePlan}) {
    const [planName, setName] = useState(name.name);
    const [link, setLink] = useState();

    const navigateToPlan = (event) => {
        console.log('Go to plan ' + name);
    };

    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={navigateToPlan}
            >
                <h3>{planName}</h3>
            </Button>
            <DeleteDropdown name={planName} deleteFunc={deletePlan}/>
        </>
    );
}

export default Plan;
