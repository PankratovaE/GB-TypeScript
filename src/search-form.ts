import { renderBlock } from './lib.js'
import { dataDb } from './index.js'
import { renderSearchResultsBlock, toggleFavoriteItem } from './search-results.js'
import {FlatRentSdk} from './flat-rent-sdk.js'

interface Place {
  "id": number,
  "name": string,
  "description": string,
  "image": string,
  "remoteness": number,
  "bookedDates": string[],
  "price": number
}

interface Places {
  [key: number]: Place
}

export interface SearchFormData {
  city: string,
  inDate: string,
  outDate: string,
  maxPrice: number,
}

function handlerSearch(data, price): Places {
  let allFind = {};
  let find = null;
  let key = null;

  (function searchAll (data, price) {
    for (let i in data) {
        if (data.hasOwnProperty(i)) {
          if (i === 'price') {
            if ( price >= data[i]) {
              find = data;
              key = data.id;
              allFind[key] = find;
            }
          }
          if (data[i] && data[i].constructor === Object) {
            searchAll(data[i], price)
          }
        }
      }
    return allFind;  
  })(data, price)

  return allFind;
}

export function search() {
  const form = document.getElementsByTagName('form')[0];
  
  form.onsubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(form);
    // let inDate = formData.get('checkin').toString();
    // console.log(new Date(inDate));
    
    //получить чекбоксы
    const checkboxes = document.getElementsByClassName('selectProvider');
    const checkedItem = [];
    //выбранные сложить в массив
    for (let i = 0; i < checkboxes.length; i++) {
      let item = checkboxes[i] as HTMLInputElement
      if (item.checked) {
        checkedItem.push(item);
      }
    }

    const data: SearchFormData = {
      city: 'Санкт-Петербург',
      inDate: formData.get('checkin').toString(),
      outDate: formData.get('checkout').toString(),
      maxPrice: +formData.get('price')
    }
  // при отправке формы проверяем выбран ли провыйдер
  if (!checkedItem.length) { // если нет, то выбрать
    console.log('Choose provider and submit again.');
  }
  //из выбранных посмотреть один или оба выбраны и в зависимости от этого на поиск разные функции
  for (let i = 0; i < checkedItem.length; i++) {
    if (checkedItem[i].value === 'homy') {
      renderSearchResultsBlock(handlerSearch(dataDb, data.maxPrice));
      toggleFavoriteItem();
    } else if (checkedItem[i].value === 'flat-rent') {
      console.log('будем искать в sdk');
      const newFlat = new FlatRentSdk;
      const flatRentData = {
        city: 'Санкт-Петербург',
        checkInDate: new Date(formData.get('checkin').toString()),
        checkOutDate: new Date(formData.get('checkout').toString()),
        priceLimit: +formData.get('price')
      }
      const foundFlats = newFlat.search(flatRentData) 
      // поиск по отдельности работает, решить с разным именованием полей
      // сделать поиск у двух провайдеров одновременно
      console.log(foundFlats.then(res => {
        renderSearchResultsBlock(res)
        toggleFavoriteItem()
      }))
      
    }
    
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
            <label><input type="checkbox" name="provider" class="selectProvider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" class="selectProvider" value="flat-rent" /> FlatRent</label>
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
