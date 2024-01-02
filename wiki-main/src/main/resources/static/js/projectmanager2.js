//project card, phase cards go in phase div, toggle hide phase div and change height to collapse/expand
/*<div style="margin-left: 100px;background-color: #373E44; width: 60%; height: 100px; overflow-y:auto; overflow-x: hidden">
					
						<div class="row">
							<div class="col-10">
								<h5 style="text-align: center; padding-top: 10px;color: white">Project Name</h5>
							</div>
							<div class="col-1" style="">
								<img src="resources/images/more_icon.png">
							</div>
						</div>
					
					
							<img class="btn" style="margin-left: 86%; width: 50px; height: 40px" src="resources/images/dropdown.png">
					<div id="phaseDiv">
						
					</div>
					</div>
				
*/
class ProjectCard {
	constructor(parentElement, name) {
		this.name = name 
			this.colDiv = document.createElement("div")
			this.colDiv.classList.add("col-md-3", "mb-4", "cards")
			this.link = document.createElement("a")
			this.link.href = "#"
			this.link.classList.add("card", "align-items-center", "text-decoration-none", "border-0", "hover-lift-light", "py-4", "zinxscard")
			this.link.style.backgroundColor = "hsla(213,11%,15%,1.00)"
			this.circleDiv = document.createElement("div")
			this.circleDiv.classList.add("icon-circle", "icon-circle-lg", "bg-pastel-primary", "text-primary", "btn")

			this.span = document.createElement("span")
			this.span.classList.add("text-dark", "mt-3")
			this.span.innerHTML = name

			this.link.appendChild(this.circleDiv)
			this.link.appendChild(this.span)

			this.colDiv.appendChild(this.link)
		

		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.colDiv);
		} else {
			console.error("Invalid parent element provided.");
		}
	}

	handleMoreImgClick(handler, project) {
		this.circleDiv.addEventListener("click", function () {
			handler(project);
		})
	}

	handleDropdownImgClick = (handler, phaseDiv, project) => {

		this.span.addEventListener("click", function () {
			handler(phaseDiv, project)
		})
	}
}
//phase card
/*
 *<div style="margin-left: 100px;background-color: #6C6C6C; width: 62%; height: 110px; overflow-y:auto; overflow-x: hidden">
					
						<div class="row">
							<div class="col-10">
								<h5 style="text-align: center; padding-top: 10px;color: white">Phase Name</h5>
							</div>
							<div class="col-1" style="">
								<img src="resources/images/more_icon.png">
							</div>
						</div>
					
					
							<img class="btn" style="margin-left: 86%; width: 50px; height: 40px" src="resources/images/dropdown.png">
					<div id="phaseDiv">
						
					</div>
					</div> 
*/
class PhaseCard {
	constructor(parentElement, name) {
		this.name = name 
		this.colDiv = document.createElement("div")
		this.colDiv.classList.add("col-md-3", "mb-4", "cards")


		this.link = document.createElement("a")
		this.link.href = "#"
		this.link.classList.add("card", "align-items-center", "text-decoration-none", "border-0", "hover-lift-light", "py-4","zinxscard")
		this.link.style.backgroundColor = "hsla(213,11%,15%,1.00)"

		this.circleDiv = document.createElement("div")
		this.circleDiv.classList.add("icon-circle", "icon-circle-lg", "bg-pastel-primary", "text-primary", "btn")

		this.span = document.createElement("span")
		this.span.classList.add("text-dark", "mt-3")
		this.span.innerHTML = name

		this.link.appendChild(this.circleDiv)
		this.link.appendChild(this.span)

		this.colDiv.appendChild(this.link)


		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.colDiv);
		} else {
			console.error("Invalid parent element provided.");
		}


	}

	handleMoreImgClick = (handler, masterDiv, phase, phaseDiv) => {
		this.circleDiv.addEventListener("click", function () {
			handler(masterDiv, phase, phaseDiv)
		})
	}

	handleDropdownImgClick = (handler, phase) => {
		this.span.addEventListener("click", function () {
			handler(phase)
		})
	}
}
/*task graphic goes in phase href needs to be changed in future when task page is made 
 *<div class="row">
							<div class="col-4">
								<a href="zikipanel.html" id="taskname" style="color:white; padding-left: 10px">Taskname</a>
							</div>
							<div class="col">
								<img src="resources/images/more_icon.png">
							</div>
						</div>
*/
class Task {
	constructor(parentElement, name) {
		this.li = document.createElement("li")
		this.name = name 
		this.handleSpan = document.createElement("span")
		this.handleSpan.classList.add("handle", "ui-sortable-handle")

		const ellipsis1 = document.createElement("i")
		ellipsis1.classList.add("fa", "fa-ellipsis-v")

		const ellipsis2 = document.createElement("i")
		ellipsis2.classList.add("fa", "fa-ellipsis-v")

		this.handleSpan.appendChild(ellipsis1)
		this.handleSpan.appendChild(ellipsis2)

		this.checkbox = document.createElement("input")
		this.checkbox.type = "checkbox"
		this.checkbox.value = ""
		this.checkbox.name = ""

		this.textSpan = document.createElement("span")
		this.textSpan.classList.add("text")
		this.textSpan.innerHTML = name

		this.smallLabel = document.createElement("small")
		this.smallLabel.classList.add("label", "label-danger")

	

		this.toolsDiv = document.createElement("div")
		this.toolsDiv.classList.add("tools")

		this.moreImg = document.createElement("img")
		this.moreImg.src = "resources/images/more_icon.png"
		this.toolsDiv.appendChild(this.moreImg)
		

		this.li.appendChild(this.handleSpan)
		this.li.appendChild(this.checkbox)
		this.li.appendChild(this.textSpan)
		this.li.appendChild(this.smallLabel)
		this.li.appendChild(this.toolsDiv)

	
			parentElement.appendChild(this.li);
		
	}

	

	handleMoreImgClick = (handler, task, taskDiv) => {
		this.moreImg.addEventListener("click", function () {
			handler(task, taskDiv)
		})
	}

}

class ToDoList {
	constructor() {
		this.colDiv = document.createElement("div")
		this.colDiv.classList.add("col-md-6")
		this.name = ""

		this.boxDiv = document.createElement("div")
		this.boxDiv.classList.add("box", "box-aqua")

		this.boxHeaderDiv = document.createElement("div")
		this.boxHeaderDiv.classList.add("box-header", "ui-sortable-handle")
		this.boxHeaderDiv.style.cursor = "move"

		this.clipboardIcon = document.createElement("i")
		this.clipboardIcon.classList.add("ion", "ion-clipboard")

		this.title = document.createElement("h3")
		this.title.classList.add("box-title")
		this.title.innerHTML = "To Do List"

		this.boxHeaderDiv.appendChild(this.clipboardIcon)
		this.boxHeaderDiv.appendChild(this.title)

		this.boxToolsDiv = document.createElement("div")
		this.boxToolsDiv.classList.add("box-tools", "pull-right")

		this.paginationUl = document.createElement("ul")
		this.paginationUl.classList.add("pagination", "pagination-sm", "inline")

		/*
		const pages = ["«", "1", "2", "3", "»"]
		pages.forEach(page => {
			const li = document.createElement("li")
			const a = document.createElement("a")
			a.href = "#"
			a.innerHTML = page
			li.appendChild(a)
			this.paginationUl.appendChild(li)
		})
		*/

		this.boxToolsDiv.appendChild(this.paginationUl)
		this.boxHeaderDiv.appendChild(this.boxToolsDiv)

		this.boxBodyDiv = document.createElement("div")
		this.boxBodyDiv.classList.add("box-body")

		this.todoList = document.createElement("ul")
		this.todoList.classList.add("todo-list", "ui-sortable")

		this.boxBodyDiv.appendChild(this.todoList)

		this.boxFooterDiv = document.createElement("div")
		this.boxFooterDiv.classList.add("box-footer", "clearfix", "no-border")

		this.addButton = document.createElement("button")
		this.addButton.type = "button"
		this.addButton.classList.add("btn", "btn-default", "pull-right")

		const plusIcon = document.createElement("i")
		plusIcon.classList.add("fa", "fa-plus")

		this.addButton.appendChild(plusIcon)
		this.addButton.innerHTML += " New Task"

		this.boxFooterDiv.appendChild(this.addButton)

		this.boxDiv.appendChild(this.boxHeaderDiv)
		this.boxDiv.appendChild(this.boxBodyDiv)
		this.boxDiv.appendChild(this.boxFooterDiv)

		this.colDiv.appendChild(this.boxDiv)
	}
}



