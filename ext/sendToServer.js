browser.runtime.sendMessage({
    url: window.location.href,
    content: document.querySelector("body").innerText,
    title: document.title
});
