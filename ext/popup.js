const input = document.querySelector("input");
let data;
browser.storage.sync
    .get()
    .then(result => {
        data = result;
    })
    .catch(console.error);
input.addEventListener("input", async e => {
    try {
        const res = await fetch(
            `${data.baseurl || "http://localhost:3000"}/api/search`,
            {
                method: "POST",
                body: JSON.stringify({ search: input.value }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: data.authkey || "?"
                }
            }
        );
        if (!res.ok)
            throw new Error("got back status from server: " + res.status);

        function escapeHtml(unsafe) {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        const results = await res.json();
        document.querySelector("ul").innerHTML = results.body.hits.hits
            .map(hit => hit._source)
            .map(
                hit =>
                    `<li><a href="${encodeURI(hit.url)}">${escapeHtml(
                        hit.title
                    )}</a></li>`
            )
            .join("\n");
    } catch (error) {
        document.querySelector("ul").innerHTML = `<li>${error}</li>`;
    }
});