//all the popups...
/*
 * <div class="hidden" style="position: absolute; width: 170px; height: 100px; background-color: #ADADAD;">
				<label style="color: black; padding-left: 7px; padding-top:5px; font-size: 15px;">Change Project Name</label>
				<input type="text" style="width:140px; height: 25px; margin-left: 10px"></input>
				<div style="width: 70px; height: 25px; background-color: #2B2B2B; margin-left: 10px; margin-top: 5px; text-align: center; color: white; border-radius: 10px;" class="click">Submit</div>
			</div>

		<div class="hidden" style="position: absolute; width: 170px; height: 100px; background-color: #ADADAD;">
				<label style="color: black; padding-left: 7px; padding-top:5px; font-size: 15px;">Create New Project</label>
				<input type="text" style="width:140px; height: 25px; margin-left: 10px"></input>
				<div style="width: 70px; height: 25px; background-color: #2B2B2B; margin-left: 10px; margin-top: 5px; text-align: center; color: white; border-radius: 10px;" class="click">Submit</div>
			</div>

			<div class="hidden" style="position: absolute; width: 170px; height: 100px; background-color: #ADADAD;">
				<label style="color: black; padding-left: 7px; padding-top:5px; font-size: 15px;">Change Phase Name</label>
				<input type="text" style="width:140px; height: 25px; margin-left: 10px"></input>
				<div style="width: 70px; height: 25px; background-color: #2B2B2B; margin-left: 10px; margin-top: 5px; text-align: center; color: white; border-radius: 10px;" class="click">Submit</div>
			</div>

	<div class="hidden" style="position: absolute; width: 170px; height: 100px; background-color: #ADADAD;">
				<label style="color: black; padding-left: 7px; padding-top:5px; font-size: 15px;">Create New Phase</label>
				<input type="text" style="width:140px; height: 25px; margin-left: 10px"></input>
				<div style="width: 70px; height: 25px; background-color: #2B2B2B; margin-left: 10px; margin-top: 5px; text-align: center; color: white; border-radius: 10px;" class="click">Submit</div>
			</div>

			<div class="hidden" style="position: absolute; width: 170px; height: 100px; background-color: #ADADAD;">
				<label style="color: black; padding-left: 7px; padding-top:5px; font-size: 15px;">Change Task Name</label>
				<input type="text" style="width:140px; height: 25px; margin-left: 10px"></input>
				<div style="width: 70px; height: 25px; background-color: #2B2B2B; margin-left: 10px; margin-top: 5px; text-align: center; color: white; border-radius: 10px;" class="click">Submit</div>
			</div>

<div class="hidden" style="position: absolute; width: 170px; height: 100px; background-color: #ADADAD;">
				<label style="color: black; padding-left: 7px; padding-top:5px; font-size: 15px;">Create New Task</label>
				<input type="text" style="width:140px; height: 25px; margin-left: 10px"></input>
				<div style="width: 70px; height: 25px; background-color: #2B2B2B; margin-left: 10px; margin-top: 5px; text-align: center; color: white; border-radius: 10px;" class="click">Submit</div>
			</div>

	<div class="hidden" style="position: absolute; width: 100px; height: 100px; background-color: #ADADAD; text-align: center">
				<label class="click" style="color: black; padding-top:5px; font-size: 15px;">Add Phase</label>
				<label class="click" style="color: black; padding-top:5px; font-size: 15px;">Edit Name</label>
				<label class="click" style="color: black; padding-top:5px; font-size: 15px;">Delete</label>
				
			</div>

	<div class="hidden" style="position: absolute; width: 100px; height: 100px; background-color: #ADADAD; text-align: center">
				<label class="click" style="color: black; padding-top:5px; font-size: 15px;">Add Task</label>
				<label class="click" style="color: black; padding-top:5px; font-size: 15px;">Edit Name</label>
				<label class="click" style="color: black; padding-top:5px; font-size: 15px;">Delete</label>
				
			</div>

	<div class="hidden" style="position: absolute; width: 100px; height: 70px; background-color: #ADADAD; text-align: center">
				<label class="click" style="color: black; padding-top:5px; font-size: 15px;">Edit Name</label>
				<label class="click" style="color: black; padding-top:5px; font-size: 15px;">Delete</label>
				
			</div>
*/
class EditForm {
	constructor(parentElement) {
		this.mainDiv = document.createElement("div");
		this.mainDiv.style.position = "static";
		this.mainDiv.style.width = "170px";
		this.mainDiv.style.height = "100px";
		this.mainDiv.style.backgroundColor = "#ADADAD";

		const label = document.createElement("label");
		label.style.color = "black";
		label.style.paddingLeft = "7px";
		label.style.paddingTop = "5px";
		label.style.fontSize = "15px";
		label.textContent = "Change Project Name";

		this.input = document.createElement("input");
		this.input.type = "text";
		this.input.style.width = "140px";
		this.input.style.height = "25px";
		this.input.style.marginLeft = "10px";

		this.submitBtn = document.createElement("div");
		this.submitBtn.textContent = "Submit";
		this.submitBtn.style.width = "70px";
		this.submitBtn.style.height = "25px";
		this.submitBtn.style.backgroundColor = "#2B2B2B";
		this.submitBtn.style.marginLeft = "10px";
		this.submitBtn.style.marginTop = "5px";
		this.submitBtn.style.textAlign = "center";
		this.submitBtn.style.color = "white";
		this.submitBtn.style.borderRadius = "10px";
		this.submitBtn.classList.add("click");

		this.mainDiv.appendChild(label);
		this.mainDiv.appendChild(this.input);
		this.mainDiv.appendChild(this.submitBtn);

		// Positioning relative to the parent element
		if (parentElement instanceof Element) {
			const parentRect = parentElement.getBoundingClientRect();
			this.mainDiv.style.top = `${parentRect.top - 20}px`; // Adjusting top position
			this.mainDiv.style.left = `${parentRect.left + 250}px`; // Adjusting left position
		} else {
			console.error("Invalid parent element provided.");
		}

		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.mainDiv);
		}
	}

	handleClickSubmitBtn = (handler, masterDiv, project) => {
		this.submitBtn.addEventListener("click", function () {
			handler(masterDiv, project)
		})
	}
}

