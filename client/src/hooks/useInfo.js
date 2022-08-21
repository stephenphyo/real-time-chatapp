import { useContext } from 'react';

/* Context Imports */
import InfoContext from "contexts/InfoContext";

const useInfo = () => {
    return useContext(InfoContext);
};

export default useInfo;