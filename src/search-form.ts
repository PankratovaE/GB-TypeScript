import { renderBlock } from './lib.js'
import { renderSearchResultsBlock, toggleFavoriteItem } from './search-results.js'
import { Place } from './store/domain/place.js'
import { SearchFormData } from './store/domain/search-form-data.js'
import { factory } from './store/domain/class-factory.js'

export function search() {
  const form = document.getElementsByTagName('form')[0];
  
  form.onsubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(form);

    //получить чекбоксы
    const checkboxes = document.getElementsByClassName('selectProvider');
    const checkedProviders = [];
    //выбранные сложить в массив
    for (let i = 0; i < checkboxes.length; i++) {
      let item = checkboxes[i] as HTMLInputElement
      if (item.checked) {
        checkedProviders.push(item.value);
      }
    }

    const data: SearchFormData = {
      city: 'Санкт-Петербург',
      checkInDate: new Date(formData.get('checkin').toString()),
      checkOutDate: new Date(formData.get('checkout').toString()),
      priceLimit: +formData.get('price')
    }
  // при отправке формы проверяем выбран ли провыйдер
  if (!checkedProviders.length) { // если нет, то выбрать
    console.log('Choose provider and submit again.');
  } else {

    const providers = checkedProviders.map(name => factory(name));

      Promise.all(
        providers.map(provider => provider.search(data))
      ).then((result) => {

      const allResults: Place[] = [].concat(...result)
      renderSearchResultsBlock(allResults);
      toggleFavoriteItem();
    })
  }
}
}

const d = new Date();
const dateOut = new Date(d.getFullYear(), d.getMonth() + 2, 0);
const defaultDateIn = new Date(d.setDate(d.getDate() + 1));
const defaultDateOut = new Date(d.setDate(d.getDate() + 3));

function formattedDate(date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(n => n < 10 ? `0${n}` : `${n}`).join('-');
}

const today = formattedDate(d);
const maxOutDate = formattedDate(dateOut);
const defaultIn = formattedDate(defaultDateIn);
const defaultOut = formattedDate(defaultDateOut);

export function renderSearchFormBlock (dateIn: string = defaultIn, dateOut: string = defaultOut) {
  renderBlock(
    'search-form-block',
    `
    <form id="form">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <div class="providers">
            <label><input type="checkbox" name="provider" class="selectProvider" value="HomyProvider" checked /> Homy</label>
            <label><input type="checkbox" name="provider" class="selectProvider" value="FlatRentSdk" /> FlatRent</label>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${dateIn}" min="${today}" max="${maxOutDate}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${dateOut}" min="${today}" max="${maxOutDate}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button type="submit">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}