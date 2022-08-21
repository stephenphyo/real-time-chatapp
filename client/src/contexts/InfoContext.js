import { createContext, useState } from 'react';


/* Context */
const InfoContext = createContext();
export default InfoContext;


/* Context Provider */
export const InfoContextProvider = (props) => {

    /* useState */
    const [room, setRoom] = useState('');
    const [username, setUsername] = useState('');

    /* Context Values */
    const value = {
        room, setRoom,
        username, setUsername
    };

    return (
        <InfoContext.Provider value={value}>
            {props.children}
        </InfoContext.Provider>
    )
};