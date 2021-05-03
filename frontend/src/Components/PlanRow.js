import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import '../Styles/planStyle.css';
import DeleteDropdown from './deleteDropdown';

function PlanRow({plan, deletePlan, navigateToPlan}) {
    const [planObj, setPlanObj] = useState(plan);

    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={() => {navigateToPlan(planObj)}}
            >
                <h3>{planObj.name}</h3>
            </Button>
            <DeleteDropdown id={planObj._id} deleteFunc={deletePlan}/>
        </>
    );
}

export default PlanRow;
