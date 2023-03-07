import { albumListTypes } from 'types/mainSliceTypes';

// /. imports

export function swapArrayElementsPositions(
    array: albumListTypes[],
    targetItemID: number
): albumListTypes[] {
    const arrayCopy = JSON.parse(JSON.stringify(array));

    const targetItemIDX = array.findIndex(item => item.id === targetItemID);
    const secondItemIDX = 0;

    const temp = arrayCopy[secondItemIDX];
    arrayCopy[secondItemIDX] = arrayCopy[targetItemIDX];
    arrayCopy[targetItemIDX] = temp;

    return arrayCopy;
}