class CreateProjectForm {
	constructor(parentElement) {
		this.mainDiv = document.createElement("div");
		this.mainDiv.style.position = "static";
		this.mainDiv.style.width = "170px";
		this.mainDiv.style.height = "100px";
		this.mainDiv.style.backgroundColor = "#ADADAD";

		const label = document.createElement("label");
		label.style.color = "black";
		label.style.paddingLeft = "7px";
		label.style.paddingTop = "5px";
		label.style.fontSize = "15px";
		label.textContent = "Create New Project";

		this.input = document.createElement("input");
		this.input.type = "text";
		this.input.style.width = "140px";
		this.input.style.height = "25px";
		this.input.style.marginLeft = "10px";

		this.submitBtn = document.createElement("div");
		this.submitBtn.textContent = "Submit";
		this.submitBtn.style.width = "70px";
		this.submitBtn.style.height = "25px";
		this.submitBtn.style.backgroundColor = "#2B2B2B";
		this.submitBtn.style.marginLeft = "10px";
		this.submitBtn.style.marginTop = "5px";
		this.submitBtn.style.textAlign = "center";
		this.submitBtn.style.color = "white";
		this.submitBtn.style.cursor = "default";
		this.submitBtn.style.userSelect = "none";
		this.submitBtn.style.borderRadius = "10px";
		this.submitBtn.classList.add("click");


		this.mainDiv.appendChild(label);
		this.mainDiv.appendChild(this.input);
		this.mainDiv.appendChild(this.submitBtn);

		// Positioning relative to the parent element
		if (parentElement instanceof Element) {
			const parentRect = parentElement.getBoundingClientRect();
			this.mainDiv.style.top = `${parentRect.top - 40}px`; // Adjusting top position
			this.mainDiv.style.left = `${parentRect.left + 350}px`; // Adjusting left position
		} else {
			console.error("Invalid parent element provided.");
		}

		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.mainDiv);
		}
	}

	handleSubmitBtnClick = (handler) => {
		this.submitBtn.addEventListener("click", function () {
			handler()
		})
	}
}

class ChangePhaseForm {
	constructor(parentElement) {
		this.mainDiv = document.createElement("div");

		this.mainDiv.style.position = "static";
		this.mainDiv.style.width = "170px";
		this.mainDiv.style.height = "100px";
		this.mainDiv.style.backgroundColor = "#ADADAD";

		const label = document.createElement("label");
		label.style.color = "black";
		label.style.paddingLeft = "7px";
		label.style.paddingTop = "5px";
		label.style.fontSize = "15px";
		label.textContent = "Change Phase Name";

		this.input = document.createElement("input");
		this.input.type = "text";
		this.input.style.width = "140px";
		this.input.style.height = "25px";
		this.input.style.marginLeft = "10px";

		this.submitBtn = document.createElement("div");
		this.submitBtn.textContent = "Submit";
		this.submitBtn.style.width = "70px";
		this.submitBtn.style.height = "25px";
		this.submitBtn.style.backgroundColor = "#2B2B2B";
		this.submitBtn.style.marginLeft = "10px";
		this.submitBtn.style.marginTop = "5px";
		this.submitBtn.style.textAlign = "center";
		this.submitBtn.style.color = "white";
		this.submitBtn.style.borderRadius = "10px";
		this.submitBtn.classList.add("click");

		this.mainDiv.appendChild(label);
		this.mainDiv.appendChild(this.input);
		this.mainDiv.appendChild(this.submitBtn);

		// Positioning relative to the parent element
		if (parentElement instanceof Element) {
			const parentRect = parentElement.getBoundingClientRect();
			this.mainDiv.style.top = `${parentRect.top}px`; // Adjusting top position
			this.mainDiv.style.left = `${parentRect.right}px`; // Adjusting left position
		} else {
			console.error("Invalid parent element provided.");
		}

		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.mainDiv);
		}
	}
	handleClickSubmitBtn = (handler, masterDiv, phase) => {
		this.submitBtn.addEventListener("click", function () {
			handler(masterDiv, phase)
		})
	}
}

class CreateNewPhaseForm {
	constructor(parentElement) {
		this.mainDiv = document.createElement("div");
		this.mainDiv.style.position = "static";
		this.mainDiv.style.width = "170px";
		this.mainDiv.style.height = "100px";
		this.mainDiv.style.backgroundColor = "#ADADAD";

		const label = document.createElement("label");
		label.style.color = "black";
		label.style.paddingLeft = "7px";
		label.style.paddingTop = "5px";
		label.style.fontSize = "15px";
		label.textContent = "Create New Phase";

		this.input = document.createElement("input");
		this.input.type = "text";
		this.input.style.width = "140px";
		this.input.style.height = "25px";
		this.input.style.marginLeft = "10px";

		this.submitBtn = document.createElement("div");
		this.submitBtn.textContent = "Submit";
		this.submitBtn.style.width = "70px";
		this.submitBtn.style.height = "25px";
		this.submitBtn.style.backgroundColor = "#2B2B2B";
		this.submitBtn.style.marginLeft = "10px";
		this.submitBtn.style.marginTop = "5px";
		this.submitBtn.style.textAlign = "center";
		this.submitBtn.style.color = "white";
		this.submitBtn.style.borderRadius = "10px";
		this.submitBtn.classList.add("click");

		this.mainDiv.appendChild(label);
		this.mainDiv.appendChild(this.input);
		this.mainDiv.appendChild(this.submitBtn);

		// Positioning relative to the parent element
		if (parentElement instanceof Element) {
			const parentRect = parentElement.getBoundingClientRect();
			this.mainDiv.style.top = `${parentRect.top - 40}px`; // Adjusting top position
			this.mainDiv.style.left = `${parentRect.right - 350}px`; // Adjusting left position
		} else {
			console.error("Invalid parent element provided.");
		}

		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.mainDiv);
		}
	}

	handleSubmitBtnClick = (handler, phaseDiv, masterDiv) => {
		this.submitBtn.addEventListener("click", function () {
			handler(phaseDiv, masterDiv);
		})
	}
}

class ChangeTaskForm {
	constructor(parentElement) {
		this.mainDiv = document.createElement("div");
		this.mainDiv.style.position = "static";
		this.mainDiv.style.width = "170px";
		this.mainDiv.style.height = "100px";
		this.mainDiv.style.backgroundColor = "#ADADAD";

		const label = document.createElement("label");
		label.style.color = "black";
		label.style.paddingLeft = "7px";
		label.style.paddingTop = "5px";
		label.style.fontSize = "15px";
		label.textContent = "Change Task Name";

		this.input = document.createElement("input");
		this.input.type = "text";
		this.input.style.width = "140px";
		this.input.style.height = "25px";
		this.input.style.marginLeft = "10px";

		this.submitBtn = document.createElement("div");
		this.submitBtn.textContent = "Submit";
		this.submitBtn.style.width = "70px";
		this.submitBtn.style.height = "25px";
		this.submitBtn.style.backgroundColor = "#2B2B2B";
		this.submitBtn.style.marginLeft = "10px";
		this.submitBtn.style.marginTop = "5px";
		this.submitBtn.style.textAlign = "center";
		this.submitBtn.style.color = "white";
		this.submitBtn.style.borderRadius = "10px";
		this.submitBtn.classList.add("click");

		this.mainDiv.appendChild(label);
		this.mainDiv.appendChild(this.input);
		this.mainDiv.appendChild(this.submitBtn);


		// Positioning relative to the parent element
		if (parentElement instanceof Element) {
			const parentRect = parentElement.getBoundingClientRect();
			this.mainDiv.style.top = `${parentRect.top}px`; // Adjusting top position
			this.mainDiv.style.left = `${parentRect.right}px`; // Adjusting left position
		} else {
			console.error("Invalid parent element provided.");
		}

		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.mainDiv);
		}
	}

	handleClickSubmitBtn = (handler, masterDiv, task) => {
		this.submitBtn.addEventListener("click", function () {
			handler(masterDiv, task)
		})
	}
}

