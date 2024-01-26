import ResourceView from './resource_view.js'
import Cookie from './cookie.js'
import Controller from './controller.js'

class Resource {
    constructor() {
        this.resourceView = new ResourceView()
        this.cookie = new Cookie()
        this.controller = new Controller()
        this.loadCookieResource()
    }

    loadCookieResource() {
        if (this.cookie.getCookie("imageContextId")) {
            let id = this.cookie.getCookie("imageContextId")
            this.loadImageResourceFromContext(id)
            this.loadFileContext(id)
        } else if (this.cookie.getCookie("videoContextId")) {
            let id = this.cookie.getCookie("videoContextId")
            this.loadVideoResourceFromContext(id)
            this.loadFileContext(id)
        }
    }

    loadImageResourceFromContext(contextId) {
        this.controller.getImage(contextId)
            .then(response => response.blob())
            .then(response => {
                this.resourceView.renderImageUrl(response)
            })
     
    }

    loadVideoResourceFromContext(contextId) {
        this.controller.getVideo(contextId)
            .then(response => response.blob())
            .then(response => {
                this.resourceView.renderVideoUrl(response)
            })
    }


    loadFileContext(id) {
        this.controller.getFileContext(id)
            .then(response => response.json())
            .then(data => {
                console.log("file context: " + data)
                this.resourceView.loadProfileName(data.authorUsername)
                this.resourceView.renderProfileImage(URL.createObjectURL(data.authorImage))
                this.loadPageContext(data.pageId)
            })
    }

    loadPageContext(id) {
        let token = this.cookie.getCookie("token")
        this.controller.getPageName(token, id)
            .then(response => response.text())
            .then(response => {
                this.resourceView.loadPageName(response)
                this.controller.getPageStatus(token, id)
                    .then(response => response.text())
                    .then(response => {
                        if (response == "true") {
                            this.resourceView.setPageState(response)
                        } else if (response == "false") {
                            this.resourceView.setPageState(response)
                        }
                        this.resourceView.attachCheckboxHandler(this.checkBoxHandler, this.loadPageContext,token, id)
                    })
            })
    }

    checkBoxHandler = (loadPageContext, token, id) => {
        this.controller.togglePageStatus(token, id)
            .then(response => response.ok)
            .then(() => {
                loadPageContext(id)
            })
    }
}

const app = new Resource()