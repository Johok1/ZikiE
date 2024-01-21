export default class TagObject{
	
	constructor(name) {
		this.name = name

		this.master = document.createElement("div");
		this.master.className = "col-3";

		this.cardDiv = document.createElement("div");
		this.cardDiv.className = "click card";
		this.cardDiv.style.width = "80%";
		this.cardDiv.style.color = "black";
		this.cardDiv.title = this.name;

		this.inputField = document.createElement("input");
		this.inputField.style.textAlign = "center";
		this.inputField.style.border = "none";
		this.inputField.style.backgroundColor = "transparent";
		this.inputField.style.userSelect = "all";
		this.inputField.disabled = true;
		this.inputField.type = "text";
		this.inputField.value = this.name;

		this.cardDiv.appendChild(this.inputField);
		this.master.appendChild(this.cardDiv);
	}
	
}