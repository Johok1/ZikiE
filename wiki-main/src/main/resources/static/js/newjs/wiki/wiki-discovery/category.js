export default class Category {
    constructor(name) {
        this.master = document.createElement("div");
        this.master.classList.add("card");
        this.master.style.backgroundColor = "transparent";
        this.master.style.borderColor = "transparent";
        this.master.classList.add("dropdownRow")

        this.cardBody = document.createElement("div");
        this.cardBody.classList.add("card-body");
        this.cardBody.style.borderColor = "transparent";
        this.cardBody.style.width = "100%";

        this.paragraph = document.createElement("p");
        this.paragraph.classList.add("d-inline-flex", "gap-1");

        this.button = document.createElement("button");
        this.button.classList.add("btn", "btn-primary");
        this.button.style.backgroundColor = "transparent";
        this.button.style.borderColor = "transparent";
        this.button.style.color = "black";
        this.button.setAttribute("type", "button");
        this.button.setAttribute("data-bs-toggle", "collapse");
        this.button.setAttribute("data-bs-target", "#collapseExample"+name.replace(" ",""))
        this.button.setAttribute("aria-expanded", "false");
        this.button.setAttribute("aria-controls", "collapseExample" + name.replace(" ", ""));
        this.button.innerHTML = name;

        this.paragraph.appendChild(this.button);

        this.collapseDiv = document.createElement("div");
        this.collapseDiv.classList.add("collapse");
        this.collapseDiv.style.backgroundColor = "transparent";
        this.collapseDiv.style.borderColor = "transparent";
        this.collapseDiv.setAttribute("id", "collapseExample" + name.replace(" ", ""));

        this.innerCard = document.createElement("div");
        this.innerCard.classList.add("card", "card-body");
        this.innerCard.style.backgroundColor = "transparent";
        this.innerCard.style.borderColor = "transparent";
        this.innerCard.style.width = "100%";

        this.dropdownRow = document.createElement("div");
        this.dropdownRow.style.color = "black";
        this.dropdownRow.classList.add("row");
       

        this.innerCard.appendChild(this.dropdownRow);
        this.collapseDiv.appendChild(this.innerCard);

        this.cardBody.appendChild(this.paragraph);
        this.cardBody.appendChild(this.collapseDiv);

        this.master.appendChild(this.cardBody);
    }
}