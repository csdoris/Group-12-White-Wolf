import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import '../Styles/planStyle.css';
import DeleteDropdown from './deleteDropdown';

function Plan({plan, deletePlan, navigateToPlan}) {
    const [planObj, setPlanObj] = useState(plan);

    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={() => {navigateToPlan(planObj._id, planObj.name)}}
            >
                <h3>{planObj.name}</h3>
            </Button>
            <DeleteDropdown id={planObj._id} deleteFunc={deletePlan}/>
        </>
    );
}

export default Plan;
