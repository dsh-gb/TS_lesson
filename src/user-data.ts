import { Favorites, instanceOfFavorites, instanceOfUser, User } from './type.js';

export function getUserData(): User {
  const userData = localStorage.getItem('user') // читаем из localStorage запись user
  const unknownUser: User = {
    name: 'unknown name',
    avatarUrl: 'img/avatar-unknown.png'
  }
  const setUnknownUser = () => {
    localStorage.setItem('user', JSON.stringify(unknownUser))
    return unknownUser
  }
  if (userData !== null) {
    const user: unknown = JSON.parse(userData)
    if (instanceOfUser(user)) {
      return user // если прочитанная из localStorage запись user соотвествует типу User, то возвращаем из ф-и эту запись
    } else return setUnknownUser() // иначе записываем в localStorage unknownUser и возвращаем это значение
  } else return setUnknownUser()
}

export function getFavoritesAmount(): Favorites {
  const favoritesData = localStorage.getItem('favorites') // читаем из localStorage запись favorites
  const unknownFavorites: Favorites = {
    amount: 0
  }
  const setUnknownFavorites = () => { // создаем запись favorites в localStorage для неизвестного избранного и возвращаем его из ф-и
    localStorage.setItem('favorites', JSON.stringify(unknownFavorites))
    return unknownFavorites
  }
  if (favoritesData !== null) {
    const favorites: unknown = JSON.parse(favoritesData)
    if (instanceOfFavorites(favorites)) {
      return favorites // если прочитанная из localStorage запись favorites соотвествует типу Favorites, то возвращаем из ф-и эту запись
    } else return setUnknownFavorites() // иначе записываем в localStorage unknownFavorites и возвращаем это значение
  } else return setUnknownFavorites()
}