class CreateNewTaskForm {
	constructor(parentElement) {
		this.mainDiv = document.createElement("div");
		this.mainDiv.style.position = "static";
		this.mainDiv.style.width = "170px";
		this.mainDiv.style.height = "100px";
		this.mainDiv.style.backgroundColor = "#ADADAD";

		const label = document.createElement("label");
		label.style.color = "black";
		label.style.paddingLeft = "7px";
		label.style.paddingTop = "5px"
		label.style.fontSize = "15px";
		label.textContent = "Create New Task";

		this.input = document.createElement("input");
		this.input.type = "text";
		this.input.style.width = "140px";
		this.input.style.height = "25px";
		this.input.style.marginLeft = "10px";

		this.submitBtn = document.createElement("div");
		this.submitBtn.textContent = "Submit";
		this.submitBtn.style.width = "70px";
		this.submitBtn.style.height = "25px";
		this.submitBtn.style.backgroundColor = "#2B2B2B";
		this.submitBtn.style.marginLeft = "10px";
		this.submitBtn.style.marginTop = "5px";
		this.submitBtn.style.textAlign = "center";
		this.submitBtn.style.color = "white";
		this.submitBtn.style.borderRadius = "10px";
		this.submitBtn.classList.add("click");

		this.mainDiv.appendChild(label);
		this.mainDiv.appendChild(this.input);
		this.mainDiv.appendChild(this.submitBtn);

		// Positioning relative to the parent element
		if (parentElement instanceof Element) {
			const parentRect = parentElement.getBoundingClientRect();
			this.mainDiv.style.top = `${parentRect.top}px`; // Adjusting top position
			this.mainDiv.style.left = `${parentRect.right}px`; // Adjusting left position
		} else {
			console.error("Invalid parent element provided.");
		}

		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.mainDiv);
		}
	}

	handleSubmitBtnClick = (handler, taskDiv, masterDiv) => {
		this.submitBtn.addEventListener("click", function () {
			handler(taskDiv, masterDiv)
		})
	}
}

class CreateNewTaskClusterForm {
	constructor(parentElement) {
		this.mainDiv = document.createElement("div");
		this.mainDiv.style.position = "static";
		this.mainDiv.style.width = "170px";
		this.mainDiv.style.height = "100px";
		this.mainDiv.style.backgroundColor = "#ADADAD";

		const label = document.createElement("label");
		label.style.color = "black";
		label.style.paddingLeft = "7px";
		label.style.paddingTop = "5px"
		label.style.fontSize = "15px";
		label.textContent = "Create New Task Cluster";

		this.input = document.createElement("input");
		this.input.type = "text";
		this.input.style.width = "140px";
		this.input.style.height = "25px";
		this.input.style.marginLeft = "10px";

		this.submitBtn = document.createElement("div");
		this.submitBtn.textContent = "Submit";
		this.submitBtn.style.width = "70px";
		this.submitBtn.style.height = "25px";
		this.submitBtn.style.backgroundColor = "#2B2B2B";
		this.submitBtn.style.marginLeft = "10px";
		this.submitBtn.style.marginTop = "5px";
		this.submitBtn.style.textAlign = "center";
		this.submitBtn.style.color = "white";
		this.submitBtn.style.borderRadius = "10px";
		this.submitBtn.classList.add("click");

		this.mainDiv.appendChild(label);
		this.mainDiv.appendChild(this.input);
		this.mainDiv.appendChild(this.submitBtn);

		// Positioning relative to the parent element
		if (parentElement instanceof Element) {
			const parentRect = parentElement.getBoundingClientRect();
			this.mainDiv.style.top = `${parentRect.top}px`; // Adjusting top position
			this.mainDiv.style.left = `${parentRect.right}px`; // Adjusting left position
		} else {
			console.error("Invalid parent element provided.");
		}

		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.mainDiv);
		}
	}

	handleSubmitBtnClick = (handler, taskDiv, masterDiv) => {
		this.submitBtn.addEventListener("click", function () {
			handler(taskDiv, masterDiv)
		})
	}
}

class ProjectContextMenu {
	constructor(parentElement) {
		this.mainDiv = document.createElement("div");
		this.mainDiv.style.position = "static";
		this.mainDiv.style.width = "100px";
		this.mainDiv.style.height = "100px";
		this.mainDiv.style.backgroundColor = "#ADADAD";
		this.mainDiv.style.textAlign = "center";

		const labels = ["Add Phase", "Edit Name", "Delete"];
		labels.forEach(labelText => {

		});
		

		this.edit_label = document.createElement("label");
		this.edit_label.classList.add("click");
		this.edit_label.style.color = "black";
		this.edit_label.style.paddingTop = "5px";
		this.edit_label.style.fontSize = "15px";
		this.edit_label.textContent = "Edit Name";
		this.mainDiv.appendChild(this.edit_label);
		this.delete_label = document.createElement("label");
		this.delete_label.classList.add("click");
		this.delete_label.style.color = "black";
		this.delete_label.style.paddingTop = "5px";
		this.delete_label.style.fontSize = "15px";
		this.delete_label.textContent = "Delete";
		this.mainDiv.appendChild(this.delete_label);

		// Positioning relative to the parent element
		if (parentElement instanceof Element) {
			const parentRect = parentElement.getBoundingClientRect();
			this.mainDiv.style.top = `${parentRect.top}px`; // Adjusting top position
			this.mainDiv.style.left = `${parentRect.right - 300}px`; // Adjusting left position
		} else {
			console.error("Invalid parent element provided.");
		}

		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.mainDiv);
		}
	}

	
	handleEditProjectLabelClick = (handler, masterDiv, project) => {
		this.edit_label.addEventListener("click", function () {
			handler(masterDiv, project)
		})
	}

	handleDeleteLabelClick = (handler, project) => {
		this.delete_label.addEventListener("click", function () {
			handler(project)
		})
	}
}

class PhaseContextMenu {
	constructor(parentElement) {
		this.mainDiv = document.createElement("div");
		this.mainDiv.style.position = "static";
		this.mainDiv.style.width = "100px";
		this.mainDiv.style.height = "100px";
		this.mainDiv.style.backgroundColor = "#ADADAD";
		this.mainDiv.style.textAlign = "center";

	
		this.edit_label = document.createElement("label");
		this.edit_label.classList.add("click");
		this.edit_label.style.color = "black";
		this.edit_label.style.paddingTop = "5px";
		this.edit_label.style.fontSize = "15px";
		this.edit_label.textContent = "Edit Name";
		this.mainDiv.appendChild(this.edit_label);
		this.delete_label = document.createElement("label");
		this.delete_label.classList.add("click");
		this.delete_label.style.color = "black";
		this.delete_label.style.paddingTop = "5px";
		this.delete_label.style.fontSize = "15px";
		this.delete_label.textContent = "Delete";
		this.mainDiv.appendChild(this.delete_label);

		// Positioning relative to the parent element
		if (parentElement instanceof Element) {
			const parentRect = parentElement.getBoundingClientRect();
			this.mainDiv.style.top = `${parentRect.top}px`; // Adjusting top position
			this.mainDiv.style.left = `${parentRect.right - 210}px`; // Adjusting left position
		} else {
			console.error("Invalid parent element provided.");
		}

		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.mainDiv);
		}
	}

	

	handleEditPhaseLabelClick = (handler, masterDiv, phase) => {
		this.edit_label.addEventListener("click", function () {
			handler(masterDiv, phase)
		})
	}

	handleDeletePhaseLabelClick = (handler, phase, masterDiv) => {
		this.delete_label.addEventListener("click", function () {
			handler(phase, masterDiv)
		})
	}
}

