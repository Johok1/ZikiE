import GalleryView from "./gallery_view.js"
import Controller from "./controller.js"
import Cookie from "./cookie.js"

class Gallery {
    constructor() {
        this.galleryView = new GalleryView()
        this.controller = new Controller()
        this.cookie = new Cookie()

        this.loadWikiImages()
    }

    loadWikiImages() {
        this.controller.getWikiImages(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"))
            .then(response => response.text())
            .then(response => {
                let list = response.split(",")
                for (let x = 0; x < list.length; x++) {
                    let filename = list[x]
                    if (filename != "") {
                        this.controller.getImage(filename)
                            .then(response => response.blob())
                            .then(response => {
                                let url = URL.createObjectURL(response)
                                this.galleryView.renderImageUrl(url)
                            })
                    }
                }
            })
    }

    loadWikiVideos() {
        this.controller.getWikiVideos(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"))
            .then(response => response.text())
            .then(response => {
                let list = response.split(",")
                for (let x = 0; x < list.length; x++) {
                    let filename = list[x]
                    this.controller.getVideo(filename)
                        .then(response => response.blob())
                        .then(response => {
                            let url = URL.createObjectURL(response)
                            this.galleryView.renderVideoUrl(url)
                        })
                }
            })
    }
    
}

const gal = new Gallery()