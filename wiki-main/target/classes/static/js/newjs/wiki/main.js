import View from './view.js'
import Cookie from './cookie.js'
import Controller from './controller.js'


class Model {
    constructor() {
     
        if (this.checkIsCookieLoaded("wikiId")) {
            this.view = new View()
            this.controller = new Controller()

            this.cookie = new Cookie()
            this.token = this.cookie.getCookie("token");
            this.wikiId = this.cookie.getCookie("wikiId")

            this.loadWikiName()
            this.loadWikiImg()

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
            .then((wikiResponse) => {
                this.view.wikiImg.src = this.getObjUrl(wikiResponse)
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
            .then(response => response.text())
            .then(text => {
                return text
        })
    }

    checkIsCookieLoaded(name) {
        let cookie = this.cookie.getCookie(name)
        let isCookieLoaded = cookie != "" && cookie != undefined && cookie != null
        return isCookieLoaded
    }

}

const app = new Model();