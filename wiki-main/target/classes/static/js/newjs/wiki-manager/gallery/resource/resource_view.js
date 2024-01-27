import Video from './video_graphic.js'
import Image from './image_graphic.js'

export default class ResourceView{
	constructor() {
		this.resourceDiv = document.getElementById("resourceDiv")
		this.pageName = document.getElementById("pageName")
		this.enabledCheckbox = document.getElementById("pageEnabled")
		this.profilePicture = document.getElementById("profilePicture")
		this.username = document.getElementById("profileUsername")
		this.deleteBtn = document.getElementById("deleteBtn")
		console.log(this.profilePicture)
		console.log(this.username)
	}

	renderVideoUrl(url) {
		let video = new Video()
		video.setVidSrc(URL.createObjectURL(url))
		this.resourceDiv.appendChild(video.master)
	}

	renderImageUrl(url) {
		let image = new Image()
		image.setImgSrc(URL.createObjectURL(url))
		this.resourceDiv.appendChild(image.master)
	}

	loadProfileName = (name) => {
		this.username.innerHTML = name 
	}

	renderProfileImage = (url) => {
		this.profilePicture.src = url
	}

	loadPageName(name) {
		this.pageName.innerHTML = name 
	}

	setPageState(state) {
		this.enabledCheckbox.checked = state 
	}

	togglePageState() {
		this.enabledCheckbox.checked = !this.enabledCheckbox.checked
	}

	attachDeleteBtnHandler = (handler) => {
		this.deleteBtn.addEventListener("click", function () {
			handler()
		})
	}

	attachCheckboxHandler = (handler, loadPageContent,token, id) => {
		this.enabledCheckbox.addEventListener("change", function () {
			handler(loadPageContent, token, id);
		})
	}

}

