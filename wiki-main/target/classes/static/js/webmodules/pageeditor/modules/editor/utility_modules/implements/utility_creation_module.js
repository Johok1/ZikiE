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
        utility.element.style.position = "absolute"
        utility.element.style.opacity = "50%"

        document.addEventListener("mousemove", function ({ movementX, movementY }) {
            utility.element.style.left = utility.element.style.left + movementX
            utility.element.style.top = utility.element.style.top + movementY 
        })
    }

    //set utility to placement mode and add eventer for placement 

}