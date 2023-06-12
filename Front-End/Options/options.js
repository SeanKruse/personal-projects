// Get menu items and cards
const menuItems = document.querySelectorAll(".menu-item");
const cards = document.querySelectorAll(".card:not(.splash-card)");
const splashCard = document.querySelector(".splash-card");
const helpCarousel = document.getElementById("help-carousel");
const helpCardsContainer = document.querySelector(".help-cards-container");
const helpCards = document.querySelectorAll(".help-info");
const aboutUsCard = document.querySelector("#about-us-card");
// Get the new team member cards
const teamMemberCards = document.querySelectorAll(".team-member");
const googleDocsCard = document.querySelector("#google-docs-card");
// Get the font size and family select elements
const fontSizeSelect = document.getElementById("default-text-font-size");
const fontFamilySelect = document.getElementById("document-font-family");
const titleFontSizeSelect = document.getElementById("default-title-font-size");
const headerFontSizeSelect = document.getElementById("default-header-font-size");
// Google Docs Carousel Functionality
const googleDocsCarousel = document.querySelector(".google-docs-carousel");
const googleDocsCardsContainer = document.querySelector(".google-docs-cards-container");
const googleDocsCards = document.querySelectorAll(".google-docs-card-item");
// Google Docs Carousel Functionality
const googleDocsPrevBtn = document.getElementById("googleDocsPrevBtn");
const googleDocsNextBtn = document.getElementById("googleDocsNextBtn");

// Help Card Carousel Functionality
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let googleDocsCardIndex = 0;

function showCurrentGoogleDocsCard() {
	googleDocsCards.forEach((card, index) => {
		if (index === googleDocsCardIndex) {
			card.style.display = "block";
		} else {
			card.style.display = "none";
		}
	});
}

googleDocsPrevBtn.addEventListener("click", () => {
	googleDocsCardIndex--;
	if (googleDocsCardIndex < 0) {
		googleDocsCardIndex = googleDocsCards.length - 1;
	}
	showCurrentGoogleDocsCard();
});

googleDocsNextBtn.addEventListener("click", () => {
	googleDocsCardIndex++;
	if (googleDocsCardIndex >= googleDocsCards.length) {
		googleDocsCardIndex = 0;
	}
	showCurrentGoogleDocsCard();
});

showCurrentGoogleDocsCard();

let currentCardIndex = 0;

function showCurrentCard() {
	helpCards.forEach((card, index) => {
		if (index === currentCardIndex) {
			card.style.display = "block";
		} else {
			card.style.display = "none";
		}
	});
}

prevBtn.addEventListener("click", () => {
	currentCardIndex--;
	if (currentCardIndex < 0) {
		currentCardIndex = helpCards.length - 1;
	}
	showCurrentCard();
});

nextBtn.addEventListener("click", () => {
	currentCardIndex++;
	if (currentCardIndex >= helpCards.length) {
		currentCardIndex = 0;
	}
	showCurrentCard();
});

showCurrentCard();

// Get the preview area
const previewArea = document.querySelector(".preview-area");

// Add change event listeners to the font size and family select elements
fontSizeSelect.addEventListener("change", updatePreview);
fontFamilySelect.addEventListener("change", updatePreview);
titleFontSizeSelect.addEventListener("change", updatePreview);
headerFontSizeSelect.addEventListener("change", updatePreview);

// Function to update the preview area
function updatePreview() {
	const fontSize = parseInt(fontSizeSelect.value);
	const fontFamily = fontFamilySelect.value;
	const titleFontSize = parseInt(titleFontSizeSelect.value);
	const headerFontSize = parseInt(headerFontSizeSelect.value);

	const scaledFontSize = fontSize * 2;
	const scaledTitleFontSize = titleFontSize * 2;
	const scaledHeaderFontSize = headerFontSize * 2;

	previewArea.style.fontFamily = fontFamily;
	previewArea.textContent = "";

	const titleElement = document.createElement("h1");
	titleElement.textContent = "Document Title";
	titleElement.style.fontSize = `${scaledTitleFontSize}px`;

	const headerElement = document.createElement("h2");
	headerElement.textContent = "Section Header";
	headerElement.style.fontSize = `${scaledHeaderFontSize}px`;

	const textElement = document.createElement("p");
	textElement.textContent = "Section Text";
	textElement.style.fontSize = `${scaledFontSize}px`;

	previewArea.appendChild(titleElement);
	previewArea.appendChild(headerElement);
	previewArea.appendChild(textElement);
}

