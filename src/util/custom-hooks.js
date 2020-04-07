import { useState } from 'react';

export const useStateFromEvent = (initialValue) => {
    
    const [val, setVal] = useState(initialValue);

    const handleValueChange = ({ target: { value } }) => setVal(value);
    
    return [val, handleValueChange];
};
