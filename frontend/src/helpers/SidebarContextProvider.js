import React from 'react';

import { useState } from 'react';

// Create the context
const SidebarContext = React.createContext([]);

/**
 * Wraps the given child components in an SidebarContext.Provider.
 */
function SidebarContextProvider({ children }) {
    // Stateful value initialization
    const [isOpen, setIsOpen] = useState();

    // The context value that will be supplied to any descendants of this component.
    const context = {
        isOpen,
        setIsOpen,
    };

    // Wraps the given child components in a Provider for the above context.
    return (
        <SidebarContext.Provider value={context}>{children}</SidebarContext.Provider>
    );
}

export { SidebarContext, SidebarContextProvider };
