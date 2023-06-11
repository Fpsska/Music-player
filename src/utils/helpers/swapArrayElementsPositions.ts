export function swapArrayElementsPositions<T extends { id: number }>(
    array: T[],
    targetItemID: number
): T[] {
    const arrayCopy = JSON.parse(JSON.stringify(array));

    const targetItemIDX = array.findIndex((item: T) => item.id === targetItemID);
    const secondItemIDX = 0;

    const temp = arrayCopy[secondItemIDX];
    arrayCopy[secondItemIDX] = arrayCopy[targetItemIDX];
    arrayCopy[targetItemIDX] = temp;

    return arrayCopy;
}
