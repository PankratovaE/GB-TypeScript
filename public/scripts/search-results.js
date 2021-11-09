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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV0QyxNQUFNLFVBQVUscUJBQXFCO0lBQ25DLFdBQVcsQ0FDVCxzQkFBc0IsRUFDdEI7Ozs7O0tBS0MsQ0FDRixDQUFBO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSw2QkFBNkIsQ0FBRSxhQUFhO0lBQzFELFdBQVcsQ0FDVCxzQkFBc0IsRUFDdEI7OztXQUdPLGFBQWE7O0tBRW5CLENBQ0YsQ0FBQTtBQUNILENBQUM7QUFZRCxNQUFNLFNBQVMsR0FBa0I7SUFDL0IsRUFBRSxFQUFFLENBQUM7SUFDTCxJQUFJLEVBQUUsNEJBQTRCO0lBQ2xDLEtBQUssRUFBRSxpQ0FBaUM7Q0FDekMsQ0FBQTtBQUNELE1BQU0sU0FBUyxHQUFrQjtJQUMvQixFQUFFLEVBQUUsQ0FBQztJQUNMLElBQUksRUFBRSxxQkFBcUI7SUFDM0IsS0FBSyxFQUFFLGlDQUFpQztDQUN6QyxDQUFBO0FBQ0QsTUFBTSxTQUFTLEdBQWtCO0lBQy9CLEVBQUUsRUFBRSxDQUFDO0lBQ0wsSUFBSSxFQUFFLGdDQUFnQztJQUN0QyxLQUFLLEVBQUUsaUNBQWlDO0NBQ3pDLENBQUE7QUFDRCxNQUFNLFdBQVcsR0FBbUI7SUFDbEMsQ0FBQyxFQUFFLFNBQVM7SUFDWixDQUFDLEVBQUUsU0FBUztJQUNaLENBQUMsRUFBRSxTQUFTO0NBQ2IsQ0FBQTtBQUlELE1BQU0sVUFBVSxrQkFBa0I7SUFFaEMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRW5ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLE1BQU0s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LGlCQUFrQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTzt5Q0FDL0gsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUU7Ozs7aUJBSTdDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLOytCQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVOzs7NENBR04sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQVE7Ozs7Ozs7OztRQVN2RCxDQUFBO1FBRUosV0FBVyxDQUNULHNCQUFzQixFQUN0QixJQUFJLENBQ0wsQ0FBQTtLQUNGO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlckJsb2NrIH0gZnJvbSAnLi9saWIuanMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2VhcmNoU3R1YkJsb2NrICgpIHtcclxuICByZW5kZXJCbG9jayhcclxuICAgICdzZWFyY2gtcmVzdWx0cy1ibG9jaycsXHJcbiAgICBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiYmVmb3JlLXJlc3VsdHMtYmxvY2tcIj5cclxuICAgICAgPGltZyBzcmM9XCJpbWcvc3RhcnQtc2VhcmNoLnBuZ1wiIC8+XHJcbiAgICAgIDxwPtCn0YLQvtCx0Ysg0L3QsNGH0LDRgtGMINC/0L7QuNGB0LosINC30LDQv9C+0LvQvdC40YLQtSDRhNC+0YDQvNGDINC4Jm5ic3A70L3QsNC20LzQuNGC0LUgXCLQndCw0LnRgtC4XCI8L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIGBcclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJFbXB0eU9yRXJyb3JTZWFyY2hCbG9jayAocmVhc29uTWVzc2FnZSkge1xyXG4gIHJlbmRlckJsb2NrKFxyXG4gICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcclxuICAgIGBcclxuICAgIDxkaXYgY2xhc3M9XCJuby1yZXN1bHRzLWJsb2NrXCI+XHJcbiAgICAgIDxpbWcgc3JjPVwiaW1nL25vLXJlc3VsdHMucG5nXCIgLz5cclxuICAgICAgPHA+JHtyZWFzb25NZXNzYWdlfTwvcD5cclxuICAgIDwvZGl2PlxyXG4gICAgYFxyXG4gIClcclxufVxyXG5cclxuaW50ZXJmYWNlIGZhdm9yaXRlUGxhY2Uge1xyXG4gIFwiaWRcIjogbnVtYmVyLFxyXG4gIFwibmFtZVwiOiBzdHJpbmcsXHJcbiAgXCJpbWFnZVwiOiBzdHJpbmcsXHJcbn1cclxuXHJcbmludGVyZmFjZSBmYXZvcml0ZVBsYWNlcyB7XHJcbiAgW2tleTogbnVtYmVyXTogZmF2b3JpdGVQbGFjZVxyXG59XHJcblxyXG5jb25zdCBmYXZvcml0ZTE6IGZhdm9yaXRlUGxhY2UgPSB7XHJcbiAgaWQ6IDEsXHJcbiAgbmFtZTogJ1lBUkQgUmVzaWRlbmNlIEFwYXJ0LWhvdGVsJyxcclxuICBpbWFnZTogJ2h0dHA6Ly9sb2NhbGhvc3Q6NDEwMC9pbWcvMS5wbmcnXHJcbn1cclxuY29uc3QgZmF2b3JpdGUyOiBmYXZvcml0ZVBsYWNlID0ge1xyXG4gIGlkOiAyLFxyXG4gIG5hbWU6ICdBa3lhbiBTdC5QZXRlcnNidXJnJyxcclxuICBpbWFnZTogJ2h0dHA6Ly9sb2NhbGhvc3Q6NDEwMC9pbWcvMi5wbmcnXHJcbn1cclxuY29uc3QgZmF2b3JpdGUzOiBmYXZvcml0ZVBsYWNlID0ge1xyXG4gIGlkOiAzLFxyXG4gIG5hbWU6ICdTb2xvIFNva29zIEhvdGVsIFBhbGFjZSBCcmlkZ2UnLFxyXG4gIGltYWdlOiAnaHR0cDovL2xvY2FsaG9zdDo0MTAwL2ltZy8zLnBuZydcclxufVxyXG5jb25zdCBmYXZvcml0ZUFsbDogZmF2b3JpdGVQbGFjZXMgPSB7XHJcbiAgMTogZmF2b3JpdGUxLFxyXG4gIDI6IGZhdm9yaXRlMixcclxuICAzOiBmYXZvcml0ZTNcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlRmF2b3JpdGVJdGVtKCk6IHZvaWQge1xyXG5cclxuICBjb25zdCBibG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjaGVhcnQnKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBibG9ja3MubGVuZ3RoOyBpKyspIHtcclxuICAgIGJsb2Nrc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG5cclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICBsZXQgaWQgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XHJcbiAgICAgIGxldCBuYW1lID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJyk7XHJcbiAgICAgIGxldCBpbWFnZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW1hZ2UnKTtcclxuXHJcbiAgICAgIGxldCBpc0Zhdm9yaXRlID0gZ2V0RmF2b3JpdGVzQW1vdW50KCdmYXZvcml0ZUl0ZW1zJyk7XHJcbiAgICAgIGNvbnN0IGlzRmF2ID0gc2VhcmNoSW5GYXZvcml0ZXMoaWQpIC8vIHRydWUgb3IgZmFsc2VcclxuXHJcbiAgICAgIGlmIChpc0Zhdikge1xyXG4gICAgICAgIGxldCBuZXdGYXZvcml0ZSA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQgaiBpbiBpc0Zhdm9yaXRlKSB7XHJcbiAgICAgICAgICBpZiAoIShqID09IGlkKSkge1xyXG4gICAgICAgICAgICBuZXdGYXZvcml0ZVtqXSA9IGlzRmF2b3JpdGVbal07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmYXZvcml0ZUl0ZW1zJywgSlNPTi5zdHJpbmdpZnkobmV3RmF2b3JpdGUpKTtcclxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaXNGYXZvcml0ZVtpZF0gPSB7XHJcbiAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgaW1hZ2U6IGltYWdlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmYXZvcml0ZUl0ZW1zJywgSlNPTi5zdHJpbmdpZnkoaXNGYXZvcml0ZSkpO1xyXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9IFxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRGYXZvcml0ZXNBbW91bnQoa2V5OiB1bmtub3duKTogZmF2b3JpdGVQbGFjZXMge1xyXG4gIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgXHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcclxuICB9XHJcbiB9XHJcblxyXG5mdW5jdGlvbiBzZWFyY2hJbkZhdm9yaXRlcyhpZCkge1xyXG4gIGNvbnN0IGRhdGFGYXZvcml0ZXMgPSBnZXRGYXZvcml0ZXNBbW91bnQoJ2Zhdm9yaXRlSXRlbXMnKTtcclxuICBmb3IgKGxldCBpIGluIGRhdGFGYXZvcml0ZXMpIHtcclxuICAgIGlmIChpID09IGlkKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNlYXJjaFJlc3VsdHNCbG9jayAoUGxhY2VzKSB7XHJcbiAgLy8g0LfQsNC/0LjRgdCw0YLRjCDQsiDRhdGA0LDQvdC40LvQuNGJ0LUg0YfRgtC+LdC90LjQsdGD0LTRjFxyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmYXZvcml0ZUl0ZW1zJywgSlNPTi5zdHJpbmdpZnkoZmF2b3JpdGVBbGwpKTtcclxuXHJcbiAgcmVuZGVyQmxvY2soXHJcbiAgICAnc2VhcmNoLXJlc3VsdHMtYmxvY2snLFxyXG4gICAgYFxyXG4gICAgPGRpdiBjbGFzcz1cInNlYXJjaC1yZXN1bHRzLWhlYWRlclwiPlxyXG4gICAgICAgIDxwPtCg0LXQt9GD0LvRjNGC0LDRgtGLINC/0L7QuNGB0LrQsDwvcD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLXJlc3VsdHMtZmlsdGVyXCI+XHJcbiAgICAgICAgICAgIDxzcGFuPjxpIGNsYXNzPVwiaWNvbiBpY29uLWZpbHRlclwiPjwvaT4g0KHQvtGA0YLQuNGA0L7QstCw0YLRjDo8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHNlbGVjdGVkPVwiXCI+0KHQvdCw0YfQsNC70LAg0LTQtdGI0ZHQstGL0LU8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIDxvcHRpb24gc2VsZWN0ZWQ9XCJcIj7QodC90LDRh9Cw0LvQsCDQtNC+0YDQvtCz0LjQtTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbj7QodC90LDRh9Cw0LvQsCDQsdC70LjQttC1PC9vcHRpb24+XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+YFxyXG4gICAgKTtcclxuICBsZXQgaHRtbCA9ICcnO1xyXG4gIGZvciAobGV0IGkgaW4gUGxhY2VzKSB7XHJcbiBcclxuICAgIGxldCBpbkZhdm9yaXRlcyA9IHNlYXJjaEluRmF2b3JpdGVzKFBsYWNlc1tpXS5pZCkgLy8gdHJ1ZSBvciBmYWxzZVxyXG5cclxuICAgIGh0bWwgKz0gYDx1bCBjbGFzcz1cInJlc3VsdHMtbGlzdFwiPlxyXG4gICAgPGxpIGNsYXNzPVwicmVzdWx0XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbWctY29udGFpbmVyXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmF2b3JpdGVzICR7IGluRmF2b3JpdGVzPyAnYWN0aXZlJyA6ICcnIH1cIiBpZD1cImhlYXJ0XCIgZGF0YS1pZD1cIiR7IFBsYWNlc1tpXS5pZCB9XCIgZGF0YS1uYW1lPVwiJHsgUGxhY2VzW2ldLnRpdGxlIH1cIiBkYXRhLWltYWdlPVwiJHsgUGxhY2VzW2ldLnBob3RvcyB9XCI+PC9kaXY+XHJcbiAgICAgICAgICA8aW1nIGNsYXNzPVwicmVzdWx0LWltZ1wiIHNyYz1cIiR7IFBsYWNlc1tpXS5waG90b3NbMF0gfVwiIGFsdD1cIlwiPlxyXG4gICAgICAgIDwvZGl2Plx0XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8cD4ke1BsYWNlc1tpXS50aXRsZX08L3A+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwicHJpY2VcIj4ke1BsYWNlc1tpXS50b3RhbFByaWNlfTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1tYXBcIj48aSBjbGFzcz1cIm1hcC1pY29uXCI+PC9pPiAyLjXQutC8INC+0YIg0LLQsNGBPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWRlc2NyXCI+JHsgUGxhY2VzW2ldLmRldGFpbHMgfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1mb290ZXJcIj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICA8YnV0dG9uPtCX0LDQsdGA0L7QvdC40YDQvtCy0LDRgtGMPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9saT5cclxuICA8L3VsPmBcclxuICAgIFxyXG4gICAgcmVuZGVyQmxvY2soXHJcbiAgICAgICdzZWFyY2gtcmVzdWx0cy1ibG9jaycsXHJcbiAgICAgIGh0bWxcclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbiJdfQ==