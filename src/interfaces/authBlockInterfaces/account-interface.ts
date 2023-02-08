import { FavAnimeInterface } from "./favAnime-interface";

export interface AccountInterface {
    login: string, 
    password: string, 
    id: number, 
    favourites: FavAnimeInterface[]
}
