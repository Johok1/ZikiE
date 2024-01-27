export default class Video {
    constructor() {
        this.master = document.createElement("div")

        this.vid = document.createElement("video")
        this.vid.style.height = "20vh";
        this.vid.style.width = "20vw";
        this.master.appendChild(this.vid)
    }

    attachClickHandler (handler, id){
        this.master.addEventListener("click", function () {
            handler(id)
        })
    }


    setVidSrc(src) {
        this.vid.src = src
    }
}