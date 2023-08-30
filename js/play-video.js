const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get("URL");

let insertData = async (data) => {

    if (data) {
        const selection = document.querySelector("#content-video");
        selection.insertAdjacentHTML("beforeend", /*html*/ `
        <iframe src="https://www.youtube.com/embed/${data}" title="Create A Website Like YouTube Using HTML CSS JS | YouTube Clone Website Design Step By Step" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `)
    } else {
        window.location.href = "index.html";
    }
}

insertData(videoId)