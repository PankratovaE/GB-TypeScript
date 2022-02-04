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
            let isFavorite = getFavoritesAmount('favoriteItems');
            const isFav = searchInFavorites(id); // true or false
            if (isFav) {
                let newFavorite = {};
                for (let j in isFavorite) {
                    if (!(j == id)) {
                        newFavorite[j] = isFavorite[j];
                    }
                }
                localStorage.setItem('favoriteItems', JSON.stringify(newFavorite));
                target.classList.remove('active');
            }
            else {
                isFavorite[id] = {
                    id: id,
                    name: name,
                    image: image
                };
                localStorage.setItem('favoriteItems', JSON.stringify(isFavorite));
                target.classList.add('active');
            }
        });
    }
}
function getFavoritesAmount(key) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUd0QyxNQUFNLFVBQVUscUJBQXFCO0lBQ25DLFdBQVcsQ0FDVCxzQkFBc0IsRUFDdEI7Ozs7O0tBS0MsQ0FDRixDQUFBO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSw2QkFBNkIsQ0FBRSxhQUFhO0lBQzFELFdBQVcsQ0FDVCxzQkFBc0IsRUFDdEI7OztXQUdPLGFBQWE7O0tBRW5CLENBQ0YsQ0FBQTtBQUNILENBQUM7QUFZRCxNQUFNLFNBQVMsR0FBa0I7SUFDL0IsRUFBRSxFQUFFLENBQUM7SUFDTCxJQUFJLEVBQUUsNEJBQTRCO0lBQ2xDLEtBQUssRUFBRSxpQ0FBaUM7Q0FDekMsQ0FBQTtBQUNELE1BQU0sU0FBUyxHQUFrQjtJQUMvQixFQUFFLEVBQUUsQ0FBQztJQUNMLElBQUksRUFBRSxxQkFBcUI7SUFDM0IsS0FBSyxFQUFFLGlDQUFpQztDQUN6QyxDQUFBO0FBQ0QsTUFBTSxTQUFTLEdBQWtCO0lBQy9CLEVBQUUsRUFBRSxDQUFDO0lBQ0wsSUFBSSxFQUFFLGdDQUFnQztJQUN0QyxLQUFLLEVBQUUsaUNBQWlDO0NBQ3pDLENBQUE7QUFDRCxNQUFNLFdBQVcsR0FBbUI7SUFDbEMsQ0FBQyxFQUFFLFNBQVM7SUFDWixDQUFDLEVBQUUsU0FBUztJQUNaLENBQUMsRUFBRSxTQUFTO0NBQ2IsQ0FBQTtBQUlELE1BQU0sVUFBVSxrQkFBa0I7SUFFaEMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRW5ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLE1BQU0s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LElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUVuRSxJQUFJLElBQUksR0FBRzs7Ozs7Ozs7Ozs7U0FXSixDQUFDO0lBQ1IsS0FBSyxJQUFJLENBQUMsSUFBSSxNQUFNLEVBQUU7UUFFcEIsSUFBSSxXQUFXLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsZ0JBQWdCO1FBRWxFLElBQUksSUFBSTs7OztrQ0FJdUIsV0FBVyxDQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUcseUJBQTBCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFHLGdCQUFpQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBTSxpQkFBa0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU87eUNBQy9ILE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFFOzs7O2lCQUk3QyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSzsrQkFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTs7bUVBRWdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXOzRDQUMzQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBUTs7Ozs7Ozs7O1FBU3ZELENBQUE7UUFFSixXQUFXLENBQ1Qsc0JBQXNCLEVBQ3RCLElBQUksQ0FDTCxDQUFBO1FBQ0QsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQ25CO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlckJsb2NrIH0gZnJvbSAnLi9saWIuanMnXG5pbXBvcnQgeyBQbGFjZSB9IGZyb20gJy4vc3RvcmUvZG9tYWluL3BsYWNlLmpzJ1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2VhcmNoU3R1YkJsb2NrICgpIHtcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcbiAgICBgXG4gICAgPGRpdiBjbGFzcz1cImJlZm9yZS1yZXN1bHRzLWJsb2NrXCI+XG4gICAgICA8aW1nIHNyYz1cImltZy9zdGFydC1zZWFyY2gucG5nXCIgLz5cbiAgICAgIDxwPtCn0YLQvtCx0Ysg0L3QsNGH0LDRgtGMINC/0L7QuNGB0LosINC30LDQv9C+0LvQvdC40YLQtSDRhNC+0YDQvNGDINC4Jm5ic3A70L3QsNC20LzQuNGC0LUgXCLQndCw0LnRgtC4XCI8L3A+XG4gICAgPC9kaXY+XG4gICAgYFxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJFbXB0eU9yRXJyb3JTZWFyY2hCbG9jayAocmVhc29uTWVzc2FnZSkge1xuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLXJlc3VsdHMtYmxvY2snLFxuICAgIGBcbiAgICA8ZGl2IGNsYXNzPVwibm8tcmVzdWx0cy1ibG9ja1wiPlxuICAgICAgPGltZyBzcmM9XCJpbWcvbm8tcmVzdWx0cy5wbmdcIiAvPlxuICAgICAgPHA+JHtyZWFzb25NZXNzYWdlfTwvcD5cbiAgICA8L2Rpdj5cbiAgICBgXG4gIClcbn1cblxuaW50ZXJmYWNlIGZhdm9yaXRlUGxhY2Uge1xuICBcImlkXCI6IG51bWJlcixcbiAgXCJuYW1lXCI6IHN0cmluZyxcbiAgXCJpbWFnZVwiOiBzdHJpbmcsXG59XG5cbmludGVyZmFjZSBmYXZvcml0ZVBsYWNlcyB7XG4gIFtrZXk6IG51bWJlcl06IGZhdm9yaXRlUGxhY2Vcbn1cblxuY29uc3QgZmF2b3JpdGUxOiBmYXZvcml0ZVBsYWNlID0ge1xuICBpZDogMSxcbiAgbmFtZTogJ1lBUkQgUmVzaWRlbmNlIEFwYXJ0LWhvdGVsJyxcbiAgaW1hZ2U6ICdodHRwOi8vbG9jYWxob3N0OjQxMDAvaW1nLzEucG5nJ1xufVxuY29uc3QgZmF2b3JpdGUyOiBmYXZvcml0ZVBsYWNlID0ge1xuICBpZDogMixcbiAgbmFtZTogJ0FreWFuIFN0LlBldGVyc2J1cmcnLFxuICBpbWFnZTogJ2h0dHA6Ly9sb2NhbGhvc3Q6NDEwMC9pbWcvMi5wbmcnXG59XG5jb25zdCBmYXZvcml0ZTM6IGZhdm9yaXRlUGxhY2UgPSB7XG4gIGlkOiAzLFxuICBuYW1lOiAnU29sbyBTb2tvcyBIb3RlbCBQYWxhY2UgQnJpZGdlJyxcbiAgaW1hZ2U6ICdodHRwOi8vbG9jYWxob3N0OjQxMDAvaW1nLzMucG5nJ1xufVxuY29uc3QgZmF2b3JpdGVBbGw6IGZhdm9yaXRlUGxhY2VzID0ge1xuICAxOiBmYXZvcml0ZTEsXG4gIDI6IGZhdm9yaXRlMixcbiAgMzogZmF2b3JpdGUzXG59XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlRmF2b3JpdGVJdGVtKCk6IHZvaWQge1xuXG4gIGNvbnN0IGJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNoZWFydCcpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgYmxvY2tzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG5cbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGxldCBpZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgICAgIGxldCBuYW1lID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJyk7XG4gICAgICBsZXQgaW1hZ2UgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWltYWdlJyk7XG5cbiAgICAgIGxldCBpc0Zhdm9yaXRlID0gZ2V0RmF2b3JpdGVzQW1vdW50KCdmYXZvcml0ZUl0ZW1zJyk7XG4gICAgICBjb25zdCBpc0ZhdiA9IHNlYXJjaEluRmF2b3JpdGVzKGlkKSAvLyB0cnVlIG9yIGZhbHNlXG5cbiAgICAgIGlmIChpc0Zhdikge1xuICAgICAgICBsZXQgbmV3RmF2b3JpdGUgPSB7fVxuICAgICAgICBmb3IgKGxldCBqIGluIGlzRmF2b3JpdGUpIHtcbiAgICAgICAgICBpZiAoIShqID09IGlkKSkge1xuICAgICAgICAgICAgbmV3RmF2b3JpdGVbal0gPSBpc0Zhdm9yaXRlW2pdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmF2b3JpdGVJdGVtcycsIEpTT04uc3RyaW5naWZ5KG5ld0Zhdm9yaXRlKSk7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzRmF2b3JpdGVbaWRdID0ge1xuICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgIGltYWdlOiBpbWFnZVxuICAgICAgICB9XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmYXZvcml0ZUl0ZW1zJywgSlNPTi5zdHJpbmdpZnkoaXNGYXZvcml0ZSkpO1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSlcbiAgfSBcbn1cblxuZnVuY3Rpb24gZ2V0RmF2b3JpdGVzQW1vdW50KGtleSk6IGZhdm9yaXRlUGxhY2VzIHtcbiAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgXG4gICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gIH1cbiB9XG5cbmZ1bmN0aW9uIHNlYXJjaEluRmF2b3JpdGVzKGlkKSB7XG4gIGNvbnN0IGRhdGFGYXZvcml0ZXMgPSBnZXRGYXZvcml0ZXNBbW91bnQoJ2Zhdm9yaXRlSXRlbXMnKTtcbiAgZm9yIChsZXQgaSBpbiBkYXRhRmF2b3JpdGVzKSB7XG4gICAgaWYgKGkgPT0gaWQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHNvcnRSZXN1bHQgKFBsYWNlczogUGxhY2VbXSkge1xuICBsZXQgc2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICBzZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIHNlbGVjdFNvcnRpbmcoc2VsLnNlbGVjdGVkSW5kZXgsIFBsYWNlcyk7ICAvLyAwLCAxLCAyXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHNlbGVjdFNvcnRpbmcoaW5kZXgsIFBsYWNlcykge1xuICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrKFBsYWNlcy5zb3J0KHNvcnRCeVByaWNlVXApKTtcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAxOlxuICAgICAgcmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrKFBsYWNlcy5zb3J0KHNvcnRCeVByaWNlRG93bikpO1xuICAgICAgYnJlYWtcbiAgICBjYXNlIDI6XG4gICAgICByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2soUGxhY2VzLnNvcnQoc29ydEJ5RGlzdGFuY2UpKTtcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHJlbmRlclNlYXJjaFJlc3VsdHNCbG9jayhQbGFjZXMpO1xuICAgICAgYnJlYWtcbiAgfVxufVxuXG5cblxuZnVuY3Rpb24gc29ydEJ5UHJpY2VVcChvbmU6IFBsYWNlLCB0d286IFBsYWNlKSB7XG4gIGlmIChvbmUudG90YWxQcmljZSA+IHR3by50b3RhbFByaWNlKSB7XG4gICAgcmV0dXJuIDFcbiAgfSBlbHNlIGlmIChvbmUudG90YWxQcmljZSA8IHR3by50b3RhbFByaWNlKSB7XG4gICAgcmV0dXJuIC0xXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDBcbiAgfVxufVxuXG5mdW5jdGlvbiBzb3J0QnlQcmljZURvd24ob25lOiBQbGFjZSwgdHdvOiBQbGFjZSkge1xuICBpZiAob25lLnRvdGFsUHJpY2UgPCB0d28udG90YWxQcmljZSkge1xuICAgIHJldHVybiAxXG4gIH0gZWxzZSBpZiAob25lLnRvdGFsUHJpY2UgPiB0d28udG90YWxQcmljZSkge1xuICAgIHJldHVybiAtMVxuICB9IGVsc2Uge1xuICAgIHJldHVybiAwXG4gIH1cbn1cblxuZnVuY3Rpb24gc29ydEJ5RGlzdGFuY2Uob25lOiBQbGFjZSwgdHdvOiBQbGFjZSkge1xuICBpZiAob25lLmNvb3JkaW5hdGVzID4gdHdvLmNvb3JkaW5hdGVzKSB7XG4gICAgcmV0dXJuIDFcbiAgfSBlbHNlIGlmIChvbmUudG90YWxQcmljZSA8IHR3by50b3RhbFByaWNlKSB7XG4gICAgcmV0dXJuIC0xXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDBcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrIChQbGFjZXM6IFBsYWNlW10pIHtcbiAgLy8g0LfQsNC/0LjRgdCw0YLRjCDQsiDRhdGA0LDQvdC40LvQuNGJ0LUg0YfRgtC+LdC90LjQsdGD0LTRjFxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmF2b3JpdGVJdGVtcycsIEpTT04uc3RyaW5naWZ5KGZhdm9yaXRlQWxsKSk7XG5cbiAgbGV0IGh0bWwgPSBgXG4gIDxkaXYgY2xhc3M9XCJzZWFyY2gtcmVzdWx0cy1oZWFkZXJcIj5cbiAgICAgIDxwPtCg0LXQt9GD0LvRjNGC0LDRgtGLINC/0L7QuNGB0LrQsDwvcD5cbiAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtcmVzdWx0cy1maWx0ZXJcIj5cbiAgICAgICAgICA8c3Bhbj48aSBjbGFzcz1cImljb24gaWNvbi1maWx0ZXJcIj48L2k+INCh0L7RgNGC0LjRgNC+0LLQsNGC0Yw6PC9zcGFuPlxuICAgICAgICAgIDxzZWxlY3QgaWQ9XCJzZWxlY3RcIj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInByaWNlVXBcIj7QodC90LDRh9Cw0LvQsCDQtNC10YjRkdCy0YvQtTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicHJpY2VEb3duXCI+0KHQvdCw0YfQsNC70LAg0LTQvtGA0L7Qs9C40LU8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImRpc3RhbmNlXCI+0KHQvdCw0YfQsNC70LAg0LHQu9C40LbQtTwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG4gIDwvZGl2PmA7XG4gIGZvciAobGV0IGkgaW4gUGxhY2VzKSB7XG4gXG4gICAgbGV0IGluRmF2b3JpdGVzID0gc2VhcmNoSW5GYXZvcml0ZXMoUGxhY2VzW2ldLmlkKSAvLyB0cnVlIG9yIGZhbHNlXG5cbiAgICBodG1sICs9IGA8dWwgY2xhc3M9XCJyZXN1bHRzLWxpc3RcIj5cbiAgICA8bGkgY2xhc3M9XCJyZXN1bHRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW1nLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmYXZvcml0ZXMgJHsgaW5GYXZvcml0ZXM/ICdhY3RpdmUnIDogJycgfVwiIGlkPVwiaGVhcnRcIiBkYXRhLWlkPVwiJHsgUGxhY2VzW2ldLmlkIH1cIiBkYXRhLW5hbWU9XCIkeyBQbGFjZXNbaV0udGl0bGUgfVwiIGRhdGEtaW1hZ2U9XCIkeyBQbGFjZXNbaV0ucGhvdG9zIH1cIj48L2Rpdj5cbiAgICAgICAgICA8aW1nIGNsYXNzPVwicmVzdWx0LWltZ1wiIHNyYz1cIiR7IFBsYWNlc1tpXS5waG90b3NbMF0gfVwiIGFsdD1cIlwiPlxuICAgICAgICA8L2Rpdj5cdFxuICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm9cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWhlYWRlclwiPlxuICAgICAgICAgICAgPHA+JHtQbGFjZXNbaV0udGl0bGV9PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJwcmljZVwiPiR7UGxhY2VzW2ldLnRvdGFsUHJpY2V9PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0tbWFwXCI+PGkgY2xhc3M9XCJtYXAtaWNvblwiPjwvaT4gJHtQbGFjZXNbaV0uY29vcmRpbmF0ZXN9INC60Lwg0L7RgiDQstCw0YE8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWRlc2NyXCI+JHsgUGxhY2VzW2ldLmRldGFpbHMgfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0tZm9vdGVyXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uPtCX0LDQsdGA0L7QvdC40YDQvtCy0LDRgtGMPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2xpPlxuICA8L3VsPmBcbiAgICBcbiAgICByZW5kZXJCbG9jayhcbiAgICAgICdzZWFyY2gtcmVzdWx0cy1ibG9jaycsXG4gICAgICBodG1sXG4gICAgKVxuICAgIHNvcnRSZXN1bHQoUGxhY2VzKVxuICB9XG59XG5cbiJdfQ==