import { createContext, useContext, useReducer } from "react";
import { NEW_SEARCH, RESET_SEARCH } from "../constants/actionTypes";

const INITIAL_STATE = {
    city: undefined,
    dates: [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined,
    },
};


export const SearchContext = createContext(INITIAL_STATE);


const SearchReducer = (state, { type, payload }) => {
    switch (type) {
        case NEW_SEARCH:
            return payload;
        case RESET_SEARCH:
            return INITIAL_STATE;
        default:
            return state;
    }
};

 
export const SearchContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    return (
        <SearchContext.Provider
            value={{
                city: state.city,
                dates: state.dates,
                options: state.options,
                dispatch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => useContext(SearchContext);