export default class SearchResult{
    constructor(name, id) {
        this.id = id 
        this.master = document.createElement("li")
        this.label = document.createElement("label")
        this.label.classList.add("click")
        this.label.innerHTML = name
        this.master.appendChild(label)
    }

    attachLabelClickHandler = (handler, result) => {
        this.label.addEventListener("click", function () {
            handler(result)
        })
    }
}