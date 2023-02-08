export interface albumListTypes {
    id: number;
    title: string;
    preview: string;
    artist: artistTypes;
    isFavourite: boolean;
}

interface artistTypes {
    name: string;
    picture_medium: string;
}

export interface mockDataTypes {
    id: number;
}
