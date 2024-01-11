import Cookie from './cookie.js'
import Controller from './controller.js'
import DiscoveryView from './discovery_view.js'

class Search {
    constructor() {
        this.cookie = new Cookie()
        this.searchBar = document.getElementById("searchbox")
        this.discoveryView = new DiscoveryView()
        this.controller = new Controller();
        this.attachEnterHandler()
        this.checkState()
        console.log(this.searchBar)
    }

    

    checkState() {
        if (this.checkIsCookieLoaded("search")) {
            this.searchBar.value = this.cookie.getCookie("search")
            
            if (this.checkIsSubGenreCookieLoaded()) {
                this.initSubGenreView()
            } else if (this.checkIsGenreCookieLoaded()) {
                this.initGenreView()
            } else {
                this.initMainView()
            }
        }
    }

    //discovery interface methods 

    initMainView() {
        this.discoveryView.init()

        let search = this.searchBar.value
        this.getAllGenres()
            .then(allGenres => {
                allGenres = this.filterListByEntry(allGenres,search)
                return this.getAllSubGenres()
                    .then(allSubGenres => {
                        allSubGenres = this.filterListByEntry(allSubGenres, search)
                        return this.getAllCommunityWikis()
                            .then(allCommunityWikis => {
                                allCommunityWikis = this.filterListByEntry(allCommunityWikis, search)
                                return this.getAllWikis()
                                    .then(allWikis => {
                                        allWikis = this.filterListByEntry(allWikis, search)
                                        return this.getAllPages()
                                            .then(allPages => {
                                                allPages = this.filterListByEntry(allPages, search)
                                                this.discoveryView.initMainSearch(search, allGenres, allSubGenres, allCommunityWikis, allWikis, allPages)
                                            })
                                    })
                            })
                    })
            })
    }

    initGenreView() {
        let search = this.searchBar.value
        let subGenres = this.filterListByEntry(this.getGenreSubGenres(), search)
        let communityWikis = this.filterListByEntry(this.getGenreCommunityWikis(), search)
        let wikis = this.filterListByEntry(this.getGenreWikis(), search)
        let pages = this.filterListByEntry(this.getGenrePages(), search)

        this.discoveryView.initGenreSearch(search, subGenres, communityWikis, wikis, pages)
    }

    initSubGenreView() {
        let search = this.searchBar.value

        let communityWikis = this.filterListByEntry(this.getSubGenreCommunityWikis(), search)
        let wikis = this.filterListByEntry(this.getSubGenreWikis(), search)
        let pages = this.filterListByEntry(this.getSubGenrePages(), search)

        this.discoveryView.initSubGenre(search, communityWikis, wikis, pages)
    }

   
    //Controller interface methods

    
    getAllGenres() {
        return this.controller.getGenres()
            .then(response => response.text())
            .then(text => {
                return text
            })
    }

    getAllSubGenres() {
        return this.controller.getAllSubGenres()
            .then(response => response.text())
            .then(text => {
                return text
            })
    }

    getAllCommunityWikis() {
        return this.controller.getAllCommunityWikis()
            .then(response => response.text())
            .then(text => {
                return text
            })
    }

    getAllWikis() {
        return this.controller.getAllWikis()
            .then(response => response.text())
            .then(text => {
                return text
            })
    }

    getAllPages() {
        return this.controller.getAllPages()
            .then(response => response.text())
            .then(text => {
                return text
            })
    }

    getGenreSubGenres() {
        return this.controller.getSubGenres(this.cookie.getCookie("genreId"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }

    getGenreCommunityWikis() {
        return this.controller.getSubGenreCommunityWikis(this.cookie.getCookie("genreId"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }

    getGenreWikis() {
        return this.controller.getSubGenreWikis(this.cookie.getCookie("genreId"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }

    getGenrePages() {
        return this.controller.getSubGenrePages(this.cookie.getCookie("genreId"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }

    getSubGenreCommunityWikis() {
        return this.controller.getSubGenreCommunityWikis(this.cookie.getCookie("subGenreId"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }

    getSubGenreWikis() {
        return this.controller.getSubGenreWikis(this.cookie.getCookie("subGenreId"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }

    getSubGenrePages() {
        return this.controller.getSubGenrePages(this.cookie.getCookie("subGenreId"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }



    //utility methods

    filterListByEntry(list, entry) {
        let arrayList = list.split(",")
        let newList = ""
        for (let x = 0; x < arrayList.length; x++) {
            let token = arrayList[x].toLowerCase()
            if (token.includes(entry.toLowerCase())) {
                newList += arrayList[x] + ","
            }
        }
        return newList;
    }


    checkIsGenreCookieLoaded() {
        let cookie = this.cookie.getCookie("genreId")
        let isCookieLoaded = cookie != "" && cookie != undefined && cookie != null
        return isCookieLoaded
    }

    checkIsSubGenreCookieLoaded() {
        let cookie = this.cookie.getCookie("subGenreId")
        let isCookieLoaded = cookie != "" && cookie != undefined && cookie != null
        return isCookieLoaded
    }


    checkIsCookieLoaded(name) {
        let cookie = this.cookie.getCookie(name)
        let isCookieLoaded = cookie != "" && cookie != undefined && cookie != null
        return isCookieLoaded
    }

    attachEnterHandler = () => {
        
        let cookie = this.cookie 
     
        this.searchBar.addEventListener("keypress", function (event) {
            // Check if the key pressed is 'Enter' (key code 13)
            if (event.keyCode === 13 || event.which === 13) {
                const input = this.value;
                cookie.setCookie("search", input, 1)
                window.location.reload()
            }
        })
    }
}

const search = new Search()