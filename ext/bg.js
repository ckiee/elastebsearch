browser.runtime.onMessage.addListener(notify);
let data;
browser.storage.sync
    .get()
    .then(result => {
        data = result;
    })
    .catch(console.error);
function notify(message) {
    fetch(`${data.baseurl || "http://localhost:3000"}/api/index`, {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
            "Content-Type": "application/json",
            Authorization: data.authkey || "?"
        }
    });
}
