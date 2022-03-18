export interface albumListTypes {
  id: number;
  title: string;
  preview: string;
  song: string;
  artist: artistTypes;
}

interface artistTypes {
  name: string;
  picture_medium: string;
}

export interface mockDataTypes {
  id: number;
}
