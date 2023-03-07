import { useState } from 'react';

import { useAppDispatch } from 'app/hooks';

import { filterLikedData } from 'app/slices/playerSlice';

// /. imports

interface propTypes {
    name: string;
    value: string;
}

// /. interfaces

export function useInput(currentValue: string) {
    const [value, setValue] = useState<string>(currentValue);

    const dispatch = useAppDispatch();

    const onInputChange = (props: propTypes) => {
        const { name, value } = props;

        switch (name) {
            case 'search':
                setValue(value.replace(/[^a-zA-Z\s]/g, ''));
                dispatch(
                    filterLikedData(value.replace(/[^a-zA-Z\s]/g, '').trim())
                );
                break;
        }
    };

    return {
        value,
        onInputChange
    };
}
