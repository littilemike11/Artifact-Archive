//SHIFT + INSERT TO PASTE INTO GIT BASH
// archaeologist game where you discover and classify new unidentified artifacts
// add and store these artifacts
// search for these artifact

//list of artifacts
let currentArtifact = "";
let collection = [];

// definition of Artifact CLASS that user can access, define and modify
const artifactClass = {
  //start off with no properties only methods

  /** Sets a property with given value. Creates the property if it doesn't exist
   * @param {String} propertyName Name of Property to be added to local Artifact object.
   * @param {*} value Optional initial value of property. Default is an empty string.
   */
  setProperty: function (propertyName, value = "") {
    this[propertyName] = value;
  },

  /** Delete property
   * @param {string} propertyName Name of Property to be removed from local Artifact object
   */
  deleteProperty: function (propertyName) {
    //check if property is not a function /methods, delete otherwise
    if (typeof this[propertyName] !== "function") {
      delete this[propertyName];
    } else console.log("cant delete a core function");
  },

  hasProperty: function (propertyName) {
    for (let key in this) {
      if (key == propertyName) {
        return true;
      }
    }
    return false;
  },

  /**
   * Get value of given property
   * @param {string} propertyName
   * @returns value of given property
   */
  getPropertyValue: function (propertyName) {
    return this[propertyName];
  },

  getAllProperties: function () {
    // another way
    // Object.keys(this).forEach((key) => {
    //   if (typeof this[key] !== "function") {
    //     console.log("Property: " + key + ", Value: " + this[key]);
    //   }
    // });
    let properties = ``;
    for (let key in this) {
      if (typeof this[key] !== "function" && key !== "appearance") {
        //console.log("Property: " + key + ", Value: " + this[key]);
        properties += `Property: ${key} , Value: ${this[key]}\n`;
        //console.log(properties);
      }
    }
    return properties;
  },
};

//control room buttons + logic
//display searches
const searchResult = document.getElementById("searchResult");
const searchResultHeading = document.getElementById("searchResultHeading");
//get all properties
const getAllPropertiesButton = document.getElementById(
  "getAllPropertiesButton"
);
//made function cuz used in other places (ie swap)
function getAllProperties() {
  searchResultHeading.textContent = "Search Results";
  if (currentArtifact) {
    searchResult.innerText = currentArtifact.getAllProperties();
  } else {
    searchResult.textContent = "No Artifact Selected";
  }
}
getAllPropertiesButton.addEventListener("click", getAllProperties);

//set properties
const setPropertyNameInput = document.getElementById("setPropertyName");
const setPropertyValueInput = document.getElementById("setPropertyValue");
const setPropertyButton = document.getElementById("setPropertyButton");
setPropertyButton.addEventListener("click", () => {
  //if prop name entered then enter value
  searchResultHeading.textContent = "Search Results";
  if (setPropertyNameInput.value) {
    currentArtifact.setProperty(
      setPropertyNameInput.value,
      setPropertyValueInput.value
    );
  } else {
    searchResult.textContent = "Please Enter Property Name";
    return;
  }
  //clear input
  setPropertyNameInput.value = "";
  setPropertyValueInput.value = "";
  //display in search result
  getAllProperties();
});

//filter properties
const filterPropertyNameInput = document.getElementById("filterPropertyName");
const filterPropertyValueInput = document.getElementById("filterPropertyValue");
const filterButton = document.getElementById("filterButton");

