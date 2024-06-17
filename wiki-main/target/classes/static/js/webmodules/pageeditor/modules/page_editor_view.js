import BackendManager from './backend/backend_manager.js';
import UtilityHelper from './editor/utility_helper.js';
import UtilityCreationModule from './editor/utility_modules/implements/utility_creation_module.js';
import PageSubmitTimer from './submit/page_submit_timer.js';


class View {
    constructor() {
        this.initializeViewElements();

        this.backendManager = new BackendManager()
        // Since select mode is enabled by default, ensure select functionalities are initialized
        this.controller = this.backendManager.controller
        this.cookie = this.backendManager.cookie
        this.utilityHelper = new UtilityHelper()
        this.page = document.getElementById("page")


        this.initPageDetails()
       


        this.pageSubmitTimer = new PageSubmitTimer(page)
        this.pageSubmitTimer.setSubmitTimer(10)

       

        this.selectLayerInput = document.getElementById("selectLayerInput")
        this.selectLayerBtn = document.getElementById("selectLayerBtn")

        this.hideLayerInput = document.getElementById("hideLayerInput")
        this.hideLayerBtn = document.getElementById("hideLayerBtn")

        this.textUtilityBtn = document.getElementById("textUtilityBtn")
        this.imageUtilityBtn = document.getElementById("imageUtilityBtn")

       

        this.selectLayerBtn.addEventListener("click", this.selectLayer.bind(this))
        this.hideLayerBtn.addEventListener("click", this.hideLayer.bind(this))
        this.textUtilityBtn.addEventListener("click", this.createTextBtnHandler.bind(this))
        this.imageUtilityBtn.addEventListener("click", this.createImageBtnHandler.bind(this))

        this.loadPageContent()

        this.utilityCreationModule = new UtilityCreationModule(this.utilityHelper)
       
    }



    initPageDetails = () => {
        let pageId = this.backendManager.cookie.getCookie("pageId")
        let token = this.backendManager.cookie.getCookie("token") 
        let pageLogo = this.pageLogo
        let pageName = this.pageName
        this.backendManager.controller.getPageImage(token, pageId)
            .then(response => response.blob())
            .then(response => {
                document.getElementById("pageLogo").src = URL.createObjectURL(response)
            })
        this.backendManager.controller.getPageName(pageId)
            .then(response => response.text())
            .then(response => {
                document.getElementById("pageName").innerText = response
            })
     }

    loadPageContent = () => {
        let page = this.page
        let select = this.utilityHelper.utilitySelectionModule.selectFunc
        let register = this.utilityHelper.utilityHandlerModule.registerAllHandlers
        let reset = this.utilityHelper.utilityHandlerModule.resetAllElementHandlers
        let enableDragAll = this.utilityHelper.utilityTranslationModule.enableDragAll
        let layerManager = this.utilityHelper.layerManagerModule 
        let loadPageImages = this.loadPageImages
        this.controller.getAccountPageContent(this.cookie.getCookie("token"), this.cookie.getCookie("pageId"))
            .then(response => response.text())
            .then(response => {
                let layer = layerManager.getCurrentSelectedLayer()
                page.innerHTML = response
           
                reset(select)

                enableDragAll(layer)
              
                register(select, layer)
           
                loadPageImages()
            
            })
    }

    loadPageImages = () => {
        this.controller.getPageUrlList(this.cookie.getCookie("pageId"))
            .then(response => response.text())
            .then(response => {
                console.log(response)
                let parsed = JSON.parse(response)
                parsed.forEach((obj, index) => {
                    // Access properties of each object
                   
                    const file = obj.blob()
                    const filename = file.filename
                    let imgList = document.querySelectorAll(".image-main")
                    for (let y = 0; y < imgList.length; y++) {

                        let imgId = imgList[y].getAttribute("id");
                        console.log("imgList[y] " + imgList[y])
                        console.log("imgList[y] " + imgId)
                        console.log("filename  " + filename)
                        if (imgId === filename) {
                            console.log("imgId === filename true")
                       /*     const binaryString = atob(file);

                            // Create ArrayBuffer from binary string
                            const arrayBuffer = new ArrayBuffer(binaryString.length);
                            const uint8Array = new Uint8Array(arrayBuffer);
                            for (let i = 0; i < binaryString.length; i++) {
                                uint8Array[i] = binaryString.charCodeAt(i);
                            }
                            let url = URL.createObjectURL(new Blob([uint8Array], { type: "image/webp" }));
                            */
                            imgList[y].src = file
                        } else {
                            console.log("imgId === filename false")
                        }
                        
                    }
                    // You can perform further processing with the filename and data here
                    console.log(`Object ${index + 1}:`);
                    console.log(`Filename: ${filename}`);
                    console.log(`File: ${file}`);
                    console.log(''); // Just for spacing between objects
                });

            })
    }



    initializeViewElements() {

        this.page = document.getElementById("page");
        this.toolbarDiv = document.getElementById("toolbarDiv");


    }

    registerAllHandlersSelect = () => {
        const select = this.utilityHelper.utilitySelectionModule.selectFunc
        const register = this.utilityHelper.utilityHandlerModule.registerAllHandlers
        const layerManager = this.utilityHelper.layerManagerModule
        console.log("select " + select)
        console.log("register " + register)
        register(select, layerManager.getCurrentSelectedLayer())
    }


    createTextBtnHandler() {
        this.utilityCreationModule.createTextUtility()

    }

    createImageBtnHandler() {
        this.utilityCreationModule.createImageUtility()
    }

    hideLayer() {
        let layerManager = this.utilityHelper.layerManagerModule
        layerManager.toggleHideLayer(this.hideLayerInput.value)
    }

    selectLayer() {
        let layerManager = this.utilityHelper.layerManagerModule
        layerManager.setSelectedLayer(this.selectLayerInput.value)
        this.utilityHelper.utilityHandlerModule.resetAllElementHandlers()
        this.registerAllHandlersSelect()
        this.utilityHelper.utilityTranslationModule.enableDragAll(this.selectLayerInput.value)
    }

 



}

const app = new View();