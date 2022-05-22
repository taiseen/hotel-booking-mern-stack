import { TOGGLE, LIGHT, DARK } from "../constants/actionTypes";
import { createContext, useContext, useReducer } from "react";


// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
// 🟨 Reducer Section... 🟨
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨

const DarkModeReducer = (state, action) => {

    switch (action.type) {
        case LIGHT:
            return { darkMode: false };

        case DARK:
            return { darkMode: true };

        case TOGGLE:
            return { darkMode: !state.darkMode };

        default:
            return state;
    }
};



// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
// 🟨 Context API Section...  🟨
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨

// default initial state
const INITIAL_STATE = {
    darkMode: false,
};

const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

    return (
        <DarkModeContext.Provider value={
            {
                darkMode: state.darkMode,
                dispatch
            }
        }>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkModeContext = () => useContext(DarkModeContext);
