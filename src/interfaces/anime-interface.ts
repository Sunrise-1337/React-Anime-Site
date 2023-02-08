import { ObjectNameInterface } from "./objectName-interface";

export interface AnimeInterface {
    aired: {
        string: string;
    },
    airing: boolean,
    broadcast: {
        string: string
    },
    duration: string,
    favorites: number,
    genres:  ObjectNameInterface[],
    images: {
        jpg: {
            large_image_url: string
        }
    },
    mal_id: number,
    rating: string,
    score: number,
    scored_by: number,
    status: string,
    studios: ObjectNameInterface[],
    synopsis: string,
    title: string,
    title_english?: string,
    title_japanese: string,
    themes: ObjectNameInterface[],
    type: string,
}
