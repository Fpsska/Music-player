export interface IalbumList {
    id: number;
    title: string;
    preview: string;
    artist: Iartist;
    isFavourite: boolean;
}

interface Iartist {
    name: string;
    picture_medium: string;
}

export interface ImockData {
    id: number;
}
