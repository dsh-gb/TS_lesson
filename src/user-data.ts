import { Favorites, instanceOfFavorites, instanceOfUser, User } from './type.js';

export function getUserData(): User {
  const user: unknown = JSON.parse(localStorage.getItem('user')) // читаем из localStorage запись user

  if (user == null) {
    // создаем запись user в localStorage для неизвестного пользователя и возвращаем его из ф-и
    const unknownUser: User = {
      name: 'unknown name',
      avatarUrl: 'img/avatar-unknown.png'
    }
    localStorage.setItem('user', JSON.stringify(unknownUser))
    return unknownUser
  }

  // если прочитанная из localStorage запись user соотвествует типу User, то возвращаем из ф-и эту запись
  if (instanceOfUser(user)) {
    return user
  }
}

export function getFavoritesAmount(): Favorites {
  const favorites: unknown = JSON.parse(localStorage.getItem('favorites')) // читаем из localStorage запись favorites

  if (favorites == null) {
    // создаем запись favorites в localStorage для неизвестного избранного и возвращаем его из ф-и
    const unknownFavorites: Favorites = {
      amount: 0
    }
    localStorage.setItem('favorites', JSON.stringify(unknownFavorites))
    return unknownFavorites
  }

  // если прочитанная из localStorage запись favorites соотвествует типу Favorites, то возвращаем из ф-и эту запись
  if (instanceOfFavorites(favorites)) {
    return favorites
  }
}
