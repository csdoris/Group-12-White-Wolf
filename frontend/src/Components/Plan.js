import React, { useState, useEffect } from 'react';

import { Plus, ThreeDotsVertical } from 'react-bootstrap-icons';

import '../Styles/planStyle.css';

function Plan(planName) {
    const [name, setName] = useState(planName);

    return (
        <div>
            <label className="planName">{name}</label>
            <label>
                <Plus className="plusSign" />
            </label>
            <label>
                <ThreeDotsVertical className="threeDots" />
            </label>
        </div>
    );
}

export default Plan;
