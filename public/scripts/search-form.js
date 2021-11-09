import { renderBlock } from './lib.js';
import { dataDb } from './index.js';
import { renderSearchResultsBlock, toggleFavoriteItem } from './search-results.js';
import { FlatRentSdk } from './flat-rent-sdk.js';
function handlerSearch(data, price) {
    let allFind = {};
    let find = null;
    let key = null;
    (function searchAll(data, price) {
        for (let i in data) {
            if (data.hasOwnProperty(i)) {
                if (i === 'totalPrice') {
                    if (price >= data[i]) {
                        find = data;
                        key = data.id;
                        allFind[key] = find;
                    }
                }
                if (data[i] && data[i].constructor === Object) {
                    searchAll(data[i], price);
                }
            }
        }
        return allFind;
    })(data, price);
    return allFind;
}
export function search() {
    const form = document.getElementsByTagName('form')[0];
    form.onsubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(form);
        //получить чекбоксы
        const checkboxes = document.getElementsByClassName('selectProvider');
        const checkedItem = [];
        //выбранные сложить в массив
        for (let i = 0; i < checkboxes.length; i++) {
            let item = checkboxes[i];
            if (item.checked) {
                checkedItem.push(item);
            }
        }
        const data = {
            city: 'Санкт-Петербург',
            inDate: formData.get('checkin').toString(),
            outDate: formData.get('checkout').toString(),
            maxPrice: +formData.get('price')
        };
        // при отправке формы проверяем выбран ли провыйдер
        if (!checkedItem.length) { // если нет, то выбрать
            console.log('Choose provider and submit again.');
        }
        else {
            let homyFounded = {};
            let flatRentFounded = {};
            let allFound = {};
            for (let i = 0; i < checkedItem.length; i++) {
                if (checkedItem[i].value === 'homy') {
                    homyFounded = handlerSearch(dataDb, data.maxPrice);
                    allFound = Object.assign(homyFounded);
                    renderSearchResultsBlock(allFound);
                    toggleFavoriteItem();
                }
                if (checkedItem[i].value === 'flat-rent') {
                    const newFlat = new FlatRentSdk;
                    const flatRentData = {
                        city: 'Санкт-Петербург',
                        checkInDate: new Date(formData.get('checkin').toString()),
                        checkOutDate: new Date(formData.get('checkout').toString()),
                        priceLimit: +formData.get('price')
                    };
                    const foundFlats = newFlat.search(flatRentData);
                    foundFlats.then(res => {
                        flatRentFounded = Object.assign({}, res);
                        //переименовать ключи в получившемся объекте
                        let renamedFlatRent = Object.entries(flatRentFounded).reduce((u, [n, v]) => {
                            u[`${n}FRsdk`] = v;
                            return u;
                        }, {});
                        //собрать два объекта в один
                        allFound = Object.assign(homyFounded, renamedFlatRent);
                        //вызвать рендер с общим объектом
                        renderSearchResultsBlock(allFound);
                        toggleFavoriteItem();
                    });
                }
            }
        }
    };
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
export function renderSearchFormBlock(dateIn = defaultIn, dateOut = defaultOut) {
    renderBlock('search-form-block', `
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
    `);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBQ25DLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBQ2xGLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQTtBQXVCOUMsU0FBUyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUs7SUFDaEMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztJQUNoQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFFZixDQUFDLFNBQVMsU0FBUyxDQUFFLElBQUksRUFBRSxLQUFLO1FBQzlCLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ2hCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLEtBQUssWUFBWSxFQUFFO29CQUN0QixJQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBRXJCLElBQUksR0FBRyxJQUFJLENBQUM7d0JBQ1osR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztxQkFDckI7aUJBQ0Y7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsS0FBSyxNQUFNLEVBQUU7b0JBQzdDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7aUJBQzFCO2FBQ0Y7U0FDRjtR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QUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUU1RCxTQUFTLGFBQWEsQ0FBQyxJQUFJO0lBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pILENBQUM7QUFFRCxNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0IsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzFDLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMvQyxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFakQsTUFBTSxVQUFVLHFCQUFxQixDQUFFLFNBQWlCLFNBQVMsRUFBRSxVQUFrQixVQUFVO0lBQzdGLFdBQVcsQ0FDVCxtQkFBbUIsRUFDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7OzJEQWlCdUQsTUFBTSxVQUFVLEtBQUssVUFBVSxVQUFVOzs7OzREQUl4QyxPQUFPLFVBQVUsS0FBSyxVQUFVLFVBQVU7Ozs7Ozs7Ozs7OztLQVlqRyxDQUNGLENBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyQmxvY2sgfSBmcm9tICcuL2xpYi5qcydcclxuaW1wb3J0IHsgZGF0YURiIH0gZnJvbSAnLi9pbmRleC5qcydcclxuaW1wb3J0IHsgcmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrLCB0b2dnbGVGYXZvcml0ZUl0ZW0gfSBmcm9tICcuL3NlYXJjaC1yZXN1bHRzLmpzJ1xyXG5pbXBvcnQge0ZsYXRSZW50U2RrfSBmcm9tICcuL2ZsYXQtcmVudC1zZGsuanMnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBsYWNlIHtcclxuICBcImlkXCI6IG51bWJlcixcclxuICBcInRpdGxlXCI6IHN0cmluZywgLy9uYW1lXHJcbiAgXCJkZXRhaWxzXCI6IHN0cmluZywgLy9kZXNjcmlwdGlvblxyXG4gIFwicGhvdG9zXCI6IHN0cmluZyBbXSwgLy9pbWFnZVxyXG4gIFwiY29vcmRpbmF0ZXNcIjogW10sXHJcbiAgXCJib29rZWREYXRlc1wiOiBzdHJpbmdbXSxcclxuICBcInRvdGFsUHJpY2VcIjogbnVtYmVyIC8vcHJpY2VcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQbGFjZXMge1xyXG4gIFtrZXk6IG51bWJlcl06IFBsYWNlXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoRm9ybURhdGEge1xyXG4gIGNpdHk6IHN0cmluZyxcclxuICBpbkRhdGU6IHN0cmluZyxcclxuICBvdXREYXRlOiBzdHJpbmcsXHJcbiAgbWF4UHJpY2U6IG51bWJlcixcclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlclNlYXJjaChkYXRhLCBwcmljZSk6IFBsYWNlcyB7XHJcbiAgbGV0IGFsbEZpbmQgPSB7fTtcclxuICBsZXQgZmluZCA9IG51bGw7XHJcbiAgbGV0IGtleSA9IG51bGw7XHJcbiBcclxuICAoZnVuY3Rpb24gc2VhcmNoQWxsIChkYXRhLCBwcmljZSkge1xyXG4gICAgZm9yIChsZXQgaSBpbiBkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICAgIGlmIChpID09PSAndG90YWxQcmljZScpIHtcclxuICAgICAgICAgICAgaWYgKCBwcmljZSA+PSBkYXRhW2ldKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIGZpbmQgPSBkYXRhO1xyXG4gICAgICAgICAgICAgIGtleSA9IGRhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgYWxsRmluZFtrZXldID0gZmluZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGRhdGFbaV0gJiYgZGF0YVtpXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIHNlYXJjaEFsbChkYXRhW2ldLCBwcmljZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIHJldHVybiBhbGxGaW5kOyAgXHJcbiAgfSkoZGF0YSwgcHJpY2UpXHJcblxyXG4gIHJldHVybiBhbGxGaW5kO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoKCkge1xyXG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZm9ybScpWzBdO1xyXG4gIFxyXG4gIGZvcm0ub25zdWJtaXQgPSAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xyXG5cclxuICAgIC8v0L/QvtC70YPRh9C40YLRjCDRh9C10LrQsdC+0LrRgdGLXHJcbiAgICBjb25zdCBjaGVja2JveGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0UHJvdmlkZXInKTtcclxuICAgIGNvbnN0IGNoZWNrZWRJdGVtID0gW107XHJcbiAgICAvL9Cy0YvQsdGA0LDQvdC90YvQtSDRgdC70L7QttC40YLRjCDQsiDQvNCw0YHRgdC40LJcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hlY2tib3hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgaXRlbSA9IGNoZWNrYm94ZXNbaV0gYXMgSFRNTElucHV0RWxlbWVudFxyXG4gICAgICBpZiAoaXRlbS5jaGVja2VkKSB7XHJcbiAgICAgICAgY2hlY2tlZEl0ZW0ucHVzaChpdGVtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGE6IFNlYXJjaEZvcm1EYXRhID0ge1xyXG4gICAgICBjaXR5OiAn0KHQsNC90LrRgi3Qn9C10YLQtdGA0LHRg9GA0LMnLFxyXG4gICAgICBpbkRhdGU6IGZvcm1EYXRhLmdldCgnY2hlY2tpbicpLnRvU3RyaW5nKCksXHJcbiAgICAgIG91dERhdGU6IGZvcm1EYXRhLmdldCgnY2hlY2tvdXQnKS50b1N0cmluZygpLFxyXG4gICAgICBtYXhQcmljZTogK2Zvcm1EYXRhLmdldCgncHJpY2UnKVxyXG4gICAgfVxyXG4gIC8vINC/0YDQuCDQvtGC0L/RgNCw0LLQutC1INGE0L7RgNC80Ysg0L/RgNC+0LLQtdGA0Y/QtdC8INCy0YvQsdGA0LDQvSDQu9C4INC/0YDQvtCy0YvQudC00LXRgFxyXG4gIGlmICghY2hlY2tlZEl0ZW0ubGVuZ3RoKSB7IC8vINC10YHQu9C4INC90LXRgiwg0YLQviDQstGL0LHRgNCw0YLRjFxyXG4gICAgY29uc29sZS5sb2coJ0Nob29zZSBwcm92aWRlciBhbmQgc3VibWl0IGFnYWluLicpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgaG9teUZvdW5kZWQ6IFBsYWNlcyA9IHt9O1xyXG4gICAgbGV0IGZsYXRSZW50Rm91bmRlZDogUGxhY2VzID17fTtcclxuICAgIGxldCBhbGxGb3VuZDogUGxhY2VzID0ge307XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGVja2VkSXRlbS5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGNoZWNrZWRJdGVtW2ldLnZhbHVlID09PSAnaG9teScpIHtcclxuICAgICAgaG9teUZvdW5kZWQgPSBoYW5kbGVyU2VhcmNoKGRhdGFEYiwgZGF0YS5tYXhQcmljZSk7XHJcbiAgICAgIGFsbEZvdW5kID0gT2JqZWN0LmFzc2lnbihob215Rm91bmRlZCk7XHJcbiAgICAgIHJlbmRlclNlYXJjaFJlc3VsdHNCbG9jayhhbGxGb3VuZCk7XHJcbiAgICAgIHRvZ2dsZUZhdm9yaXRlSXRlbSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoZWNrZWRJdGVtW2ldLnZhbHVlID09PSAnZmxhdC1yZW50Jykge1xyXG5cclxuICAgICAgY29uc3QgbmV3RmxhdCA9IG5ldyBGbGF0UmVudFNkaztcclxuICAgICAgY29uc3QgZmxhdFJlbnREYXRhID0ge1xyXG4gICAgICAgIGNpdHk6ICfQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQsycsXHJcbiAgICAgICAgY2hlY2tJbkRhdGU6IG5ldyBEYXRlKGZvcm1EYXRhLmdldCgnY2hlY2tpbicpLnRvU3RyaW5nKCkpLFxyXG4gICAgICAgIGNoZWNrT3V0RGF0ZTogbmV3IERhdGUoZm9ybURhdGEuZ2V0KCdjaGVja291dCcpLnRvU3RyaW5nKCkpLFxyXG4gICAgICAgIHByaWNlTGltaXQ6ICtmb3JtRGF0YS5nZXQoJ3ByaWNlJylcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBmb3VuZEZsYXRzID0gbmV3RmxhdC5zZWFyY2goZmxhdFJlbnREYXRhKSBcclxuICAgICAgICAgXHJcbiAgICAgIGZvdW5kRmxhdHMudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGZsYXRSZW50Rm91bmRlZCA9IE9iamVjdC5hc3NpZ24oe30scmVzKTtcclxuICAgICAgICAvL9C/0LXRgNC10LjQvNC10L3QvtCy0LDRgtGMINC60LvRjtGH0Lgg0LIg0L/QvtC70YPRh9C40LLRiNC10LzRgdGPINC+0LHRitC10LrRgtC1XHJcbiAgICAgICAgbGV0IHJlbmFtZWRGbGF0UmVudCA9IE9iamVjdC5lbnRyaWVzKGZsYXRSZW50Rm91bmRlZCkucmVkdWNlKCh1LCBbbiwgdl0pID0+IHtcclxuICAgICAgICAgIHVbYCR7bn1GUnNka2BdID0gdjtcclxuICAgICAgICAgIHJldHVybiB1O1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgICAgICAvL9GB0L7QsdGA0LDRgtGMINC00LLQsCDQvtCx0YrQtdC60YLQsCDQsiDQvtC00LjQvVxyXG4gICAgICAgIGFsbEZvdW5kID0gT2JqZWN0LmFzc2lnbihob215Rm91bmRlZCwgcmVuYW1lZEZsYXRSZW50KTtcclxuICAgICAgICAvL9Cy0YvQt9Cy0LDRgtGMINGA0LXQvdC00LXRgCDRgSDQvtCx0YnQuNC8INC+0LHRitC10LrRgtC+0LxcclxuICAgICAgICByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2soYWxsRm91bmQpO1xyXG4gICAgICAgIHRvZ2dsZUZhdm9yaXRlSXRlbSgpO1xyXG5cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiAgfVxyXG59XHJcbn1cclxuXHJcbmNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xyXG5jb25zdCBkYXRlT3V0ID0gbmV3IERhdGUoZC5nZXRGdWxsWWVhcigpLCBkLmdldE1vbnRoKCkgKyAyLCAwKTtcclxuY29uc3QgZGVmYXVsdERhdGVJbiA9IG5ldyBEYXRlKGQuc2V0RGF0ZShkLmdldERhdGUoKSArIDEpKTtcclxuY29uc3QgZGVmYXVsdERhdGVPdXQgPSBuZXcgRGF0ZShkLnNldERhdGUoZC5nZXREYXRlKCkgKyAzKSk7XHJcblxyXG5mdW5jdGlvbiBmb3JtYXR0ZWREYXRlKGRhdGUpIHtcclxuICByZXR1cm4gW2RhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpICsgMSwgZGF0ZS5nZXREYXRlKCldLm1hcChuID0+IG4gPCAxMCA/IGAwJHtufWAgOiBgJHtufWApLmpvaW4oJy0nKTtcclxufVxyXG5cclxuY29uc3QgdG9kYXkgPSBmb3JtYXR0ZWREYXRlKGQpO1xyXG5jb25zdCBtYXhPdXREYXRlID0gZm9ybWF0dGVkRGF0ZShkYXRlT3V0KTtcclxuY29uc3QgZGVmYXVsdEluID0gZm9ybWF0dGVkRGF0ZShkZWZhdWx0RGF0ZUluKTtcclxuY29uc3QgZGVmYXVsdE91dCA9IGZvcm1hdHRlZERhdGUoZGVmYXVsdERhdGVPdXQpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNlYXJjaEZvcm1CbG9jayAoZGF0ZUluOiBzdHJpbmcgPSBkZWZhdWx0SW4sIGRhdGVPdXQ6IHN0cmluZyA9IGRlZmF1bHRPdXQpIHtcclxuICByZW5kZXJCbG9jayhcclxuICAgICdzZWFyY2gtZm9ybS1ibG9jaycsXHJcbiAgICBgXHJcbiAgICA8Zm9ybSBpZD1cImZvcm1cIj5cclxuICAgICAgPGZpZWxkc2V0IGNsYXNzPVwic2VhcmNoLWZpbGVkc2V0XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNpdHlcIj7Qk9C+0YDQvtC0PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGlkPVwiY2l0eVwiIHR5cGU9XCJ0ZXh0XCIgZGlzYWJsZWQgdmFsdWU9XCLQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQs1wiIC8+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgZGlzYWJsZWQgdmFsdWU9XCI1OS45Mzg2LDMwLjMxNDFcIiAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvdmlkZXJzXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInByb3ZpZGVyXCIgY2xhc3M9XCJzZWxlY3RQcm92aWRlclwiIHZhbHVlPVwiaG9teVwiIGNoZWNrZWQgLz4gSG9teTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInByb3ZpZGVyXCIgY2xhc3M9XCJzZWxlY3RQcm92aWRlclwiIHZhbHVlPVwiZmxhdC1yZW50XCIgLz4gRmxhdFJlbnQ8L2xhYmVsPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrLWluLWRhdGVcIj7QlNCw0YLQsCDQt9Cw0LXQt9C00LA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVjay1pbi1kYXRlXCIgdHlwZT1cImRhdGVcIiB2YWx1ZT1cIiR7ZGF0ZUlufVwiIG1pbj1cIiR7dG9kYXl9XCIgbWF4PVwiJHttYXhPdXREYXRlfVwiIG5hbWU9XCJjaGVja2luXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrLW91dC1kYXRlXCI+0JTQsNGC0LAg0LLRi9C10LfQtNCwPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGlkPVwiY2hlY2stb3V0LWRhdGVcIiB0eXBlPVwiZGF0ZVwiIHZhbHVlPVwiJHtkYXRlT3V0fVwiIG1pbj1cIiR7dG9kYXl9XCIgbWF4PVwiJHttYXhPdXREYXRlfVwiIG5hbWU9XCJjaGVja291dFwiIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJtYXgtcHJpY2VcIj7QnNCw0LrRgS4g0YbQtdC90LAg0YHRg9GC0L7QujwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cIm1heC1wcmljZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJcIiBuYW1lPVwicHJpY2VcIiBjbGFzcz1cIm1heC1wcmljZVwiIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxkaXY+PGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+0J3QsNC50YLQuDwvYnV0dG9uPjwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZmllbGRzZXQ+XHJcbiAgICA8L2Zvcm0+XHJcbiAgICBgXHJcbiAgKVxyXG59XHJcbiJdfQ==