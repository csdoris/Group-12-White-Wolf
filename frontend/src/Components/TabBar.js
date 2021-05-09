import React, { useState, useContext, useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { SidebarContext } from '../helpers/SidebarContextProvider.js';

function TabBar({
    view,
    handleChange,
}) {
    const { isOpen } = useContext(SidebarContext);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            checkAndUpdateSize();
        };

        checkAndUpdateSize();

        function checkAndUpdateSize() {
            if(isOpen) {
                setWidth(window.innerWidth-350);
            } else {
                setWidth(window.innerWidth);
            }
        }

        window.addEventListener("resize", handleResize);
    }, [isOpen]);

    return(
        <Tabs
            style={{width: width, float: 'right'}}
            value={view}
            onChange={(event, newValue) => handleChange(event, newValue)}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab label="Map View" />
            <Tab label="Schedule View" />
        </Tabs>
    )
}

export default TabBar;