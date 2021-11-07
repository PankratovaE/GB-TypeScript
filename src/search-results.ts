import { renderBlock } from './lib.js'

export function renderSearchStubBlock () {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock (reasonMessage) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

interface favoritePlace {
  "id": number,
  "name": string,
  "image": string,
}

interface favoritePlaces {
  [key: number]: favoritePlace
}

const favorite1: favoritePlace = {
  id: 1,
  name: 'YARD Residence Apart-hotel',
  image: 'http://localhost:4100/img/1.png'
}
const favorite2: favoritePlace = {
  id: 2,
  name: 'Akyan St.Petersburg',
  image: 'http://localhost:4100/img/2.png'
}
const favorite3: favoritePlace = {
  id: 3,
  name: 'Solo Sokos Hotel Palace Bridge',
  image: 'http://localhost:4100/img/3.png'
}
const favoriteAll: favoritePlaces = {
  1: favorite1,
  2: favorite2,
  3: favorite3
}



export function toggleFavoriteItem(): void {

  const blocks = document.querySelectorAll('#heart');

  for (let i = 0; i < blocks.length; i++) {
    blocks[i].addEventListener('click', (event) => {

      const target = event.target as HTMLElement;
      let id = target.getAttribute('data-id');
      let name = target.getAttribute('data-name');
      let image = target.getAttribute('data-image');

      let isFavorite = getFavoritesAmount('favoriteItems');
      const isFav = searchInFavorites(id) // true or false

      if (isFav) {
        let newFavorite = {}
        for (let j in isFavorite) {
          if (!(j == id)) {
            newFavorite[j] = isFavorite[j];
          }
        }
        localStorage.setItem('favoriteItems', JSON.stringify(newFavorite));
        target.classList.remove('active');
      } else {
        isFavorite[id] = {
          id: id,
          name: name,
          image: image
        }
        localStorage.setItem('favoriteItems', JSON.stringify(isFavorite));
        target.classList.add('active');
      }
    })
  } 
}

function getFavoritesAmount(key: unknown): favoritePlaces {
  if (typeof key === 'string') {
       
    return JSON.parse(localStorage.getItem(key));
  }
 }

function searchInFavorites(id) {
  const dataFavorites = getFavoritesAmount('favoriteItems');
  for (let i in dataFavorites) {
    if (i == id) {
      return true;
    }
  }
}

export function renderSearchResultsBlock (Places) {
  // записать в хранилище что-нибудь
  localStorage.setItem('favoriteItems', JSON.stringify(favoriteAll));

  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>`
    );
  let html = '';
  for (let i in Places) {
 
    let inFavorites = searchInFavorites(Places[i].id) // true or false

    html += `<ul class="results-list">
    <li class="result">
      <div class="result-container">
        <div class="result-img-container">
          <div class="favorites ${ inFavorites? 'active' : '' }" id="heart" data-id="${ Places[i].id }" data-name="${ Places[i].title }" data-image="${ Places[i].photos }"></div>
          <img class="result-img" src="${ Places[i].photos[0] }" alt="">
        </div>	
        <div class="result-info">
          <div class="result-info--header">
            <p>${Places[i].title}</p>
            <p class="price">${Places[i].totalPrice}</p>
          </div>
          <div class="result-info--map"><i class="map-icon"></i> 2.5км от вас</div>
          <div class="result-info--descr">${ Places[i].details }</div>
          <div class="result-info--footer">
            <div>
              <button>Забронировать</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>`
    
    renderBlock(
      'search-results-block',
      html
    )
  }
}

