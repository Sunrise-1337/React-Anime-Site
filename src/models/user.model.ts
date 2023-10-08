import { FavAnimeInterface } from "../interfaces/authBlockInterfaces/favAnime-interface";

export class UserModel{
    login: string;
    password: string;
    id: number;
    favourites: FavAnimeInterface[];

    constructor(login: string, password: string, id: number = 1) {
        this.login = login;
        this.password = password;
        this.id = id;
        this.favourites = []
    }
}