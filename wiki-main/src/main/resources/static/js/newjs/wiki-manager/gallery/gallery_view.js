import Image from './image_graphic.js'
import Video from './video_graphic.js'

export default class GalleryView {
    constructor() {
        this.imageRow = document.getElementById("imageRow")
        this.videoRow = document.getElementById("videoRow")
    }

    renderImageUrl(url) {
        let image = new Image()
        image.setImgSrc(url)
        this.imageRow.appendChild(image.master)
    }

    renderVideoUrl(url) {
        let video = new Video()
        video.setVidSrc(url)
        this.videoRow.appendChild(video.master)
    }
}