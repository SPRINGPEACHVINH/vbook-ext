load("config.js");

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (!response.ok) return null;
    let html = response.html();
    // Lấy mangaId từ html (giả sử có dạng "id":123456)
    let mangaIdMatch = /"id":(\d+)/.exec(html);
    if (!mangaIdMatch) return null;
    let mangaId = mangaIdMatch[1];
    let slugMatch = url.match(/\/truyen\/([^\/]+)/);
    if (!slugMatch) return null;
    let slug = slugMatch[1];
    let apiUrl = `${BASE_URL}/truyen/${slug}/ajax/chapters/`;

    let postBody = {
        action: "manga_get_chapters",
        manga: mangaId
    };

    let chapterRes = fetch(apiUrl, {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest"
        },
        body: postBody
    });
    if (!chapterRes.ok) return null;
    let doc = chapterRes.html();
    let chapters = [];
    doc.select("li.wp-manga-chapter a").forEach(e => {
        chapters.push({
            name: e.text(),
            url: e.attr("href"),
            host: BASE_URL
        });
    });
    return Response.success(chapters);
}