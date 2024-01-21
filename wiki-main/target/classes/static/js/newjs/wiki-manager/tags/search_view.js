
import SearchResult from './search_result.js'

export default class SearchView {
    constructor() {
        this.genreInput = document.getElementById("genreInput")
        this.genreResultsDiv = document.getElementById("genreResultsDiv")

        this.tagResultsDiv = document.getElementById("tagResultsDiv")
        this.tagInput = document.getElementById("filterTagInput")

        this.categoryResultsDiv = document.getElementById("categoryResultsDiv")
        this.categoryInput = document.getElementById("categoryNameInput")

        this.genreResultObjects = []

        this.tagResultObjects = []

        this.categoryResultObjects = []

    }

    removeGenreSearchResult = (searchResult) => {
        this.genreResultsDiv.removeChild(searchResult.master)
    }

    removeTagSearchResult = (searchResult) => {
        this.tagResultsDiv.removeChild(searchResult.master)
    }

    removeCategorySearchResult = (searchResult) => {
        this.categoryResultsDiv.removeChild(searchResult.master)
    }

    getGenreSearchInput = () => {
        return this.genreInput.value
    }

    getTagSearchInput = () => {
        return this.tagInput.value
    }

    getCategorySearchInput = () => {
        return this.categoryInput.value 
    }

    attachGenreInputKeypressHandler = (handler) => {
        this.genreInput.addEventListener("keypress", function () {
            handler()
        })
    }

    attachTagInputKeypressHandler = (handler) => {
        this.tagInput.addEventListener("keypress", function () {
            handler()
        })
    }

    attachCategoryInputKeypressHandler = (handler) => {
        this.categoryInput.addEventListener("keypress", function () {
            handler()
        })
    }

    renderGenreSearchList = (list, handler) => {
        this.renderSearchList(list, handler, this.genreResultsDiv)
    }

    renderTagSearchList = (list, handler) => {
        this.renderSearchList(list, handler, this.tagResultsDiv)
    }

    renderCategorySearchList = (list, handler) => {
        this.renderSearchList(list, handler, this.categoryResultsDiv)
    }

    renderSearchList = (list, handler, div) => {
        let strAr = list.split(",")
        for (let x = 0; x < strAr.length; x++) {
            let name = strAr[x].split("*")[1]
            let id = strAr[x].split("*")[0]
            if (name != "" && name != undefined) {
                let result = this.createSearchItem(name, id, div)
                result.attachLabelClickHandler(handler, result)
            }
        }
    }



    createSearchItem = (name, id, div) => {
        let searchResult = new SearchResult(name, id)
        div.appendChild(searchResult.master)
        return searchResult
    }
}


/*
  attachGenreInputEnterHandler = (handler) => {
      this.genreInput.addEventListener("keypress", function (event) {
          // Check if the key pressed is 'Enter' (key code 13)
          if (event.keyCode === 13 || event.which === 13) {
              handler()
          }
      })
  }

  attachTagInputEnterHandler = (handler) => {
      this.tagInput.addEventListener("keypress", function (event) {
          if (event.keyCode === 13 || event.which === 13) {
              handler()
          }
      })
  }

  attachCategoryInputEnterHandler = (handler) => {
      this.categoryInput.addEventListener("keypress", function (event) {
          if (event.keyCode === 13 || event.which === 13) {
              handler()
          }
      })
  }
  */