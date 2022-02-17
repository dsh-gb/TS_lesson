import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import { Favorites, User } from './type.js'
import { getFavoritesAmount, getUserData } from './user-data.js'
import { searchForm } from './search.js'
import { FlatRentSdk, cloneDate, addDays } from './flat-rent-sdk.js'

window.addEventListener('DOMContentLoaded', () => {
  const user: User = getUserData() // получаем данные пользователя из localStorage
  const favorites: Favorites = getFavoritesAmount() // получаем избранное из localStorage
  renderUserBlock(user.name, user.avatarUrl, favorites.amount)
  renderSearchFormBlock('2022-02-13', '2022-02-17')
  searchForm()
  renderSearchStubBlock()
  renderToast(
    { text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' },
    { name: 'Понял', handler: () => { console.log('Уведомление закрыто') } }
  )
})

const sdk = new FlatRentSdk()
const today = new Date()

sdk.get('mvm32l')
  .then((flat) => {
    console.log('flat by id', flat)
  })

// TS генерирует тут ошибку из-за не действ аргументов поиска
// sdk.search({ city: 'Самара' }) 
//   .catch((result) => {
//     console.error('search incorrect city', result)
//   })

// sdk.search({ city: 'Санкт-Петербург' })
//   .catch((result) => {
//     console.error('search without dates', result)
//   })

// sdk.search({
//   city: 'Санкт-Петербург',
//   checkInDate: new Date(2021, 6, 26)
// })
//   .catch((result) => {
//     console.error('search with only check-in date', result)
//   })

sdk.search({
  city: 'Санкт-Петербург',
  checkInDate: addDays(cloneDate(today), -1),
  checkOutDate: addDays(cloneDate(today), -6)
})
  .catch((result) => {
    console.error('search with check-in in the past', result)
  })

sdk.search({
  city: 'Санкт-Петербург',
  checkInDate: cloneDate(today),
  checkOutDate: addDays(cloneDate(today), -6)
})
  .catch((result) => {
    console.error('search with check-out date less than check-in', result)
  })

sdk.search({
  city: 'Санкт-Петербург',
  checkInDate: cloneDate(today),
  checkOutDate: addDays(cloneDate(today), 1)
})
  .then((result) => {
    console.log('search for one night', result)
  })

sdk.search({
  city: 'Санкт-Петербург',
  checkInDate: cloneDate(today),
  checkOutDate: addDays(cloneDate(today), 2)
})
  .then((result) => {
    console.log('search for two nights', result)
  })

sdk.search({
  city: 'Санкт-Петербург',
  checkInDate: cloneDate(today),
  checkOutDate: addDays(cloneDate(today), 1),
  priceLimit: 4500
})
  .then((result) => {
    console.log('search with price limit', result)
  })

sdk.book('ab2e2', cloneDate(today), addDays(cloneDate(today), 2))
  .then((result) => {
    console.log('book flat', result)

    sdk.search({
      city: 'Санкт-Петербург',
      checkInDate: cloneDate(today),
      checkOutDate: addDays(cloneDate(today), 3)
    })
      .then((result) => {
        console.log('search after booking', result, result)
      })
  })

sdk.book('vnd331', addDays(cloneDate(today), 5), addDays(cloneDate(today), 6))
  .then((result) => {
    console.log('book flat', result)
  })
