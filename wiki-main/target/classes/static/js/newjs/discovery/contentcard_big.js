export default class ContentCardBig {
    constructor(name, id, section) {
        this.col = document.createElement("div");
        this.col.className = "col-md-4 mb-5 cards";
        this.id = id
        this.link = document.createElement("a");
        this.link.href = "#";
        this.link.className = "card align-items-center text-decoration-none border-0 hover-lift-light py-4 zinxscard";

        this.iconCircle = document.createElement("div");
        this.iconCircle.className = "icon-circle icon-circle-lg bg-pastel-primary text-primary btn";

        this.text = document.createElement("span");
        this.text.className = "text-dark mt-3";
        this.text.innerHTML = name;

        this.link.appendChild(this.iconCircle);
        this.link.appendChild(this.text);

        this.col.appendChild(this.link);
        section.contentDiv.appendChild(this.col)
    }

    attachClickEventHandler = (handler, id, cookie) => {
        this.col.addEventListener("click", function () {
            handler(cookie, id)
        })
    }
}