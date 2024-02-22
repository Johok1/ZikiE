import TextUtility from './text_utility_v2.js'
import ImageUtility from './image_utility.js'

export default class UtilityFactory {

    constructTextUtility = () => {
        let page = document.getElementById("page")
        let label = document.createElement("p")

        let font = document.createElement("font")
        font.style.color = "black"
        font.innerText = "New Text"
        label.appendChild(font)
    
        label.draggable = false
        label.classList.add("comp")


        let labelDiv = document.createElement("div")
        labelDiv.classList.add("text")
        labelDiv.style.width = "300px"
        labelDiv.style.height = "200px"
        labelDiv.style.overflowY = "auto"
        labelDiv.style.position = "absolute"
        labelDiv.classList.add("drag")
        labelDiv.style.wordWrap = "break-word"
        labelDiv.appendChild(label)
        
        page.appendChild(labelDiv)
    }

    constructImageUtility = () => {
        let page = document.getElementById("page")
        let img = document.createElement("img")
        img.classList.add("image")
        img.classList.add("drag")
        img.draggable = false
        img.style.backgroundColor = "grey"
        img.style.zIndex = 1
        page.appendChild(img)
    }
  
    getUtility(element) {
        if (element.classList.contains("text")) {
            return  new TextUtility(element)
        } else if (element.classList.contains("image")) {
            return  new ImageUtility(element)
        }
        else {
            console.log("invalid element")
        }
    }
}