class TaskContextMenu {
	constructor(parentElement) {
		this.mainDiv = document.createElement("div");
		this.mainDiv.style.position = "static";
		this.mainDiv.style.width = "100px";
		this.mainDiv.style.height = "100px";
		this.mainDiv.style.backgroundColor = "#ADADAD";
		this.mainDiv.style.textAlign = "center";


		this.edit_label = document.createElement("label");
		this.edit_label.classList.add("click");
		this.edit_label.style.color = "black";
		this.edit_label.style.paddingTop = "5px";
		this.edit_label.style.fontSize = "15px";
		this.edit_label.textContent = "Edit Name";
		this.mainDiv.appendChild(this.edit_label);
		this.delete_label = document.createElement("label");
		this.delete_label.classList.add("click");
		this.delete_label.style.color = "black";
		this.delete_label.style.paddingTop = "5px";
		this.delete_label.style.fontSize = "15px";
		this.delete_label.textContent = "Delete";
		this.mainDiv.appendChild(this.delete_label);

		// Positioning relative to the parent element
		if (parentElement instanceof Element) {
			const parentRect = parentElement.getBoundingClientRect();
			this.mainDiv.style.top = `${parentRect.top}px`; // Adjusting top position
			this.mainDiv.style.left = `${parentRect.right - 210}px`; // Adjusting left position
		} else {
			console.error("Invalid parent element provided.");
		}

		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.mainDiv);
		}
	}


	handleEditTaskLabelClick = (handler, task) => {
		this.edit_label.addEventListener("click", function () {
			handler(task)
		})
	}

	handleDeleteTaskLabelClick = (handler, task) => {
		this.delete_label.addEventListener("click", function () {
			handler(task)
		})
	}
}



class View {
	constructor() {
		this.contentDiv = document.getElementById("contentDiv")
		this.newProjectBtn = document.getElementById("newProjectBtn")
		this.projectsBtn = document.getElementById("projectsBtn")
		this.body = document.getElementById("body")
	}

	handleProjectsBtnClick = (handler) => { 
		this.projectsBtn.addEventListener("click", function () {
			handler()
		})
	}

	handleNewCreateClick = (handler) => {
		this.newProjectBtn.addEventListener("click", function () {
			handler()
		})
	}
}

class Model {
	//initialize page with initial handlers (making project and project directory btn), and initial
	//state variables for all the popups, and the initial variables for holding lists and selected names
	constructor(view, controller) {
		this.view = view
		this.controller = controller

		this.view.handleNewCreateClick(this.handleNewCreateClick)
		this.view.handleProjectsBtnClick(this.handleProjectsBtnClick)
		this.isCreatePopup = false;
		this.isProjectSelected = false;
		this.isProjectContext = false;
		this.isEditProject = false;
		this.isEditPhase = false
		this.isPhaseSelected = false;
		this.isPhaseContext = false;
		this.isTaskContext = false
		this.isEditTask = false
		this.projectList = ""
		this.phaseList = ""
	// system currently doesn't support task list but it could be added if we wanted search capability in the future
	//	this.tasks = ""
		this.projectSelected = ""
		this.phaseSelected = ""

		//load initial projects from backend and generate graphics
		this.loadProjects()
	}

	

	/*
	 * Projects
	 */


	//New project

	//submit project to backend
	handleSubmitNewProjectClick = () => {
		if (!(this.createProject.input.value == "") && !(this.projectList.includes(this.createProject.input.value))) {

			this.controller.addProject(getCookie("token"), this.createProject.input.value)
				.then(response => response.text())
				.then(response => {
					if (response == "true") {
						this.createNewProject()
					} else {
						console.error(response)
					}
				})

		} else {
			console.log("projects: " + this.projectList)
			console.log("input: " + this.createProject.input.value)
		}
	}

	//create new project
	createNewProject() {
		this.createProjectCard(this.createProject.input.value)
		this.projectList += this.createProject.input.value + ","
		this.removeCreatePopup()
	}


	setProjectSelected(name) {
		//set a state variable to let the system know that a project has been clicked 
		this.isProjectSelected = true
		//set a variable to the projects name to indicate which project is currently selected
		this.projectSelected = name
	}

	//load projects
	//

	//gets the projects list from the backend and loads them all to the frontend in the card graphics
	//also storing the projects list in a model variable for the search system 
	loadProjects = () => {
		//get project list from backend passing token cookie for authentication
		this.controller.getProjectList(getCookie("token"))
			.then(response => response.text())
			.then(response => {
				//filter to make sure backend returned something, although if it had returned an empty list it wouldn't have
				//been displayed.
				if (response != "" && response != undefined) {
					//set projects list variable to response(which is the project list from the backend)
					this.projectList = response
					//load project graphics from list and display in content div
					this.loadProjectsFromList()

				} else {
					console.log("project list response is empty")
				}
			})

	}

	//load project graphics from list and display in content div
	loadProjectsFromList() {
		
		//split list into array and loop through 
		for (let x = 0; x < this.projectList.split(",").length; x++) {
			//check if the current index of the array is empty 
			if (this.projectList.split(",")[x] != "") {
				//if not create a new project using the array element as the name 
				this.createProjectCard(this.projectList.split(",")[x])
			}
		}
	}

	//load a projects phase list from the backend and display it, clearing the current display
	handleProjectLoad = (phasediv, project) => {

		this.setProjectSelected(project.name)
		//clear current display 
		this.clearContentDiv()

		//get phase list from backend passing project name 
		this.controller.getPhaseList(getCookie("token"), project.name)
			.then(response => response.text())
			.then(response => {
				if (response != "" && response != undefined) {
					//load phase list into display passing the phase list string from the backend
					this.loadPhaseList(response)
				} else {
					console.log("blank response");
				}
			})
	}

	//create a new project graphic of the specified name, the assumption is that the project has already been loaded
	//into the project list
	createProjectCard(name) {
		//make new project graphic with contentDiv parent and name parameter
		let project = new ProjectCard(this.view.contentDiv, name);

		//attach project handlers
		project.handleDropdownImgClick(this.handleProjectLoad, this.view.contentDiv, project)
		project.handleMoreImgClick(this.handleMoreImgClick, project)
	}

	//project more popup
	//

	//toggle edit/delete popup graphic for project card 
	handleMoreImgClick = (project) => {
		//if project context is already shown remove it 
		if (this.isProjectContext) {
			this.removeProjectContext()
		} else {
			//otherwise create project context popup 
			this.createProjectContext(project)
		}
	}

	//create project context popup graphic passing project to attach delete and edit handlers
	createProjectContext(project) {
		//set project context popup state variable to true
		this.isProjectContext = true
		//create new popup as a model variable to be accessed outside the function(nothing else can have this name or errors)
		this.morePopup = new ProjectContextMenu(this.view.contentDiv)

		//attach edit and delete handlers passing the project itself 
		this.morePopup.handleEditProjectLabelClick(this.handleEditProjectLabelClick, project)
		this.morePopup.handleDeleteLabelClick(this.handleDeleteProjectLabel, project)
	}

	//remove project context graphic
	removeProjectContext() {
		//set project context popup state variable to false
		this.isProjectContext = false
		//remove the popup from the parent
		this.view.contentDiv.removeChild(this.morePopup.mainDiv)
	}


	//project delete
	//

	
	//remove project from backend and frontend, also remove from projectList
	handleDeleteProjectLabel = (project) => {
		//call the backend to delete the passed project
		this.controller.deleteProject(getCookie("token"), project.name)
			.then(response => response.text())
			.then(response => {
				//if the backend succeeded 
				if (response == "true") {
					//remove project graphic and project from list
					this.removeProject(project)
					//remove project context popup 
					this.removeProjectContext()
				} else {
					console.log(response)
				}
			})
	}

