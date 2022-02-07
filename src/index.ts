import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import { Favorites, User } from './type.js'
import { getFavoritesAmount, getUserData } from './user-data.js'
import { searchForm } from './search.js'

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
