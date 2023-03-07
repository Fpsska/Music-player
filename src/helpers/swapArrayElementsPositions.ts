export function swapArrayElementsPositions(array: any[], targetItemID: number) {
    const arrayCopy = JSON.parse(JSON.stringify(array));

    const targetItemIDX = array.findIndex(item => item.id === targetItemID);
    const secondItemIDX = 0;

    const temp = arrayCopy[secondItemIDX];
    arrayCopy[secondItemIDX] = arrayCopy[targetItemIDX];
    arrayCopy[targetItemIDX] = temp;

    console.log('swap func:', arrayCopy);

    return arrayCopy;
}
