import React from 'react';
import Button from '@material-ui/core/Button';

import '../Styles/planStyle.css';
import DeleteDropdown from './deleteDropdown';

function PlanRow({plan, deletePlan, navigateToPlan}) {

    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={() => {navigateToPlan(plan)}}
            >
                <h3>{plan.name}</h3>
            </Button>
            <DeleteDropdown id={plan._id} deleteFunc={deletePlan}/>
        </>
    );
}

export default PlanRow;
