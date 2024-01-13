//might not be keeping this class
export default class MorePopup {
    constructor(parent) {
        this.div = document.createElement("div")
        this.div.style.backgroundColor = "#232323"
        this.div.style.height = "130px"
        this.div.style.width = "100px"
        this.div.style.color = "white"
        this.div.style.paddingLeft = "20px"
        this.div.style.paddingTop = "15px"

        this.permslabel = document.createElement("label")
        this.permslabel.innerHTML = "Perms"
        this.pagelabel = document.createElement("label")
        this.pagelabel.innerHTML = "Add Page"
        this.pagelabel.style.cursor = "pointer"
        this.pagelabel.style.userSelect = "none"
        this.pagelabel.classList.add("pagelabel")

        this.div.appendChild(this.permslabel)
        this.div.appendChild(document.createElement("br"))
        this.div.appendChild(document.createElement("br"))
        this.div.appendChild(this.pagelabel)

        parent.appendChild(this.div)
    }

    handlePageLabel = (handler) => {
        this.pagelabel.addEventListener("click", function () {
            handler()
        })
    }
}