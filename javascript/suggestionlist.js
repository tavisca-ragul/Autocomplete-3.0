const nameList = [
	"Ragul", 
	"Rajpreet", 
	"Pallvi", 
	"Neha", 
	"Ankita", 
	"Raja", 
	"Shreea", 
	"Smriti", 
	"Shrijeet", 
	"Ayush", 
	"Swapnil", 
	"Nihit", 
	"Bhargavi", 
	"Anushka", 
	"Swinal", 
	"Utkarsh", 
	"Saurabh", 
	"Paarth", 
	"Vishwas", 
	"Mohit", 
	"Gurbaksh", 
	"Ashwarya"
];

const nameSuggestions = {
	actionurl: "nameSuggestions",
	name: {
		actionurl: "name",
		list :{
			activeurl: "",
			className: "key-hover"
		},
		pattern: null,
		value: "",
		input: (args) => {
			nameSuggestions.name.value = args.target.value;
			nameSuggestions.name.pattern = new RegExp(nameSuggestions.name.value, 'i');
			const ulElement = document.getElementById(nameSuggestions.actionurl);
			ulElement.innerText = "";
			if(nameSuggestions.name.value === "")
				return;
			for(let list of nameList) {
				if(list.toLowerCase().match(nameSuggestions.name.pattern)) {
					const liElement = document.createElement("li");
					liElement.setAttribute("id", list);
					liElement.innerText = list;
					ulElement.appendChild(liElement);
					document.getElementById(list).addEventListener("click", nameSuggestions.name.action);
				}
			}
			if(!ulElement.hasChildNodes()) {
				const liElement = document.createElement("li");
				liElement.setAttribute("id", "listMessage");
				liElement.innerText = "No names found";
				ulElement.appendChild(liElement);
			}
		},
		keydown: (args) => {
			if((args.which === 38 || args.which === 40) && document.getElementById(nameSuggestions.actionurl).hasChildNodes()) {
				const nameSuggestionsElement = document.getElementById(nameSuggestions.actionurl);
				if(nameSuggestions.name.list.activeurl === "" || document.getElementById(nameSuggestions.name.list.activeurl) === null) {
					nameSuggestionsElement.firstChild.classList.add(nameSuggestions.name.list.className);
					nameSuggestions.name.list.activeurl = nameSuggestionsElement.firstChild.id;
				} else {
					const activeList = document.getElementById(nameSuggestions.name.list.activeurl);
					const listIndex = (Array.from(nameSuggestionsElement.children).indexOf(activeList) - 3) * 30;
					nameSuggestionsElement.scrollTop = listIndex;
					activeList.classList.remove(nameSuggestions.name.list.className);
					if(args.which === 38) {
						if(activeList.previousSibling === null) {
							nameSuggestionsElement.lastChild.classList.add(nameSuggestions.name.list.className);
							nameSuggestions.name.list.activeurl = nameSuggestionsElement.lastChild.id;
							nameSuggestionsElement.scrollTop = nameSuggestionsElement.scrollHeight;
						} else {
							activeList.previousSibling.classList.add(nameSuggestions.name.list.className);
							nameSuggestions.name.list.activeurl = activeList.previousSibling.id;
						}
					} else if(args.which == 40) {
						if(activeList.nextSibling === null) {
							nameSuggestionsElement.firstChild.classList.add(nameSuggestions.name.list.className);
							nameSuggestions.name.list.activeurl = nameSuggestionsElement.firstChild.id;
							nameSuggestionsElement.scrollTop = 0;
						} else {
							activeList.nextSibling.classList.add(nameSuggestions.name.list.className);
							nameSuggestions.name.list.activeurl = activeList.nextSibling.id;
						}
					}
				}
			} else if(args.which === 13 && nameSuggestions.name.list.activeurl !== ""){
				const nameElement = document.getElementById(nameSuggestions.name.actionurl);
				const activeList = document.getElementById(nameSuggestions.name.list.activeurl);
				const ulElement = document.getElementById(nameSuggestions.actionurl);
				nameElement.value = nameSuggestions.name.value = activeList.id;
				ulElement.innerText = "";
			} else {
				nameSuggestions.name.list.activeurl = "";
			}
		},
		action: (args) => {
			const nameElement = document.getElementById(nameSuggestions.name.actionurl);
			const ulElement = document.getElementById(nameSuggestions.actionurl);
			nameElement.value = nameSuggestions.name.value = args.target.innerText;
			ulElement.innerText = "";
		},
		clearInput: {
			actionurl: "clearInput",
			action: () => {
				const clearInputElement = document.getElementById(nameSuggestions.name.clearInput.actionurl);
				const inputElement = document.getElementById(nameSuggestions.name.actionurl);
				inputElement.value = nameSuggestions.name.value = "";
			}
		}
	}
};

