import { useState } from 'react';

// /. imports

interface propTypes {
    items: any[],
    filterProp: string
}

// /. interfaces

export function useFilter(props: propTypes) {

    const {
        items,
        filterProp
    } = props;

    const [enteredSearchValue, setEnteredSearchValue] = useState<string>('');

    const sortedItems = enteredSearchValue
        ? items.filter((item) =>
            RegExp(enteredSearchValue, 'i').test(item[filterProp])
        )
        : items;

    return {
        enteredSearchValue,
        setEnteredSearchValue,
        sortedItems
    };
}
