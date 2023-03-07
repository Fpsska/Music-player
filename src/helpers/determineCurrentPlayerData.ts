import { albumListTypes } from 'types/mainSliceTypes';

// /. imports

export function determineCurrentPlayerData(
    array: albumListTypes[],
    name: string
): albumListTypes[] {
    const dataCopy: albumListTypes[] = [...array];

    switch (name) {
        case 'recomended':
            return dataCopy.slice(0, 3).reverse();
        case 'playlist':
            return dataCopy;
        case 'popular':
            return dataCopy.slice(3, 5);
        default:
            return dataCopy;
    }
}
