import { renderSearchFormBlock, search } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock } from './user.js';
window.addEventListener('DOMContentLoaded', () => {
    renderUserBlock('Pankratova E', 'my avatar', 2);
    renderSearchFormBlock();
    renderSearchStubBlock();
    search();
    // renderToast(
    //   {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    //   {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
    // )
});
export let dataDb;
fetch('http://localhost:5555/places').then(r => r.json()).then(res => dataDb = res);
// const newFlat = new FlatRentSdk;
// const allFlats = newFlat.get('vnd331') 
// console.log(allFlats)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQ2hFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBQzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFLM0MsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtJQUMvQyxlQUFlLENBQUMsY0FBYyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUMvQyxxQkFBcUIsRUFBRSxDQUFBO0lBQ3ZCLHFCQUFxQixFQUFFLENBQUE7SUFDdkIsTUFBTSxFQUFFLENBQUE7SUFDUixlQUFlO0lBQ2YsMEZBQTBGO0lBQzFGLHlFQUF5RTtJQUN6RSxJQUFJO0FBQ04sQ0FBQyxDQUFDLENBQUE7QUFFRixNQUFNLENBQUMsSUFBSSxNQUFNLENBQUM7QUFDbEIsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ3BGLG1DQUFtQztBQUNuQywwQ0FBMEM7QUFFMUMsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyU2VhcmNoRm9ybUJsb2NrLCBzZWFyY2ggfSBmcm9tICcuL3NlYXJjaC1mb3JtLmpzJ1xuaW1wb3J0IHsgcmVuZGVyU2VhcmNoU3R1YkJsb2NrIH0gZnJvbSAnLi9zZWFyY2gtcmVzdWx0cy5qcydcbmltcG9ydCB7IHJlbmRlclVzZXJCbG9jayB9IGZyb20gJy4vdXNlci5qcydcbmltcG9ydCB7IHJlbmRlclRvYXN0IH0gZnJvbSAnLi9saWIuanMnXG5pbXBvcnQge0ZsYXRSZW50U2RrfSBmcm9tICcuL2ZsYXQtcmVudC1zZGsuanMnXG5cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIHJlbmRlclVzZXJCbG9jaygnUGFua3JhdG92YSBFJywgJ215IGF2YXRhcicsIDIpXG4gIHJlbmRlclNlYXJjaEZvcm1CbG9jaygpXG4gIHJlbmRlclNlYXJjaFN0dWJCbG9jaygpXG4gIHNlYXJjaCgpXG4gIC8vIHJlbmRlclRvYXN0KFxuICAvLyAgIHt0ZXh0OiAn0K3RgtC+INC/0YDQuNC80LXRgCDRg9Cy0LXQtNC+0LzQu9C10L3QuNGPLiDQmNGB0L/QvtC70YzQt9GD0LnRgtC1INC10LPQviDQv9GA0Lgg0L3QtdC+0LHRhdC+0LTQuNC80L7RgdGC0LgnLCB0eXBlOiAnc3VjY2Vzcyd9LFxuICAvLyAgIHtuYW1lOiAn0J/QvtC90Y/QuycsIGhhbmRsZXI6ICgpID0+IHtjb25zb2xlLmxvZygn0KPQstC10LTQvtC80LvQtdC90LjQtSDQt9Cw0LrRgNGL0YLQvicpfX1cbiAgLy8gKVxufSlcblxuZXhwb3J0IGxldCBkYXRhRGI7XG5mZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo1NTU1L3BsYWNlcycpLnRoZW4ociA9PiByLmpzb24oKSkudGhlbihyZXMgPT4gZGF0YURiID0gcmVzKTtcbi8vIGNvbnN0IG5ld0ZsYXQgPSBuZXcgRmxhdFJlbnRTZGs7XG4vLyBjb25zdCBhbGxGbGF0cyA9IG5ld0ZsYXQuZ2V0KCd2bmQzMzEnKSBcblxuLy8gY29uc29sZS5sb2coYWxsRmxhdHMpXG5cblxuXG5cblxuIl19