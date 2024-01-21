import TagObject from './tag_object.js'

export default class TagView {
	constructor() {
		this.genreRequestInput = document.getElementById("genreRequestInput")
		this.genresRow = document.getElementById("genresRow")
		this.genreSubmitBtn = document.getElementById("genreSubmitBtn")

		this.filterTagInput = document.getElementById("filterTagInput")
		this.tagsRow = document.getElementById("tagsRow")
		this.tagSubmitBtn = document.getElementById("tagSubmitBtn")

		this.categoryNameInput = document.getElementById("categoryNameInput")
		this.categoriesRow = document.getElementById("categoriesRow")
		this.categorySubmitBtn = document.getElementById("categorySubmitBtn")

	}

	getGenreRequestInput() {
		return this.genreRequestInput.value
	}

	getTagInput() {
		return this.filterTagInput.value
	}

	getCategoryInput() {
		return this.categoryNameInput.value
	}

	attachGenreSubmit(handler) {
		this.genreSubmitBtn.addEventListener("click", function () {
			handler()
		})
	}

	attachFilterTagSubmit(handler) {
		this.tagSubmitBtn.addEventListener("click", function () {
			handler()
		})
	}

	attachCategorySubmit(handler) {
		this.categorySubmitBtn.addEventListener("click", function () {
			handler()
		})
	}
	

	createTagGraphic = (name) => {
		if (name != "") {
			const graphic = new TagObject(name)
			this.tagsRow.appendChild(graphic.master)
		}
	}

	createGenreGraphic = (name) => {
		if (name != "") {
			const graphic = new TagObject(name)
			this.genresRow.appendChild(graphic.master)
		}
	}

	createCategoryGraphic = (name) => {
		if (name != "") {
			const graphic = new TagObject(name)
			this.categoriesRow.appendChild(graphic.master)
		}
	}

}