filterButton.addEventListener("click", () => {
  searchResult.textContent = "";
  searchResultHeading.textContent = "Search Results";
  let result;
  if (filterPropertyNameInput.value && !filterPropertyValueInput.value) {
    result = filterCollectionByProperty(filterPropertyNameInput.value);
  } else if (filterPropertyNameInput.value && filterPropertyValueInput.value) {
    result = filterCollectionByPropertyValue(
      filterPropertyNameInput.value,
      filterPropertyValueInput.value
    );
  } else {
    searchResult.textContent = "Please enter Property";
    return;
  }
  //clear input
  filterPropertyNameInput.value = "";
  filterPropertyValueInput.value = "";
  console.log(result);
  if (result.length == 0) {
    searchResult.textContent = "No Artifacts Found";
    return;
  } else {
    searchResultHeading.textContent = `Search Results (${result.length}) `;
  }
  // result.map((item) => {
  //   searchResult.appendChild(item.appearance);
  // });
  for (const key of result) {
    console.log(key.appearance);
    searchResult.innerText += key.getAllProperties();
    searchResult.innerText += "\n";

    // searchResult.appendChild(key);
  }
  //display in search result
  //searchResult.innerText = currentArtifact.getAllProperties();
});
//#region START OF FUNCTIONS FOR GLOBAL ARTIFACT CLASS
//
function discoverArtifact() {
  let newArtifact = {};
  // Object.keys(artifactClass).forEach(
  //   (key) => (newArtifact[key] = artifactClass[key])
  // );
  for (let prop in artifactClass) {
    newArtifact[prop] = artifactClass[prop];
  }
  newArtifact.appearance = createRandomArtifact();
  collection.push(newArtifact);
  artifactDisplay.appendChild(newArtifact.appearance);
  currentArtifact = newArtifact;

  // be able to edit previously processed artifacts
  //swap current with one u clicked on
  //if html element is clicked
  newArtifact.appearance.addEventListener("click", () => {
    // console.log(newArtifact);
    // console.log(newArtifact.appearance);
    // swap positiions
    collectionDisplay.appendChild(artifactDisplay.lastChild);
    artifactDisplay.appendChild(newArtifact.appearance);
    currentArtifact = newArtifact; //currentArtifact is of type Artifact Class
    getAllProperties();
  });

  return newArtifact;
}

/** Sets a property with given value. Creates the property if it doesn't exist
 * @param {String} propertyName Name of Property to be added to Artifact Class.
 * @param {*} value Optional initial value of property. Default is an empty string.
 */
function setProperty(propertyName, value = "") {
  artifactClass[propertyName] = value;
}
/**
 * @param {string} propertyName Name of Property to be removed from Artifact Class
 */
function deleteProperty(propertyName) {
  // NOTE: delete artifact.propertyName; DOESNT WORK
  delete artifactClass[propertyName];
}

function clearArtifactObject() {
  // 2 ways of deleting all properties
  //Object.keys(artifactClass).forEach((key) => delete artifactClass[key]);

  for (let key in artifactClass) {
    delete artifactClass[key];
  }

  //can also do artifact ={};
  //if artifact is declared with let instead of const
}
//
//#endregion END OF FUNCTIONS FOR GLOBAL ARTIFACT CLASS

//#region START OF COLLECTION FUNCTIONS
function getCollection() {
  console.log(collection);
  collection.forEach((element) => console.log(element));
  return collection;
}
function getCollectionLength() {
  console.log(collection.length);
  return collection.length;
}
/**
 * @param {string} propertyName Name of property to filter collection by
 * @returns returns an Array with all artifacts that have the property
 */
function filterCollectionByProperty(propertyName) {
  result = collection.filter((element) => element.hasProperty(propertyName));
  console.log(result);
  return result;
}
/**
 * @param {string} propertyName Name of property to filter collection by
 * @param {*} expectedValue value to compare artifact property with
 * @returns returns an Array with all artifacts where property has a value of expected value
 */
function filterCollectionByPropertyValue(propertyName, expectedValue) {
  result = collection.filter(
    (element) => element.getPropertyValue(propertyName) == expectedValue
  );
  console.log(result);
  return result;
}

//#endregion END OF COLLECTION FUNCTIONS

//lol delete property can delete itself
//artifact.deleteProperty("deleteProperty");

//#region START OF ARTIFACT GENERATOR
// collection of all artifact classes