	//remove project from list and remove graphic 
	removeProject(project) {
		//remove the project graphic 
		this.view.contentDiv.removeChild(project.colDiv)
		//remove the project from the projects list 
		this.projectList = this.projectList.replace(project.name + ",", "")
	}

	//project edit
	//

	//show change project name popup and remove project context popup
	handleEditProjectLabelClick = (project) => {
		if (this.isEditProject) {

		} else {
			this.createChangeProjectPopup(project)
			this.removeProjectContext()
		}
	}

	//create change project name popup
	createChangeProjectPopup(project) {
		//set variable indicating popup is up
		this.isEditProject = true
		//set the popup to a model variable 
		this.changeProjectNamePopup = new EditForm(this.view.contentDiv)
		//attach the handler for clicking submit 
		this.changeProjectNamePopup.handleClickSubmitBtn(this.handleChangeProjectSubmitClick, this.view.contentDiv, project)
	}

	//change project name in backend and in internal project list and in frontend graphic
	handleChangeProjectSubmitClick = (masterDiv, project) => {
		//if the input value is not empty 
		if (this.changeProjectNamePopup.input.value != "") {
			//call backend to change project name 
			this.controller.editProject(getCookie("token"), project.name, this.changeProjectNamePopup.input.value)
				.then(response => response.text())
				.then(response => {
					//if the response was true, otherwise the backend failed to edit the name 
					if (response == "true") {
						//change project name and remove popup
						this.changeProjectName(project)
						this.removeChangeProjectNamePopup()
					} else {
						console.log(response)
					}
				})

		}
	}
	//change name in project list, frontend graphic, and project name variable
	changeProjectName(project) {
		//replace the project value in the model project list 
		this.projectList = this.projectList.replace(project.name, this.changeProjectNamePopup.input.value)
		//set the projects title to the new value 
		project.span.innerHTML = this.changeProjectNamePopup.input.value
		//set the project name variable to the new value
		project.name = this.changeProjectNamePopup.input.value

	}

	removeChangeProjectNamePopup() {
		//set the edit project popup variable to false and remove the popup 
		this.isEditProject = false
		this.view.contentDiv.removeChild(this.changeProjectNamePopup.mainDiv)
	}

	

	/*
	 * Phases
	 */

	//New phase
	//

	handleAddPhaseLabelClick = (phaseDiv, masterDiv) => {
		if (this.isCreatePopup) {

		} else {
			this.createNewPhasePopup()
			this.removeProjectContext()

		}

	}

	handleSubmitNewPhase = (phaseDiv, masterDiv) => {
		if (this.createProject.input.value != "") {
			this.controller.addPhase(getCookie("token"), this.projectSelected, this.createProject.input.value)
				.then(response => response.text())
				.then(response => {
					if (response == "true") {
						this.createNewPhase()
					} else {
						console.log(response)
					}
				})

		}
	}

	createNewPhase() {
		this.createPhaseCard(this.createProject.input.value)
		this.phaseList += this.createProject.input.value + ","
		this.removeCreatePopup()
	}

	//create a new phase graphic, assuming the phase has already been loaded into the phase list
	createPhaseCard(name) {

		let phaseCard = new PhaseCard(this.view.contentDiv, name);
		phaseCard.handleDropdownImgClick(this.handlePhaseDropDownClick, phaseCard)
		phaseCard.handleMoreImgClick(this.handlePhaseMoreImgClick, phaseCard, this.view.contentDiv)
	}

	//load phases
	//

	handlePhaseDropDownClick = (phase) => {
		//set variable to indicate phase has been selected
		this.isPhaseSelected = true
		//set variable for which phase was selected
		this.phaseSelected = phase.name

		//get the task list, the list is formatted: 'task*id,task*id' so that we can get both the task name and id 
		//a note that if someone were to make a task with a * in the name this system would fall apart
		this.controller.getTaskClusterList(getCookie("token"), this.projectSelected, this.phaseSelected)
			.then(response => response.text())
			.then(response => {
				//if the task list is not undefined
				if (response != undefined) {
					this.loadTaskClusterList(response)
				} else {
					console.log("blank response");
				}
			})

		

	}

	loadPhaseList(response) {
		//set phase list variable 
		this.phaseList = response
		//loop throgh phase list
		for (let x = 0; x < this.phaseList.split(",").length; x++) {
			//if phase name is not empty 
			if (this.phaseList.split(",")[x] != "") {
				//create a new phase graphic
				this.createPhaseCard(this.phaseList.split(",")[x])
			}
		}
	}

	//phase more popup
	//

	//toggle phase delete/edit popup graphic 
	handlePhaseMoreImgClick = (phase, phaseDiv) => {
		//if graphic is up remove it
		if (this.isPhaseContext) {
			this.removePhaseContext()
		} else {
			//otherwise show popup 
			this.createPhaseContext(phase)
		}
	}
	//show phase context popup graphic 
	createPhaseContext(phase) {
		//set variable for if phase context is up to true
		this.isPhaseContext = true
		//make phase context graphic passing the passed div as the parent
		this.isPhaseContextPopup = new PhaseContextMenu(this.view.contentDiv)
		//attach edit and delete handlers to phase context popup 
		this.isPhaseContextPopup.handleEditPhaseLabelClick(this.handleEditPhaseLabelClick, this.view.contentDiv, phase)
		this.isPhaseContextPopup.handleDeletePhaseLabelClick(this.handeDeletePhaseLabel, phase, this.view.contentDiv)
	}

	removePhaseContext() {
		//set phase context variable to false to indicate its down
		this.isPhaseContext = false
		//remove phase context graphic 
		this.view.contentDiv.removeChild(this.isPhaseContextPopup.mainDiv)
	}

	//phase delete
	//

	//call backend to remove phase passing phase name, if response is true remove phase graphic and remove phase
	// from model phase list
	handeDeletePhaseLabel = (phase, phaseDiv) => {
		//call endpoint to delete phase passing name and project selected
		this.controller.deletePhase(getCookie("token"), this.projectSelected, phase.name)
			.then(response => response.text())
			.then(response => {
				//if response is true
				if (response == "true") {
					this.removePhase(phase)
					this.removePhaseContext()
				} else {
					console.log(response)
				}
			})

	}

	removePhase(phase) {
		//remove phase and phase context variables 
		this.view.contentDiv.removeChild(phase.colDiv)
		//remove phase from phase list
		this.phaseList = this.phaseList.replace(phase.name + ",", "")
	}

	//phase edit
	//

	//show edit phase name popup and remove context popup 
	handleEditPhaseLabelClick = (phaseDiv, phase) => {
		if (this.isEditPhase) {

		} else {
			this.createChangePhasePopup(phase)
			this.removePhaseContext()
		}
	}

	createChangePhasePopup(phase) {
		//set edit phase variable to true
		this.isEditPhase = true
		//create edit phase graphic 
		this.changePhaseNamePopup = new ChangePhaseForm(this.view.contentDiv)
		//attach submit button handler
		this.changePhaseNamePopup.handleClickSubmitBtn(this.handleChangePhaseSubmitClick, this.view.contentDiv, phase)
	}

	handleChangePhaseSubmitClick = (phaseDiv, phase) => {
		//if the input value isn't empty'
		if (this.changePhaseNamePopup.input.value != "") {
			//call endpoint to edit phase passing project selected phase name and the inputted value
			this.controller.editPhase(getCookie("token"), this.projectSelected, phase.name, this.changePhaseNamePopup.input.value)
				.then(response => response.text())
				.then(response => {
					//if the response is true 
					if (response == "true") {
						this.changePhaseName(phase)
						this.removeChangePhaseNamePopup()
					} else {
						console.log(response)
					}
				})

		}
	}

