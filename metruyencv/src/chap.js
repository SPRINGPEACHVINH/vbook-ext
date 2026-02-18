load("config.js");

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL)
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let paragraphs = doc.select(".text-left p");
        let content = [];
        for (let i = 0; i < paragraphs.size(); i++) {
            content.push(paragraphs.get(i).text());
        }
        return Response.success(content.join("\n"));
    }
    return null;
}