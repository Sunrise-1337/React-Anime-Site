import { AccountInterface } from "../interfaces/authBlockInterfaces/account-interface";
import { FavAnimeInterface } from "../interfaces/authBlockInterfaces/favAnime-interface";

export function checkLoginOrig(login: string): boolean{
    let users: AccountInterface[] = JSON.parse(localStorage.getItem('Users') as string),
        orig: boolean = true;

    if (users){
      users.forEach((el: AccountInterface) => {
          if (el.login === login) {
              orig = false
          }
      })
    }

    return orig
}

export function registerUser(login: string, password: string) {
  let user = {'login': login, 'password': password, 'id': 1, 'favourites': []},
      users: AccountInterface[] = JSON.parse(localStorage.getItem('Users') as string);

  if (!users) {
    localStorage.setItem('Users', JSON.stringify([user]))
  } 

  if (checkLoginOrig(login)) {
    user['id'] = users.length + 1
    users.push(user)
    localStorage.setItem('Users', JSON.stringify(users))
  }
}

export function logInUser(login: string, password: string) {
  let users: AccountInterface[] = JSON.parse(localStorage.getItem('Users') as string),
      favs: FavAnimeInterface[] = JSON.parse(localStorage.getItem('Favourites') as string),
      num: number;

  if (users) {
    users.forEach((el, i) => {
      if (el.login === login && el.password === password) {
        num = i;

        if (favs) {
          let usFav = users[num].favourites
  
          for (var i = 0; i < favs.length; i++) { 
            for (var j = 0; j < usFav.length; j++) { 
              if (favs[i].name === usFav[j].name) {
                usFav.splice(j, 1)
              }
            }
          }
          
          users[num].favourites.push(...favs)
          localStorage.setItem('Users', JSON.stringify(users))  
          localStorage.setItem('CurUser', JSON.stringify(users[num])) 
          localStorage.removeItem('Favourites')
        } else {
          localStorage.setItem('CurUser', JSON.stringify(users[num]))
        }
      }
    })
  }
}

export function validateUser(login: string, password: string): boolean{
  let users: AccountInterface[] = JSON.parse(localStorage.getItem('Users') as string),
      isValid: boolean = false;

  if (users){
    users.forEach(el => {
      if (el.login === login && el.password === password) {
        isValid = true
      }
    })
  }

  return isValid
}

export function logOutUser(){
  localStorage.removeItem('CurUser')
}