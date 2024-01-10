import DiscoveryView from './discovery_view.js'
import Controller from './controller.js'
import Cookie from './cookie.js'



class Model {
    constructor() {
        this.discoveryView = new DiscoveryView()
        this.controller = new Controller()
        this.cookie = new Cookie()
           

        this.mainState = true 
        this.genreState = false
        this.subGenreState = false
        this.searchTagState = false

        this.initializeViewState()
        this.loadViewFromState()
    }

    loadViewFromState() {
        if (this.mainState) {
            this.loadMainView()
        } else if (this.genreState) {
            this.loadGenreView()
            this.cookie.setCookie("genreId","",1)
        } else if (this.subGenreState) {
            this.loadSubGenreView()
            this.cookie.setCookie("subGenreId", "", 1)
        } else if (this.searchTagState) {
            this.loadSearchTagView()
            this.cookie.setCookie("searchTagId", "", 1)
        } else {
            console.error("no view state set!")
        }
    }

    initializeViewState() {
        if (this.checkIsGenreCookieLoaded()) {
            this.clearViewStates()
            this.genreState = true
        } else if (this.checkIsSubGenreCookieLoaded()) {
            this.clearViewStates()
            this.subGenreState = true
        } else if (this.checkIsSearchCookieLoaded()) {
            this.clearViewStates()
            this.searchTagState = true
        } else {
            this.clearViewStates()
            this.mainState = true
        }
    }
/*
    loadMainView() {
        this.topGenres = this.getTopGenres()
            .then(() => {
                this.genres = this.getGenres()
            }).then(() => {
                this.discoveryView.initMainView(this.topGenres, this.genres)  
            })
    }
    */
    //be sure to add .then after each statement when you hook in the backend again 
    loadMainView() {
        this.topGenres = this.getTopGenres()
        this.genres = this.getGenres()
        this.discoveryView.initMainView(this.topGenres, this.genres)
           
    }
    getTopGenres() {
        return "Top Genre 1*1,Top Genre 2*2,Top Genre 3*3,Top Genre 4*4,Top Genre 5*5"
    }

    getGenres() {
        return "Genre 1*1,Genre 2*2,Genre 3*3,Genre 4*4,Genre 5*5,Benre 6*6,Benre 7*7"
    }

    /*
    getTopGenres() {
        return this.controller.getTopGenres(cookie.getCookie("token"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }

    getGenres() {
        return this.controller.getGenres(cookie.getCookie("token"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }
    */

    /*
    loadGenreView() {
        this.topSubGenres = this.getTopSubGenres()
            .then(() => {
                this.subGenres = this.getSubGenres()
            }).then(() => {
                this.genreName = this.getGenreName()
            }).then(() => {
                this.discoveryView.initSubGenreView(this.topSubGenres, this.topGenres, this.genreName)
            })
    }
    */

    //be sure to add .then after each statement when you hook in the backend again 
    loadGenreView() {
        this.topSubGenres = this.getTopSubGenres()
            this.subGenres = this.getSubGenres()
            this.genreName = this.getGenreName()
            this.discoveryView.initSubGenreView(this.topSubGenres, this.subGenres, this.genreName)
    }

    getGenreName() {
        return "Genre Name"
    }

    getTopSubGenres() {
        return "Top Sub Genre 1*1,Top Sub Genre 2*2,Top Sub Genre 3*3,Top Sub Genre 4*4,Top Sub Genre 5*5"
    }

    getSubGenres() {
        return "Sub Genre 1*1,Sub Genre 2*2,Sub Genre 3*3,Sub Genre 4*4,Sub Genre 5*5"
    }

    /*
    getGenreName() {
        return this.controller.getGenreName(cookie.getCookie("token"), cookie.getCookie("genreId"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }

    getTopSubGenres() {
        return this.controller.getTopGenres(cookie.getCookie("token"), cookie.getCookie("genreId"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }

    getSubGenres() {
        return this.controller.getGenres(cookie.getCookie("token"),cookie.getCookie("genreId"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }
    */

    //be sure to add .then after each statement when you hook in the backend again 
    loadSubGenreView() {
        this.subGenreName = this.getSubGenreNameFromId(0)
        this.subGenreCommList = this.getSubGenreCommunityWikis()
        this.subGenreWikiList = this.getSubGenreWikis()
        this.subGenrePageList = this.getSubGenrePages()
        this.discoveryView.initWikiView(this.subGenreCommList, this.subGenreWikiList, this.subGenrePageList, this.subGenreName)
    }

    getSubGenreNameFromId(id) {
        return "Sub Genre Name"
    }

    getSubGenreCommunityWikis() {
        return "Community Wiki 1*1,Community Wiki 2*2,Community Wiki 3*3"
    }

    getSubGenreWikis() {
        return "Wiki 1*1,Wiki 2*2,Wiki 3*3"
    }

    getSubGenrePages() {
        return "Page 1*1,Page 2*2,Page 3*3" 
    }
    /*

    getSubGenreCommunityWikis() {
        return this.controller.getSubGenreCommunityWikis(cookie.getCookie("token"), cookie.getCookie("subGenreId"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }
    
    getSubGenreWikis() {
        return this.controller.getSubGenreWikis(cookie.getCookie("token"), cookie.getCookie("subGenreId"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }

    getSubGenrePages() {
        return this.controller.getSubGenrePages(cookie.getCookie("token"), cookie.getCookie("subGenreId"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }
    */

    loadSearchTagView() {
         //get community wikis
        //get wikis
        //get pages 
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

    checkIsSearchCookieLoaded() {
        let cookie = this.cookie.getCookie("searchTagId")
        let isCookieLoaded = cookie != "" && cookie != undefined && cookie != null
        return isCookieLoaded
    }

    clearViewStates() {
        this.mainState = false
        this.genreState = false
        this.subGenreState = false
        this.searchTagState = false
    }

}

const app = new Model()