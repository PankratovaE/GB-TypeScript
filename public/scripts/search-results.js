import { renderBlock } from './lib.js';
export function renderSearchStubBlock() {
    renderBlock('search-results-block', `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `);
}
export function renderEmptyOrErrorSearchBlock(reasonMessage) {
    renderBlock('search-results-block', `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `);
}
const favorite1 = {
    id: 1,
    name: 'YARD Residence Apart-hotel',
    image: 'http://localhost:4100/img/1.png'
};
const favorite2 = {
    id: 2,
    name: 'Akyan St.Petersburg',
    image: 'http://localhost:4100/img/2.png'
};
const favorite3 = {
    id: 3,
    name: 'Solo Sokos Hotel Palace Bridge',
    image: 'http://localhost:4100/img/3.png'
};
const favoriteAll = {
    1: favorite1,
    2: favorite2,
    3: favorite3
};
export function toggleFavoriteItem() {
    const blocks = document.querySelectorAll('#heart');
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].addEventListener('click', (event) => {
            const target = event.target;
            let id = target.getAttribute('data-id');
            let name = target.getAttribute('data-name');
            let image = target.getAttribute('data-image');
            let favoriteItems = getFavoritesAmount('favoriteItems');
            const isFav = searchInFavorites(id); // true or false
            if (isFav) {
                let newFavorite = {};
                for (let j in favoriteItems) {
                    if (!(j == id)) {
                        newFavorite[j] = favoriteItems[j];
                    }
                }
                localStorage.setItem('favoriteItems', JSON.stringify(newFavorite));
                target.classList.remove('active');
            }
            else {
                favoriteItems[id] = {
                    id: id,
                    name: name,
                    image: image
                };
                localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
                target.classList.add('active');
            }
        });
    }
}
function isFavoriteItem(data) {
    return typeof data === 'object' && 'name' in data;
}
function getFavoritesAmount(key) {
    let storageItem = localStorage.getItem(key);
    let parseItem = JSON.parse(storageItem);
    if (isFavoriteItem(parseItem)) {
        return parseItem;
    }
    return undefined;
}
function searchInFavorites(id) {
    const dataFavorites = getFavoritesAmount('favoriteItems');
    for (let i in dataFavorites) {
        if (i == id) {
            return true;
        }
    }
}
function sortResult(Places) {
    let sel = document.getElementById('select');
    sel.addEventListener('change', () => {
        selectSorting(sel.selectedIndex, Places); // 0, 1, 2
    });
}
function selectSorting(index, Places) {
    switch (index) {
        case 0:
            renderSearchResultsBlock(Places.sort(sortByPriceUp));
            break;
        case 1:
            renderSearchResultsBlock(Places.sort(sortByPriceDown));
            break;
        case 2:
            renderSearchResultsBlock(Places.sort(sortByDistance));
            break;
        default:
            renderSearchResultsBlock(Places);
            break;
    }
}
function sortByPriceUp(one, two) {
    if (one.totalPrice > two.totalPrice) {
        return 1;
    }
    else if (one.totalPrice < two.totalPrice) {
        return -1;
    }
    else {
        return 0;
    }
}
function sortByPriceDown(one, two) {
    if (one.totalPrice < two.totalPrice) {
        return 1;
    }
    else if (one.totalPrice > two.totalPrice) {
        return -1;
    }
    else {
        return 0;
    }
}
function sortByDistance(one, two) {
    if (one.coordinates > two.coordinates) {
        return 1;
    }
    else if (one.totalPrice < two.totalPrice) {
        return -1;
    }
    else {
        return 0;
    }
}
export function renderSearchResultsBlock(Places) {
    // записать в хранилище что-нибудь
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteAll));
    let html = `
  <div class="search-results-header">
      <p>Результаты поиска</p>
      <div class="search-results-filter">
          <span><i class="icon icon-filter"></i> Сортировать:</span>
          <select id="select">
              <option value="priceUp">Сначала дешёвые</option>
              <option value="priceDown">Сначала дорогие</option>
              <option value="distance">Сначала ближе</option>
          </select>
      </div>
  </div>`;
    for (let i in Places) {
        let inFavorites = searchInFavorites(Places[i].id); // true or false
        html += `<ul class="results-list">
    <li class="result">
      <div class="result-container">
        <div class="result-img-container">
          <div class="favorites ${inFavorites ? 'active' : ''}" id="heart" data-id="${Places[i].id}" data-name="${Places[i].title}" data-image="${Places[i].photos}"></div>
          <img class="result-img" src="${Places[i].photos[0]}" alt="">
        </div>	
        <div class="result-info">
          <div class="result-info--header">
            <p>${Places[i].title}</p>
            <p class="price">${Places[i].totalPrice}</p>
          </div>
          <div class="result-info--map"><i class="map-icon"></i> ${Places[i].coordinates} км от вас</div>
          <div class="result-info--descr">${Places[i].details}</div>
          <div class="result-info--footer">
            <div>
              <button>Забронировать</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>`;
        renderBlock('search-results-block', html);
        sortResult(Places);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUd0QyxNQUFNLFVBQVUscUJBQXFCO0lBQ25DLFdBQVcsQ0FDVCxzQkFBc0IsRUFDdEI7Ozs7O0tBS0MsQ0FDRixDQUFBO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSw2QkFBNkIsQ0FBRSxhQUFxQjtJQUNsRSxXQUFXLENBQ1Qsc0JBQXNCLEVBQ3RCOzs7V0FHTyxhQUFhOztLQUVuQixDQUNGLENBQUE7QUFDSCxDQUFDO0FBWUQsTUFBTSxTQUFTLEdBQWtCO0lBQy9CLEVBQUUsRUFBRSxDQUFDO0lBQ0wsSUFBSSxFQUFFLDRCQUE0QjtJQUNsQyxLQUFLLEVBQUUsaUNBQWlDO0NBQ3pDLENBQUE7QUFDRCxNQUFNLFNBQVMsR0FBa0I7SUFDL0IsRUFBRSxFQUFFLENBQUM7SUFDTCxJQUFJLEVBQUUscUJBQXFCO0lBQzNCLEtBQUssRUFBRSxpQ0FBaUM7Q0FDekMsQ0FBQTtBQUNELE1BQU0sU0FBUyxHQUFrQjtJQUMvQixFQUFFLEVBQUUsQ0FBQztJQUNMLElBQUksRUFBRSxnQ0FBZ0M7SUFDdEMsS0FBSyxFQUFFLGlDQUFpQztDQUN6QyxDQUFBO0FBQ0QsTUFBTSxXQUFXLEdBQW1CO0lBQ2xDLENBQUMsRUFBRSxTQUFTO0lBQ1osQ0FBQyxFQUFFLFNBQVM7SUFDWixDQUFDLEVBQUUsU0FBUztDQUNiLENBQUE7QUFJRCxNQUFNLFVBQVUsa0JBQWtCO0lBRWhDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVuRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxNQUFN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eyByZW5kZXJCbG9jayB9IGZyb20gJy4vbGliLmpzJ1xyXG5pbXBvcnQgeyBQbGFjZSB9IGZyb20gJy4vc3RvcmUvZG9tYWluL3BsYWNlLmpzJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNlYXJjaFN0dWJCbG9jayAoKSB7XHJcbiAgcmVuZGVyQmxvY2soXHJcbiAgICAnc2VhcmNoLXJlc3VsdHMtYmxvY2snLFxyXG4gICAgYFxyXG4gICAgPGRpdiBjbGFzcz1cImJlZm9yZS1yZXN1bHRzLWJsb2NrXCI+XHJcbiAgICAgIDxpbWcgc3JjPVwiaW1nL3N0YXJ0LXNlYXJjaC5wbmdcIiAvPlxyXG4gICAgICA8cD7Qp9GC0L7QsdGLINC90LDRh9Cw0YLRjCDQv9C+0LjRgdC6LCDQt9Cw0L/QvtC70L3QuNGC0LUg0YTQvtGA0LzRgyDQuCZuYnNwO9C90LDQttC80LjRgtC1IFwi0J3QsNC50YLQuFwiPC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgICBgXHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyRW1wdHlPckVycm9yU2VhcmNoQmxvY2sgKHJlYXNvbk1lc3NhZ2U6IHN0cmluZykge1xyXG4gIHJlbmRlckJsb2NrKFxyXG4gICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcclxuICAgIGBcclxuICAgIDxkaXYgY2xhc3M9XCJuby1yZXN1bHRzLWJsb2NrXCI+XHJcbiAgICAgIDxpbWcgc3JjPVwiaW1nL25vLXJlc3VsdHMucG5nXCIgLz5cclxuICAgICAgPHA+JHtyZWFzb25NZXNzYWdlfTwvcD5cclxuICAgIDwvZGl2PlxyXG4gICAgYFxyXG4gIClcclxufVxyXG5cclxuaW50ZXJmYWNlIGZhdm9yaXRlUGxhY2Uge1xyXG4gIFwiaWRcIjogbnVtYmVyLFxyXG4gIFwibmFtZVwiOiBzdHJpbmcsXHJcbiAgXCJpbWFnZVwiOiBzdHJpbmcsXHJcbn1cclxuXHJcbmludGVyZmFjZSBmYXZvcml0ZVBsYWNlcyB7XHJcbiAgW2tleTogbnVtYmVyXTogZmF2b3JpdGVQbGFjZVxyXG59XHJcblxyXG5jb25zdCBmYXZvcml0ZTE6IGZhdm9yaXRlUGxhY2UgPSB7XHJcbiAgaWQ6IDEsXHJcbiAgbmFtZTogJ1lBUkQgUmVzaWRlbmNlIEFwYXJ0LWhvdGVsJyxcclxuICBpbWFnZTogJ2h0dHA6Ly9sb2NhbGhvc3Q6NDEwMC9pbWcvMS5wbmcnXHJcbn1cclxuY29uc3QgZmF2b3JpdGUyOiBmYXZvcml0ZVBsYWNlID0ge1xyXG4gIGlkOiAyLFxyXG4gIG5hbWU6ICdBa3lhbiBTdC5QZXRlcnNidXJnJyxcclxuICBpbWFnZTogJ2h0dHA6Ly9sb2NhbGhvc3Q6NDEwMC9pbWcvMi5wbmcnXHJcbn1cclxuY29uc3QgZmF2b3JpdGUzOiBmYXZvcml0ZVBsYWNlID0ge1xyXG4gIGlkOiAzLFxyXG4gIG5hbWU6ICdTb2xvIFNva29zIEhvdGVsIFBhbGFjZSBCcmlkZ2UnLFxyXG4gIGltYWdlOiAnaHR0cDovL2xvY2FsaG9zdDo0MTAwL2ltZy8zLnBuZydcclxufVxyXG5jb25zdCBmYXZvcml0ZUFsbDogZmF2b3JpdGVQbGFjZXMgPSB7XHJcbiAgMTogZmF2b3JpdGUxLFxyXG4gIDI6IGZhdm9yaXRlMixcclxuICAzOiBmYXZvcml0ZTNcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlRmF2b3JpdGVJdGVtKCk6IHZvaWQge1xyXG5cclxuICBjb25zdCBibG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjaGVhcnQnKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBibG9ja3MubGVuZ3RoOyBpKyspIHtcclxuICAgIGJsb2Nrc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG5cclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICBsZXQgaWQ6IGFueSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcclxuICAgICAgbGV0IG5hbWUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLW5hbWUnKTtcclxuICAgICAgbGV0IGltYWdlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbWFnZScpO1xyXG5cclxuICAgICAgbGV0IGZhdm9yaXRlSXRlbXM6IGFueSA9IGdldEZhdm9yaXRlc0Ftb3VudCgnZmF2b3JpdGVJdGVtcycpO1xyXG4gICAgICBjb25zdCBpc0ZhdiA9IHNlYXJjaEluRmF2b3JpdGVzKGlkKSAvLyB0cnVlIG9yIGZhbHNlXHJcblxyXG4gICAgICBpZiAoaXNGYXYpIHtcclxuICAgICAgICBsZXQgbmV3RmF2b3JpdGU6IGFueSA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQgaiBpbiBmYXZvcml0ZUl0ZW1zKSB7XHJcbiAgICAgICAgICBpZiAoIShqID09IGlkKSkge1xyXG4gICAgICAgICAgICBuZXdGYXZvcml0ZVtqXSA9IGZhdm9yaXRlSXRlbXNbal07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmYXZvcml0ZUl0ZW1zJywgSlNPTi5zdHJpbmdpZnkobmV3RmF2b3JpdGUpKTtcclxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZmF2b3JpdGVJdGVtc1tpZF0gPSB7XHJcbiAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgaW1hZ2U6IGltYWdlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmYXZvcml0ZUl0ZW1zJywgSlNPTi5zdHJpbmdpZnkoZmF2b3JpdGVJdGVtcykpO1xyXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9IFxyXG59XHJcbmZ1bmN0aW9uIGlzRmF2b3JpdGVJdGVtKGRhdGE6YW55KTpkYXRhIGlzIGZhdm9yaXRlUGxhY2Vze1xyXG4gIHJldHVybiB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgJ25hbWUnIGluIGRhdGEgXHJcbn1cclxuZnVuY3Rpb24gZ2V0RmF2b3JpdGVzQW1vdW50KGtleTogc3RyaW5nKTogZmF2b3JpdGVQbGFjZXMgfCB1bmRlZmluZWQge1xyXG4gIGxldCBzdG9yYWdlSXRlbTogYW55ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICBsZXQgcGFyc2VJdGVtOiB1bmtub3duID0gSlNPTi5wYXJzZShzdG9yYWdlSXRlbSlcclxuXHJcbiAgaWYgKGlzRmF2b3JpdGVJdGVtKHBhcnNlSXRlbSkpIHtcclxuICAgICAgIFxyXG4gICAgcmV0dXJuIHBhcnNlSXRlbVxyXG4gIH1cclxuICByZXR1cm4gdW5kZWZpbmVkXHJcbiB9XHJcblxyXG5mdW5jdGlvbiBzZWFyY2hJbkZhdm9yaXRlcyhpZDogc3RyaW5nIHwgbnVtYmVyKSB7XHJcbiAgY29uc3QgZGF0YUZhdm9yaXRlcyA9IGdldEZhdm9yaXRlc0Ftb3VudCgnZmF2b3JpdGVJdGVtcycpO1xyXG4gIGZvciAobGV0IGkgaW4gZGF0YUZhdm9yaXRlcykge1xyXG4gICAgaWYgKGkgPT0gaWQpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gc29ydFJlc3VsdCAoUGxhY2VzOiBQbGFjZVtdKSB7XHJcbiAgbGV0IHNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3QnKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICBzZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgc2VsZWN0U29ydGluZyhzZWwuc2VsZWN0ZWRJbmRleCwgUGxhY2VzKTsgIC8vIDAsIDEsIDJcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3RTb3J0aW5nKGluZGV4OiBudW1iZXIsIFBsYWNlczogUGxhY2VbXSkge1xyXG4gIHN3aXRjaCAoaW5kZXgpIHtcclxuICAgIGNhc2UgMDpcclxuICAgICAgcmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrKFBsYWNlcy5zb3J0KHNvcnRCeVByaWNlVXApKTtcclxuICAgICAgYnJlYWtcclxuICAgIGNhc2UgMTpcclxuICAgICAgcmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrKFBsYWNlcy5zb3J0KHNvcnRCeVByaWNlRG93bikpO1xyXG4gICAgICBicmVha1xyXG4gICAgY2FzZSAyOlxyXG4gICAgICByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2soUGxhY2VzLnNvcnQoc29ydEJ5RGlzdGFuY2UpKTtcclxuICAgICAgYnJlYWtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJlbmRlclNlYXJjaFJlc3VsdHNCbG9jayhQbGFjZXMpO1xyXG4gICAgICBicmVha1xyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBzb3J0QnlQcmljZVVwKG9uZTogUGxhY2UsIHR3bzogUGxhY2UpIHtcclxuICBpZiAob25lLnRvdGFsUHJpY2UgPiB0d28udG90YWxQcmljZSkge1xyXG4gICAgcmV0dXJuIDFcclxuICB9IGVsc2UgaWYgKG9uZS50b3RhbFByaWNlIDwgdHdvLnRvdGFsUHJpY2UpIHtcclxuICAgIHJldHVybiAtMVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gMFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc29ydEJ5UHJpY2VEb3duKG9uZTogUGxhY2UsIHR3bzogUGxhY2UpIHtcclxuICBpZiAob25lLnRvdGFsUHJpY2UgPCB0d28udG90YWxQcmljZSkge1xyXG4gICAgcmV0dXJuIDFcclxuICB9IGVsc2UgaWYgKG9uZS50b3RhbFByaWNlID4gdHdvLnRvdGFsUHJpY2UpIHtcclxuICAgIHJldHVybiAtMVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gMFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc29ydEJ5RGlzdGFuY2Uob25lOiBQbGFjZSwgdHdvOiBQbGFjZSkge1xyXG4gIGlmIChvbmUuY29vcmRpbmF0ZXMgPiB0d28uY29vcmRpbmF0ZXMpIHtcclxuICAgIHJldHVybiAxXHJcbiAgfSBlbHNlIGlmIChvbmUudG90YWxQcmljZSA8IHR3by50b3RhbFByaWNlKSB7XHJcbiAgICByZXR1cm4gLTFcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIDBcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2sgKFBsYWNlczogUGxhY2VbXSkge1xyXG4gIC8vINC30LDQv9C40YHQsNGC0Ywg0LIg0YXRgNCw0L3QuNC70LjRidC1INGH0YLQvi3QvdC40LHRg9C00YxcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmF2b3JpdGVJdGVtcycsIEpTT04uc3RyaW5naWZ5KGZhdm9yaXRlQWxsKSk7XHJcblxyXG4gIGxldCBodG1sID0gYFxyXG4gIDxkaXYgY2xhc3M9XCJzZWFyY2gtcmVzdWx0cy1oZWFkZXJcIj5cclxuICAgICAgPHA+0KDQtdC30YPQu9GM0YLQsNGC0Ysg0L/QvtC40YHQutCwPC9wPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLXJlc3VsdHMtZmlsdGVyXCI+XHJcbiAgICAgICAgICA8c3Bhbj48aSBjbGFzcz1cImljb24gaWNvbi1maWx0ZXJcIj48L2k+INCh0L7RgNGC0LjRgNC+0LLQsNGC0Yw6PC9zcGFuPlxyXG4gICAgICAgICAgPHNlbGVjdCBpZD1cInNlbGVjdFwiPlxyXG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJwcmljZVVwXCI+0KHQvdCw0YfQsNC70LAg0LTQtdGI0ZHQstGL0LU8L29wdGlvbj5cclxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicHJpY2VEb3duXCI+0KHQvdCw0YfQsNC70LAg0LTQvtGA0L7Qs9C40LU8L29wdGlvbj5cclxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZGlzdGFuY2VcIj7QodC90LDRh9Cw0LvQsCDQsdC70LjQttC1PC9vcHRpb24+XHJcbiAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgPC9kaXY+XHJcbiAgPC9kaXY+YDtcclxuICBmb3IgKGxldCBpIGluIFBsYWNlcykge1xyXG4gXHJcbiAgICBsZXQgaW5GYXZvcml0ZXMgPSBzZWFyY2hJbkZhdm9yaXRlcyhQbGFjZXNbaV0uaWQpIC8vIHRydWUgb3IgZmFsc2VcclxuXHJcbiAgICBodG1sICs9IGA8dWwgY2xhc3M9XCJyZXN1bHRzLWxpc3RcIj5cclxuICAgIDxsaSBjbGFzcz1cInJlc3VsdFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW1nLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZhdm9yaXRlcyAkeyBpbkZhdm9yaXRlcz8gJ2FjdGl2ZScgOiAnJyB9XCIgaWQ9XCJoZWFydFwiIGRhdGEtaWQ9XCIkeyBQbGFjZXNbaV0uaWQgfVwiIGRhdGEtbmFtZT1cIiR7IFBsYWNlc1tpXS50aXRsZSB9XCIgZGF0YS1pbWFnZT1cIiR7IFBsYWNlc1tpXS5waG90b3MgfVwiPjwvZGl2PlxyXG4gICAgICAgICAgPGltZyBjbGFzcz1cInJlc3VsdC1pbWdcIiBzcmM9XCIkeyBQbGFjZXNbaV0ucGhvdG9zWzBdIH1cIiBhbHQ9XCJcIj5cclxuICAgICAgICA8L2Rpdj5cdFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mb1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1oZWFkZXJcIj5cclxuICAgICAgICAgICAgPHA+JHtQbGFjZXNbaV0udGl0bGV9PC9wPlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cInByaWNlXCI+JHtQbGFjZXNbaV0udG90YWxQcmljZX08L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0tbWFwXCI+PGkgY2xhc3M9XCJtYXAtaWNvblwiPjwvaT4gJHtQbGFjZXNbaV0uY29vcmRpbmF0ZXN9INC60Lwg0L7RgiDQstCw0YE8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0tZGVzY3JcIj4keyBQbGFjZXNbaV0uZGV0YWlscyB9PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWZvb3RlclwiPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxidXR0b24+0JfQsNCx0YDQvtC90LjRgNC+0LLQsNGC0Yw8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2xpPlxyXG4gIDwvdWw+YFxyXG4gICAgXHJcbiAgICByZW5kZXJCbG9jayhcclxuICAgICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcclxuICAgICAgaHRtbFxyXG4gICAgKVxyXG4gICAgc29ydFJlc3VsdChQbGFjZXMpXHJcbiAgfVxyXG59XHJcblxyXG4iXX0=