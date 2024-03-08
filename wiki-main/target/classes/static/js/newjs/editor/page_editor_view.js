import TextUtility from './utilities/text_utility_v2.js'
import ImageUtility from './utilities/image_utility.js'
import UtilityFactory from './utilities/utility_factory.js'
import UtilityHelper from './utilities/utility_helper.js'
import Controller from './controller.js'
import Cookie from './cookie.js'

class View {
    constructor() {
       // view elements
        this.selectBtn = document.getElementById("toggleSelectBtn")
        this.toggleDragBtn = document.getElementById("toggleDragBtn")
        this.page = document.getElementById("page")
        this.toolbarDiv = document.getElementById("toolbarDiv")
        this.utilityDiv = document.getElementById("collapseUtility")
        this.utilityHelper = new UtilityHelper()
        this.utilityFactory = new UtilityFactory()
        this.controller = new Controller()
        this.cookie = new Cookie()
        this.submitBtn = document.getElementById("submitBtn")
        let controller = this.controller
        let cookie = this.cookie
        let page = this.page
        this.submitBtn.addEventListener("click", function () {
            controller.postAccountPageContent(cookie.getCookie("memberId"), cookie.getCookie("pageId"), page.innerHTML)
                .then(response => response.text())
                .then(response => {
                    console.log("post page response: " + response)
                })
        })
        this.textBtn = document.getElementById("textBtn")
        this.imgBtn = document.getElementById("imgBtn")
        this.imgBtn.addEventListener("click", this.createImageBtnHandler)
        this.textBtn.addEventListener("click", this.createTextBtnHandler)

        this.loadPageContent()

       //select variables
        this.select = false
        this.initSelectHandler()
        //this.selectedEl = undefined

        //drag variables
        this.drag = false 
       // this.attachToggleHandler(this.toggleDragEvent)

       // this.addUtility("Text Utility", this.utilityFactory.constructTextUtility)
    }

    loadPageContent = () => {
        this.controller.getAccountPageContent(this.cookie.getCookie("memberId"), this.cookie.getCookie("pageId"))
            .then(response => response.text())
            .then(response => {
                this.page.innerHTML = response
            })
    }

    addUtility = (name, construct) => {
        let label = document.createElement("label")
        label.innerText = name
        label.classList.add("click")
        label.style.cursor = "pointer"
        label.addEventListener("click", construct)
        this.utilityDiv.appendChild(label)
        this.utilityDiv.appendChild(document.createElement("br"))
    }

    //drag handlers

    attachToggleHandler = (handler) => {
        this.toggleDragBtn.addEventListener("click", function () {
            handler()
        })
    }

    createTextBtnHandler = () => {
        this.utilityFactory.constructTextUtility()
    }

    createImageBtnHandler = () => {
        this.utilityFactory.constructImageUtility()
    }


    //select handlers


    initSelectHandler = () => {
        let attachHandler = this.attachSelectHandlers
       
        let toolbarDiv = this.toolbarDiv
        let isSelect = this.isSelect
        let isDrag = this.isDrag
        let toggleSelect = this.toggleSelect
        let utilityHelper = this.utilityHelper
        
        //when you push select
        this.selectBtn.addEventListener('click', function () {
            //toggle the select boolean 
            toggleSelect()

            //if select is true
            if (isSelect()) {
                utilityHelper.enableAllSelect()
                console.log("selected state enabled")
                utilityHelper.registerAllHandlers()
                //attach the select handlers to every element (this applies to text, images, and anything else in the future)
               
            }
            //otherwise, select is false 
            else {

                utilityHelper.disableAllSelect()

                //clear the toolbar
                toolbarDiv.innerHTML = ""
                console.log("selected state disabled")
            }
               
                   
        })
    }

    toggleSelect = () => {
        this.select = !this.select
        this.utilityHelper.toggleSelect()
    }

    isDrag = () => {
        return this.drag
    }

    isSelect = () => {
        return this.select
    }

    /*
    selectHandler = (el, disableSelect) => {
        if (this.select) {
            if (this.selectedEl == undefined) {
                console.log(el.element)
                this.toolbarDiv.innerHTML = ""
                el.constructToolbar()
                this.selectedEl = el
          
            } else {
                if (this.selectedEl === el) {

                } else {
                    this.selectedEl.toolbar.disableDragMode()
                    this.toolbarDiv.innerHTML = ""
                    this.selectedEl = el
                    this.selectedEl.constructToolbar()
                }

            }
        } else {
            
            //this.toolbarDiv.innerHTML = ""
        }
    }
    */
  

    attachSelectHandlers = () => {
        this.utilityHelper.registerAllHandlers()
    }

    

    disableSelect = () => {
        this.select = false
       
        console.log(this.select)
    }

   
}

const app = new View()