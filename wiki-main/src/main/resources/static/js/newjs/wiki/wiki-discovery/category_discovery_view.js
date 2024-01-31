import CardGraphic from './card.js'
import Category from './category.js'
import Cookie from './cookie.js'

export default class CategoryDiscoveryView {
    constructor() {
        this.searchBar = document.getElementById("searchbox")
        this.wikiBody = document.getElementById("pageBody")
        this.cookie = new Cookie()
        this.alphabetList = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",")
       // this.displaySectionList("8*Senate,9*Elder Council, 10*Foreign Affairs", "Top Categories")
       // this.displayAlphabeticalCategories("1*Mining,2*Trade,3*Government,4*Taxes,5*Monument")
        this.attachSearchHandler(this.searchHandler, this.filterCategories)
      
    }

    searchHandler = () => {
        this.filterCardsOnSearch()
      
    }

    filterCategories = () => {
        this.removeEmptyCategories()
    }

    attachSearchHandler = (search,filter) => { 
        this.searchBar.addEventListener("keypress", function (event) {
            // Check if the key pressed is 'Enter' (key code 13)
            if (event.keyCode === 13 || event.which === 13) {
                search()
                filter()
            }
        })
    }

    displaySectionList(list, name) {
        let category = new Category(name)
        let categoryArray = list.split(",")
        for (let x = 0; x < categoryArray.length; x++) {
            //elements are formatted 'id*name'
            let categoryName = categoryArray[x].split("*")[1];
            if (categoryName != "") {
                let categoryId = categoryArray[x].split("*")[0];
                this.constructCard(categoryName, categoryId, category, this.mainClickHandler)
            }
        }
        this.addCategory(category)
    }


    displayAlphabeticalCategories = (categoryList) => {
        let categoryArray = categoryList.split(",")

        for (let x = 0; x < this.alphabetList.length; x++) {
            let letter = this.alphabetList[x]
            console.log(letter)
            let letterCategory = new Category(letter)
            let counter = 0
            for (let x = 0; x < categoryArray.length; x++) {
                //elements are formatted 'id*name'
                let categoryName = categoryArray[x].split("*")[1];
                let categoryId = categoryArray[x].split("*")[0];
                if (categoryName != undefined && categoryName != "" && categoryName != null) {
                    if (categoryName.toUpperCase().startsWith(letter)) {
                        counter++
                        this.constructCard(categoryName, categoryId, letterCategory, this.mainClickHandler)
                    }
                }
            }
            if (counter > 0) {
                this.addCategory(letterCategory)
            }
        }

    }

    constructCard = (categoryName, categoryId, letterCategory, handler) => {
        let card = new CardGraphic(categoryName, categoryId)
        card.attachClickHandler(handler, categoryId)
        letterCategory.dropdownRow.appendChild(card.master)
       
    }

    addCategory = (category) => {
        this.wikiBody.appendChild(category.master)
    }


    removeEmptyCategories = () => {
        let categories = document.querySelectorAll(".dropdownRow")
        for (let x = 0; x < categories.length; x++) {
            let cards = categories[x].querySelectorAll(".cards")
            let notHidden = 0 
            for (let y = 0; y < cards.length; y++) {
                if (!cards[y].classList.contains("hidden")) {
                    notHidden ++
                }
            }
            if (notHidden < 1) {
                categories[x].classList.add("hidden")
            }
        }
    }

    filterCardsOnSearch = () => {
        // Locate the card elements
        let cards = document.querySelectorAll('.cards')
        // Locate the search input
        let search_query = this.searchBar.value;
        // Loop through the cards
        for (var i = 0; i < cards.length; i++) {
            // If the text is within the card...
            if (cards[i].innerText.toLowerCase()
                // ...and the text matches the search query...
                .includes(search_query.toLowerCase())) {
                // ...remove the `.is-hidden` class.
                cards[i].classList.remove("hidden");
            } else {
                // Otherwise, add the class.
                cards[i].classList.add("hidden");
            }
        }
    }

    mainClickHandler = (id) => {
        this.cookie.setCookie("categoryId", id, 1)
        window.location.href = "wiki-page-discovery.html"
    }

}

