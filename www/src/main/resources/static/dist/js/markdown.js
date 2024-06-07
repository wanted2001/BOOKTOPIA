console.log("List js in");

document.addEventListener("DOMContentLoaded", function() {
    const converter = new showdown.Converter();

    document.querySelectorAll('.commContent').forEach(function(contentElement) {
        const markdownText = contentElement.textContent;
        let htmlContent = converter.makeHtml(markdownText);
        console.log(markdownText)
        console.log(htmlContent);

        function removeMarkdownTags(html) {
            // 제목 태그 제거 (예: <h1>, <h2>, <h3> 등)
            html = html.replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/g, '');

            // 이미지 태그 제거 (예: <img src="...">)
            html = html.replace(/<img[^>]*>/g, '');

            // 링크 태그 제거 (예: <a href="...">)
            html = html.replace(/<a[^>]*>(.*?)<\/a>/g, '$1');

            // 기타 불필요한 태그 제거
            html = html.replace(/<\/?[^>]+(>|$)/g, "");

            return html;
        }

        htmlContent = removeMarkdownTags(htmlContent);
        contentElement.innerHTML = htmlContent;
    });
});