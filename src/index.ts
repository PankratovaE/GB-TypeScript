import { renderSearchFormBlock, search } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import {FlatRentSdk} from './flat-rent-sdk.js'
import { HomyProvider } from './store/providers/homy/homy-provider.js'
import { FlatRentProvider } from './store/providers/flat-rent-sdk/flat-rent-sdk-provider.js'
import { SearchFilter } from './store/domain/search-filter.js'
import { Place } from './store/domain/place.js'


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
// fetch('http://localhost:5555/places').then(r => r.json()).then(res => dataDb = res);

const providers = [
  new HomyProvider(),
  new FlatRentProvider()
]

const filter: SearchFilter = {
  price: 6000
}

Promise.all(
  providers.map(provider => provider.find(filter))
  ).then((result) => {
    console.log(result);
    
    const allResults: Place[] = [].concat(...result)
    console.log(allResults);
    
  })