// Show the splash card by default
splashCard.classList.add("is-active");

// Function to hide all cards
function hideAllCards() {
	cards.forEach((card) => {
		card.classList.remove("is-active");
	});

	// Hide help cards after they are displayed
	helpCards.forEach((card) => {
		card.classList.remove("is-active");
	});
}

function showCardByItemText(itemText, item) {
	hideAllCards();
	menuItems.forEach((item) => item.classList.remove("is-active"));
	item.classList.add("is-active");
	splashCard.classList.remove("is-active");

	const docSwitchContainer = document.querySelector(".doc-switch-container");
	docSwitchContainer.style.display = "none";

	// Hide Google Docs Carousel
	googleDocsCarousel.classList.remove("is-active");

	// Hide Help Carousel
	helpCarousel.classList.remove("is-active");

	switch (itemText) {
		case "About Us":
			aboutUsCard.classList.add("is-active");
			teamMemberCards.forEach((card) => card.classList.add("is-active"));
			break;
		case "Google Docs":
			googleDocsCard.classList.add("is-active");
			googleDocsCarousel.classList.add("is-active");
			docSwitchContainer.style.display = "flex";
			break;
		case "Help":
			helpCarousel.classList.add("is-active");
			break;
		default:
			const index = [...menuItems].indexOf(item);
			cards[index].classList.add("is-active");
	}
}

// Add click event listener to each menu item
menuItems.forEach((item) => {
	item.addEventListener("click", () => {
		const itemText = item.textContent.trim();
		showCardByItemText(itemText, item);
	});
});

function initHelpCarousel() {
	const helpCardsContainer = document.querySelector(".help-cards-container");
	const helpCards = document.querySelectorAll(".help-info");
	const prevBtn = document.getElementById("prevBtn");
	const nextBtn = document.getElementById("nextBtn");
	let currentCardIndex = 0;

	prevBtn.addEventListener("click", () => {
		if (currentCardIndex > 0) {
			currentCardIndex--;
			helpCardsContainer.style.transform = `translateX(-${100 * currentCardIndex}%)`;
		}
	});

	nextBtn.addEventListener("click", () => {
		if (currentCardIndex < helpCards.length - 1) {
			currentCardIndex++;
			helpCardsContainer.style.transform = `translateX(-${100 * currentCardIndex}%)`;
		}
	});
}

window.onload = () => {
	// Existing onload code
	initHelpCarousel();
};

document.getElementById("export-button").addEventListener("click", function (event) {
	chrome.runtime.sendMessage({
		action: "saveSettings",
		fontType: document.getElementById("document-font-family").value,
		titleFontSize: document.getElementById("default-title-font-size").value,
		headerFontSize: document.getElementById("default-header-font-size").value,
		textFontSize: document.getElementById("default-text-font-size").value,
		defaultNumSections: document.getElementById("default-sections").value,
		highlightColor: "0828c7",
	});
});

window.onload = () => {
	chrome.storage.local.get([
    "storageFontType", 
    "storageTitleFontSize", 
    "storageHeaderFontSize", 
    "storageTextFontSize", 
    "storageDefaultNumSections",
	 "storageDocSwitch"
	], function (data) {
		if(data.storageDocSwitch){
			document.getElementById("doc-switch").checked = data.storageDocSwitch
		}
		if (data.storageFontType) {
			document.getElementById("document-font-family").value = data.storageFontType;
		} else {
			document.getElementById("document-font-family").value = "Lato";
		}
		if (data.storageTitleFontSize) {
			document.getElementById("default-title-font-size").value = data.storageTitleFontSize;
		} else {
			document.getElementById("default-title-font-size").value = "22pt";
		}
		if (data.storageHeaderFontSize) {
			document.getElementById("default-header-font-size").value = data.storageHeaderFontSize;
		} else {
			document.getElementById("default-header-font-size").value = "16pt";
		}
		if (data.storageTextFontSize) {
			document.getElementById("default-text-font-size").value = data.storageTextFontSize;
		} else {
			document.getElementById("default-text-font-size").value = "12pt";
		}
		if (data.storageDefaultNumSections) {
			document.getElementById("default-sections").value = data.storageDefaultNumSections;
		} else {
			document.getElementById("default-sections").value = 1;
		}
	});
};

// Functionality for Google Docs and MS Word switch
document.getElementById("doc-switch").addEventListener("click", () => {
	chrome.runtime.sendMessage({
		action: "saveDocSwitch",
		checked: document.getElementById("doc-switch").checked,
	});
});