	changePhaseName(phase) {
		//change the phase title display to the inputted value 
		phase.span.innerHTML = this.changePhaseNamePopup.input.value
		//update the phases list
		this.phaseList = this.phaseList.replace(phase.name, this.changePhaseNamePopup.input.value)
		//update phase name variable
		phase.name = this.changePhaseNamePopup.input.value
	}

	removeChangePhaseNamePopup() {
		//remove the edit phase label and set its variable to null 
		this.isEditPhase = false
		this.view.contentDiv.removeChild(this.changePhaseNamePopup.mainDiv)
	}



	/*
	 * Tasks
	 */

	//sets a passed handler function to a click listener in the passed tasks text field
	bindTaskClick = (handler, task) => {
		task.textSpan.addEventListener("click", function () {
			handler(task)
		})
	}

	//sets the task id in a cookie and redirects to the task page
	handleTaskClick = (task) => {
		setCookie("taskId", task.id)
		window.location.href = "taskpage.html"
	}

	//New task
	//


	//submit task to backend and create task graphic passing the backend response, which is the id 
	handleSubmitNewTask = ( todoList,div) => {
		//if the create project input isn't empty
		if (this.createProject.input.value != "") {
			//call the backend to add a new task 
			this.controller.addTask(getCookie("token"), this.projectSelected, this.phaseSelected, todoList.name, this.createProject.input.value)
				.then(response => response.text())
				.then(response => {
					//if the response isn't undefined
					if (response != undefined) {
						this.createTask(this.createProject.input.value, response,todoList)
						this.removeCreatePopup()
					}
				}).catch(error => {
					console.error(error)
				})

		}
	}

	handleSubmitNewTaskCluster = () => {
		//if the create project input isn't empty
		if (this.createProject.input.value != "") {
			//call the backend to add a new task 
			this.controller.addTaskCluster(getCookie("token"), this.projectSelected, this.phaseSelected, this.createProject.input.value)
				.then(response => response.text())
				.then(response => {
					//if the response isn't undefined
					if (response == "true") {
						let cluster = new ToDoList()
						cluster.title.innerHTML = this.createProject.input.value
						cluster.name = this.createProject.input.value
						this.bindCreateNewTask(this.createNewTaskPopup, cluster)
						this.view.contentDiv.appendChild(cluster.colDiv)
						this.removeCreatePopup()
					}
				}).catch(error => {
					console.error(error)
				})

		}
	}

	createTask(name, id,todoList) {
		//make a new task graphic passing the todolist container and the task name  
		let taskCard = new Task(todoList.todoList, name)
		//set task id class parameter to the tasks id 
		taskCard.id = id
		//attach handler that shows edit and delete options 
		taskCard.handleMoreImgClick(this.handleTaskMoreImgClick, taskCard, todoList.todoList)
		//attach handler for when the task is clicked, just set taskId cookie to the id of the task clicked then
		//redirects user to the taskpage 
		this.bindTaskClick(this.handleTaskClick, taskCard)
	}

	//Load tasks
	//

	loadTaskClusterList(list) {
		//set a local variable to the task list, not saving it this time since no task search bar (i think) 
		let tasks = list
		//make new todolist object to hold tasks, in the future multiple of these for task clusters
		//using this. allows this to be accessing elsewhere in the model class
		
		//clear the content div 
		this.view.contentDiv.innerHTML = ""
		//append the todolist container to the contentdiv 
		
		//loop through the local tasks variable 
		for (let x = 0; x < tasks.split(",").length; x++) {
			if (tasks.split(",")[x] != "") {
				let name = tasks.split(",")[x]
				let todoList = new ToDoList()
				todoList.title.innerHTML = name
				todoList.name = name
				this.view.contentDiv.appendChild(todoList.colDiv)
				this.bindCreateNewTask(this.createNewTaskPopup, todoList)
				this.loadClusterTasks(todoList)
			}
		}
	}

	loadClusterTasks(todoList) {
		this.controller.getTaskList(getCookie("token"), this.projectSelected, this.phaseSelected,todoList.name)
			.then(response => response.text())
			.then(response => {
				//if the task list is not undefined
				if (response != undefined) {
					this.loadTaskList(response,todoList)
				} else {
					console.log("blank response");
				}
			})
	}

	loadTaskList(list,todoList) {
		//set a local variable to the task list, not saving it this time since no task search bar (i think) 
		let tasks = list
		//make new todolist object to hold tasks, in the future multiple of these for task clusters
		//using this. allows this to be accessing elsewhere in the model class
	
		//loop through the local tasks variable 
		for (let x = 0; x < tasks.split(",").length; x++) {
			if (tasks.split(",")[x] != "") {
				this.createTask(tasks.split(",")[x].split("*")[1], tasks.split(",")[x].split("*")[0],todoList)
			}
		}
	}

	bindCreateNewTask(handler, todoList) {
		todoList.addButton.addEventListener("click", function () {
			handler(todoList)
		})
	}

	//task more popup
	//


	//toggled task edit/delete popup 
	handleTaskMoreImgClick = (task,todoList) => {
		//if popup is shown remove it
		if (this.isTaskContext) {
			this.removeTaskContextPopup()
		} else {
			//otherwise show popup 
			this.createTaskContextPopup(task,todoList)
		}
	}
	//create task edit/delete popup 
	createTaskContextPopup(task,todoList) {
		this.isTaskContext = true
		this.isTaskContextPopup = new TaskContextMenu(this.view.contentDiv)
		//attach edit and delete handlers 
		this.isTaskContextPopup.handleDeleteTaskLabelClick(this.handleDeleteTaskLabel, task,todoList)
		this.isTaskContextPopup.handleEditTaskLabelClick(this.handleEditTaskLabelClick, task,todoList)
	}
	//remove task edit/delete popup 
	removeTaskContextPopup() {
		this.isTaskContext = false
		this.view.contentDiv.removeChild(this.isTaskContextPopup.mainDiv)
	}

	//task delete
	//


	//delete task from frontend and backend 
	handleDeleteTaskLabel = (task, todoList) => {
		//call backend to delete task 
		this.controller.deleteTask(getCookie("token"), this.projectSelected, this.phaseSelected, task.name)
			.then(response => response.text())
			.then(response => {
				//backend returns true if it deleted the task
				if (response == "true") {
					//remove task from display
					this.removeTask(task, todoList)
					this.removeTaskContextPopup()
				} else {
					console.log(response)
				}
			})
	}
	//remove task from display 
	removeTask(task, todoList) {
		//remove task from todolist
		todoList.todoList.removeChild(task.li)
	}

	//task edit
	//
	//show edit task popup if not already shown
	handleEditTaskLabelClick = (task) => {
		if (this.isEditTask) {
			
		} else {
			//create change task name popup
			this.createChangeTaskNamePopup(task)
			//remove task edit/delete popup 
			this.removeTaskContextPopup()

		}
	}

	//create change name popup 
	createChangeTaskNamePopup(task) {
		//set edit task label variable to true and make new change task graphic 
		this.isEditTask = true
		this.changeTaskNamePopup = new ChangeTaskForm(this.view.contentDiv)
		//bind submit button handler
		this.changeTaskNamePopup.handleClickSubmitBtn(this.handleChangeTaskSubmitClick, this.view.contentDiv, task)
	}

	//handle submit btn on change name popup, edit name in backend and frontend
	handleChangeTaskSubmitClick = (taskDiv, task) => {
		//if the input value isn't null
		if (this.changeTaskNamePopup.input.value != "") {
			//call edit task endpoint
			this.controller.editTask(getCookie("token"), this.projectSelected, this.phaseSelected, task.name,
				this.changeTaskNamePopup.input.value)
				.then(response => response.text())
				.then(response => {
					//if response is true 
					if (response == "true") {
						//change task name 
						this.changeTaskName(task, this.changeTaskNamePopup.input.value)
						this.removeEditTaskPopup()
					} else {
						console.log(response)
					}
				})

		}
	}

