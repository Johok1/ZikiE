import CategoryDiscoveryView from './category_discovery_view.js'
import Cookie from './cookie.js'
import Controller from './controller.js'

class CategoryDiscovery {
    constructor() {
        this.cookie = new Cookie()
        this.controller = new Controller()
        this.categoryDiscoveryView = new CategoryDiscoveryView()
        this.displayTopCategories()
        this.displayCategories()
    }

    displayTopCategories = () => {
        this.controller.getWikiTopCategories(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"))
            .then(response => response.text())
            .then(response => {
                this.categoryDiscoveryView.displaySectionList(response, "Top Categories")
            })
    }

    displayCategories = () => {
        this.controller.getWikiCategories(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"))
            .then(response => response.text())
            .then(response => {
                this.categoryDiscoveryView.displayAlphabeticalCategories(response)
            })
    }

}

const app = new CategoryDiscovery()
