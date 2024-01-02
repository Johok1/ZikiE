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
		this.mainDiv = document.createElement("div");
		this.mainDiv.style.marginLeft = "50px";
		this.mainDiv.style.backgroundColor = "#373E44";
		this.mainDiv.style.width = "70%";
		this.mainDiv.style.height = "100px";
		this.mainDiv.style.overflowY = "auto";
		this.mainDiv.style.overflowX = "hidden";

		const innerRowDiv = document.createElement("div");
		innerRowDiv.classList.add("row");

		const col10Div = document.createElement("div");
		col10Div.classList.add("col-10");

		this.projectNameHeader = document.createElement("h5");
		this.projectNameHeader.style.textAlign = "center";
		this.projectNameHeader.style.paddingTop = "10px";
		this.projectNameHeader.style.color = "white";
		this.projectNameHeader.textContent = name;

		col10Div.appendChild(this.projectNameHeader);

		const col1Div = document.createElement("div");
		col1Div.classList.add("col-1");

		this.moreIconImg = document.createElement("img");
		this.moreIconImg.classList.add("click")
		this.moreIconImg.src = "resources/images/more_icon.png";

		col1Div.appendChild(this.moreIconImg);

		innerRowDiv.appendChild(col10Div);
		innerRowDiv.appendChild(col1Div);

		this.dropdownImg = document.createElement("img");
		this.dropdownImg.classList.add("btn");
		this.dropdownImg.style.marginLeft = "86%";
		this.dropdownImg.style.width = "50px";
		this.dropdownImg.style.height = "40px";
		this.dropdownImg.src = "resources/images/dropdown.png";

		this.phaseDiv = document.createElement("div");
		

		this.mainDiv.appendChild(innerRowDiv);
		this.mainDiv.appendChild(this.dropdownImg);
		this.mainDiv.appendChild(this.phaseDiv);

		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.mainDiv);
		} else {
			console.error("Invalid parent element provided.");
		}
	}

	handleMoreImgClick(handler, masterDiv,project) {
		this.moreIconImg.addEventListener("click", function () {
			handler(masterDiv,project);
		})
	}

	handleDropdownImgClick = (handler,mainDiv,phaseDiv, project) => {
		
		this.dropdownImg.addEventListener("click", function () {
			handler(mainDiv,phaseDiv, project)
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
		this.mainDiv = document.createElement("div");
		this.mainDiv.style.marginLeft = "100px";
		this.mainDiv.style.backgroundColor = "#6C6C6C";
		this.mainDiv.style.width = "62%";
		this.mainDiv.style.height = "110px";
		this.mainDiv.style.overflowY = "auto";
		this.mainDiv.style.overflowX = "hidden";

		const innerRowDiv = document.createElement("div");
		innerRowDiv.classList.add("row");

		const col10Div = document.createElement("div");
		col10Div.classList.add("col-10");

		this.phaseNameHeader = document.createElement("h5");
		this.phaseNameHeader.style.textAlign = "center";
		this.phaseNameHeader.style.paddingTop = "10px";
		this.phaseNameHeader.style.color = "white";
		this.phaseNameHeader.textContent = name;

		col10Div.appendChild(this.phaseNameHeader);

		const col1Div = document.createElement("div");
		col1Div.classList.add("col-1");

		this.moreIconImg = document.createElement("img");
		this.moreIconImg.classList.add("click")
		this.moreIconImg.src = "resources/images/more_icon.png";

		col1Div.appendChild(this.moreIconImg);

		innerRowDiv.appendChild(col10Div);
		innerRowDiv.appendChild(col1Div);

		this.dropdownImg = document.createElement("img");
		this.dropdownImg.classList.add("btn");
		this.dropdownImg.style.marginLeft = "86%";
		this.dropdownImg.style.width = "50px";
		this.dropdownImg.style.height = "40px";
		this.dropdownImg.src = "resources/images/dropdown.png";

		this.taskDiv = document.createElement("div");
		this.taskDiv.classList.add("hidden")

		this.mainDiv.appendChild(innerRowDiv);
		this.mainDiv.appendChild(this.dropdownImg);
		this.mainDiv.appendChild(this.taskDiv);

		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.mainDiv);
		} else {
			console.error("Invalid parent element provided.");
		}

	
	}

	handleMoreImgClick = (handler, masterDiv, phase,phaseDiv) => {
		this.moreIconImg.addEventListener("click", function () {
			handler(masterDiv,phase,phaseDiv)
		})
	}

	handleDropdownImgClick = (handler, mainDiv, taskDiv, phase) => {
		this.dropdownImg.addEventListener("click", function () {
			handler(mainDiv, taskDiv, phase)
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
		this.mainDiv = document.createElement("div");
		this.mainDiv.classList.add("row");

		const col4Div = document.createElement("div");
		col4Div.classList.add("col-4");

		this.taskLink = document.createElement("label");
		this.taskLink.id = "taskname";
		this.taskLink.style.color = "white";
		this.taskLink.style.paddingLeft = "10px";
		this.taskLink.innerHTML = name 

		col4Div.appendChild(this.taskLink);

		const colDiv = document.createElement("div");
		colDiv.classList.add("col");

		this.moreIconImg = document.createElement("img");
		this.moreIconImg.classList.add("click")
		this.moreIconImg.src = "resources/images/more_icon.png";

		colDiv.appendChild(this.moreIconImg);

		this.mainDiv.appendChild(col4Div);
		this.mainDiv.appendChild(colDiv);

		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.mainDiv);
		} else {
			console.error("Invalid parent element provided.");
		}
	}



	handleMoreImgClick = (handler, masterDiv, task, taskDiv) => {
		this.moreIconImg.addEventListener("click", function () {
			handler(masterDiv, task, taskDiv)
		})
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
			this.mainDiv.style.left = `${parentRect.left +250}px`; // Adjusting left position
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
			this.mainDiv.style.top = `${parentRect.top-40}px`; // Adjusting top position
			this.mainDiv.style.left = `${parentRect.right-350}px`; // Adjusting left position
		} else {
			console.error("Invalid parent element provided.");
		}

		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.mainDiv);
		}
	}

	handleSubmitBtnClick = (handler,phaseDiv,masterDiv) => {
		this.submitBtn.addEventListener("click", function () {
			handler(phaseDiv,masterDiv);
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
		this.addPhase_label = document.createElement("label");
		this.addPhase_label.classList.add("click");
		this.addPhase_label.style.color = "black";
		this.addPhase_label.style.paddingTop = "5px";
		this.addPhase_label.style.fontSize = "15px";
		this.addPhase_label.textContent = "Add Phase";
		this.mainDiv.appendChild(this.addPhase_label);
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
			this.mainDiv.style.left = `${parentRect.right-300}px`; // Adjusting left position
		} else {
			console.error("Invalid parent element provided.");
		}

		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.mainDiv);
		}
	}

	handleAddPhaseLabelClick = (handler, phaseDiv,masterDiv) => {
		this.addPhase_label.addEventListener("click", function () {
			handler(phaseDiv,masterDiv)
			
		})
	}

	handleEditProjectLabelClick = (handler, masterDiv, project) => {
		this.edit_label.addEventListener("click", function () {
			handler(masterDiv, project)
		})
	}

	handleDeleteLabelClick = (handler, project, masterDiv) => {
		this.delete_label.addEventListener("click", function () {
			handler(project, masterDiv)
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

		this.addTask_label = document.createElement("label");
		this.addTask_label.classList.add("click");
		this.addTask_label.style.color = "black";
		this.addTask_label.style.paddingTop = "5px";
		this.addTask_label.style.fontSize = "15px";
		this.addTask_label.textContent = "Add Task";
		this.mainDiv.appendChild(this.addTask_label);
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
			this.mainDiv.style.left = `${parentRect.right-210}px`; // Adjusting left position
		} else {
			console.error("Invalid parent element provided.");
		}

		// Append the created mainDiv to the specified parent element
		if (parentElement instanceof Element) {
			parentElement.appendChild(this.mainDiv);
		}
	}

	handleAddTaskLabelClick = (handler, taskDiv, masterDiv) => {
		this.addTask_label.addEventListener("click", function () {
			handler(taskDiv, masterDiv)

		})
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


	handleEditTaskLabelClick = (handler, masterDiv, task) => {
		this.edit_label.addEventListener("click", function () {
			handler(masterDiv, task)
		})
	}

	handleDeleteTaskLabelClick = (handler, task, masterDiv) => {
		this.delete_label.addEventListener("click", function () {
			handler(task, masterDiv)
		})
	}
}

class View {
	constructor() {
		this.projectDiv = document.getElementById("projectDiv")
		this.newProjectBtn = document.getElementById("newProjectBtn")
		this.body = document.getElementById("body")
	}

	handleNewProjectClick = (handler) => {
		this.newProjectBtn.addEventListener("click", function () {
			handler()
		})
	}
}

class Model {
	constructor(view, controller) {
		this.view = view
		this.controller = controller
		this.view.handleNewProjectClick(this.handleNewProjectClick)
		this.createProjectPopup = false;
		this.projectDrop = false;
		this.projectContext = false; 
		this.createPhasePopup = false; 
		this.editProjectLabel = false; 
		this.editPhaseLabel = false
		this.phaseDrop = false; 
		this.phaseContext = false;
		this.createTaskPopup = false; 
		this.taskContext = false
		this.editTaskLabel = false 
		this.projects = ""
		this.phases = ""
		this.tasks = "" 
		this.projectSelected = ""
		this.phaseSelected = ""

		this.controller.getProjectList(getCookie("token"))
			.then(response => response.text())
			.then(response => {
				if (response != "" && response != undefined) {
					this.projects = response
					for (let x = 0; x < this.projects.split(",").length; x++) {
						if (this.projects.split(",")[x] != "") {
							let project = new ProjectCard(this.view.projectDiv, this.projects.split(",")[x]);
							project.phaseDiv.classList.add("hidden")
							project.handleDropdownImgClick(this.handleProjectDropDownClick, project.mainDiv, project.phaseDiv, project)
							project.handleMoreImgClick(this.handleMoreImgClick, project.mainDiv, project)
							this.view.projectDiv.appendChild(document.createElement("br"))
						}
					}
				} else {
					console.log("project list response is empty")
				}
			})
	}

	bindTaskClick = (handler, task) => {
		task.taskLink.addEventListener("click", function () {
			handler(task)
		})
	}


	handleTaskClick = (task) => {
		setCookie("taskId", task.id)
		window.location.href="taskpage.html"
	}

	handleNewProjectClick = () => {
		if (!this.createProjectPopup) {
			this.createProject = new CreateProjectForm(this.view.body)
			this.createProject.handleSubmitBtnClick(this.handleSubmitNewProjectClick)
			this.createProjectPopup = true
		} else {
			this.view.body.removeChild(this.createProject.mainDiv)
			this.createProjectPopup = false
		}
		

	}

	handleSubmitNewProjectClick = () => {
		if (!(this.createProject.input.value == "") && !(this.projects.includes(this.createProject.input.value))) {

			this.controller.addProject(getCookie("token"), this.createProject.input.value)
				.then(response => response.text())
				.then(response => {
					if (response == "true") {
						this.projects += this.createProject.input.value + ","
						let project = new ProjectCard(this.view.projectDiv, this.createProject.input.value);
						project.mainDiv.id = this.createProject.input.value
						project.phaseDiv.classList.add("hidden")
						project.handleDropdownImgClick(this.handleProjectDropDownClick, project.mainDiv, project.phaseDiv,project)
						project.handleMoreImgClick(this.handleMoreImgClick, project.mainDiv, project)
						this.view.projectDiv.appendChild(document.createElement("br"))
						this.view.body.removeChild(this.createProject.mainDiv)
						this.createProjectPopup = false
					} else {
						console.error(response)
					}
				})
			
		} else {
			console.log("projects: " + this.projects)
			console.log("input: " + this.createProject.input.value)
		}
	}

	handleProjectDropDownClick = (maindiv,phasediv,project) => {
		if (this.projectDrop) {
			this.projectDrop = false
			maindiv.style.height = "100px"
			phasediv.classList.add("hidden")
			phasediv.innerHTML = ""
		
		} else {
			this.projectDrop = true
			this.projectSelected = project.projectNameHeader.innerHTML
			maindiv.style.height = "300px"
			phasediv.classList.remove("hidden")
			this.controller.getPhaseList(getCookie("token"), project.projectNameHeader.innerHTML)
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
	}

	handlePhaseDropDownClick = (mainDiv, taskDiv, phase) => {
		if (this.phaseDrop) {
			this.phaseDrop = false
			mainDiv.style.height = "100px"
			taskDiv.classList.add("hidden")
			taskDiv.innerHTML = ""

		} else {
			this.phaseSelected = phase.phaseNameHeader.textContent
			this.phaseDrop = true
			mainDiv.style.height = "300px"
			taskDiv.classList.remove("hidden")
			this.controller.getTaskList(getCookie("token"), this.projectSelected, this.phaseSelected)
				.then(response => response.text())
				.then(response => {
					if (response != "" && response != undefined) {
						let tasks = response
						for (let x = 0; x < tasks.split(",").length; x++) {
							if (tasks.split(",")[x] != "") {
								let taskCard = new Task(taskDiv, tasks.split(",")[x].split("*")[1])
								taskCard.id = tasks.split(",")[x].split("*")[0]
								taskCard.handleMoreImgClick(this.handleTaskMoreImgClick, mainDiv, taskCard, taskDiv)
								taskDiv.appendChild(document.createElement("br"))
								this.bindTaskClick(this.handleTaskClick, taskCard)
							}
						}
					} else {
						console.log("blank response");
					}
				})
		}
	}

	handlePhaseMoreImgClick = (masterDiv, phase,phaseDiv) => {
		if (this.phaseContext) {
			this.phaseContext = false
			phaseDiv.removeChild(this.phaseContextPopup.mainDiv)
		} else {
			this.phaseContext = true
			this.phaseContextPopup = new PhaseContextMenu(phaseDiv)
			this.phaseContextPopup.handleEditPhaseLabelClick(this.handleEditPhaseLabelClick, phaseDiv, phase)
			this.phaseContextPopup.handleAddTaskLabelClick(this.handleAddPhaseTaskLabelClick, phase.taskDiv, phaseDiv)
			this.phaseContextPopup.handleDeletePhaseLabelClick(this.handeDeletePhaseLabel, phase,phaseDiv)
		}
	}

	handleTaskMoreImgClick = (masterDiv, task, taskDiv) => {
		if (this.taskContext) {
			this.taskContext = false
			taskDiv.removeChild(this.taskContextPopup.mainDiv)
		} else {
			this.taskContext = true
			this.taskContextPopup = new TaskContextMenu(taskDiv)
			this.taskContextPopup.handleDeleteTaskLabelClick(this.handleDeleteTaskLabel, task, taskDiv)
			this.taskContextPopup.handleEditTaskLabelClick(this.handleEditTaskLabelClick, taskDiv, task)
		}
	}


	handleAddPhaseTaskLabelClick = (taskDiv, masterDiv) => {
		if (this.createTaskPopup) {

		} else {
			this.createTaskPopup = true
			this.newTask = new CreateNewTaskForm(masterDiv)
			this.newTask.handleSubmitBtnClick(this.handleSubmitNewTask, taskDiv, masterDiv)
			masterDiv.removeChild(this.phaseContextPopup.mainDiv)
			this.phaseContext = false 
		}

	}

	handleSubmitNewTask = (taskDiv, masterDiv) => {
		if (this.newTask.input.value != "") {
			this.controller.addTask(getCookie("token"), this.projectSelected, this.phaseSelected, this.newTask.input.value)
				.then(response => response.text())
				.then(response => {
					if (response != undefined) {
						let taskCard = new Task(taskDiv, this.newTask.input.value)
						taskCard.id = response
						taskCard.handleMoreImgClick(this.handleTaskMoreImgClick, masterDiv, taskCard, taskDiv)
						taskDiv.appendChild(document.createElement("br"))
						this.createTaskPopup = false;
						masterDiv.removeChild(this.newTask.mainDiv)
						this.bindTaskClick(this.handleTaskClick, taskCard)
					}
				})
		
		}
	}

	handleMoreImgClick = (masterDiv, project) => {
		if (this.projectContext) {
			this.projectContext = false
			this.view.body.removeChild(this.morePopup.mainDiv)
		} else {
			this.projectContext = true
			this.morePopup = new ProjectContextMenu(this.view.body)
			this.morePopup.handleAddPhaseLabelClick(this.handleAddPhaseLabelClick, project.phaseDiv, this.view.body)
			this.morePopup.handleEditProjectLabelClick(this.handleEditProjectLabelClick, this.view.body, project)
			this.morePopup.handleDeleteLabelClick(this.handleDeleteProjectLabel, project, this.view.body)
		}

	}

	handleEditPhaseLabelClick = (phaseDiv, phase) => {
		if (this.editPhaseLabel) {

		} else {
			this.editPaseLabel = true
			this.changePhaseName = new ChangePhaseForm(phaseDiv)
			this.changePhaseName.handleClickSubmitBtn(this.handleChangePhaseSubmitClick, phaseDiv, phase)
			phaseDiv.removeChild(this.phaseContextPopup.mainDiv)
			this.phaseContext = false
		}
	}

	handleEditTaskLabelClick = (taskDiv, task) => {
		if (this.editTaskLabel) {

		} else {
		
			this.editTaskLabel = true
			this.changeTaskName = new ChangeTaskForm(taskDiv)
			this.changeTaskName.handleClickSubmitBtn(this.handleChangeTaskSubmitClick, taskDiv, task)
			this.taskContext = false
			taskDiv.removeChild(this.taskContextPopup.mainDiv)

		}
	}

	handleChangeTaskSubmitClick = (taskDiv, task) => {
		if (this.changeTaskName.input.value != "") {
			this.controller.editTask(getCookie("token"), this.projectSelected, this.phaseSelected, task.taskLink.textContent,
				this.changeTaskName.input.value)
				.then(response => response.text())
				.then(response => {
					if (response == "true") {
						task.taskLink.textContent = this.changeTaskName.input.value
						this.editTaskLabel = false
						taskDiv.removeChild(this.changeTaskName.mainDiv)
					} else {
						console.log(response)
					}
				})
		
		}
	}

	handleChangePhaseSubmitClick = (phaseDiv, phase) => {
		if (this.changePhaseName.input.value != "") {
			this.controller.editPhase(getCookie("token"), this.projectSelected, phase.phaseNameHeader.textContent, this.changePhaseName.input.value)
				.then(response => response.text())
				.then(response => {
					if (response == "true") {
						phase.phaseNameHeader.textContent = this.changePhaseName.input.value
						this.editPhaseLabel = false
						phaseDiv.removeChild(this.changePhaseName.mainDiv)
					} else {
						console.log(response)
					}
				})
			
		}
	}

	



	handleEditProjectLabelClick = (masterDiv, project) => {
		if (this.editProjectLabel) {

		} else {
			this.editProjectLabel = true
			this.changeProjectName = new EditForm(masterDiv)
			this.changeProjectName.handleClickSubmitBtn(this.handleChangeProjectSubmitClick, masterDiv,project)
			masterDiv.removeChild(this.morePopup.mainDiv)
			this.projectContext = false
		}
	}

	handleChangeProjectSubmitClick = (masterDiv, project) => {
		if (this.changeProjectName.input.value != "") {
			this.controller.editProject(getCookie("token"), project.projectNameHeader.textContent, this.changeProjectName.input.value)
				.then(response => response.text())
				.then(response => {
					if (response == "true") {
						project.projectNameHeader.textContent = this.changeProjectName.input.value
						this.editProjectLabel = false
						masterDiv.removeChild(this.changeProjectName.mainDiv)
					} else {
						console.log(response)
					}
				})
			
		}
	}

	handleAddPhaseLabelClick = (phaseDiv, masterDiv) => {
		if (this.createPhasePopup) {
		
		} else {
			this.createPhasePopup = true
			this.phaseMore = new CreateNewPhaseForm(masterDiv)
			this.phaseMore.handleSubmitBtnClick(this.handleSubmitNewPhase, phaseDiv, masterDiv)
			masterDiv.removeChild(this.morePopup.mainDiv)
			this.projectContext = false
		}
		
	}

	handleSubmitNewPhase = (phaseDiv, masterDiv) => {
		if (this.phaseMore.input.value != "") {
			this.controller.addPhase(getCookie("token"), this.projectSelected, this.phaseMore.input.value)
				.then(response => response.text())
				.then(response => {
					if (response == "true") {
						let phaseCard = new PhaseCard(phaseDiv, this.phaseMore.input.value)
						phaseDiv.appendChild(document.createElement("br"))
						phaseCard.handleDropdownImgClick(this.handlePhaseDropDownClick, phaseCard.mainDiv, phaseCard.taskDiv, phaseCard)
						phaseCard.handleMoreImgClick(this.handlePhaseMoreImgClick, phaseCard.mainDiv, phaseCard, phaseDiv)
						this.createPhasePopup = false;
						masterDiv.removeChild(this.phaseMore.mainDiv)
					} else {
						console.log(response)
					}
				})
		
		}
	}

	handleDeleteTaskLabel = (task, taskDiv) => {
		this.controller.deleteTask(getCookie("token"), this.projectSelected, this.phaseSelected, task.taskLink.textContent)
			.then(response => response.text())
			.then(response => {
				if (response == "true") {
					taskDiv.removeChild(task.mainDiv)
					taskDiv.removeChild(this.taskContextPopup.mainDiv)
				} else {
					console.log(response)
				}
			})
		
	}

	handeDeletePhaseLabel = (phase, phaseDiv) => {
		this.controller.deletePhase(getCookie("token"), this.projectSelected, phase.phaseNameHeader.textContent)
			.then(response => response.text())
			.then(response => {
				if (response == "true") {
					phaseDiv.removeChild(phase.mainDiv)
					phaseDiv.removeChild(this.phaseContextPopup.mainDiv)
				}
			})
		
	}

	handleDeleteProjectLabel = (project, masterDiv) => {

		this.controller.deleteProject(getCookie("token"), project.projectNameHeader.textContent)
			.then(response => response.text())
			.then(response => {
				if (response == "true") {
					this.view.projectDiv.removeChild(project.mainDiv)
					console.log("delete: " + project.projectNameHeader.textContent + ",")
					this.projects = this.projects.replace(project.projectNameHeader.textContent + ",", "")
				} else {
					console.log(response)
				}
			})
	

	}

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

	getTaskList(token, projectName, phaseName) {
		projectName = projectName.replace("%20", " ")
		return fetch(this.fetch_url_project + "getTaskList/" + token + "/" + projectName + "/" + phaseName, {
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

	addTask(token, projectName, phaseName, taskName) {
		projectName = projectName.replace("%20", " ")
		return fetch(this.fetch_url_project + "addTask/" + token + "/" + projectName + "/" + phaseName + "/" + taskName, {
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

	deleteTask(token, projectName, phaseName, taskName) {
		projectName = projectName.replace("%20", " ")
		return fetch(this.fetch_url_project + "deleteTask/" + token + "/" + projectName + "/" + phaseName + "/" + taskName, {
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

	editTask(token, projectName, phaseName, taskName, newName) {
		projectName = projectName.replace("%20", " ")
		return fetch(this.fetch_url_project + "editTask/" + token + "/" + projectName + "/" + phaseName + "/" + taskName+ "/" +newName, {
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