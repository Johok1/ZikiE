import ProfileView from './profile_view.js'
import Cookie from './cookie.js'
import Controller from './controller.js'

class Profile {
    constructor() {
        this.view = new ProfileView();
        this.cookie = new Cookie();
        this.controller = new Controller()

        this.attachHandlersToView()
    }

    attachHandlersToView = () => {
        this.view.attachImgInputHandler(this.handleImgInputChange)
        this.view.attachSubmitClickHandler(this.handleClickWikiSubmitBtn)
    }

    handleClickWikiSubmitBtn = () => {
        console.log("handleClickWikiSubmitBtn")
        this.controller.setWikiName(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"), this.view.getInputText())
            .then(response => response.ok)
            .then(() => {
                this.view.setWikiNameToInput()
            })
       
    }

    handleImgInputChange = () => {
        console.log("handleImgInputChange")
        this.controller.setWikiImg(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"), this.view.getInputImageForm)
            .then(response => response.ok)
            .then(() => {
                this.view.setWikiLogoToInput()
            })
       
    }
}

const profile = new Profile()