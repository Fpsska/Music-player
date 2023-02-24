export function determineCurrentPlayerData(array: any[], name: string): any[] {
    const dataCopy = [...array];

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
