export function handleObjStatuses<Obj extends Record<PropertyKey, boolean>>(
    targetKey: PropertyKey,
    obj: Obj
): Record<PropertyKey, boolean> {
    const newObj = Object.keys(obj).reduce((acc, key) => {
        if (key === targetKey) {
            return {
                ...acc,
                [key]: true
            };
        } else {
            return {
                ...acc,
                [key]: false
            };
        }
    }, {});

    return newObj;
}