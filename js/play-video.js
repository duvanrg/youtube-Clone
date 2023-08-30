const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get("URL");
let resDataVideo = null;

const url = `https://youtube138.p.rapidapi.com/video/details/?id=${videoId}&hl=en&gl=US`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '04d10ecdc5msh4b532459d726b25p18321djsn81474e7848e5',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let insertData = async (data) => {
    try {
		const response = await fetch(url, options);
		resDataVideo = await response.json();
        console.log(resDataVideo);

	} catch (error) {
        console.error(error);
	}
    
    let reqChannel = await fetch(`../data/channel-details.json`);
    let resChannel = await reqChannel.json();
    let reqVideos = await fetch(`../data/videos.json`);
    let resVideos = await reqVideos.json();

    const info = resVideos.contents.find(item => item.video.videoId === data);

    if (data) {
        const selection = document.querySelector("#content-video");
        selection.insertAdjacentHTML("beforeend", /*html*/ `
            <div class="video">
                <iframe src="https://www.youtube.com/embed/${data}" title="${info.video.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div class="tags">
                <a href="#">#Coding</a>
                <a href="#">#HTML</a>
                <a href="#">#CSS</a>
                <a href="#">#JavaScript</a>
            </div>
            <h3>${info.video.title}</h3>
            <div class="play-video-info">
                <p>${resDataVideo.stats.views} Views - ${info.video.publishedTimeText}</p>
                <div>
                    <a href="#"><i class="ri-thumb-up-line">${resDataVideo.stats.likes}</i></a>
                    <a href="#"><i class="ri-thumb-down-line"></i></a>
                    <a href="#"><i class="ri-share-forward-fill">Share</i></a>
                    <a href="#"><i class="ri-download-line">Download</i></a>
                    <a href="#"><i class="ri-heart-3-line">Thanks</i></a>
                    <!-- <a href="#"><i class="ri-scissors-cut-line">Cut</i></a>
                    <a href="#"><i class="ri-play-list-add-fill">Add</i></a>
                    <a href="#"><i class="ri-flag-line">Report</i></a> -->
                </div>
            </div>
            <hr>
            <div class="publisher">
                <img src="${resChannel.avatar[0].url}" alt="">
                <div>
                    <p>${resChannel.title}</p>
                    <span>${resChannel.stats.subscribersText}</span>
                </div>
                <button type="button">Subscribe</button>
            </div>
            <div class="vid-description">
                <p>${resDataVideo.description}</p>
                <p>${resDataVideo.category}</p>
                <hr>
                <h4> 134 comments</h4>
                <div class="add-comment">
                    <img src="images/cwv.png" alt="">
                    <input type="text" placeholder="Write comments...">
                </div>
                <div class="old-comment">
                    <img src="images/cwv.png" alt="">
                    <div>
                        <h3>duvanrg <span>2 days ago</span></h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam reiciendis, obcaecati
                            aliquam officia perspiciatis soluta ex eius molestias dolor vel.</p>
                        <div class="acomment-action">
                            <i class="ri-thumb-up-line"></i>
                            <span>244</span>
                            <i class="ri-thumb-down-line"></i>
                            <span>REPLY</span>
                            <a href="#">All Replies</a>
                        </div>
                    </div>
                </div>
            </div>
    `)
    } else {
        window.location.href = "index.html";
    }
}

let insertVideos = async () => {
    let reqChannel = await fetch(`../data/channel-details.json`);
    let resCh = await reqChannel.json();
    let reqVideos = await fetch(`../data/videos.json`);
    let resV = await reqVideos.json();

    resV.contents = shuffleArray(resV.contents);

    let selection = document.querySelector("#rigth-videos");
    selection.insertAdjacentHTML("beforeend", /*html*/ `
    ${resV.contents.map((value) => /*html */`
        <div class="side-video-list">
            <a href="play-video.html?URL=${value.video.videoId}" class="small-thumbnail"><img src="${value.video.thumbnails[0].url}"></a>
            <div class="vid-info">
                <a href="#">${value.video.title}</a>
                <p>${resCh.title}</p>
                <p>${value.video.stats.views}</p>
            </div>
        </div>
        `).join(" ")}
    `)
}

insertData(videoId);
insertVideos();