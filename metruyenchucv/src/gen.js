load("config.js");
function execute(url, page) {
    let response = fetch(BASE_URL);
    if (!response.ok) return null;
    let doc = response.html();
    let novelList = [];
    doc.select(".page-listing-item").forEach(e => {
        let name = e.select(".post-title a, h3 a").text();
        let link = e.select(".post-title a, h3 a").attr("href");
        let cover = e.select("img").attr("src");
        let author = e.select(".author a").text();
        let description = e.select(".post-content, .item-summary").text();
        if (name && link) {
            novelList.push({
                name: name,
                link: link,
                cover: cover,
                author: author,
                description: description,
                host: BASE_URL
            });
        }
    });
    return Response.success(novelList);
}