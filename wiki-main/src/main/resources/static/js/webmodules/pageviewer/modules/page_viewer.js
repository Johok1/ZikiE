import BackendManager from './backend/backend_manager.js'
import CustomCard from './visuals/custom_card.js'

class PageViewer {
    constructor() {
        this.backendManager = new BackendManager()
        this.cardDiv = document.getElementById("cardContainer")
        this.makePageList()
    }

    makePageList = () => {
        let constructCard = this.constructCard
        this.backendManager.controller.getAccountPageHeaders(this.backendManager.cookie.getCookie("token"))
            .then(response => response.json())
            .then(response => {
                for (let x = 0; x < response.length; x++) {
                   
                    constructCard(response[x].pageName, response[x].pageId)

                }
            })
    }

    constructCard = (pageName, pageId) => {
        let card = new CustomCard(this.cardDiv, pageName, pageId)
        let backendManager = this.backendManager
        card.viewPageLink.addEventListener("click", function{
            backendManager.cookie.setCookie("pageId", pageId)
        })
    }

}

const app = new PageViewer()
