import { StorageConstants } from "../constants/storage.constants";
import { AnimeInterface } from "../interfaces/anime-interface";
import { AccountInterface } from "../interfaces/authBlockInterfaces/account-interface";
import { FavAnimeInterface } from "../interfaces/authBlockInterfaces/favAnime-interface";

export function isFav(animeId: number | undefined) {
  if (animeId){
    let favourites: FavAnimeInterface[] | null = JSON.parse(localStorage.getItem(StorageConstants.favourites) as string),
        currentUsersFavourites: FavAnimeInterface[] | null = JSON.parse(localStorage.getItem(StorageConstants.currentUser) as string)?.favourites,
        result: boolean = false;

    if (favourites) {
      favourites.forEach(el => {
        if (el.id === animeId){
          result = true
        }
      })
    }

    if (currentUsersFavourites) {
      currentUsersFavourites.forEach(el => el.id === animeId ? result = true : null)
    }

    return result
  } else {
    return false
  }
}

export function toggleFav(anime: AnimeInterface) {
  let unloggedFavourites = JSON.parse(localStorage.getItem(StorageConstants.favourites) as string),
      currentUser = JSON.parse(localStorage.getItem(StorageConstants.currentUser) as string),
      storageFavourites = currentUser ? currentUser.favourites : unloggedFavourites,
      favouritesList = storageFavourites ? storageFavourites : [];

  if (isFav(anime.mal_id)) {
    favouritesList.forEach((el: FavAnimeInterface, i: number) => {
      if (el.id === anime.mal_id) favouritesList.splice(i, 1)
    })
  } else {
    favouritesList.push({
      name: anime.title_english ? anime.title_english : anime.title,
      id: anime.mal_id,
      src: anime.images.jpg.large_image_url,
    })
  }
  
  if (currentUser) {
    currentUser.favourites = favouritesList
    let users = JSON.parse(localStorage.getItem(StorageConstants.users) as string)
    users[currentUser.id] = currentUser
    localStorage.setItem(StorageConstants.users, JSON.stringify(users))  
    localStorage.setItem(StorageConstants.currentUser, JSON.stringify(currentUser))  
  } else {
    localStorage.setItem(StorageConstants.favourites, JSON.stringify(favouritesList))
  }

  return favouritesList
}

export function getFavAnimes(){
  let favs: FavAnimeInterface[] = JSON.parse(localStorage.getItem(StorageConstants.favourites) as string),
      user: AccountInterface = JSON.parse(localStorage.getItem(StorageConstants.currentUser) as string),
      base = user ? user.favourites : favs,
      list = base ? base : [];

  return list
}

export function deleteFromFav(anime: FavAnimeInterface) {
  let usersList: AccountInterface[] = JSON.parse(localStorage.getItem(StorageConstants.users) as string),
      currentUser: AccountInterface = JSON.parse(localStorage.getItem(StorageConstants.currentUser) as string),
      list = getFavAnimes();

  list = list.filter((el: FavAnimeInterface, i: number) => {
    console.log(el.id !== anime.id)
    return el.id !== anime.id
  })

  currentUser.favourites = list
  localStorage.setItem(StorageConstants.currentUser, JSON.stringify(currentUser)) 
  usersList[currentUser.id] = currentUser
  localStorage.setItem(StorageConstants.users, JSON.stringify(usersList))  
  
  return list
}