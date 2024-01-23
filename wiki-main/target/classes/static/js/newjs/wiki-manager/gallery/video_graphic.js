export default class Video {
    constructor() {
        this.master = document.createElement("div")
        this.master.classList.add("col-3")
        this.vid = document.createElement("video")
        this.vid.style.height = "20vh";
        this.vid.style.width = "20vw";
        this.master.appendChild(this.vid)
    }

    setVidSrc(src) {
        this.vid.src = src
    }
}