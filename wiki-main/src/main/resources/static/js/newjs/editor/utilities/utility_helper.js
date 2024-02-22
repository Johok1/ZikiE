import UtilityFactory from './utility_factory.js'
import TextUtility from './text_utility_v2.js'
import ImageUtility from './image_utility.js'

export default class UtilityHelper {
    constructor() {
        this.selectedEl = undefined
        this.toolbarDiv = document.getElementById("toolbarDiv")
        this.select = false 
        this.utilities = []
    }

    toggleSelect = () => {
        this.select = !this.select
       
    }

    enableAllSelect = () => {
        this.enableImageSelect()
        this.enableTextSelect()
    }

    disableAllSelect = () => {
        this.disableImageSelect()
        this.disableTextSelect()
        this.disableAllDrag()
    }

    enableImageSelect = () => {

    }

    disableImageSelect = () => {
        let page = document.querySelectorAll(".image")

        for (let x = 0; x < page.length; x++) {
            // page[x].contentEditable = false
            let factory = new UtilityFactory()
            let imageUtility = factory.getUtility(page[x])
            imageUtility.deselectElement()
        }
    }

    enableTextSelect = () => {
        //get all text elements
        let page = document.querySelectorAll(".text")

        for (let x = 0; x < page.length; x++) {
            //set all text elements contentEditable = true 
           // page[x].contentEditable = true
           
        }

        //get all generated text "comp"
        //a note here that originally i did name them textcomp but that caused them to pick up on the text class
        //if i have to do something similar elsewhere i might need to come back to this 
        let page2 = document.querySelectorAll(".comp")

        for (let y = 0; y < page2.length; y++) {
            //set all text comps contentEditable = true 
           // page2[y].contentEditable = true

        }
    }



    disableTextSelect = () => {
        //loop through all the text and text comps and set their content editable to
        //false 
        let page = document.querySelectorAll(".text")

        for (let x = 0; x < page.length; x++) {
           // page[x].contentEditable = false
            let factory = new UtilityFactory()
            let textUtility = factory.getUtility(page[x])
            textUtility.deselectElement()
        }

        let page2 = document.querySelectorAll(".comp")

        for (let y = 0; y < page2.length; y++) {
         //   page2[y].contentEditable = false

        }
    }

    disableAllDrag = () => {
        let page = document.querySelectorAll(".drag")
        for (let x = 0; x < page.length; x++) {
            this.disableDragElement(page[x])
        }
    }

    disableDragElement = (elmnt) => {

        elmnt.onmousedown = undefined
    }

    registerAllHandlers = () => {
        this.registerImageHandlers()
        this.registerTextHandlers()
    }

    registerImageHandlers = () => {
        let imgPage = document.querySelectorAll(".image")
        let handler = this.selectHandler
        for (let c = 0; c < imgPage.length; c++) {
            let utilityFactory = new UtilityFactory()
            let imageUtility = utilityFactory.getUtility(imgPage[c])
            imgPage[c].addEventListener("click", function () {
                handler(imageUtility)
            })

        }
    }

    registerTextHandlers = () => {
        let page = document.querySelectorAll(".text")
        let handler = this.selectHandler
        let compHandler = this.registerCompHandlers
        for (let x = 0; x < page.length; x++) {
            let factory = new UtilityFactory()
            let textUtility = factory.getUtility(page[x])
            console.log(page[x])
            compHandler(textUtility, page[x].querySelectorAll(".style"))
            page[x].addEventListener("click", function () {
                handler(textUtility)
            })

        }
    }

    registerCompHandlers = (textUtility, compList) => {
        for (let x = 0; x < compList.length; x++) {
            textUtility.attachCompClickHandler(compList[x])
        }
    }

    selectHandler = (el) => {
        if (this.select) {
            if (this.selectedEl == undefined) {
                console.log(el.element)
                this.toolbarDiv.innerHTML = ""
                el.constructToolbar()
                el.selectElement()
                this.selectedEl = el

            } else {
                if (this.selectedEl === el) {
            
                } else {
                    this.selectedEl.deselectElement()
                    this.selectedEl.functions.disableDragMode()
                    this.toolbarDiv.innerHTML = ""
                    this.selectedEl = el
                    this.selectedEl.selectElement()
                    this.selectedEl.constructToolbar()
                }
            }
        }
    }
    
}