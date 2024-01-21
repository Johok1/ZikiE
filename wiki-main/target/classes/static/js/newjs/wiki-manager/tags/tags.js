import TagView from './tag_view.js'
import Cookie from './cookie.js'
import Controller from './controller.js'
import Search from './search.js'
import SearchView from './search_view.js'

class Tags {
    constructor() {
        this.tagView = new TagView()
        this.cookie = new Cookie()
    

        this.searchView = new SearchView()

        this.genreSearchList = ""
        this.tagSearchList = ""
        this.categorySearchList = ""

        this.initView()
        this.initSearchInputHandlers()


        this.controller = new Controller()
    
    }

    
    renderTagList(creator, list) {
        let listAr = list.split(",")
        for (let x = 0; x < listAr.length; x++) {
            if (listAr[x] != "") {
                creator(listAr[x])
            }
        }
    }


    //search methods

    initView = () => {

        //init internal search list
        this.loadGenreSearchList()
        this.loadTagSearchList()
               //this.loadCategorySearchList()

        //render internal search list
        this.renderGenreSearchList()
        this.renderTagSearchList()
               //this.renderCategorySearchList()

        //init tags
        this.loadCategoryTagList()
        this.loadGenreTagList()
        this.loadSearchTagTagList()
    }

    initSearchInputHandlers = () => {
        this.searchView.attachGenreInputKeypressHandler(this.genreSearchInputHandler)
        this.searchView.attachTagInputKeypressHandler(this.tagSearchInputHandler)
        this.searchView.attachCategoryInputKeypressHandler(this.categorySearchInputHandler)
    }

    //render lists from stores variables

    renderGenreSearchList = () => {
        this.searchView.renderGenreSearchList(this.genreSearchList, this.genreSearchResultHandler)
    }

    renderTagSearchList = () => {
        this.searchView.renderTagSearchList(this.tagSearchList, this.tagSearchResultHandler)
    }

    renderCategorySearchList = () => {
        this.searchView.renderCategorySearchList(this.categorySearchList, this.categorySearchResultHandler)
    }

    //filter function

    filterSearchListByEntry = (list, entry) => {
        let listAr = list.split(",")
        let newList = ""
        for (let x = 0; x < listAr.length; x++) {
            let name = listAr[x].split("*")[1]
            if (name.toLowerCase().includes(entry.toLowerCase())) {
                newlist += listAr[x] + ","
            }
        }
        return newList
    }

    //search input handlers

    genreSearchInputHandler = () => {
        this.genreSearchList = this.filterSearchListByEntry(this.genreSearchList, this.view.getGenreSearchInput())
        this.renderGenreSearchList()
    }

    tagSearchInputHandler = () => {
        this.tagSearchList = this.filterSearchListByEntry(this.tagSearchList, this.view.getTagSearchInput())
        this.renderTagSearchList()
    }

    categorySearchInputHandler = () => {
        this.categorySearchList = this.filterSearchListByEntry(this.categorySearchList, this.view.getCategorySearchInput())
        this.renderCategorySearchList()
    }

    //search result click handlers

    genreSearchResultHandler = (searchResult) => {
        //get genre id and call backend to attach it to loaded wikiId
        //if successful load new genre tag graphic
        this.controller.addWikiSubGenre(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"), searchResult.id)
            .then(response => response.text())
            .then(response => {
                if (response == "true") {
                    this.loadGenreTagList()
                }
            })
    }

    tagSearchResultHandler = (searchResult) => {
       //get tag id and call backend to attach it to loaded wikiId
        //if successful load new searchtag tag graphic
        this.controller.addWikiSearchTag(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"), searchResult.id)
            .then(response => response.text())
            .then(response => {
                if (response == "true") {
                    this.loadSearchTagTagList()
                }
            })
    }

    categorySearchResultHandler = (searchResult) => {
        //do nothing, all the categories are already displayed as tabs, may use as a overflow system one day
    }

    genrePopupSubmitHandler = () => {
        //do nothing, later will submit a request for a new sub genre 
    }

    tagPopupSubmitHandler = () => {
        this.controller.newSearchTag(this.cookie.getCookie("token"), this.searchView.getTagSearchInput())
            .then(response => response.text())
            .then(response => {
                this.controller.addWikiSearchTag(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"), response)
                    .then(response => response.text())
                    .then(response => {
                        if (response == "true") {
                            this.loadSearchTagTagList()
                            this.loadSearchTagSearchList()
                        }
                    })
            })
    }

    categoryPopupSubmitHandler = () => {
        this.controller.addWikiCategory(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"),
            this.searchView.getCategorySearchInput())
            .then(response => response.text())
            .then(response => {
                if (response == "true") {
                    this.loadCategoryTagList()
                }
            })
    }

    //load lists from backend 

    loadGenreTagList = () => {
        this.controller.getWikiSubGenres(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"))
            .then(response => response.text())
            .then(response => {
                this.renderTagList(this.tagView.createGenreGraphic, response)
            })
    }

    loadSearchTagTagList = () => {
        this.controller.getWikiSearchTags(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"))
            .then(response => response.text())
            .then(response => {
                this.renderTagList(this.tagView.createTagGraphic, response)
            })
    }

    loadCategoryTagList = () => {
        this.controller.getWikiCategories(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"))
            .then(response => response.text())
            .then(response => {
                this.renderTagList(this.tagView.createCategoryGraphic, response)
            })
    }

    loadGenreSearchList = () => {
        this.controller.getAllSubGenres()
            .then(response => response.text())
            .then(response => {
                this.genreSearchList = response
                this.renderGenreSearchList()
            })
    }

    loadSearchTagSearchList = () => {
        this.controller.getAllSearchTags()
            .then(response => response.text())
            .then(response => {
                this.tagSearchList = response
                this.renderCategorySearchList()
            })
    }

    loadCategorySearchList = () => {
        this.controller.getWikiCategories(this.cookie.getCookie("token"), this.cookie.getCookie("wikiId"))
            .then(response => response.text())
            .then(response => {
                this.categorySearchList = response
                this.renderGenreSearchList()
            })
    }
}

const tags = new Tags()