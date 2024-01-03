export default class Pinlock {
    constructor(parent, element) {
        this.element = element;
        //Initialize the parent div for the pinlock element
        this.pinLockElement = document.createElement("div");
        //TODO: construct the pinlock element
        this.pinLockElement.style = "background-color: #6B6B6B; width: 300px; height: 100px; margin-left: 450px; position: absolute; border-radius: 10px";
        let background = document.createElement("div");
        background.style = "background-color: #191919; width: 253px; height: 70px; position: absolute; right: 25px; top: 15px;"


        let inputDiv1 = document.createElement("div");
        inputDiv1.style = "background-color: #D8D8D8; width: 50px; height: 50px; position: absolute; top: 10px; left: 10px"

        this.input1 = document.createElement("input");
        this.input1.style = "background-color: transparent; width: 50px; height: 50px; padding-left: 18px;"
        this.input1.type = "text";
        this.input1.maxlength = "1";
        this.input1.placeholder = "0";

        inputDiv1.appendChild(this.input1);
        background.appendChild(inputDiv1);

        let inputDiv2 = document.createElement("div");
        inputDiv2.style = "background-color: #D8D8D8; width: 50px; height: 50px; position: absolute; top: 10px; left: 70px"

        this.input2 = document.createElement("input");
        this.input2.style = "background-color: transparent; width: 50px; height: 50px; padding-left: 18px;"
        this.input2.type = "text";
        this.input2.maxlength = "1";
        this.input2.placeholder = "0";

        inputDiv2.appendChild(this.input2);
        background.appendChild(inputDiv2);

        let inputDiv3 = document.createElement("div");
        inputDiv3.style = "background-color: #D8D8D8; width: 50px; height: 50px; position: absolute; top: 10px; left: 130px"

        this.input3 = document.createElement("input");
        this.input3.style = "background-color: transparent; width: 50px; height: 50px; padding-left: 18px;"
        this.input3.type = "text";
        this.input3.maxlength = "1";
        this.input3.placeholder = "0";

        inputDiv3.appendChild(this.input3);
        background.appendChild(inputDiv3);

        let inputDiv4 = document.createElement("div");
        inputDiv4.style = "background-color: #D8D8D8; width: 50px; height: 50px; position: absolute; top: 10px; left: 190px"

        this.input4 = document.createElement("input");
        this.input4.style = "background-color: transparent; width: 50px; height: 50px; padding-left: 18px;"
        this.input4.type = "text";
        this.input4.maxlength = "1";
        this.input4.placeholder = "0";

        inputDiv4.appendChild(this.input4);
        background.appendChild(inputDiv4);


        this.pinLockElement.appendChild(background);

        parent.appendChild(this.pinLockElement);

        // console.log(this.pinLockElement);
        //   console.log(background);


        //set the position of the pinlock element to the position of the element passed in
        this.pinLockElement.style.top = element.style.top;
        this.pinLockElement.style.left = element.style.left;

        //lock the passed element
        this.lockElement();
        this.lock = true;
    }

    attachInputEventListenerHandler = handler => {
        let isfull = this.isFull;
        this.input4.addEventListener("input", function () {
            //  console.log("pinlock input event handler isfull " + isfull)
            if (isfull) {
                //  console.log("class pinlock input handler")
                handler();
            }
        });
    }

    clearInput() {
        this.input1.value = null;
        this.input2.value = null;
        this.input3.value = null;
        this.input4.value = null;
    }

    lockElement() {
        this.clearInput();
        this.element.classList.add("hidden");
        this.pinLockElement.classList.remove("hidden");
        this.lock = true
    }

    showElement() {
        this.element.classList.remove("hidden");
    }

    removePinlock() {
        this.pinLockElement.classList.add("hidden");
        this.showElement();
        this.lock = false
    }

    input() {
        let input = "";
        input = this.input1.value + this.input2.value + this.input3.value + this.input4.value
        return input
    }

    isFull() {
        // console.log("class pinlcok isFull() " + this.input1.value.length) 
        // console.log("class pinlcok isFull() " + this.input2.value.length)
        // console.log("class pinlcok isFull() " + this.input3.value.length)
        // console.log("class pinlcok isFull() " + this.input4.value.length)
        if (this.input1.value.length > 0) {
            if (this.input2.value.length > 0) {
                if (this.input3.value.length > 0) {
                    if (this.input4.value.length > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

}
