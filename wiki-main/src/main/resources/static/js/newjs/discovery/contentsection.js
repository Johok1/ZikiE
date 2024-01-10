export default class ContentSection {
    constructor(name) {
        this.div = document.createElement("div");
        this.div.appendChild(document.createElement("br"))

        this.h4 = document.createElement("h4");
        this.h4.innerHTML = name;

        this.contentDiv = document.createElement("div");
        this.contentDiv.classList.add("row", "mt-6");
        this.contentDiv.style.marginTop = "3vw";

        this.div.appendChild(this.h4);
        this.div.appendChild(this.contentDiv);
    }
}
