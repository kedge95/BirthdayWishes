//get elements from the dom
const form = document.getElementById("cardForm");
const name = document.getElementById("nameInput");
const from = document.getElementById("fromInput");
const message = document.getElementById("message");
const flair = document.getElementById("flair");
const submit = document.getElementById("submit");
const cardContainer = document.getElementById("cardContainer");
const errors = document.getElementById("errorMessage");
let errorCounter = 0
let parent = ""

function initialDelete () {
   parent = event.target.parentElement
   cardContainer.removeChild(parent);
   console.log(parent)
};

function initialFeature () {
   parent = event.target.parentElement
   parent.classList.toggle("featureToggle");
   console.log(parent)
};

function makeCard (name, message, flair) {
  const card = document.createElement("div");
  card.className= "card"
  const nameText = name.value.trim();
  const messageText = message.value.trim();
  // const flairInput = flair.src.value.trim();
  let fromValue = from.value.trim();
  let fromMessage;


  if(errorCounter < 1){
    if ((fromValue) != "") {
    fromMessage= "From: " + fromValue;
  }
  else {
    fromMessage= ""
  }

  card.innerHTML= `
    <h2>Happy Birthday ${nameText}!</h2>
    <span class="inputLabels">${fromMessage}</span><br>
    <span class="inputLabels">${messageText}<span>
    <img src="${flair.value.trim()}" class="cardFlair" />
  `;


  const deleteButton = document.createElement("button"); 
  deleteButton.textContent = "Delete"; 
  deleteButton.className = "deleteButton"; 
  deleteButton.onclick= function() { 
    cardContainer.removeChild(card); 
  };  

  const featureButton = document.createElement("button");
  featureButton.textContent= "Feature";
  featureButton.classList.add("featureButton");
  featureButton.onclick= function () {
    card.classList.toggle("featureToggle");
  };

  card.appendChild(featureButton);
  card.appendChild(deleteButton);
  cardContainer.appendChild(card);

  name.value= "";
  from.value= "";
  message.value= "";
  flair.value= "";

}};


document.getElementById("submit").addEventListener("click", (event)=> {
  event.preventDefault();
  validateInputs(name, message, flair);

  makeCard(name, message, flair)
});

function validateInputs(name, message, flair) {
  errorCounter = 0
  validateName(name);
  validateMessage(message);
  validateFlair(flair);
}

function validateName (name) {
  const label = document.getElementById("nameLabel");

  if (name.value.length < 2) {
    name.setCustomValidity("Name must be at least 2 charecters.");
    name.reportValidity();
    errorCounter++
  }

  
}

function validateMessage(message) {
  const label = document.getElementById("flairMessage");

  if (message.value.length < 1) {
    message.setCustomValidity("Include a short message, anything really");
    message.reportValidity();
    errorCounter++
  }

}

function validateFlair(flair) {
  const label = document.getElementById("giffy");
  let validCheck = flair.validity.valid;

  if (validCheck != true) {
    flair.reportValidity();
    errorCounter++
  }
  

  console.log(validCheck);
};

document.getElementById("submit").addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
    event.preventDefault();
    form.dispatchEvent(new Event('submit'));
  }
});
