import { useState } from "react";

export function useFilter(items: any[], filterProp: string) {
    const [enteredSearchValue, setEnteredSearchValue] = useState<string>("");

    const sortedItems = enteredSearchValue
        ? items.filter((item) =>
            RegExp(enteredSearchValue, "i").test(item[filterProp])
        )
        : items;

    return {
        enteredSearchValue,
        setEnteredSearchValue,
        sortedItems,
    };
}
