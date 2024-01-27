import Image from './image_graphic.js'
import Video from './video_graphic.js'

export default class GalleryView {
    constructor() {
        this.imageRow = document.getElementById("imageRow")
        this.videoRow = document.getElementById("videoRow")
    }

    renderImageUrl = (url, handler, id) => {
        let image = new Image()
        image.setImgSrc(url)
        image.attachClickHandler(handler, id)
        this.imageRow.appendChild(image.master)
       
    }

    renderVideoUrl = (url, handler, id) => {
        let video = new Video()
        video.setVidSrc(url)
        video.attachClickHandler(handler, id)
        this.videoRow.appendChild(video.master)
        
    }
}