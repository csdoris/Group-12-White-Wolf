import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../Styles/planStyle.css';
import DeleteDropdown from './deleteDropdown';

const useStyles = makeStyles(() => ({
    button: {
        justifyContent: 'flex-start',
    },
}));

function Plan({ name, deletePlan, navigateToPlan }) {
    const classes = useStyles();
    const [planName, setName] = useState(name.name);
    const [id, setId] = useState(name.id); // this is currently a dummy value
    const [link, setLink] = useState();

    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={() => {
                    navigateToPlan(id, planName);
                }}
                className={classes.button}
            >
                {planName}
            </Button>
            <DeleteDropdown name={planName} deleteFunc={deletePlan} />
        </>
    );
}

export default Plan;
