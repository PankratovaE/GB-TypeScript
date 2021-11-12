export function renderBlock(elementId, html) {
    const element = document.getElementById(elementId);
    if (element)
        element.innerHTML = html;
}
export function renderToast(message, action) {
    let messageText = '';
    if (message != null) {
        messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${(action === null || action === void 0 ? void 0 : action.name) || 'Закрыть'}</button>
      </div>
    `;
    }
    renderBlock('toast-block', messageText);
    const button = document.getElementById('toast-main-action');
    if (button != null) {
        button.onclick = function () {
            if (action != null && action.handler != null) {
                action.handler();
            }
            renderToast(null);
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFVBQVUsV0FBVyxDQUFFLFNBQWlCLEVBQUUsSUFBWTtJQUMxRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ2xELElBQUksT0FBTztRQUNYLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO0FBQzFCLENBQUM7QUFTRCxNQUFNLFVBQVUsV0FBVyxDQUFFLE9BQXVCLEVBQUUsTUFBZTtJQUNuRSxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUE7SUFFcEIsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ25CLFdBQVcsR0FBRzsrQ0FDNkIsT0FBTyxDQUFDLElBQUk7YUFDOUMsT0FBTyxDQUFDLElBQUk7eUNBQ2dCLENBQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLElBQUksS0FBSSxTQUFTOztLQUU3RCxDQUFBO0tBQ0Y7SUFFRCxXQUFXLENBQ1QsYUFBYSxFQUNiLFdBQVcsQ0FDWixDQUFBO0lBRUQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0lBQzNELElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtRQUNsQixNQUFNLENBQUMsT0FBTyxHQUFHO1lBQ2YsSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO2dCQUM1QyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7YUFDakI7WUFDRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbkIsQ0FBQyxDQUFBO0tBQ0Y7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckJsb2NrIChlbGVtZW50SWQ6IHN0cmluZywgaHRtbDogc3RyaW5nKSB7XHJcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZClcclxuICBpZiAoZWxlbWVudClcclxuICBlbGVtZW50LmlubmVySFRNTCA9IGh0bWxcclxufVxyXG5pbnRlcmZhY2UgTWVzc2FnZSB7XHJcbiAgdGV4dDogc3RyaW5nLCBcclxuICB0eXBlOiBzdHJpbmdcclxufVxyXG5pbnRlcmZhY2UgQWN0aW9uIHtcclxuICBuYW1lOiBzdHJpbmcsIFxyXG4gIGhhbmRsZXIoKTogdm9pZFxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJUb2FzdCAobWVzc2FnZTogTWVzc2FnZSB8IG51bGwsIGFjdGlvbj86IEFjdGlvbikge1xyXG4gIGxldCBtZXNzYWdlVGV4dCA9ICcnXHJcbiAgXHJcbiAgaWYgKG1lc3NhZ2UgIT0gbnVsbCkge1xyXG4gICAgbWVzc2FnZVRleHQgPSBgXHJcbiAgICAgIDxkaXYgaWQ9XCJpbmZvLWJsb2NrXCIgY2xhc3M9XCJpbmZvLWJsb2NrICR7bWVzc2FnZS50eXBlfVwiPlxyXG4gICAgICAgIDxwPiR7bWVzc2FnZS50ZXh0fTwvcD5cclxuICAgICAgICA8YnV0dG9uIGlkPVwidG9hc3QtbWFpbi1hY3Rpb25cIj4ke2FjdGlvbj8ubmFtZSB8fCAn0JfQsNC60YDRi9GC0YwnfTwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIGBcclxuICB9XHJcbiAgXHJcbiAgcmVuZGVyQmxvY2soXHJcbiAgICAndG9hc3QtYmxvY2snLFxyXG4gICAgbWVzc2FnZVRleHRcclxuICApXHJcblxyXG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2FzdC1tYWluLWFjdGlvbicpXHJcbiAgaWYgKGJ1dHRvbiAhPSBudWxsKSB7XHJcbiAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoYWN0aW9uICE9IG51bGwgJiYgYWN0aW9uLmhhbmRsZXIgIT0gbnVsbCkge1xyXG4gICAgICAgIGFjdGlvbi5oYW5kbGVyKClcclxuICAgICAgfVxyXG4gICAgICByZW5kZXJUb2FzdChudWxsKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=