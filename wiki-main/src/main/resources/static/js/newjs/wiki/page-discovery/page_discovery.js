import PageDiscoveryView from './page_discovery_view.js'
import Cookie from './cookie.js'
import Controller from './controller.js'

class PageDiscovery {
    constructor() {
        this.cookie = new Cookie()
        this.controller = new Controller()
        this.pageDiscoveryView = new PageDiscoveryView()
        if (this.cookie.getCookie("categoryId")) {
            this.displayCategoryPages()
        } else if (this.cookie.getCookie("wikiId")) {
            this.displayTopPages()
            this.displayPages()
        }
       
    }

    displayTopPages = () => {
        this.controller.getWikiTopPages(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"))
            .then(response => response.text())
            .then(response => {
                this.pageDiscoveryView.displaySectionList(response, "Top Pages")
            })
    }

    displayCategoryPages = () => {
        this.controller.getCategoryPages(this.cookie.getCookie("categoryId"))
            .then(response => response.text())
            .then(response => {
                this.pageDiscoveryView.displayAlphabeticalCategories(response)
            })
    }

    displayPages = () => {
        this.controller.getWikiPages(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"))
            .then(response => response.text())
            .then(response => {
                this.pageDiscoveryView.displayAlphabeticalCategories(response)
            })
    }


}

const app = new PageDiscovery()