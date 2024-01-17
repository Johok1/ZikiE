export default class ProfileView{
    constructor(){
		this.label = document.getElementById("wikiName")
		this.textInput = document.getElementById("wikiNameInput")
		this.imgInput = document.getElementById("imgInput")
		this.logoImg = document.getElementById("logoImg")
		this.submitBtn = document.getElementById("wikiNameSubmitBtn")
		this.imgInput.style.width = this.logoImg.style.width
	
	}

	getInputImageForm = () => {
		return this.imgInput.files.item(0)
	}

	getInputText = () => {
		return this.textInput.value
	}

	attachSubmitClickHandler = (handler) => {
		this.submitBtn.addEventListener("click", function () {
			handler()
		})
	}

	attachImgInputHandler = (handler) => {
		this.imgInput.addEventListener("change", function () {
			handler()
		})
	}

    setWikiNameToInput() {
		if (this.textInput.value != "") {
			this.label.innerHTML = this.textInput.value
			this.textInput.value = ""
		}
	}

	setWikiLogoToInput() {		
		let objURL = URL.createObjectURL(this.imgInput.files.item(0))
		this.logoImg.src = objURL
		this.imgInput.style.width = this.logoImg.style.width
	}

	setWikiName(name) {
		if (name!= "") {
			this.label.innerHTML = name
			this.textInput.value = ""
		}
	}

	setWikiLogo(logo) {
		let objURL = URL.createObjectURL(logo)
		this.logoImg.src = objURL
	}

}