	//remove edit task popup 
	removeEditTaskPopup() {
		//remove edit task popup 
		this.isEditTask = false
		this.view.contentDiv.removeChild(this.changeTaskNamePopup.mainDiv)
	}

	//change task name in frontend
	changeTaskName(task, newName) {
		//change displayed task name
		task.textSpan.innerHTML = newName
		//change internal task name variable
		task.name = newName 
	}

	//redirect back to projects view
	handleProjectsBtnClick = () => {
		
		//remove current view
		this.view.contentDiv.innerHTML = ""
		//load projects from backend 
		this.loadProjects()
		//reset selected variables 
		this.isProjectSelected = false
		this.isPhaseSelected = false 
	

	}
	
	/*
	 * Create button functions
	 */

	//general

	//plus button, shows create popup based on selected state 
	handleNewCreateClick = () => {
		//if a create popup isn't already shown 
		if (!this.isCreatePopup) {
			//if the task menu is open
			if (this.isPhaseSelected) {
				this.createNewTaskClusterPopup()
			}
			//else if the phase menu is open
			else if (this.isProjectSelected) {
				this.createNewPhasePopup()
			}//otherwise, the project menu must be open
			else {
				this.createNewProjectPopup()
			}

		} else {
			this.removeCreatePopup()
		}
	}


	//remove create popup from frontend
	removeCreatePopup() {
		this.isCreatePopup = false
		this.view.contentDiv.removeChild(this.createProject.mainDiv)
	}

	//project

	//make new project popup in frontend
	createNewProjectPopup() {
		this.createProject = new CreateProjectForm(this.view.contentDiv)
		this.createProject.handleSubmitBtnClick(this.handleSubmitNewProjectClick)
		this.isCreatePopup = true
	}


	//phase

	//make new phase popup in frontend
	createNewPhasePopup() {
		this.createProject = new CreateNewPhaseForm(this.view.contentDiv)
		this.createProject.handleSubmitBtnClick(this.handleSubmitNewPhase, this.view.contentDiv, this.view.contentDiv)
		this.isCreatePopup = true
	}

	//task

	//make new task popup in frontend
	createNewTaskPopup = (todoList) => {
		if (!this.isCreatePopup) {
			//set create popup variable to true
			this.isCreatePopup = true
			//make a new task popup and attach submit handler
			this.createProject = new CreateNewTaskForm(this.view.contentDiv)
			this.createProject.handleSubmitBtnClick(this.handleSubmitNewTask, todoList, this.view.contentDiv)
		} else {
			this.isCreatePopup = false; 
			this.removeCreatePopup()
		}

	}

	createNewTaskClusterPopup = () => {
		
		//set create popup variable to true
		this.isCreatePopup = true
		//make a new task popup and attach submit handler
		this.createProject = new CreateNewTaskClusterForm(this.view.contentDiv)
		this.createProject.handleSubmitBtnClick(this.handleSubmitNewTaskCluster, undefined, undefined)
	}

	
	handleAddPhaseTaskLabelClick = (taskDiv, masterDiv) => {
		if (this.isCreatePopup) {

		} else {
			this.createNewTaskPopup()
			this.removePhaseContext()
		}

	}

	
	clearContentDiv() {
		this.view.contentDiv.innerHTML = ""
	}


	/*
	handleisProjectSelectedDownClick = (maindiv, phasediv, project) => {
		
			this.isProjectSelected = true
			this.projectSelected = project.name
			
			this.controller.getPhaseList(getCookie("token"), project.name)
				.then(response => response.text())
				.then(response => {
					if (response != "" && response != undefined) {
						let phases = response
						for (let x = 0; x < phases.split(",").length; x++) {
							if (phases.split(",")[x] != "") {
								let phaseCard = new PhaseCard(project.phaseDiv, phases.split(",")[x]);
								phasediv.appendChild(document.createElement("br"))
								phaseCard.handleDropdownImgClick(this.handlePhaseDropDownClick, phaseCard.mainDiv, phaseCard.taskDiv, phaseCard)
								phaseCard.handleMoreImgClick(this.handlePhaseMoreImgClick, phaseCard.mainDiv, phaseCard, phasediv)
							}
						}
					} else {
						console.log("blank response");
					}
				})
		
	}
	*/

}

class Controller {
	constructor() {
		this.domain = "https://www.zinxswiki.com"
		this.fetch_url_project = "/admin/projectmanager/"
	}

	getProjectList(token) {
		return fetch(this.fetch_url_project + "getProjectList/" + token, {
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

	addProject(token, name) {
		return fetch(this.fetch_url_project + "addProject/" + token + "/" + name, {
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

	getPhaseList(token, projectName) {
		return fetch(this.fetch_url_project + "getPhaseList/" + token + "/" + projectName, {
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

	deleteProject(token, projectName) {
		projectName = projectName.replace("%20", " ")
		return fetch(this.fetch_url_project + "deleteProject/" + token + "/" + projectName, {
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

	addPhase(token, projectName, name) {
		projectName = projectName.replace("%20", " ")
		return fetch(this.fetch_url_project + "addPhase/" + token + "/" + projectName + "/" + name, {
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

	editProject(token, projectName, newName) {
		projectName = projectName.replace("%20", " ")
		return fetch(this.fetch_url_project + "editProject/" + token + "/" + projectName + "/" + newName, {
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

	editPhase(token, projectName, phaseName, newName) {
		projectName = projectName.replace("%20", " ")
		return fetch(this.fetch_url_project + "editPhase/" + token + "/" + projectName + "/" + phaseName + "/" + newName, {
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

	deletePhase(token, projectName, phaseName) {
		projectName = projectName.replace("%20", " ")
		return fetch(this.fetch_url_project + "deletePhase/" + token + "/" + projectName + "/" + phaseName, {
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

	getTaskList(token, projectName, phaseName, clusterName) {
		projectName = projectName.replace("%20", " ")
		return fetch(this.fetch_url_project + "getTaskList/" + token + "/" + projectName + "/" + phaseName + "/" + clusterName, {
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

	getTaskClusterList(token, projectName, phaseName) {
		projectName = projectName.replace("%20", " ")
		return fetch(this.fetch_url_project + "getTaskClusterList/" + token + "/" + projectName + "/" + phaseName , {
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

	addTaskCluster(token, projectName, phaseName, clusterName) {
		projectName = projectName.replace("%20", " ")
		return fetch(this.fetch_url_project + "addTaskCluster/" + token + "/" + projectName + "/" + phaseName + "/" + clusterName, {
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

	addTask(token, projectName, phaseName, clusterName, taskName) {
		projectName = projectName.replace("%20", " ")
		return fetch(this.fetch_url_project + "addTask/" + token + "/" + projectName + "/" + phaseName + "/" +clusterName + "/"+ taskName, {
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

	deleteTask(token, projectName, phaseName, clusterName, taskName) {
		projectName = projectName.replace("%20", " ")
		return fetch(this.fetch_url_project + "deleteTask/" + token + "/" + projectName + "/" + phaseName + "/" + clusterName +"/"+ taskName, {
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

	editTask(token, projectName, phaseName, taskName, clusterName, newName) {
		projectName = projectName.replace("%20", " ")
		return fetch(this.fetch_url_project + "editTask/" + token + "/" + projectName + "/" + phaseName + "/" + taskName + "/" +clusterName +"/"+ newName, {
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
const app = new Model(new View(), new Controller())

