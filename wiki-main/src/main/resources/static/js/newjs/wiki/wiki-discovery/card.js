export default class CardGraphic {
    constructor(name, id) {
        this.master = document.createElement("div");
        this.master.classList.add("col-md-3", "mb-4", "cards");
        this.id = id
        this.cardLink = document.createElement("a");
        this.cardLink.href = "#";
        this.cardLink.classList.add("card", "align-items-center", "text-decoration-none", "border-0", "hover-lift-light", "py-4", "zinxscard");
        this.cardLink.style.backgroundColor = "hsla(210,11%,15%,1.00)";

        this.iconDiv = document.createElement("div");
        this.iconDiv.classList.add("icon-circle", "icon-circle-lg", "bg-pastel-primary", "text-primary", "btn");

        this.labelSpan = document.createElement("span");
        this.labelSpan.classList.add("mt-3");
        this.labelSpan.style.color = "white";
        this.labelSpan.innerText = name;

        this.cardLink.appendChild(this.iconDiv);
        this.cardLink.appendChild(this.labelSpan);

        this.master.appendChild(this.cardLink);
    }

    attachClickHandler = (handler, id) => {
        this.master.addEventListener("click", function () {
            handler(id)
        })
    }
}