import { AnimeInterface } from "../interfaces/anime-interface";
import { AccountInterface } from "../interfaces/authBlockInterfaces/account-interface";
import { FavAnimeInterface } from "../interfaces/authBlockInterfaces/favAnime-interface";

export function isFav(animeId: number | undefined) {
  if (animeId){
    let favs: FavAnimeInterface[] | null = JSON.parse(localStorage.getItem('Favourites') as string),
        userFavs: FavAnimeInterface[] | null = JSON.parse(localStorage.getItem('CurUser') as string)?.favourites,
        result: boolean = false;

    if (favs) {
      favs.forEach(el => {
        if (el.id === animeId){
          result = true
        }
      })
    }
    if (userFavs) userFavs.forEach(el => el.id === animeId ? result = true : null)

    return result
  } else {
    return false
  }
}

export function toggleFav(anime: AnimeInterface) {
  let favs = JSON.parse(localStorage.getItem('Favourites') as string),
      user = JSON.parse(localStorage.getItem('CurUser') as string),
      base = user ? user.favourites : favs,
      arg = isFav(anime.mal_id),
      list = base ? base : [];

  if (arg) {
    list.forEach((el: FavAnimeInterface, i: number) => {
      if (el.id === anime.mal_id) list.splice(i, 1)
    })
  } else {
    list.push({
      name: anime.title_english ? anime.title_english : anime.title,
      id: anime.mal_id,
      src: anime.images.jpg.large_image_url,
    })
  }
  
  if (user) {
    user.favourites = list
    let users = JSON.parse(localStorage.getItem('Users') as string)
    users[user.id] = user
    localStorage.setItem('Users', JSON.stringify(users))  
    localStorage.setItem('CurUser', JSON.stringify(user))  
  } else {
    localStorage.setItem('Favourites', JSON.stringify(list))
  }

  return list
}

export function getFavAnimes(){
  let favs: FavAnimeInterface[] = JSON.parse(localStorage.getItem('Favourites') as string),
      user: AccountInterface = JSON.parse(localStorage.getItem('CurUser') as string),
      base = user ? user.favourites : favs,
      list = base ? base : [];

  return list
}

export function deleteFromFav(anime: FavAnimeInterface) {
  let users: AccountInterface[] = JSON.parse(localStorage.getItem('Users') as string),
      user: AccountInterface = JSON.parse(localStorage.getItem('CurUser') as string),
      list = getFavAnimes();

  list = list.filter((el: FavAnimeInterface, i: number) => {
    console.log(el.id !== anime.id)
    return el.id !== anime.id
  })

  user.favourites = list
  localStorage.setItem('CurUser', JSON.stringify(user)) 
  users[user.id] = user
  localStorage.setItem('Users', JSON.stringify(users))  
  
  return list
}