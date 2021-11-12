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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUd0QyxNQUFNLFVBQVUscUJBQXFCO0lBQ25DLFdBQVcsQ0FDVCxzQkFBc0IsRUFDdEI7Ozs7O0tBS0MsQ0FDRixDQUFBO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSw2QkFBNkIsQ0FBRSxhQUFxQjtJQUNsRSxXQUFXLENBQ1Qsc0JBQXNCLEVBQ3RCOzs7V0FHTyxhQUFhOztLQUVuQixDQUNGLENBQUE7QUFDSCxDQUFDO0FBWUQsTUFBTSxTQUFTLEdBQWtCO0lBQy9CLEVBQUUsRUFBRSxDQUFDO0lBQ0wsSUFBSSxFQUFFLDRCQUE0QjtJQUNsQyxLQUFLLEVBQUUsaUNBQWlDO0NBQ3pDLENBQUE7QUFDRCxNQUFNLFNBQVMsR0FBa0I7SUFDL0IsRUFBRSxFQUFFLENBQUM7SUFDTCxJQUFJLEVBQUUscUJBQXFCO0lBQzNCLEtBQUssRUFBRSxpQ0FBaUM7Q0FDekMsQ0FBQTtBQUNELE1BQU0sU0FBUyxHQUFrQjtJQUMvQixFQUFFLEVBQUUsQ0FBQztJQUNMLElBQUksRUFBRSxnQ0FBZ0M7SUFDdEMsS0FBSyxFQUFFLGlDQUFpQztDQUN6QyxDQUFBO0FBQ0QsTUFBTSxXQUFXLEdBQW1CO0lBQ2xDLENBQUMsRUFBRSxTQUFTO0lBQ1osQ0FBQyxFQUFFLFNBQVM7SUFDWixDQUFDLEVBQUUsU0FBUztDQUNiLENBQUE7QUFJRCxNQUFNLFVBQVUsa0JBQWtCO0lBRWhDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVuRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxNQUFN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QUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBRW5FLElBQUksSUFBSSxHQUFHOzs7Ozs7Ozs7OztTQVdKLENBQUM7SUFDUixLQUFLLElBQUksQ0FBQyxJQUFJLE1BQU0sRUFBRTtRQUVwQixJQUFJLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQyxnQkFBZ0I7UUFFbEUsSUFBSSxJQUFJOzs7O2tDQUl1QixXQUFXLENBQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRyx5QkFBMEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUcsZ0JBQWlCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFNLGlCQUFrQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTzt5Q0FDL0gsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUU7Ozs7aUJBSTdDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLOytCQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVOzttRUFFZ0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVc7NENBQzNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFROzs7Ozs7Ozs7UUFTdkQsQ0FBQTtRQUVKLFdBQVcsQ0FDVCxzQkFBc0IsRUFDdEIsSUFBSSxDQUNMLENBQUE7UUFDRCxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDbkI7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyQmxvY2sgfSBmcm9tICcuL2xpYi5qcydcclxuaW1wb3J0IHsgUGxhY2UgfSBmcm9tICcuL3N0b3JlL2RvbWFpbi9wbGFjZS5qcydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hTdHViQmxvY2sgKCkge1xyXG4gIHJlbmRlckJsb2NrKFxyXG4gICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcclxuICAgIGBcclxuICAgIDxkaXYgY2xhc3M9XCJiZWZvcmUtcmVzdWx0cy1ibG9ja1wiPlxyXG4gICAgICA8aW1nIHNyYz1cImltZy9zdGFydC1zZWFyY2gucG5nXCIgLz5cclxuICAgICAgPHA+0KfRgtC+0LHRiyDQvdCw0YfQsNGC0Ywg0L/QvtC40YHQuiwg0LfQsNC/0L7Qu9C90LjRgtC1INGE0L7RgNC80YMg0LgmbmJzcDvQvdCw0LbQvNC40YLQtSBcItCd0LDQudGC0LhcIjwvcD5cclxuICAgIDwvZGl2PlxyXG4gICAgYFxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckVtcHR5T3JFcnJvclNlYXJjaEJsb2NrIChyZWFzb25NZXNzYWdlOiBzdHJpbmcpIHtcclxuICByZW5kZXJCbG9jayhcclxuICAgICdzZWFyY2gtcmVzdWx0cy1ibG9jaycsXHJcbiAgICBgXHJcbiAgICA8ZGl2IGNsYXNzPVwibm8tcmVzdWx0cy1ibG9ja1wiPlxyXG4gICAgICA8aW1nIHNyYz1cImltZy9uby1yZXN1bHRzLnBuZ1wiIC8+XHJcbiAgICAgIDxwPiR7cmVhc29uTWVzc2FnZX08L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIGBcclxuICApXHJcbn1cclxuXHJcbmludGVyZmFjZSBmYXZvcml0ZVBsYWNlIHtcclxuICBcImlkXCI6IG51bWJlcixcclxuICBcIm5hbWVcIjogc3RyaW5nLFxyXG4gIFwiaW1hZ2VcIjogc3RyaW5nLFxyXG59XHJcblxyXG5pbnRlcmZhY2UgZmF2b3JpdGVQbGFjZXMge1xyXG4gIFtrZXk6IG51bWJlcl06IGZhdm9yaXRlUGxhY2VcclxufVxyXG5cclxuY29uc3QgZmF2b3JpdGUxOiBmYXZvcml0ZVBsYWNlID0ge1xyXG4gIGlkOiAxLFxyXG4gIG5hbWU6ICdZQVJEIFJlc2lkZW5jZSBBcGFydC1ob3RlbCcsXHJcbiAgaW1hZ2U6ICdodHRwOi8vbG9jYWxob3N0OjQxMDAvaW1nLzEucG5nJ1xyXG59XHJcbmNvbnN0IGZhdm9yaXRlMjogZmF2b3JpdGVQbGFjZSA9IHtcclxuICBpZDogMixcclxuICBuYW1lOiAnQWt5YW4gU3QuUGV0ZXJzYnVyZycsXHJcbiAgaW1hZ2U6ICdodHRwOi8vbG9jYWxob3N0OjQxMDAvaW1nLzIucG5nJ1xyXG59XHJcbmNvbnN0IGZhdm9yaXRlMzogZmF2b3JpdGVQbGFjZSA9IHtcclxuICBpZDogMyxcclxuICBuYW1lOiAnU29sbyBTb2tvcyBIb3RlbCBQYWxhY2UgQnJpZGdlJyxcclxuICBpbWFnZTogJ2h0dHA6Ly9sb2NhbGhvc3Q6NDEwMC9pbWcvMy5wbmcnXHJcbn1cclxuY29uc3QgZmF2b3JpdGVBbGw6IGZhdm9yaXRlUGxhY2VzID0ge1xyXG4gIDE6IGZhdm9yaXRlMSxcclxuICAyOiBmYXZvcml0ZTIsXHJcbiAgMzogZmF2b3JpdGUzXHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUZhdm9yaXRlSXRlbSgpOiB2b2lkIHtcclxuXHJcbiAgY29uc3QgYmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2hlYXJ0Jyk7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBibG9ja3NbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuXHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgbGV0IGlkOiBhbnkgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XHJcbiAgICAgIGxldCBuYW1lID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJyk7XHJcbiAgICAgIGxldCBpbWFnZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW1hZ2UnKTtcclxuXHJcbiAgICAgIGxldCBmYXZvcml0ZUl0ZW1zOiBhbnkgPSBnZXRGYXZvcml0ZXNBbW91bnQoJ2Zhdm9yaXRlSXRlbXMnKTtcclxuICAgICAgY29uc3QgaXNGYXYgPSBzZWFyY2hJbkZhdm9yaXRlcyhpZCkgLy8gdHJ1ZSBvciBmYWxzZVxyXG5cclxuICAgICAgaWYgKGlzRmF2KSB7XHJcbiAgICAgICAgbGV0IG5ld0Zhdm9yaXRlOiBhbnkgPSB7fVxyXG4gICAgICAgIGZvciAobGV0IGogaW4gZmF2b3JpdGVJdGVtcykge1xyXG4gICAgICAgICAgaWYgKCEoaiA9PSBpZCkpIHtcclxuICAgICAgICAgICAgbmV3RmF2b3JpdGVbal0gPSBmYXZvcml0ZUl0ZW1zW2pdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmF2b3JpdGVJdGVtcycsIEpTT04uc3RyaW5naWZ5KG5ld0Zhdm9yaXRlKSk7XHJcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZhdm9yaXRlSXRlbXNbaWRdID0ge1xyXG4gICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgIGltYWdlOiBpbWFnZVxyXG4gICAgICAgIH1cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmF2b3JpdGVJdGVtcycsIEpTT04uc3RyaW5naWZ5KGZhdm9yaXRlSXRlbXMpKTtcclxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSBcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RmF2b3JpdGVzQW1vdW50KGtleSk6IGZhdm9yaXRlUGxhY2VzIHtcclxuICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgIFxyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XHJcbiAgfVxyXG4gfVxyXG5cclxuZnVuY3Rpb24gc2VhcmNoSW5GYXZvcml0ZXMoaWQpIHtcclxuICBjb25zdCBkYXRhRmF2b3JpdGVzID0gZ2V0RmF2b3JpdGVzQW1vdW50KCdmYXZvcml0ZUl0ZW1zJyk7XHJcbiAgZm9yIChsZXQgaSBpbiBkYXRhRmF2b3JpdGVzKSB7XHJcbiAgICBpZiAoaSA9PSBpZCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBzb3J0UmVzdWx0IChQbGFjZXM6IFBsYWNlW10pIHtcclxuICBsZXQgc2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gIHNlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICBzZWxlY3RTb3J0aW5nKHNlbC5zZWxlY3RlZEluZGV4LCBQbGFjZXMpOyAgLy8gMCwgMSwgMlxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbGVjdFNvcnRpbmcoaW5kZXgsIFBsYWNlcykge1xyXG4gIHN3aXRjaCAoaW5kZXgpIHtcclxuICAgIGNhc2UgMDpcclxuICAgICAgcmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrKFBsYWNlcy5zb3J0KHNvcnRCeVByaWNlVXApKTtcclxuICAgICAgYnJlYWtcclxuICAgIGNhc2UgMTpcclxuICAgICAgcmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrKFBsYWNlcy5zb3J0KHNvcnRCeVByaWNlRG93bikpO1xyXG4gICAgICBicmVha1xyXG4gICAgY2FzZSAyOlxyXG4gICAgICByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2soUGxhY2VzLnNvcnQoc29ydEJ5RGlzdGFuY2UpKTtcclxuICAgICAgYnJlYWtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJlbmRlclNlYXJjaFJlc3VsdHNCbG9jayhQbGFjZXMpO1xyXG4gICAgICBicmVha1xyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBzb3J0QnlQcmljZVVwKG9uZTogUGxhY2UsIHR3bzogUGxhY2UpIHtcclxuICBpZiAob25lLnRvdGFsUHJpY2UgPiB0d28udG90YWxQcmljZSkge1xyXG4gICAgcmV0dXJuIDFcclxuICB9IGVsc2UgaWYgKG9uZS50b3RhbFByaWNlIDwgdHdvLnRvdGFsUHJpY2UpIHtcclxuICAgIHJldHVybiAtMVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gMFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc29ydEJ5UHJpY2VEb3duKG9uZTogUGxhY2UsIHR3bzogUGxhY2UpIHtcclxuICBpZiAob25lLnRvdGFsUHJpY2UgPCB0d28udG90YWxQcmljZSkge1xyXG4gICAgcmV0dXJuIDFcclxuICB9IGVsc2UgaWYgKG9uZS50b3RhbFByaWNlID4gdHdvLnRvdGFsUHJpY2UpIHtcclxuICAgIHJldHVybiAtMVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gMFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc29ydEJ5RGlzdGFuY2Uob25lOiBQbGFjZSwgdHdvOiBQbGFjZSkge1xyXG4gIGlmIChvbmUuY29vcmRpbmF0ZXMgPiB0d28uY29vcmRpbmF0ZXMpIHtcclxuICAgIHJldHVybiAxXHJcbiAgfSBlbHNlIGlmIChvbmUudG90YWxQcmljZSA8IHR3by50b3RhbFByaWNlKSB7XHJcbiAgICByZXR1cm4gLTFcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIDBcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2sgKFBsYWNlczogUGxhY2VbXSkge1xyXG4gIC8vINC30LDQv9C40YHQsNGC0Ywg0LIg0YXRgNCw0L3QuNC70LjRidC1INGH0YLQvi3QvdC40LHRg9C00YxcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmF2b3JpdGVJdGVtcycsIEpTT04uc3RyaW5naWZ5KGZhdm9yaXRlQWxsKSk7XHJcblxyXG4gIGxldCBodG1sID0gYFxyXG4gIDxkaXYgY2xhc3M9XCJzZWFyY2gtcmVzdWx0cy1oZWFkZXJcIj5cclxuICAgICAgPHA+0KDQtdC30YPQu9GM0YLQsNGC0Ysg0L/QvtC40YHQutCwPC9wPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLXJlc3VsdHMtZmlsdGVyXCI+XHJcbiAgICAgICAgICA8c3Bhbj48aSBjbGFzcz1cImljb24gaWNvbi1maWx0ZXJcIj48L2k+INCh0L7RgNGC0LjRgNC+0LLQsNGC0Yw6PC9zcGFuPlxyXG4gICAgICAgICAgPHNlbGVjdCBpZD1cInNlbGVjdFwiPlxyXG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJwcmljZVVwXCI+0KHQvdCw0YfQsNC70LAg0LTQtdGI0ZHQstGL0LU8L29wdGlvbj5cclxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicHJpY2VEb3duXCI+0KHQvdCw0YfQsNC70LAg0LTQvtGA0L7Qs9C40LU8L29wdGlvbj5cclxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZGlzdGFuY2VcIj7QodC90LDRh9Cw0LvQsCDQsdC70LjQttC1PC9vcHRpb24+XHJcbiAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgPC9kaXY+XHJcbiAgPC9kaXY+YDtcclxuICBmb3IgKGxldCBpIGluIFBsYWNlcykge1xyXG4gXHJcbiAgICBsZXQgaW5GYXZvcml0ZXMgPSBzZWFyY2hJbkZhdm9yaXRlcyhQbGFjZXNbaV0uaWQpIC8vIHRydWUgb3IgZmFsc2VcclxuXHJcbiAgICBodG1sICs9IGA8dWwgY2xhc3M9XCJyZXN1bHRzLWxpc3RcIj5cclxuICAgIDxsaSBjbGFzcz1cInJlc3VsdFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW1nLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZhdm9yaXRlcyAkeyBpbkZhdm9yaXRlcz8gJ2FjdGl2ZScgOiAnJyB9XCIgaWQ9XCJoZWFydFwiIGRhdGEtaWQ9XCIkeyBQbGFjZXNbaV0uaWQgfVwiIGRhdGEtbmFtZT1cIiR7IFBsYWNlc1tpXS50aXRsZSB9XCIgZGF0YS1pbWFnZT1cIiR7IFBsYWNlc1tpXS5waG90b3MgfVwiPjwvZGl2PlxyXG4gICAgICAgICAgPGltZyBjbGFzcz1cInJlc3VsdC1pbWdcIiBzcmM9XCIkeyBQbGFjZXNbaV0ucGhvdG9zWzBdIH1cIiBhbHQ9XCJcIj5cclxuICAgICAgICA8L2Rpdj5cdFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mb1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1oZWFkZXJcIj5cclxuICAgICAgICAgICAgPHA+JHtQbGFjZXNbaV0udGl0bGV9PC9wPlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cInByaWNlXCI+JHtQbGFjZXNbaV0udG90YWxQcmljZX08L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0tbWFwXCI+PGkgY2xhc3M9XCJtYXAtaWNvblwiPjwvaT4gJHtQbGFjZXNbaV0uY29vcmRpbmF0ZXN9INC60Lwg0L7RgiDQstCw0YE8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0tZGVzY3JcIj4keyBQbGFjZXNbaV0uZGV0YWlscyB9PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWZvb3RlclwiPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxidXR0b24+0JfQsNCx0YDQvtC90LjRgNC+0LLQsNGC0Yw8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2xpPlxyXG4gIDwvdWw+YFxyXG4gICAgXHJcbiAgICByZW5kZXJCbG9jayhcclxuICAgICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcclxuICAgICAgaHRtbFxyXG4gICAgKVxyXG4gICAgc29ydFJlc3VsdChQbGFjZXMpXHJcbiAgfVxyXG59XHJcblxyXG4iXX0=