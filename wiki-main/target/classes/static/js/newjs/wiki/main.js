import View from './view.js'
import Cookie from './cookie.js'
import Controller from './controller.js'


class Model {
    constructor() {
            this.cookie = new Cookie()
        if (this.checkIsCookieLoaded("wikiId", this.cookie)) {
            this.view = new View()
            this.controller = new Controller()


            this.token = this.cookie.getCookie("token");
            this.wikiId = this.cookie.getCookie("wikiId")

            this.loadWikiName()
            this.loadWikiImg()

        } else {
            console.error("no wiki id loaded")
        }
       
    }

    loadWikiName() {
        this.getWikiNameFromId(this.cookie.getCookie("wikiId"))
            .then((wikiName) => {
                this.view.wikiName.innerHTML += wikiName
            })
    }

    loadWikiImg() {
        this.getWikiImgFromId(this.cookie.getCookie("wikiId"))
            .then(wikiResponse => {
                this.view.wikiImg.src = URL.createObjectURL(wikiResponse)
                console.log(this.view.wikiImg.src)
            })
    }


    getObjUrl(response) {
        return URL.createObjectURL(response)
    }

    /*
    createWiki(token) {
        this.controller.getNewWiki(token)
            .then(response => response.text())
            .then(response => {
                if (response != undefined) {
                    console.log("newWiki response: " + response)
                    this.cookie.setCookie("wikiId", response, 1);
                    this.wikiId = response
                } else {
                    throw new Error("newWiki response was undefined " + response)
                }
            });
    }
    */



    getWikiNameFromId(id) {
        return this.controller.getWikiName(id)
            .then(response => response.text())
            .then(text => {
                return text
            })
    }
    getWikiImgFromId(id) {
        return this.controller.getWikiImg(id)
            .then(response => response.blob())
            .then(response => {
                return response
        })
    }

    checkIsCookieLoaded(name, cookie) {
        let cookieVal = cookie.getCookie(name)
        let isCookieLoaded = cookieVal != "" && cookieVal != undefined && cookieVal != null
        return isCookieLoaded
    }

}

const app = new Model();