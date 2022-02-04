import { renderSearchFormBlock, search } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import {FlatRentSdk} from './flat-rent-sdk.js'


window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock('Pankratova E', 'my avatar', 2)
  renderSearchFormBlock()
  renderSearchStubBlock()
  search()
  // renderToast(
  //   {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
  //   {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  // )
})

export let dataDb;
fetch('http://localhost:5555/places').then(r => r.json()).then(res => dataDb = res);






