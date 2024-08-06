import React, { createContext, useContext, ReactNode, useReducer } from "react";

const initialState = {
    show: false
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SHOW_MODAL':
            return {
                ...state,
                show: true
            }
        case 'HIDE_MODAL':
            return {
                ...state,
                show: false
            }
        default:
            return state;
    }
}

export const dispatcherContext = createContext<any>({});

export const useFullscreenContentContext = () => useContext(dispatcherContext);

export default function FullScreenContentProvider({ children }: { children: ReactNode }) {
    return (
        <dispatcherContext.Provider value={useReducer(reducer, initialState)} >
            {children}
        </dispatcherContext.Provider>
    )
}