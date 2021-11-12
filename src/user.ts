import { renderBlock } from './lib.js'

/*Написать функцию renderUserBlock, которая принимает имя пользователя, ссылку на
аватар и количество избранных. Последнее поле является необязательным. Использовать
эти данные для вывода блока пользователя. */

export function renderUserBlock (name: string, avatar: string, favoriteItemsAmount?: number) {
  const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount ? true : false

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="/img/avatar.png" alt="${avatar}" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}

/*Написать две функции. Первая getUserData, которая читает из localStorage ключ user.
Подразумевается, что ключ содержит объект с полями username и avatarUrl. Вторая функция
getFavoritesAmount, которая читает из lacalStorage ключ favoritesAmount. Ключ должен
содержать количество предметов, добавленных пользователем в избранное. Для обеих
функций применить подход с unknown, чтобы валидировать содержимое localStorage.
*/

// class User {
//   username: string
//   avatarUrl: string

//   constructor(username: string, avatarUrl: string) {
//     this.username  = username,
//     this.avatarUrl = avatarUrl
//   }
// }

// const user1 = new User('Jane', 'url1')
// const user2 = new User('Kate', 'url2')
// const user3 = new User('Tom', 'url3')


// localStorage.setItem('user1', JSON.stringify(user1));
// localStorage.setItem('user2', JSON.stringify(user2));
// localStorage.setItem('user3', JSON.stringify(user3));
// localStorage.setItem('favoritesAmount', '3');
// localStorage.setItem('favoritesAmount2', '4');

interface User {
  username: string,
  avatarUrl: string
}

const itemUser: any = localStorage.getItem('user');
const item: unknown = JSON.parse(itemUser);

function isUser(data:any):data is User {
  return typeof data === 'object' && 'username' in data
}
if (isUser(item)) {
  item.username
}


// function getFavoritesAmount(user: unknown) {
//   if (typeof user === 'string') {
//     return localStorage.getItem(user);
//   }
//   return  console.log('Ключ должен быть строкой');
// }

// console.log(getUserData('user1'));
// console.log(getFavoritesAmount('favoritesAmount'));
