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
export function renderSearchResultsBlock(Places) {
    // записать в хранилище что-нибудь
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteAll));
    renderBlock('search-results-block', `
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
    </div>`);
    let html = '';
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
          <div class="result-info--map"><i class="map-icon"></i> 2.5км от вас</div>
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV0QyxNQUFNLFVBQVUscUJBQXFCO0lBQ25DLFdBQVcsQ0FDVCxzQkFBc0IsRUFDdEI7Ozs7O0tBS0MsQ0FDRixDQUFBO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSw2QkFBNkIsQ0FBRSxhQUFhO0lBQzFELFdBQVcsQ0FDVCxzQkFBc0IsRUFDdEI7OztXQUdPLGFBQWE7O0tBRW5CLENBQ0YsQ0FBQTtBQUNILENBQUM7QUFZRCxNQUFNLFNBQVMsR0FBa0I7SUFDL0IsRUFBRSxFQUFFLENBQUM7SUFDTCxJQUFJLEVBQUUsNEJBQTRCO0lBQ2xDLEtBQUssRUFBRSxpQ0FBaUM7Q0FDekMsQ0FBQTtBQUNELE1BQU0sU0FBUyxHQUFrQjtJQUMvQixFQUFFLEVBQUUsQ0FBQztJQUNMLElBQUksRUFBRSxxQkFBcUI7SUFDM0IsS0FBSyxFQUFFLGlDQUFpQztDQUN6QyxDQUFBO0FBQ0QsTUFBTSxTQUFTLEdBQWtCO0lBQy9CLEVBQUUsRUFBRSxDQUFDO0lBQ0wsSUFBSSxFQUFFLGdDQUFnQztJQUN0QyxLQUFLLEVBQUUsaUNBQWlDO0NBQ3pDLENBQUE7QUFDRCxNQUFNLFdBQVcsR0FBbUI7SUFDbEMsQ0FBQyxFQUFFLFNBQVM7SUFDWixDQUFDLEVBQUUsU0FBUztJQUNaLENBQUMsRUFBRSxTQUFTO0NBQ2IsQ0FBQTtBQUlELE1BQU0sVUFBVSxrQkFBa0I7SUFFaEMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRW5ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLE1BQU0s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LGlCQUFrQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTzt5Q0FDL0gsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUU7Ozs7aUJBSTdDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLOytCQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVOzs7NENBR04sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQVE7Ozs7Ozs7OztRQVN2RCxDQUFBO1FBRUosV0FBVyxDQUNULHNCQUFzQixFQUN0QixJQUFJLENBQ0wsQ0FBQTtLQUNGO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlckJsb2NrIH0gZnJvbSAnLi9saWIuanMnXG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hTdHViQmxvY2sgKCkge1xuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLXJlc3VsdHMtYmxvY2snLFxuICAgIGBcbiAgICA8ZGl2IGNsYXNzPVwiYmVmb3JlLXJlc3VsdHMtYmxvY2tcIj5cbiAgICAgIDxpbWcgc3JjPVwiaW1nL3N0YXJ0LXNlYXJjaC5wbmdcIiAvPlxuICAgICAgPHA+0KfRgtC+0LHRiyDQvdCw0YfQsNGC0Ywg0L/QvtC40YHQuiwg0LfQsNC/0L7Qu9C90LjRgtC1INGE0L7RgNC80YMg0LgmbmJzcDvQvdCw0LbQvNC40YLQtSBcItCd0LDQudGC0LhcIjwvcD5cbiAgICA8L2Rpdj5cbiAgICBgXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckVtcHR5T3JFcnJvclNlYXJjaEJsb2NrIChyZWFzb25NZXNzYWdlKSB7XG4gIHJlbmRlckJsb2NrKFxuICAgICdzZWFyY2gtcmVzdWx0cy1ibG9jaycsXG4gICAgYFxuICAgIDxkaXYgY2xhc3M9XCJuby1yZXN1bHRzLWJsb2NrXCI+XG4gICAgICA8aW1nIHNyYz1cImltZy9uby1yZXN1bHRzLnBuZ1wiIC8+XG4gICAgICA8cD4ke3JlYXNvbk1lc3NhZ2V9PC9wPlxuICAgIDwvZGl2PlxuICAgIGBcbiAgKVxufVxuXG5pbnRlcmZhY2UgZmF2b3JpdGVQbGFjZSB7XG4gIFwiaWRcIjogbnVtYmVyLFxuICBcIm5hbWVcIjogc3RyaW5nLFxuICBcImltYWdlXCI6IHN0cmluZyxcbn1cblxuaW50ZXJmYWNlIGZhdm9yaXRlUGxhY2VzIHtcbiAgW2tleTogbnVtYmVyXTogZmF2b3JpdGVQbGFjZVxufVxuXG5jb25zdCBmYXZvcml0ZTE6IGZhdm9yaXRlUGxhY2UgPSB7XG4gIGlkOiAxLFxuICBuYW1lOiAnWUFSRCBSZXNpZGVuY2UgQXBhcnQtaG90ZWwnLFxuICBpbWFnZTogJ2h0dHA6Ly9sb2NhbGhvc3Q6NDEwMC9pbWcvMS5wbmcnXG59XG5jb25zdCBmYXZvcml0ZTI6IGZhdm9yaXRlUGxhY2UgPSB7XG4gIGlkOiAyLFxuICBuYW1lOiAnQWt5YW4gU3QuUGV0ZXJzYnVyZycsXG4gIGltYWdlOiAnaHR0cDovL2xvY2FsaG9zdDo0MTAwL2ltZy8yLnBuZydcbn1cbmNvbnN0IGZhdm9yaXRlMzogZmF2b3JpdGVQbGFjZSA9IHtcbiAgaWQ6IDMsXG4gIG5hbWU6ICdTb2xvIFNva29zIEhvdGVsIFBhbGFjZSBCcmlkZ2UnLFxuICBpbWFnZTogJ2h0dHA6Ly9sb2NhbGhvc3Q6NDEwMC9pbWcvMy5wbmcnXG59XG5jb25zdCBmYXZvcml0ZUFsbDogZmF2b3JpdGVQbGFjZXMgPSB7XG4gIDE6IGZhdm9yaXRlMSxcbiAgMjogZmF2b3JpdGUyLFxuICAzOiBmYXZvcml0ZTNcbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVGYXZvcml0ZUl0ZW0oKTogdm9pZCB7XG5cbiAgY29uc3QgYmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2hlYXJ0Jyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBibG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICBibG9ja3NbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgbGV0IGlkID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xuICAgICAgbGV0IG5hbWUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLW5hbWUnKTtcbiAgICAgIGxldCBpbWFnZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW1hZ2UnKTtcblxuICAgICAgbGV0IGlzRmF2b3JpdGUgPSBnZXRGYXZvcml0ZXNBbW91bnQoJ2Zhdm9yaXRlSXRlbXMnKTtcbiAgICAgIGNvbnN0IGlzRmF2ID0gc2VhcmNoSW5GYXZvcml0ZXMoaWQpIC8vIHRydWUgb3IgZmFsc2VcblxuICAgICAgaWYgKGlzRmF2KSB7XG4gICAgICAgIGxldCBuZXdGYXZvcml0ZSA9IHt9XG4gICAgICAgIGZvciAobGV0IGogaW4gaXNGYXZvcml0ZSkge1xuICAgICAgICAgIGlmICghKGogPT0gaWQpKSB7XG4gICAgICAgICAgICBuZXdGYXZvcml0ZVtqXSA9IGlzRmF2b3JpdGVbal07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmYXZvcml0ZUl0ZW1zJywgSlNPTi5zdHJpbmdpZnkobmV3RmF2b3JpdGUpKTtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNGYXZvcml0ZVtpZF0gPSB7XG4gICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgaW1hZ2U6IGltYWdlXG4gICAgICAgIH1cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Zhdm9yaXRlSXRlbXMnLCBKU09OLnN0cmluZ2lmeShpc0Zhdm9yaXRlKSk7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9KVxuICB9IFxufVxuXG5mdW5jdGlvbiBnZXRGYXZvcml0ZXNBbW91bnQoa2V5OiB1bmtub3duKTogZmF2b3JpdGVQbGFjZXMge1xuICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICBcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcbiAgfVxuIH1cblxuZnVuY3Rpb24gc2VhcmNoSW5GYXZvcml0ZXMoaWQpIHtcbiAgY29uc3QgZGF0YUZhdm9yaXRlcyA9IGdldEZhdm9yaXRlc0Ftb3VudCgnZmF2b3JpdGVJdGVtcycpO1xuICBmb3IgKGxldCBpIGluIGRhdGFGYXZvcml0ZXMpIHtcbiAgICBpZiAoaSA9PSBpZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2sgKFBsYWNlcykge1xuICAvLyDQt9Cw0L/QuNGB0LDRgtGMINCyINGF0YDQsNC90LjQu9C40YnQtSDRh9GC0L4t0L3QuNCx0YPQtNGMXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmYXZvcml0ZUl0ZW1zJywgSlNPTi5zdHJpbmdpZnkoZmF2b3JpdGVBbGwpKTtcblxuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLXJlc3VsdHMtYmxvY2snLFxuICAgIGBcbiAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLXJlc3VsdHMtaGVhZGVyXCI+XG4gICAgICAgIDxwPtCg0LXQt9GD0LvRjNGC0LDRgtGLINC/0L7QuNGB0LrQsDwvcD5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1yZXN1bHRzLWZpbHRlclwiPlxuICAgICAgICAgICAgPHNwYW4+PGkgY2xhc3M9XCJpY29uIGljb24tZmlsdGVyXCI+PC9pPiDQodC+0YDRgtC40YDQvtCy0LDRgtGMOjwvc3Bhbj5cbiAgICAgICAgICAgIDxzZWxlY3Q+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiBzZWxlY3RlZD1cIlwiPtCh0L3QsNGH0LDQu9CwINC00LXRiNGR0LLRi9C1PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiBzZWxlY3RlZD1cIlwiPtCh0L3QsNGH0LDQu9CwINC00L7RgNC+0LPQuNC1PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbj7QodC90LDRh9Cw0LvQsCDQsdC70LjQttC1PC9vcHRpb24+XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YFxuICAgICk7XG4gIGxldCBodG1sID0gJyc7XG4gIGZvciAobGV0IGkgaW4gUGxhY2VzKSB7XG4gXG4gICAgbGV0IGluRmF2b3JpdGVzID0gc2VhcmNoSW5GYXZvcml0ZXMoUGxhY2VzW2ldLmlkKSAvLyB0cnVlIG9yIGZhbHNlXG5cbiAgICBodG1sICs9IGA8dWwgY2xhc3M9XCJyZXN1bHRzLWxpc3RcIj5cbiAgICA8bGkgY2xhc3M9XCJyZXN1bHRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW1nLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmYXZvcml0ZXMgJHsgaW5GYXZvcml0ZXM/ICdhY3RpdmUnIDogJycgfVwiIGlkPVwiaGVhcnRcIiBkYXRhLWlkPVwiJHsgUGxhY2VzW2ldLmlkIH1cIiBkYXRhLW5hbWU9XCIkeyBQbGFjZXNbaV0udGl0bGUgfVwiIGRhdGEtaW1hZ2U9XCIkeyBQbGFjZXNbaV0ucGhvdG9zIH1cIj48L2Rpdj5cbiAgICAgICAgICA8aW1nIGNsYXNzPVwicmVzdWx0LWltZ1wiIHNyYz1cIiR7IFBsYWNlc1tpXS5waG90b3NbMF0gfVwiIGFsdD1cIlwiPlxuICAgICAgICA8L2Rpdj5cdFxuICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm9cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWhlYWRlclwiPlxuICAgICAgICAgICAgPHA+JHtQbGFjZXNbaV0udGl0bGV9PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJwcmljZVwiPiR7UGxhY2VzW2ldLnRvdGFsUHJpY2V9PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0tbWFwXCI+PGkgY2xhc3M9XCJtYXAtaWNvblwiPjwvaT4gMi410LrQvCDQvtGCINCy0LDRgTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0tZGVzY3JcIj4keyBQbGFjZXNbaV0uZGV0YWlscyB9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1mb290ZXJcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxidXR0b24+0JfQsNCx0YDQvtC90LjRgNC+0LLQsNGC0Yw8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbGk+XG4gIDwvdWw+YFxuICAgIFxuICAgIHJlbmRlckJsb2NrKFxuICAgICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcbiAgICAgIGh0bWxcbiAgICApXG4gIH1cbn1cblxuIl19