const handleElementsVisiblity = {
	nameInputHolder: {
		actionurl: "nameInputHolder",
		action: (args) => {
			if(args.target.id !== "" && document.getElementById(args.target.id) !== null) {
				const clickedElement = document.getElementById(args.target.id);
				const nameInputHolder = document.getElementById(handleElementsVisiblity.nameInputHolder.actionurl);
				if(clickedElement.parentNode !== nameInputHolder)
					document.getElementById(nameSuggestions.actionurl).style.display = "none";
			} else 
				document.getElementById(nameSuggestions.actionurl).style.display = "none";
		}
	},
	nameInput: {
		actionurl: "name",
		input: (args) => {
			if(args.target.id !== "" && document.getElementById(args.target.id) !== null) {
				const inputElement = document.getElementById(args.target.id);
				const nameInput = document.getElementById(handleElementsVisiblity.nameInput.actionurl);
				if(inputElement === nameInput && nameInput.value !== "")
					document.getElementById(nameSuggestions.name.clearInput.actionurl).style.display = "block";
				else
					document.getElementById(nameSuggestions.name.clearInput.actionurl).style.display = "none";
			}
		},
		action: (args) => {
			if(args.target.id !== "" && document.getElementById(args.target.id) !== null) {
				const clickedElement = document.getElementById(args.target.id);
				const nameInput = document.getElementById(handleElementsVisiblity.nameInput.actionurl);
				if(clickedElement === nameInput)
					document.getElementById(nameSuggestions.actionurl).style.display = "block";
			}
		}
	},
	clearInput: {
		actionurl: "clearInput",
		action: (args) => {
			if(args.target.id !== "" && document.getElementById(args.target.id) !== null) {
				const clickedElement = document.getElementById(args.target.id);
				const clearInput = document.getElementById(handleElementsVisiblity.clearInput.actionurl);
				if(clickedElement === clearInput) {
					clearInput.style.display = "none";
					nameSuggestions.name.action(args);
				}
			}
		}
	}
};

function loadEvents() {
	let elem;
	if(document.getElementById(nameSuggestions.name.actionurl) !== null) {
		elem = document.getElementById(nameSuggestions.name.actionurl);
		elem.addEventListener("input", nameSuggestions.name.input);
		elem.addEventListener("keydown", nameSuggestions.name.keydown);
	}

	if(document.getElementById(nameSuggestions.name.clearInput.actionurl) !== null) {
		elem = document.getElementById(nameSuggestions.name.clearInput.actionurl);
		elem.addEventListener("click", nameSuggestions.name.clearInput.action);
	}
}

function loadClickVisibilityEvents(args) {
	if(document.getElementById(handleElementsVisiblity.nameInputHolder.actionurl) !== null)
		handleElementsVisiblity.nameInputHolder.action(args);

	if(document.getElementById(handleElementsVisiblity.nameInput.actionurl) !== null)
		handleElementsVisiblity.nameInput.action(args);

	if(document.getElementById(handleElementsVisiblity.clearInput.actionurl) !== null)
		handleElementsVisiblity.clearInput.action(args);
}

function loadInputVisibilityEvents(args) {
	if(document.getElementById(handleElementsVisiblity.nameInput.actionurl) !== null)
		handleElementsVisiblity.nameInput.input(args);
}

window.addEventListener("click", loadClickVisibilityEvents);
window.addEventListener("input", loadInputVisibilityEvents);
window.addEventListener("load", loadEvents);
