import FileUtilities from "../../pageviewer/modules/backend/utils/file_utilities.js"
import BackendManager from "./backend/backend_manager.js"

class PageSettings {
    constructor() {
        this.backendManager = new BackendManager()
        this.fileUtilities = new FileUtilities()

        this.pageNameInput = document.getElementById("pageNameInput")
        this.updatePageBtn = document.getElementById("updatePageBtn")
        this.pageLogoDisplay = document.getElementById("pageLogoDisplay")
        this.pageLogoInput = document.getElementById("pageLogoInput")
        this.attachChangePageLogoHandler()
        this.attachUpdatePageHandler()
    }

    attachUpdatePageHandler = () => {
        let token = this.backendManager.cookie.getCookie("token")
        let pageId = this.backendManager.cookie.getCookie("pageId")
        this.updatePageBtn.addEventListener("click", ()=> {
            if (this.pageNameInput.value != "") {
                let name = pageNameInput.value
                this.backendManager.controller.postPageName(token, pageId, name)
                    .then(response => {
                        console.log(response)
                    })
            }

        })
    }

    attachChangePageLogoHandler = () => {
        let fileUtilities = this.fileUtilities
        let profilePicture = this.pageLogoDisplay
        let backendManager = this.backendManager
        this.pageLogoInput.addEventListener("change", (e) => {
            let file = e.target.files.item(0)
           
            fileUtilities.processFile(file)
                .then(response => {
                    let url = URL.createObjectURL(response)
                    profilePicture.src = url;

                    let reader = new FileReader()
                    reader.onload = fileUtilities.blobToBase64ReaderOnLoadHandler

                    let base64String = reader.readAsArrayBuffer(response)
                    let imageUrlRequest = {
                        "blank": "",
                        "url": base64String
                    }
                    let token = backendManager.cookie.getCookie("token")
                    let pageId = backendManager.cookie.getCookie("pageId")
                    backendManager.controller.postPageImage(token, pageId, imageUrlRequest)
                        .then(response => {
                            console.log(response)
                        })
                })
                
        })

    }
} 

const app = new PageSettings()