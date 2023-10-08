import { StorageConstants } from "../constants/storage.constants";
import { AccountInterface } from "../interfaces/authBlockInterfaces/account-interface";
import { FavAnimeInterface } from "../interfaces/authBlockInterfaces/favAnime-interface";
import { UserModel } from "../models/user.model";

export function checkLoginOrig(login: string): boolean{
    let usersList: AccountInterface[] = JSON.parse(localStorage.getItem(StorageConstants.users) as string),
        isUserOriginal: boolean = true;

    if (usersList){
      usersList.forEach((el: AccountInterface) => {
          if (el.login === login) {
            isUserOriginal = false
          }
      })
    }

    return isUserOriginal
}

export function registerUser(login: string, password: string): void{
  let newUser = new UserModel(login, password),
      usersList: AccountInterface[] = JSON.parse(localStorage.getItem(StorageConstants.users) as string);

  if (!usersList) {
    localStorage.setItem(StorageConstants.users, JSON.stringify([newUser]))
  } 

  if (checkLoginOrig(login)) {
    newUser.id = usersList.length + 1
    usersList.push(newUser)
    localStorage.setItem(StorageConstants.users, JSON.stringify(usersList))
  }
}

export function logInUser(login: string, password: string): void{
  let usersList: AccountInterface[] = JSON.parse(localStorage.getItem(StorageConstants.users) as string),
      unloggedFavourites: FavAnimeInterface[] = JSON.parse(localStorage.getItem(StorageConstants.favourites) as string),
      num: number;

  if (!usersList) return

  usersList.forEach((el: AccountInterface, i: number) => {
    if (el.login !== login && el.password !== password) return

    num = i;

    if (unloggedFavourites) {
      toCompareFavouritesList(unloggedFavourites, usersList[num].favourites)
      
      usersList[num].favourites.push(...unloggedFavourites)
      localStorage.setItem(StorageConstants.users, JSON.stringify(usersList))  
      localStorage.setItem(StorageConstants.currentUser, JSON.stringify(usersList[num])) 
      localStorage.removeItem(StorageConstants.favourites)
    } else {
      localStorage.setItem(StorageConstants.currentUser, JSON.stringify(usersList[num]))
    }

  })
}

function toCompareFavouritesList(unloggedFavourites: FavAnimeInterface[], userFavourites: FavAnimeInterface[]): void{
  for (var i = 0; i < unloggedFavourites.length; i++) { 
    for (var j = 0; j < userFavourites.length; j++) { 
      if (unloggedFavourites[i].name === userFavourites[j].name) {
        userFavourites.splice(j, 1)
      }
    }
  }
}

export function validateUser(login: string, password: string): boolean{
  let userList: AccountInterface[] = JSON.parse(localStorage.getItem(StorageConstants.users) as string),
      isValid: boolean = false;

  if (userList){
    userList.forEach(el => {
      if (el.login === login && el.password === password) {
        isValid = true
      }
    })
  }

  return isValid
}

export function logOutUser(): void{
  localStorage.removeItem(StorageConstants.currentUser)
}