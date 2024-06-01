import FileUtilities from './backend/utils/file_utilities.js'
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
        this.createPageLink.addEventListener("click", this.setPageNameChangeHandler)
    }

    setPageNameChangeHandler = () => {

    
        let name = pageNameInput.value
        let backendManager = this.backendManager
            this.backendManager.controller.createAccountPage(this.backendManager.cookie.getCookie("token"), name)
                .then(response => response.text())
                .then(response => {
                    backendManager.cookie.setCookie("pageId", response)
                    backendManager.controller.postPageImage(backendManager.cookie.getCookie("token"), response, this.imageObjRes)
                        .then(response.ok)
                        .then(() => {
                            window.location.href = "https://www.zinxswiki.com/pageeditor"
                        })
                })
        
    }

    setLogoChangeHandler = () => {
        this.logoInput.addEventListener("change", (e) => {
            let file = e.target.files.item(0)
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

                })

        })
    }

}

const app = new PageWizard()