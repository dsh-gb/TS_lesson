import { renderBlock } from './lib.js'

export function renderUserBlock(nameUser: string, avatarLink: string, favoriteItemsAmount: number) {
  // проверка на наличие избранного
  const favoritesCaption = favoriteItemsAmount >= 1 ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount >= 1 ? true : false

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${avatarLink}" alt=${nameUser} />
      <div class="info">
          <p class="name">Wade Warren</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
