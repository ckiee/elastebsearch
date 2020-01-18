browser.storage.sync
    .get()
    .then(result => {
        document.getElementById("base-url").value =
            result.baseurl || "http://localhost:3000";
        document.getElementById("auth-key").value = result.authkey || "?";
    })
    .catch(console.error);
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    browser.storage.sync.set({
        authkey: document.getElementById("auth-key").value,
        baseurl: document.getElementById("base-url").value
    });
});
