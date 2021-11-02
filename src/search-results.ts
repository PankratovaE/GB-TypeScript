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

// const favorite1: favoritePlace = {
//   id: 1,
//   name: 'YARD Residence Apart-hotel',
//   image: 'http://localhost:4100/img/1.png'
// }
// const favorite2: favoritePlace = {
//   id: 2,
//   name: 'Akyan St.Petersburg',
//   image: 'http://localhost:4100/img/2.png'
// }
// const favorite3: favoritePlace = {
//   id: 3,
//   name: 'Solo Sokos Hotel Palace Bridge',
//   image: 'http://localhost:4100/img/3.png'
// }
// const favoriteAll: favoritePlaces = {
//   1: favorite1,
//   2: favorite2,
//   3: favorite3
// }



export function toggleFavoriteItem() {

  // localStorage.setItem('favoriteItems', JSON.stringify(favoriteAll))
  // console.log('in toggle favorite function');
  const blocks = document.querySelectorAll('#heart');

  for (let i = 0; i < blocks.length; i++) {
    blocks[i].addEventListener('click', (event) => {

      const target = event.target as HTMLElement;
      let id = target.getAttribute('data-id');
      let name = target.getAttribute('data-name');
      let image = target.getAttribute('data-image');

      let inFavorites = getFavoritesAmount('favoriteItems');
      console.log(inFavorites);
      
      for (let j in inFavorites) {
        /* здесь проверять есть ли место с выбранным id в localStorage.
        Если есть, то перезаписать localStorage без него, а у этого сердечка отнять класс active.
        если нет, то перезаписать localStorage по этому ключу с новым местом и добавить класс active.
        */
        
      }

      console.log(id, name, image);
      
    })
  } 
  // const block = document.getElementById('heart');
  // block.addEventListener('click', (e) => {
  //   console.log('click on heart');
  //   getFavoritesAmount('favoriteItems')
    
  // })
}

function getFavoritesAmount(key: unknown): favoritePlaces {
  if (typeof key === 'string') {
    return JSON.parse(localStorage.getItem(key));
  }
 }


export function renderSearchResultsBlock (Places) {
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

    html += `<ul class="results-list">
    <li class="result">
      <div class="result-container">
        <div class="result-img-container">
          <div class="favorites" id="heart" data-id="${ Places[i].id }" data-name="${ Places[i].name }" data-image="${ Places[i].image }"></div>
          <img class="result-img" src="${ Places[i].image }" alt="">
        </div>	
        <div class="result-info">
          <div class="result-info--header">
            <p>${Places[i].name}</p>
            <p class="price">${Places[i].price}</p>
          </div>
          <div class="result-info--map"><i class="map-icon"></i> 2.5км от вас</div>
          <div class="result-info--descr">${ Places[i].description }</div>
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

