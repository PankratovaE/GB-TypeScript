import { renderBlock } from './lib.js';
import { renderSearchResultsBlock, toggleFavoriteItem } from './search-results.js';
import { factory } from './store/domain/class-factory.js';
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
            let item = checkboxes[i];
            if (item.checked) {
                checkedProviders.push(item.value);
            }
        }
        const data = {
            city: 'Санкт-Петербург',
            checkInDate: new Date(formData.get('checkin').toString()),
            checkOutDate: new Date(formData.get('checkout').toString()),
            priceLimit: +formData.get('price')
        };
        // при отправке формы проверяем выбран ли провыйдер
        if (!checkedProviders.length) { // если нет, то выбрать
            console.log('Choose provider and submit again.');
        }
        else {
            const providers = checkedProviders.map(name => factory(name));
            Promise.all(providers.map(provider => {
                if (provider)
                    provider.search(data);
            })).then((result) => {
                const allResults = [].concat(...result);
                renderSearchResultsBlock(allResults);
                toggleFavoriteItem();
            });
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
    `);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN0QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQTtBQUdsRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUNBQWlDLENBQUE7QUFFekQsTUFBTSxVQUFVLE1BQU07SUFDcEIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXRELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNwQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsSUFBSSxRQUFRLEdBQWUsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFOUMsbUJBQW1CO1FBQ25CLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLDRCQUE0QjtRQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFxQixDQUFBO1lBQzVDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNuQztTQUNGO1FBRUQsTUFBTSxJQUFJLEdBQW1CO1lBQzNCLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsV0FBVyxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEs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ckJsb2NrIH0gZnJvbSAnLi9saWIuanMnXHJcbmltcG9ydCB7IHJlbmRlclNlYXJjaFJlc3VsdHNCbG9jaywgdG9nZ2xlRmF2b3JpdGVJdGVtIH0gZnJvbSAnLi9zZWFyY2gtcmVzdWx0cy5qcydcclxuaW1wb3J0IHsgUGxhY2UgfSBmcm9tICcuL3N0b3JlL2RvbWFpbi9wbGFjZS5qcydcclxuaW1wb3J0IHsgU2VhcmNoRm9ybURhdGEgfSBmcm9tICcuL3N0b3JlL2RvbWFpbi9zZWFyY2gtZm9ybS1kYXRhLmpzJ1xyXG5pbXBvcnQgeyBmYWN0b3J5IH0gZnJvbSAnLi9zdG9yZS9kb21haW4vY2xhc3MtZmFjdG9yeS5qcydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2goKTogdm9pZCB7XHJcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb3JtJylbMF07XHJcbiAgXHJcbiAgZm9ybS5vbnN1Ym1pdCA9IChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgZm9ybURhdGE6IGFueSB8IG51bGwgPSBuZXcgRm9ybURhdGEoZm9ybSk7XHJcblxyXG4gICAgLy/Qv9C+0LvRg9GH0LjRgtGMINGH0LXQutCx0L7QutGB0YtcclxuICAgIGNvbnN0IGNoZWNrYm94ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3RQcm92aWRlcicpO1xyXG4gICAgY29uc3QgY2hlY2tlZFByb3ZpZGVycyA9IFtdO1xyXG4gICAgLy/QstGL0LHRgNCw0L3QvdGL0LUg0YHQu9C+0LbQuNGC0Ywg0LIg0LzQsNGB0YHQuNCyXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoZWNrYm94ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IGl0ZW0gPSBjaGVja2JveGVzW2ldIGFzIEhUTUxJbnB1dEVsZW1lbnRcclxuICAgICAgaWYgKGl0ZW0uY2hlY2tlZCkge1xyXG4gICAgICAgIGNoZWNrZWRQcm92aWRlcnMucHVzaChpdGVtLnZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGE6IFNlYXJjaEZvcm1EYXRhID0ge1xyXG4gICAgICBjaXR5OiAn0KHQsNC90LrRgi3Qn9C10YLQtdGA0LHRg9GA0LMnLFxyXG4gICAgICBjaGVja0luRGF0ZTogbmV3IERhdGUoZm9ybURhdGEuZ2V0KCdjaGVja2luJykudG9TdHJpbmcoKSksXHJcbiAgICAgIGNoZWNrT3V0RGF0ZTogbmV3IERhdGUoZm9ybURhdGEuZ2V0KCdjaGVja291dCcpLnRvU3RyaW5nKCkpLFxyXG4gICAgICBwcmljZUxpbWl0OiArZm9ybURhdGEuZ2V0KCdwcmljZScpXHJcbiAgICB9XHJcbiAgLy8g0L/RgNC4INC+0YLQv9GA0LDQstC60LUg0YTQvtGA0LzRiyDQv9GA0L7QstC10YDRj9C10Lwg0LLRi9Cx0YDQsNC9INC70Lgg0L/RgNC+0LLRi9C50LTQtdGAXHJcbiAgaWYgKCFjaGVja2VkUHJvdmlkZXJzLmxlbmd0aCkgeyAvLyDQtdGB0LvQuCDQvdC10YIsINGC0L4g0LLRi9Cx0YDQsNGC0YxcclxuICAgIGNvbnNvbGUubG9nKCdDaG9vc2UgcHJvdmlkZXIgYW5kIHN1Ym1pdCBhZ2Fpbi4nKTtcclxuICB9IGVsc2Uge1xyXG5cclxuICAgIGNvbnN0IHByb3ZpZGVycyA9IGNoZWNrZWRQcm92aWRlcnMubWFwKG5hbWUgPT4gZmFjdG9yeShuYW1lKSk7XHJcblxyXG4gICAgICBQcm9taXNlLmFsbChcclxuICAgICAgICBwcm92aWRlcnMubWFwKHByb3ZpZGVyID0+IHtcclxuICAgICAgICAgIGlmIChwcm92aWRlcilcclxuICAgICAgICAgIHByb3ZpZGVyLnNlYXJjaChkYXRhKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgKS50aGVuKChyZXN1bHQpID0+IHtcclxuXHJcbiAgICAgIGNvbnN0IGFsbFJlc3VsdHM6IFBsYWNlW10gPSAoW10gYXMgYW55W10pLmNvbmNhdCguLi5yZXN1bHQpXHJcbiAgICAgIHJlbmRlclNlYXJjaFJlc3VsdHNCbG9jayhhbGxSZXN1bHRzKTtcclxuICAgICAgdG9nZ2xlRmF2b3JpdGVJdGVtKCk7XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG59XHJcblxyXG5jb25zdCBkID0gbmV3IERhdGUoKTtcclxuY29uc3QgZGF0ZU91dCA9IG5ldyBEYXRlKGQuZ2V0RnVsbFllYXIoKSwgZC5nZXRNb250aCgpICsgMiwgMCk7XHJcbmNvbnN0IGRlZmF1bHREYXRlSW4gPSBuZXcgRGF0ZShkLnNldERhdGUoZC5nZXREYXRlKCkgKyAxKSk7XHJcbmNvbnN0IGRlZmF1bHREYXRlT3V0ID0gbmV3IERhdGUoZC5zZXREYXRlKGQuZ2V0RGF0ZSgpICsgMykpO1xyXG5cclxuZnVuY3Rpb24gZm9ybWF0dGVkRGF0ZShkYXRlOiBEYXRlKSB7XHJcbiAgcmV0dXJuIFtkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSArIDEsIGRhdGUuZ2V0RGF0ZSgpXS5tYXAobiA9PiBuIDwgMTAgPyBgMCR7bn1gIDogYCR7bn1gKS5qb2luKCctJyk7XHJcbn1cclxuXHJcbmNvbnN0IHRvZGF5ID0gZm9ybWF0dGVkRGF0ZShkKTtcclxuY29uc3QgbWF4T3V0RGF0ZSA9IGZvcm1hdHRlZERhdGUoZGF0ZU91dCk7XHJcbmNvbnN0IGRlZmF1bHRJbiA9IGZvcm1hdHRlZERhdGUoZGVmYXVsdERhdGVJbik7XHJcbmNvbnN0IGRlZmF1bHRPdXQgPSBmb3JtYXR0ZWREYXRlKGRlZmF1bHREYXRlT3V0KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hGb3JtQmxvY2sgKGRhdGVJbjogc3RyaW5nID0gZGVmYXVsdEluLCBkYXRlT3V0OiBzdHJpbmcgPSBkZWZhdWx0T3V0KSB7XHJcbiAgcmVuZGVyQmxvY2soXHJcbiAgICAnc2VhcmNoLWZvcm0tYmxvY2snLFxyXG4gICAgYFxyXG4gICAgPGZvcm0gaWQ9XCJmb3JtXCI+XHJcbiAgICAgIDxmaWVsZHNldCBjbGFzcz1cInNlYXJjaC1maWxlZHNldFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaXR5XCI+0JPQvtGA0L7QtDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNpdHlcIiB0eXBlPVwidGV4dFwiIGRpc2FibGVkIHZhbHVlPVwi0KHQsNC90LrRgi3Qn9C10YLQtdGA0LHRg9GA0LNcIiAvPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGRpc2FibGVkIHZhbHVlPVwiNTkuOTM4NiwzMC4zMTQxXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInByb3ZpZGVyc1wiPlxyXG4gICAgICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJwcm92aWRlclwiIGNsYXNzPVwic2VsZWN0UHJvdmlkZXJcIiB2YWx1ZT1cIkhvbXlQcm92aWRlclwiIGNoZWNrZWQgLz4gSG9teTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInByb3ZpZGVyXCIgY2xhc3M9XCJzZWxlY3RQcm92aWRlclwiIHZhbHVlPVwiRmxhdFJlbnRTZGtcIiAvPiBGbGF0UmVudDwvbGFiZWw+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2hlY2staW4tZGF0ZVwiPtCU0LDRgtCwINC30LDQtdC30LTQsDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNoZWNrLWluLWRhdGVcIiB0eXBlPVwiZGF0ZVwiIHZhbHVlPVwiJHtkYXRlSW59XCIgbWluPVwiJHt0b2RheX1cIiBtYXg9XCIke21heE91dERhdGV9XCIgbmFtZT1cImNoZWNraW5cIiAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2hlY2stb3V0LWRhdGVcIj7QlNCw0YLQsCDQstGL0LXQt9C00LA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVjay1vdXQtZGF0ZVwiIHR5cGU9XCJkYXRlXCIgdmFsdWU9XCIke2RhdGVPdXR9XCIgbWluPVwiJHt0b2RheX1cIiBtYXg9XCIke21heE91dERhdGV9XCIgbmFtZT1cImNoZWNrb3V0XCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIm1heC1wcmljZVwiPtCc0LDQutGBLiDRhtC10L3QsCDRgdGD0YLQvtC6PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGlkPVwibWF4LXByaWNlXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiIG5hbWU9XCJwcmljZVwiIGNsYXNzPVwibWF4LXByaWNlXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGRpdj48YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj7QndCw0LnRgtC4PC9idXR0b24+PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9maWVsZHNldD5cclxuICAgIDwvZm9ybT5cclxuICAgIGBcclxuICApXHJcbn0iXX0=