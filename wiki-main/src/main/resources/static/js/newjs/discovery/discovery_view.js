import ContentCard from './contentcard.js'
import ContentCardBig from './contentcard_big.js'
import ContentSection from './contentsection.js'
import Cookie from './cookie.js'

export default class DiscoveryView {
    constructor() {
        this.discoveryHeader = document.getElementById("discoveryHeader")
        this.contentDiv = document.getElementById("contentDiv")
        this.cookie = new Cookie()
        this.bottomFiller = this.getBottomFillerContainer()
        this.contentDiv.appendChild(this.bottomFiller)
        this.alphabetList = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",")
        this.homeBtn = document.getElementById("homeBtn")
        this.attachHomeBtnListener()
    }

    attachHomeBtnListener() {
        let cookie = this.cookie 
        this.homeBtn.addEventListener("click", function () {
            cookie.setCookie("genreId", "", 1)
            cookie.setCookie("subGenreId", "", 1)
            window.location.reload()
        })
    }

    initSubGenreView(topGenres, genres, name) {
        this.discoveryHeader.innerHTML = name
        this.displayTopSubGenres(topGenres)
        this.displayAlphabeticalSubGenres(genres)
    }

    initMainView(topGenreList, genreList) {
        this.displayTopGenres(topGenreList)
        this.displayAlphabeticalGenres(genreList)
    }

    initWikiView(comWikiList, wikiList, pages, header) {
        this.discoveryHeader.innerHTML = header
        this.displayCommunityWikis(comWikiList)
        this.displaySectionListWithHandler(wikiList, "Wikis", this.wikiClickHandler)
        this.displaySectionListWithHandler(pages, "Pages", this.pageClickHandler)
    }

    displayCommunityWikis(comWikiList) {
        let topSection = new ContentSection("Community Wikis")
        let comWikisArray = comWikiList.split(",")
        for (let x = 0; x < comWikisArray.length; x++) {
            //elements are formatted 'name*id'
            let comWikiName = comWikisArray[x].split("*")[0];
            let comWikiId = comWikisArray[x].split("*")[1];
            this.constructBigCard(comWikiName, comWikiId, topSection, this.comWikiClickHandler)
        }
        this.addSection(topSection.div)
    }

    displaySectionListWithHandler (list, name, handler) {
        let topSection = new ContentSection(name)
        let comWikisArray = list.split(",")
        for (let x = 0; x < comWikisArray.length; x++) {
            //elements are formatted 'name*id'
            let comWikiName = comWikisArray[x].split("*")[0];
            let comWikiId = comWikisArray[x].split("*")[1];
            this.constructCard(comWikiName, comWikiId, topSection, handler)
        }
        this.addSection(topSection.div)
    }



    displayAlphabeticalGenres(genreList) {
        let genreArray = genreList.split(",")
        
        for (let x = 0; x < this.alphabetList.length; x++) {
            let letter = this.alphabetList[x]
            let letterSection = new ContentSection(letter)
            let counter = 0
            for (let x = 0; x < genreArray.length; x++) {
                //elements are formatted 'name*id'
                let genreName = genreArray[x].split("*")[0];
                let genreId = genreArray[x].split("*")[1];
                if (genreName.toUpperCase().startsWith(letter)) {
                    counter++
                    this.constructCard(genreName, genreId, letterSection, this.mainClickHandler)
                }
            }
            if (counter > 0) {
                this.addSection(letterSection.div)
            } 
        }

    }


    displayAlphabeticalSubGenres(genreList) {
        let genreArray = genreList.split(",")
       
        for (let x = 0; x < this.alphabetList.length; x++) {
            let letter = this.alphabetList[x]
            let letterSection = new ContentSection(letter)
            let counter = 0
            for (let x = 0; x < genreArray.length; x++) {
                //elements are formatted 'name*id'
                let genreName = genreArray[x].split("*")[0];
                let genreId = genreArray[x].split("*")[1];
                if (genreName.toUpperCase().startsWith(letter)) {
                    counter++
                    this.constructCard(genreName, genreId, letterSection, this.subGenreClickHandler)
                }
            }
            if (counter > 0) {
                this.addSection(letterSection.div)
            } 
        }
    }


    displayTopGenres(topGenreList) {
        let topSection = new ContentSection("Top Genres")
        console.log(topGenreList)
        let genreArray = topGenreList.split(",")
        for (let x = 0; x < genreArray.length; x++) {
            //elements are formatted 'name*id'
            let genreName = genreArray[x].split("*")[0];
            if (genreName != "") { 
            let genreId = genreArray[x].split("*")[1];
            this.constructBigCard(genreName, genreId, topSection, this.mainClickHandler)
            }
        }
        this.addSection(topSection.div)
    }

    displayTopSubGenres(topGenreList) {
        let topSection = new ContentSection("Top Sub-Genres")
        let genreArray = topGenreList.split(",")
        for (let x = 0; x < genreArray.length; x++) {
            //elements are formatted 'name*id'
            let genreName = genreArray[x].split("*")[0];
            if (genreName != "") {
                let genreId = genreArray[x].split("*")[1];
                this.constructBigCard(genreName, genreId, topSection, this.subGenreClickHandler)
            }
        }
        this.addSection(topSection.div)
    }

    constructCard(name, id, section, clickHandler) {
        let contentCard = new ContentCard(name, id, section)
        contentCard.attachClickEventHandler(clickHandler,id,this.cookie)

    }
    constructBigCard(name, id, section, clickHandler) {
        let contentCard = new ContentCardBig(name, id, section)
        contentCard.attachClickEventHandler(clickHandler, id, this.cookie)

    }
    
    getBottomFillerContainer() {
        let div = document.createElement("div");
        div.classList.add("container");
        div.style.height = "50vw";
        return div 
    }

    addSection(sectionElement) {
        this.contentDiv.removeChild(this.bottomFiller)
        this.contentDiv.appendChild(sectionElement)
        this.contentDiv.appendChild(this.bottomFiller)
    }

    /*
     * Handlers will execute in a different scope, don't use this. to access variables!'
     */
    mainClickHandler(cookie, id) {
        cookie.setCookie("genreId", id, 1)
        window.location.reload()
    }

    subGenreClickHandler(cookie, id) {
        cookie.setCookie("subGenreId", id, 1)
        window.location.reload()
    }

    comWikiClickHandler(cookie, id) {
        cookie.setCookie("comWikiId", id, 1)
        //window.location.href = our comm wiki homepage
    }

    wikiClickHandler(cookie, id) {
        cookie.setCookie("wikiId", id, 1)
        //window.location.href = our wiki homepage
    }

    pageClickHandler(cookie, id) {
        cookie.setCookie("pageId", id, 1)
        //window.location.href = our page homepage
    }

}