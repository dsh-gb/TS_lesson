// пользовательский тип User
export interface User {
  name: string,
  avatarUrl: string
}

// пользовательский тип Favorites
export interface Favorites {
  amount: number
}

// пользовательский тип SearchFormData
export interface SearchFormData {
  city: string,
  checkInDate: string,
  checkOutDate: string,
  maxPrice: number,
  homy: boolean,
  flatRent: boolean
}

// пользовательский тип Place - добавил поле results так как Eslint не пропускает пустые интерфейсы
export interface Place {
  results: []
}

// интерфейс для callback ф-и search
export interface SearchCallback {
  (value: Error | Place): void
}

// ф-я проверки переданного аргумента на тип User
export function instanceOfUser(object: any): object is User {
  return ('name' in object && typeof object.name === 'string'
    && 'avatarUrl' in object && typeof object.avatarUrl === 'string')
}

// ф-я проверки переданного аргумента на тип Favorites
export function instanceOfFavorites(object: any): object is Favorites {
  return ('amount' in object && typeof object.amount === 'number')
}
// ф-я проверки переданного аргумента на тип SearchFormData
export function instanceOfSearchFormData(object: any): object is SearchFormData {
  return ('city' in object && typeof object.city === 'string'
    && 'checkInDate' in object && typeof object.checkInDate === 'string'
    && 'checkOutDate' in object && typeof object.checkOutDate === 'string'
    && 'maxPrice' in object && typeof object.maxPrice === 'number'
    && 'homy' in object && typeof object.homy === 'boolean'
    && 'flatRent' in object && typeof object.flatRent === 'boolean')
}
