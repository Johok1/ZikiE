import FileUtilities from '../../pageviewer/modules/backend/utils/file_utilities.js'
import BackendManager from './backend/backend_manager.js'

class PageWizard {

    constructor() {
        this.backendManager = new BackendManager()
        this.fileUtilities = new FileUtilities()

        this.createPageLink = document.getElementById("createPageLink")

        this.pageNameInput = document.getElementById("pageNameInput")

        this.logoInput = document.getElementById("logoInput")

        this.pageLogo = document.getElementById("pageLogo")

        this.imageObjRes = null

        this.setLogoChangeHandler()
        this.setPageNameChangeHandler()
    }

    setPageNameChangeHandler = () => {

        this.createPageLink.addEventListener("click", function () {
            let name = pageNameInput.value 
            this.backendManager.controller.createAccountPage(this.backendManager.cookie.getCookie("token"), name)
                .then(response => response.text()).bind(this)
                .then(response => {
                    this.backendManager.cookie.setCookie("pageId", response)
                }).bind(this)
        }).bind(this)
    }

    setLogoChangeHandler = () => {
        this.logoInput.addEventListener("change", (e) => {
            let file = e.dataTransfer.files.item(0)
            this.fileUtilities.processFile(file)
                .then(response => {
                    let url = URL.createObjectURL(response)
                    this.pageLogo.src = url
                    let reader = new FileReader()
                    reader.onload = this.fileUtilities.blobToBase64ReaderOnLoadHandler
                    let base64 = reader.readAsArrayBuffer(response)
                    this.imageObjRes = {
                        "blank": "",
                        "url": base64
                   }
                }).bind(this)

        }).bind(this)
    }

}

const app = new PageWizard()