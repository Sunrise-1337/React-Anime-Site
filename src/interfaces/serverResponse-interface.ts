import { AnimeInterface } from "./anime-interface";

export interface ServerResponseInterface {
    data: AnimeInterface[],
    pagination?: {
        current_page: number,
        has_next_page: boolean,
        last_visible_page: number
    }
}
