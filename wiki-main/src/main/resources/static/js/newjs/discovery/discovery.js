import DiscoveryView from './discovery_view.js'
import Controller from './controller.js'
import Cookie from './cookie.js'



class Model {
    constructor() {
        this.discoveryView = new DiscoveryView()
        this.controller = new Controller()
        this.cookie = new Cookie()
        this.discoveryView.init()

        this.mainState = true 
        this.genreState = false
        this.subGenreState = false
        this.searchTagState = false

        this.initializeViewState()
        this.loadViewFromState()

        
    }

    loadViewFromState() {
        if (this.subGenreState) {
            this.loadSubGenreView()
        } else if (this.genreState) {
            this.loadGenreView()

        } else if (this.mainState) {
            this.loadMainView()
    
        } else {
            console.error("no view state set!")
        }
    }

    initializeViewState() {
         if (this.checkIsSubGenreCookieLoaded()) {
            this.clearViewStates()
            this.subGenreState = true
        } else if (this.checkIsGenreCookieLoaded()) {
            this.clearViewStates()
            this.genreState = true
        }else {
            this.clearViewStates()
            this.mainState = true
        }
    }

    loadMainView() {
        this.getTopGenres()
            .then(topGenres => {
                return this.getGenres()
                    .then(genres => {
                        this.discoveryView.initMainView(topGenres, genres);
                    });
            })
            .catch(error => {
                console.error('Error in loadMainView:', error);
            });
    }
   
    /*
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
    */
    
    getTopGenres() {
        return this.controller.getTopGenres()
            .then(response => response.text())
            .then(text => {
                return text
            })
    }

    getGenres() {
        return this.controller.getGenres()
            .then(response => response.text())
            .then(text => {
                return text
            })
    }
    

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
        this.getTopSubGenres()
            .then((topSubGenres) => {
                return this.getSubGenres()
                    .then((subGenres) => {
                        return this.getGenreName()
                            .then((genreName) => {
                                this.discoveryView.initSubGenreView(topSubGenres, subGenres, genreName)
                            })
                    })
            })
    }

    /*
    getGenreName() {
        return "Genre Name"
    }

    getTopSubGenres() {
        return "Top Sub Genre 1*1,Top Sub Genre 2*2,Top Sub Genre 3*3,Top Sub Genre 4*4,Top Sub Genre 5*5"
    }

    getSubGenres() {
        return "Sub Genre 1*1,Sub Genre 2*2,Sub Genre 3*3,Sub Genre 4*4,Sub Genre 5*5"
    }
    */
    
    getGenreName() {
        return this.controller.getGenreName(this.cookie.getCookie("genreId"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }

    getTopSubGenres() {
        return this.controller.getTopSubGenres(this.cookie.getCookie("genreId"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }

    getSubGenres() {
        return this.controller.getSubGenres(this.cookie.getCookie("genreId"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }
    

    //be sure to add .then after each statement when you hook in the backend again 
    loadSubGenreView() {
        this.getSubGenreName()
            .then((subGenreName) => {
                return this.getSubGenreCommunityWikis()
                    .then((subGenreCommList) => {
                        return this.getSubGenreWikis()
                            .then((subGenreWikiList) => {
                                return this.getSubGenrePages()
                                    .then((subGenrePageList) => {
                                        this.discoveryView.initWikiView(subGenreCommList, subGenreWikiList, subGenrePageList, subGenreName)
                                    })
                            })
                    })
            })
            
           
           
    }


    getSubGenreName() {
        return this.controller.getSubGenreName(this.cookie.getCookie("subGenreId"))
            .then(response => response.text())
            .then(response => {
                return response
            })
    }

    /*
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
    */

    

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