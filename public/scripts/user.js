import { renderBlock } from './lib.js';
/*Написать функцию renderUserBlock, которая принимает имя пользователя, ссылку на
аватар и количество избранных. Последнее поле является необязательным. Использовать
эти данные для вывода блока пользователя. */
export function renderUserBlock(name, avatar, favoriteItemsAmount) {
    const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет';
    const hasFavoriteItems = favoriteItemsAmount ? true : false;
    renderBlock('user-block', `
    <div class="header-container">
      <img class="avatar" src="/img/avatar.png" alt="${avatar}" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `);
}
function getUserData(user) {
    if (typeof user === 'string') {
        return JSON.parse(localStorage.getItem(user));
    }
    // return console.log('Ключ должен быть строкой');
}
// function getFavoritesAmount(user: unknown) {
//   if (typeof user === 'string') {
//     return localStorage.getItem(user);
//   }
//   return  console.log('Ключ должен быть строкой');
// }
// console.log(getUserData('user1'));
// console.log(getFavoritesAmount('favoritesAmount'));
