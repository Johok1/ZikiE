import GalleryView from "./gallery_view.js"
import Controller from "./controller.js"
import Cookie from "./cookie.js"

class Gallery {
    constructor() {
        this.galleryView = new GalleryView()
        this.controller = new Controller()
        this.cookie = new Cookie()

        this.loadWikiImages()
        this.loadWikiVideos()
    }

    loadWikiImages = () => {
        this.controller.getWikiImages(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"))

            .then(response => response.text())
            .then(response => {
                let list = response.split(",")
                for (let x = 0; x < list.length; x++) {
                    let filename = list[x]
                    if (filename != "" && filename != undefined && filename != null && filename != "null") {
                        this.controller.getImage(filename)
                            
                            .then(response => response.blob())
                            .then(response => {
                               
                                    let url = URL.createObjectURL(response)
                                    this.galleryView.renderImageUrl(url, this.imageClickHandler, filename)
                                
                            })
                    }
                }
            })
    }

    loadWikiVideos = () => {
        this.controller.getWikiVideos(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"))
           
            .then(response => response.text())
            .then(response => {
                let list = response.split(",")
                for (let x = 0; x < list.length; x++) {
                    let filename = list[x]
                    this.controller.getVideo(filename)
                      
                        .then(response => response.blob())
                        .then(response => {
                            if (response.ok) {
                                let url = URL.createObjectURL(response)
                                this.galleryView.renderVideoUrl(url, this.videoClickHandler, filename)
                            }
                        })
                }
            })
    }


    imageClickHandler = (id) => {
        this.cookie.setCookie("imageContextId", id, 1)
        window.location.href ="wiki-manager-inspect.html"
    }

    videoClickHandler = (id) => {
        this.cookie.setCookie("videoContextId", id, 1)
        window.location.href = "wiki-manager-inspect.html"
    }

}

const gal = new Gallery()