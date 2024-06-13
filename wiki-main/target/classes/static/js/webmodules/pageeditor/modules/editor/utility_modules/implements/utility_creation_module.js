export default class UtilityCreationModule{
	constructor(utilityHelper){

		this.page = document.getElementById("page")
        this.utilityHelper = utilityHelper

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
        let layerManager = this.utilityHelper.layerManagerModule
        let textUtility = this.utilityHelper.utilityFactory.constructTextUtility(layerManager.getCurrentSelectedLayer())
        this.setUtilityPlacementMode(textUtility)

        //this.registerAllHandlersSelect()
	}

	createImageUtility = () => {
        let layerManager = this.utilityHelper.layerManagerModule
        let imageUtility = this.utilityHelper.utilityFactory.constructImageUtility(layerManager.getCurrentSelectedLayer())
        this.setUtilityPlacementMode(imageUtility)

        // this.registerAllHandlersSelect()
    }

    setUtilityPlacementMode = (utility) => {
        utility.element.style.position = "fixed"
        utility.element.style.opacity = "50%"

        document.getElementById("layoutSidenav_content").appendChild(utility.element)
        utility.element.style.zIndex = "9999"
        
        document.getElementById("layoutSidenav_content").addEventListener("mousemove", function (event) {
            utility.element.style.transform = 'translateY(' + (event.clientY - 80) + 'px)'
            utility.element.style.transform += 'translateX(' + (event.clientX - 50) + 'px)';
         
        })
       
    }

    //set utility to placement mode and add eventer for placement 

}