const artifactModifiers = {
  // Mutually exclusive shapes
  shape: [
    "square",
    "circle",
    "rectangle-vertical",
    "rectangle-horizontal",
    "oval-vertical",
    "oval-horizontal",
  ],

  // Inclusive text types
  textType: ["num", "symbol", "alpha", "greek"],

  // Numeric characters
  num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],

  // Symbols
  symbol: [
    "!",
    "@",
    "#",
    "$",
    "%",
    "&",
    "*",
    "?",
    "<",
    ">",
    "+",
    "=",
    "~",
    "^",
    "|",
  ],

  // English alphabet
  alpha: [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ],

  // Greek alphabet
  greek: [
    "α",
    "β",
    "γ",
    "δ",
    "ε",
    "ζ",
    "η",
    "θ",
    "ι",
    "κ",
    "λ",
    "μ",
    "ν",
    "ξ",
    "ο",
    "π",
    "ρ",
    "σ",
    "τ",
    "υ",
    "φ",
    "χ",
    "ψ",
    "ω",
  ],

  // Colors
  colors: [
    "white",
    "blue",
    "red",
    "orange",
    "black",
    "green",
    "purple",
    "gray",
  ],
};

const artifactDisplay = document.getElementById("artifactDisplay");

function createRandomArtifact() {
  let newArtifact = document.createElement("div");
  newArtifact.classList.add("artifact", "hoverable");

  // Get random shape
  let randomShapeIndex = Math.floor(
    Math.random() * artifactModifiers.shape.length
  );
  newArtifact.classList.add(artifactModifiers.shape[randomShapeIndex]);

  // Add random background color to artifact
  newArtifact.style.backgroundColor =
    artifactModifiers.colors[
      Math.floor(Math.random() * artifactModifiers.colors.length)
    ];

  // Select random text color that is not the same as background color
  let bgColor = newArtifact.style.backgroundColor;
  let newColorSelection = artifactModifiers.colors.filter(
    (color) => color !== bgColor
  );

  // Determine how many types of text to add (can be 0, 1, 2, or 3)
  let textTypeLength = artifactModifiers.textType.length;
  let textAmount = Math.floor(Math.random() * (textTypeLength + 1)); // 0 to 3 types of text

  // Add random texts to the artifact
  for (let i = 0; i < textAmount; i++) {
    let randomIndex = Math.floor(Math.random() * textTypeLength);
    let textType = artifactModifiers.textType[randomIndex];

    // Create a new text element
    let newText = document.createElement("div");
    newText.classList.add(textType, "hoverable");

    // Add random text color that contrasts with the background color
    newText.style.color =
      newColorSelection[Math.floor(Math.random() * newColorSelection.length)];

    // Generate random text content based on text type
    let randomTextIndex = Math.floor(
      Math.random() * artifactModifiers[textType].length
    );
    newText.innerText = artifactModifiers[textType][randomTextIndex];

    // Append the new text element to the artifact
    newArtifact.appendChild(newText);
  }

  // Return the created artifact element
  return newArtifact;
}

const newArtifactButton = document.getElementById("newArtifactButton");
newArtifactButton.addEventListener("click", () => {
  collectionDisplay.appendChild(artifactDisplay.lastChild);
  discoverArtifact();
  getAllProperties();
});
const showCollectionButton = document.getElementById("showCollectionButton");
showCollectionButton.addEventListener("click", () => {
  collection.forEach((element) => {
    //element.appearance.style.backgroundColor = "black";
    console.log(element.appearance);
    //console.log(element.appearance.style.backgroundColor);
  });
});

const collectionDisplay = document.getElementById("collectionDisplay");
//console.log(discoverArtifact());
//#endregion

//ideas
/*
css shapes
https://www.cssportal.com/css-clip-path-generator/

https://exploringjs.com/impatient-js/ch_values.html#classes-and-constructor-functions
https://exploringjs.com/impatient-js/ch_classes.html  **

//select multiple artifacts for edit
ask questions
fulfill orders?
artifact aging?
money/currency
time limits
objects come on a conveyor belt
check if artifact exists ( if previously discovered)
search for specific artifact
ask for all blue
ask all this shape

//angular gradient
conic gradient

classify new object
*/
