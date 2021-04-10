import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import '../Styles/planStyle.css';

function Plan(planName) {
    const [name, setName] = useState(planName.name.name);
    const [link, setLink] = useState();

    const navigateToPlan = (event) => {
        console.log('Go to plan');
        console.log(name);
    };

    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={navigateToPlan}
            >
                <h3>{name}</h3>
            </Button>
        </>
    );
}

export default Plan;
