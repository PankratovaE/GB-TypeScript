import { renderSearchFormBlock, search } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import { getData } from './store/providers/homy/getData.js'

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock('Pankratova E', 'my avatar', 2)
  renderSearchFormBlock()
  renderSearchStubBlock()
  search()
  getData()
  // renderToast(
  //   {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
  //   {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  // )
})





