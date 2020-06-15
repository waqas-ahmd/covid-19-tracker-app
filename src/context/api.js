import React, { createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

const initialState = {
    data: []
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function sortData(criteria){
        dispatch({
            type: 'SORT_DATA',
            payload : criteria
        })
    }

    function sortDataRev(criteria){
        dispatch({
            type: 'SORT_DATA_REV',
            payload : criteria
        })
    }

    function addData(data){
        dispatch({
            type: 'ADD_DATA',
            payload : data
        })
    }

    return (<GlobalContext.Provider value={{
        data: state.data,
        history: state.history,
        sortData,
        sortDataRev,
        addData
    }}>
        {children}
    </GlobalContext.Provider> )
}