export default class UtilityCreationModule{
	constructor(utilityHelper){

		this.page = document.getElementById("page")
        this.utilityHelper = utilityHelper
        this.backDrop = document.getElementById("layoutSidenav_content")
	}

  
    registerAllHandlersSelect = () => {
        const select = this.utilityHelper.utilitySelectionModule.selectFunc
        const register = this.utilityHelper.utilityHandlerModule.registerAllHandlers
        const layerManager = this.utilityHelper.layerManagerModule
        console.log("select " + select)
        console.log("register " + register)
        register(select, layerManager.getCurrentSelectedLayer())
    }

    createTextUtility = () => {
        if (!this.page.classList.contains("placing")) { 
            this.page.classList.add("placing")
            let layerManager = this.utilityHelper.layerManagerModule
            let textUtility = this.utilityHelper.utilityFactory.constructTextUtility(layerManager.getCurrentSelectedLayer())
            this.setUtilityPlacementMode(textUtility)
         
        }
        //this.registerAllHandlersSelect()
	}

    createImageUtility = () => {
        if (!this.page.classList.contains("placing")) {
            this.page.classList.add("placing")
            let layerManager = this.utilityHelper.layerManagerModule
            let imageUtility = this.utilityHelper.utilityFactory.constructImageUtility(layerManager.getCurrentSelectedLayer())
            this.setUtilityPlacementMode(imageUtility)
            
        }

        // this.registerAllHandlersSelect()
    }

    setUtilityPlacementMode = (utility) => {
        utility.element.style.position = "fixed"
        utility.element.style.opacity = "50%"

        document.getElementById("layoutSidenav_content").appendChild(utility.element)
        utility.element.style.zIndex = "9999"
        this.utility = utility
        this.backDrop.onmousemove = this.stickUtilityToMouse.bind(this)
        
        utility.element.addEventListener("click", function (event) {
            this.placeUtility(utility, event)
        }.bind(this))

        
       
    }

    stickUtilityToMouse = (event) => {
        this.utility.element.style.transform = 'translateY(' + (event.clientY - 80) + 'px)'
        this.utility.element.style.transform += 'translateX(' + (event.clientX - 50) + 'px)';

    }

    placeUtility = (utility, event) => {
        if (this.page.classList.contains("placing")) {
            this.backDrop.onmousemove = null
            this.backDrop.removeChild(utility.element)
            utility.element.style.position = "absolute"
            utility.element.style.opacity = "100%"
            this.page.appendChild(utility.element)
            
            
            //utility.element.style.transform = 'translateY(' + (event.clientY-230) + 'px)'
            //utility.element.style.transform += 'translateX(' + (event.clientX - 110) + 'px)';
            utility.element.style.transform = ""
            utility.element.style.left = `${event.clientX-110 }px`
            utility.element.style.top = `${event.clientY-230 }px`
            utility.enableDrag()
            this.registerAllHandlersSelect()
            this.page.classList.remove("placing")
        }
    }

    //set utility to placement mode and add eventer for placement 

}