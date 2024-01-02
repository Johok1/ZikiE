function setCookie(cname, cvalue, exhours) {
	const d = new Date();
	d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
/*
 * <div style="background-color: green; width: 60px; height: 17px; border-radius: 5px;">
		<label style="position: relative; bottom: 5px; font-size: 14px; left:  10px; ">
			Active
		</label>
   </div>
*/
class Status {
	constructor(status) {
		this.master = document.createElement("div")

		this.div = document.createElement("div")
		this.div.style.backgroundColor = "green"
		this.div.style.width = "60px"
		this.div.style.height = "17px"
		this.div.style.borderRadius = "5px"

		this.label = document.createElement("label")
		this.label.style.position = "relative"
		this.label.style.bottom = "5px"
		this.label.style.fontSize = "14px"
		this.label.style.left = "10px"
		this.label.innerHTML = "Active"

		this.div.appendChild(this.label)

		this.master.appendChild(this.div)

		if (status == "Deactive") {
			this.setDeactive()
		} else if (status == "Hidden") {
			this.setHidden();
		}
	}

	handleDivClick = (handler) => {
		this.div.addEventListener("click", function () {
			handler()
		})
	}

	setActive() {
		this.div.style.backgroundColor = "green"
		this.label.innerHTML = "Active"
		this.label.style.fontSize = "14px"
	}

	setDeactive() {
		this.div.style.backgroundColor = "red"
		this.label.innerHTML = "Deactive"
		this.label.style.fontSize = "11px"
	}

	setHidden() {
		this.div.style.backgroundColor = "grey"
		this.label.innerHTML = "Hidden"
		this.label.style.fontSize = "14px"
	}
}

/*
 * <div class="row">
		<div class="col">
			<img src="resources/images/more_tables.png">
		</div>
		<div class ="col">
			<img src="resources/images/red_bin.png">
		</div>
	</div>
 */
class Actions {
	constructor() {
		this.master = document.createElement("div")

		this.row = document.createElement("div")
		this.row.classList.add("row")

		this.col1 = document.createElement("div")
		this.col1.classList.add("col")

		this.tablesImg = document.createElement("img")
		this.tablesImg.src = "resources/images/more_tables.png"
		this.col1.appendChild(this.tablesImg)
		this.row.appendChild(this.col1)

		this.col2 = document.createElement("div")
		this.col2.classList.add("col")

		this.binImg = document.createElement("img")
		this.binImg.src = "resources/images/red_bin.png"

		this.col2.appendChild(this.binImg)
		this.row.appendChild(this.col2)
		this.master.appendChild(this.row)

	}

	
}

/*
 * <h5>Name</h5>
 */
class Name {
	constructor(name) {
		this.div = document.createElement("div")
		this.header = document.createElement("h5")
		this.header.innerHTML = name
		this.div.append(this.header)
	}
}

class MorePopup {
	constructor() {
		this.div = document.createElement("div")
		this.div.style.backgroundColor = "#EEF2F7"
		this.div.style.height = "100px"
		this.div.style.width = "100px"
		this.div.position = "relative"

		this.header1 = document.createElement("h5")
		this.header1.innerHTML = "Change Name"
		this.header1.classList.add("btn")

		this.header2 = document.createElement("h5")
		this.header2.innerHTML = "Delete"
		this.header2.classList.add("btn")

		this.div.appendChild(this.header1)
		this.div.appendChild(this.header2)
	}

	handleChangeNameBtn = (handler,row) => {
		this.header1.addEventListener("click", function () {
			handler(row)
		})
	}

	handleDeleteBtn = (handler,row) => {
		this.header2.addEventListener("click", function () {
			handler(row)
		})
	}
}

/*
 * <div style="background-color: #EEF2F7; width: 250px; height: 250px">
		
		<h4 style="padding-left: 10px; padding-top:15px">Name of Genre:</h4>
		<input type="text" size="20px" style="margin-left: 10px; border: none; height: 20px;">
		<h4 style="padding-left: 10px">Status of Genre: Select One</h4>
		<h4 style="padding-left: 10px">Active</h4>
		<h4 style="padding-left: 10px">Deactive</h4>
		<h4 style="padding-left: 10px">Hidden</h4>
	</div>
 */ 
class CreateGenrePopup {
	constructor() {


		this.div = document.createElement("div")
		this.div.style.backgroundColor = "#EEF2F7"
		this.div.style.width = "250px"
		this.div.style.height = "250px"
		this.div.style.position = "absolute"
		this.div.style.top = "50px"
		this.div.style.left = "700px"
		this.div.style.opacity = "95%"

		this.text1 = document.createElement("h5")
		this.text1.style.paddingLeft = "10px"
		this.text1.style.paddingTop = "15px"
		this.text1.style.color = "black"
		this.text1.innerHTML = "Name of Genre:"

		this.input = document.createElement("input")
		this.input.type = "text"
		this.input.style.size = "20px"
		this.input.style.marginLeft = "10px"
		this.input.style.border = "none"
		this.input.style.height = "20px"

		this.text2 = document.createElement("h6")
		this.text2.style.paddingLeft = "10px"
		this.text2.style.color = "black"
		this.text2.innerHTML = "Status of Genre: Select One"

		this.activeBtn = document.createElement("h4")
		this.activeBtn.style.paddingLeft = "10px"
		this.activeBtn.classList.add("btn")
		this.activeBtn.innerHTML = "Active"

		this.deactiveBtn = document.createElement("h4")
		this.deactiveBtn.style.paddingLeft = "10px"
		this.deactiveBtn.classList.add("btn")
		this.deactiveBtn.innerHTML = "Deactive"

		this.hiddenBtn = document.createElement("h4")
		this.hiddenBtn.style.paddingLeft = "10px"
		this.hiddenBtn.classList.add("btn")
		this.hiddenBtn.innerHTML = "Hidden"

		this.div.appendChild(this.text1)
		this.div.appendChild(this.input)
		this.div.appendChild(document.createElement("br"))
		this.div.appendChild(this.text2)
	
		this.div.appendChild(this.activeBtn)
		this.div.appendChild(document.createElement("br"))
		this.div.appendChild(this.deactiveBtn)
		this.div.appendChild(document.createElement("br"))
		this.div.appendChild(this.hiddenBtn)

	}

	handleActiveBtn = (handler) => {
		this.activeBtn.addEventListener("click", function () {
			handler()
		})
	}

	handleDeactiveBtn = (handler) => {
		this.deactiveBtn.addEventListener("click", function () {
			handler()
		})
	}

	handleHiddenBtn = (handler) => {
		this.hiddenBtn.addEventListener("click", function () {
			handler()
		})
	}
}


class Model {
	constructor(view, controller) {
		this.controller = controller 
		this.isAddGenrePopup = false
		this.moreBtnPopup = false
		this.token = getCookie("token")
		this.controller.getGenres()
			.then(response => response.text())
			.then(response => {
				this.genreListStr = response

				this.genreList = this.genreListStr.split(",").flat()


				this.view = view
				this.view.handleAddGenreBtn(this.handleAddGenreBtn)

				this.initGenres()
			})
		
	}


	initGenres = () => {
		let table = this.view.table
		let func = this.handleMoreBtn
		for (let x = 0; x < this.genreList.length; x++) {
			if (this.genreList[x] != undefined && this.genreList[x] != "") {
				let name = new Name(this.genreList[x])
				//get this genres status from backend
				let status = new Status("Deactive")
				this.actions1 = new Actions()
				
				
			
				
				this.view.table.row
					.add([
						name.div.innerHTML,
						"#",
						status.master.innerHTML,
						this.actions1.master.innerHTML
					]).draw(false)
				
			}

		}
		this.view.table.on('click', 'tbody tr', function () {
			//let data = table.row(this).data().querySelector("h5").innerHTML;
			//console.log(data)
			this.addEventListener("click", function () {
				func(table.row(this))
			})
			//	alert('You clicked on ' + this.innerHTML + "'s row");
		});

	}

	handleMorePopupDelete = (row) => {
		let nameStrRaw = row.data()[0]
		let nameStr = nameStrRaw.replace("<h5>", "")
		let name = nameStr.replace("</h5>", "")
	
		
		this.controller.deleteGenre(this.token, name)
			.then(response => response.text())
			.then(response => {
				if (response == "true") {
					
					row.remove().draw(false)
					this.view.body.removeChild(this.pop.div)
					this.moreBtnPopup = false
				}

			}).catch(error => {
				console.error(error)
			})
	
	}

	handleMorePopupChangeName = (row) => {
		row.data([
			"<h5>Name Changed</h5>", "#",
			'<div style="background-color: red; width: 60px; height: 17px; border-radius: 5px;"><label style="position: relative; bottom: 5px; font-size: 11px; left: 10px;">Deactive</label></div>',
			'<div class="row"><div class="col"><img src="resources/images/more_tables.png"></div><div class="col"><img src="resources/images/red_bin.png"></div></div>']) 
	}
	handleActiveBtn = () => {
		let namevalue = this.popup.input.value
		if (this.popup.input.value != "" && this.popup.input.value != undefined) {
			
			this.controller.addGenre(this.token, namevalue)
				.then(response => response.text())
				.then(response => {
					if (response == "true") {
						this.controller.setGenreStatus(this.token, namevalue, "Active")
							.then(response => response.text())
							.then(response => {
								if (response == "true") {
									let name = new Name(this.popup.input.value)
									let status = new Status("Active")
									this.actions1 = new Actions()
									this.view.table.row
									.add([
										name.div.innerHTML,
										"#",
										status.master.innerHTML,
										this.actions1.master.innerHTML
									]).draw(false)
									this.view.body.removeChild(this.popup.div)
									this.isAddGenrePopup = false 
								}
						}).catch(error => {
							console.error(error)
						})
					}
			}).catch(error => {
				console.error(error)
			})
			
		} else {
			console.log(this.popup.input.value)
		}
	}
	handleDeactiveBtn = () => {
		let namevalue = this.popup.input.value
		if (this.popup.input.value != "" && this.popup.input.value != undefined) {
			this.controller.addGenre(this.token, namevalue)
				.then(response => response.text())
				.then(response => {
					if (response == "true") {
						this.controller.setGenreStatus(this.token, namevalue, "Deactive")
							.then(response => response.text())
							.then(response => {
								if (response == "true") {
									let name = new Name(this.popup.input.value)
									let status = new Status("Deactive")
									this.actions1 = new Actions()
									this.view.table.row
										.add([
											name.div.innerHTML,
											"#",
											status.master.innerHTML,
											this.actions1.master.innerHTML
										]).draw(false)
									this.view.body.removeChild(this.popup.div)
									this.isAddGenrePopup = false 
								}
							}).catch(error => {
								console.error(error)
							})
					}
				}).catch(error => {
					console.error(error)
				})

		}
	}
	handleHiddenBtn = () => {
		let namevalue = this.popup.input.value
		if (this.popup.input.value != "" && this.popup.input.value != undefined) {
			this.controller.addGenre(this.token, namevalue)
				.then(response => response.text())
				.then(response => {
					if (response == "true") {
						this.controller.setGenreStatus(this.token, namevalue, "Hidden")
							.then(response => response.text())
							.then(response => {
								if (response == "true") {
									let name = new Name(this.popup.input.value)
									let status = new Status("Hidden")
									this.actions1 = new Actions()
									this.view.table.row
										.add([
											name.div.innerHTML,
											"#",
											status.master.innerHTML,
											this.actions1.master.innerHTML
										]).draw(false)
									this.view.body.removeChild(this.popup.div)
									this.isAddGenrePopup = false 
								}
							}).catch(error => {
								console.error(error)
							})
					}
				}).catch(error => {
					console.error(error)
				})

		}
	}

	handleMoreBtn = (row) => {
		//console.log(row.data()[0])
		if (this.moreBtnPopup) {
			this.view.body.removeChild(this.pop.div)
			this.moreBtnPopup = false
		} else {
			this.pop = new MorePopup()
			this.view.body.appendChild(this.pop.div)
			this.moreBtnPopup = true
			this.pop.handleChangeNameBtn(this.handleMorePopupChangeName,row)
			this.pop.handleDeleteBtn(this.handleMorePopupDelete, row)
		}
	}
	handleAddGenreBtn = () => {
		if (this.isAddGenrePopup) {
			this.view.body.removeChild(this.popup.div)
			this.isAddGenrePopup = false 
		} else {
			this.popup = new CreateGenrePopup()
			this.view.body.appendChild(this.popup.div)
			this.isAddGenrePopup = true
			this.popup.handleActiveBtn(this.handleActiveBtn)
			this.popup.handleDeactiveBtn(this.handleDeactiveBtn)
			this.popup.handleHiddenBtn(this.handleHiddenBtn)
		}
	}

}

class View {
	constructor() {
		this.body = document.getElementById("body")
		this.table = new DataTable("#table_id", {
			dom: '<"toolbar">frtip'
		});

		document.querySelector('div.toolbar').innerHTML = '<img class="btn" id="addGenreBtn" style="position: relative; left:220px; top: 27px;" src="resources/images/add_icon_admin.png">'

		this.addGenreBtn = document.getElementById("addGenreBtn")
	}

	

	handleAddGenreBtn = (handler) => {
		this.addGenreBtn.addEventListener("click", function () {
			handler()
		})
	}
}

class Controller {
	constructor() {
		this.fetch_url_page = "http://localhost/api/v1/page";
		this.fetch_url_wiki = "http://localhost/api/v1/wiki";
		this.fetch_url_tags = "http://localhost/api/v1/tag"
	}


	getGenres() {
		return fetch(this.fetch_url_tags + "/getExternalTags" , {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'plain/text'
			}
		}).catch(error => {
			console.error(error);
		});
	}

	addGenre(token, tag) {
		return fetch(this.fetch_url_tags + "/addExternalTag/" + token + "/" + tag, {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'plain/text'
			}
		}).catch(error => {
			console.error(error)
		})
	}
	deleteGenre(token, tag) {
		return fetch(this.fetch_url_tags + "/removeExternalTag/" + token + "/" + tag, {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'plain/text'
			}
		}).catch(error => {
			console.error(error)
		})
	}

	getGenreStatus(token, tag) {
		return fetch(this.fetch_url_tags + "/getStatus/" + token + "/" + tag, {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'plain/text'
			}
		}).catch(error => {
			console.error(error)
		})
	}

	setGenreStatus(token, tag, status) {
		return fetch(this.fetch_url_tags + "/setStatus/" + token + "/" + tag + "/" + status, {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'plain/text'
			}
		}).catch(error => {
			console.error(error)
		})
	}



}

const app = new Model(new View(), new Controller())


