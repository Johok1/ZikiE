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


        //this.registerAllHandlersSelect()
	}

	createImageUtility = () => {
        let layerManager = this.utilityHelper.layerManagerModule
       let imageUtility =  this.utilityHelper.utilityFactory.constructImageUtility(layerManager.getCurrentSelectedLayer())


        // this.registerAllHandlersSelect()
    }

    //set utility to placement mode and add eventer for placement 

}