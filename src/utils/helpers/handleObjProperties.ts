export function handleObjProperties(
    activeFlag: string,
    obj: any
): { [key: string]: boolean } {
    const newStatusesObj = Object.keys(obj).reduce((acc, key) => {
        if (key === activeFlag) {
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
    return newStatusesObj;
}
