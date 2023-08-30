function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let ChannelData = async () => {
    let reqChannel = await fetch(`../data/channel-details.json`);
    let resCh = await reqChannel.json();
    let reqVideos = await fetch(`../data/videos.json`);
    let resV = await reqVideos.json();

    resV.contents = shuffleArray(resV.contents);

    let selection = document.querySelector("#profile-image");
    selection.insertAdjacentHTML("beforeend", /*html*/ `<img class="image" src="${resCh.avatar[0].url}" alt="">`)


    selection = document.querySelector("#videos");
    selection.insertAdjacentHTML("beforeend", /*html*/ `
    ${resV.contents.map((value) => /*html*/ `
        <div class="video-content-cover">
            <div class="video-content">
                <a href="play-video.html?URL=${value.video.videoId}" class="video-box">
                    <img class="image" src="${value.video.thumbnails[0].url}" alt="">
                    <div class="video-btn"><i class="ri-time-line"></i></div>
                    <div class="video-btn"><i class="ri-play-list-2-line"></i></div>
                </a>
                <div class="video-details">
                    <div class="channel-logo">
                        <img class="image" src="${resCh.avatar[0].url}" alt="">
                    </div>
                    <div class="detail">
                        <h3 class="title">${value.video.title}</h3>
                        <div class="channel-name">${resCh.title}</div>
                        <div class="views-upload">
                            <div class="views">${value.video.stats.views} views</div>
                            <div class="upload">${value.video.publishedTimeText}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `).join(" ")}
    `)
}

ChannelData();
videos()