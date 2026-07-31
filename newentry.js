let userLoggedIn;
userLoggedIn = localStorage.getItem("user-logged-in");

// profile menu ----------------------------------------------------------
const newEntryProfileIconContainer = document.getElementById(
  "new-entry-profile-container",
);
const newEntryProfileIcon = document.getElementById("new-entry-profile-icon");
const newEntryLoggedIn = document.getElementById("new-entry-logged-in");
const newEntryProfileMenu = document.querySelector(".profile-menu");
const newEntryLogInButton = document.getElementById("new-entry-log-in-button");
const newEntryLogOutButton = document.getElementById(
  "new-entry-log-out-button",
);

newEntryLoggedIn.textContent = "Sign In";
if (localStorage.getItem("user-logged-in") == "false") {
  newEntryLogOutButton.classList.add("not-displayed");
  newEntryLoggedIn.textContent = "Sign In";
} else {
  newEntryLogInButton.classList.add("not-displayed");
  newEntryLogOutButton.classList.remove("not-displayed");
  newEntryProfileIcon.classList.add("new-entry-profile-icon-logged-in");
  newEntryLoggedIn.textContent = "Foxes1888";
}
newEntryProfileIcon.addEventListener("click", () => {
  newEntryProfileMenu.classList.remove("profile-menu-displayed");
});
newEntryLogInButton.addEventListener("click", () => {
  newEntryProfileMenu.classList.add("profile-menu-displayed");
  const userLoggedIn = localStorage.getItem("user-logged-in");
  if (userLoggedIn == "false") {
    loginSection.classList.remove("password-input-section-absolute-displayed");
    // newEntryProfileMenu.classList.add("profile-menu-displayed");
  }
});
newEntryLogOutButton.addEventListener("click", () => {
  // newEntryProfileMenu.classList.add("profile-menu-displayed");
  userLoggedIn = localStorage.setItem("user-logged-in", "false");
  privateButton.innerHTML = public;
  newEntryLogOutButton.classList.add("not-displayed");
  newEntryLogInButton.classList.remove("not-displayed");
  newEntryLoggedIn.textContent = "Sign In";
  newEntryProfileIcon.classList.remove("new-entry-profile-icon-logged-in");
  padlock.classList.remove("fa-solid");
  padlock.classList.remove("fa-lock");
  padlock.classList.remove("fa-lg");
  padlock.classList.add("fa-solid");
  padlock.classList.add("fa-lock-open");
  padlock.classList.add("fa-lg");
  isPrivate = true;
});

// login section
const loginSection = document.getElementById("vault-login-section");
const loginUsername = document.getElementById("vault-username");
const loginPassword = document.getElementById("vault-password");
const loginConfirmButton = document.getElementById(
  "vault-login-confirm-button",
);
const vaultLoginErrorMessage = document.getElementById(
  "vault-login-error-message",
);

let newEntryProfileContainer = false;
let enteredNewEntryProfileMenu = false;
newEntryProfileIconContainer.addEventListener("mouseover", () => {
  setTimeout(() => {
    newEntryProfileMenu.classList.remove("profile-menu-displayed");
  }, 200);
  newEntryProfileContainer = true;
});
newEntryProfileIconContainer.addEventListener("mouseleave", () => {
  profileMenuDisplay();
  newEntryProfileContainer = false;
});

function profileMenuDisplay() {
  setTimeout(() => {
    if (!enteredNewEntryProfileMenu) {
      newEntryProfileMenu.classList.add("profile-menu-displayed");
    }
  }, 200);
}

newEntryProfileMenu.addEventListener("mouseover", () => {
  enteredNewEntryProfileMenu = true;
});
newEntryProfileMenu.addEventListener("mouseleave", () => {
  setTimeout(() => {
    newEntryProfileMenu.classList.add("profile-menu-displayed");
    enteredNewEntryProfileMenu = false;
  }, 400);
});

loginConfirmButton.addEventListener("click", () => {
  let loginDetailsArray = [];
  const loginUsername = document.getElementById("vault-username");
  const loginPassword = document.getElementById("vault-password");
  const addedUsername = loginUsername.value;
  const addedPassword = loginPassword.value;
  loginDetailsArray.push({ username: addedUsername, password: addedPassword });

  loginUsername.value = "";
  loginPassword.value = "";

  if (
    loginDetailsArray.some((login) => login.username == "leicester") &&
    loginDetailsArray.some((login) => login.password == "filbert16")
  ) {
    loginSection.classList.add("password-input-section-absolute-displayed");
    loginDetailsArray = [];
    userLoggedIn = localStorage.setItem("user-logged-in", "true");
    newEntryProfileIcon.classList.add("new-entry-profile-icon-logged-in");
    newEntryLoggedIn.textContent = "Foxes1888";
    newEntryLogInButton.classList.add("not-displayed");
    newEntryLogOutButton.classList.remove("not-displayed");
    vaultLoginErrorMessage.classList.add("vault-is-displayed");
  } else {
    vaultLoginErrorMessage.classList.remove("vault-is-displayed");
  }
});

function closeLogin() {
  loginSection.classList.add("password-input-section-absolute-displayed");
  vaultLoginErrorMessage.classList.add("vault-is-displayed");
  const loginUsername = document.getElementById("vault-username");
  const loginPassword = document.getElementById("vault-password");
  loginUsername.value = "";
  loginPassword.value = "";
}

// create tag input section ----------------------------------------
const createTagInputSection = document.getElementById("input-section-for-tag");
const closeCreateTagInputSection =
  document.getElementById("input-close-button");
closeCreateTagInputSection.type = "button";

const createTagErrorMessageDiv = document.getElementById(
  "create-tag-message-div",
);
createTagErrorMessageDiv.classList.add("displayed");
const createdTagErrorMessageEmoji = "Only one Emoji allowed!!!";
const createdTagErrorMessageTags =
  "You have created 3 tags remove one to continue!!!";
const addTagErrorMessage =
  "IMPORTANT: Please fill in the Title (minimum requirement!!)";

let tagArray = [];
const createTagButton = document.getElementById(
  "create-tag-newentry-header-button",
);

closeCreateTagInputSection.addEventListener("click", () => {
  createTagInputSection.classList.add("input-section-for-tag-display");
  createTagButton.classList.remove("displayed");
  createTagErrorMessageDiv.classList.add("displayed");
});
function createTag() {
  if (tagArray.length >= 3) {
    createTagErrorMessageDiv.innerHTML = createdTagErrorMessageTags;
    createTagErrorMessageDiv.classList.remove("displayed");
  } else {
    createTagButton.classList.add("displayed");
    createTagInputSection.classList.remove("input-section-for-tag-display");
  }
}
// input section for tag -------------------------------------

const createdTagSection = document.getElementById("created-tag-section");
let newArray = [];
function addCreatedTag() {
  const emojiInput = document.getElementById("input-emoji");
  const titleInput = document.getElementById("input-title");
  const emoji = emojiInput.value;
  const tagTitle = titleInput.value.trim();
  if (!tagTitle) {
    createTagErrorMessageDiv.innerHTML = addTagErrorMessage;
    createTagErrorMessageDiv.classList.remove("displayed");
  } else if (tagArray.length >= 3) {
    createTagErrorMessageDiv.innerHTML = createdTagErrorMessageTags;
    createTagErrorMessageDiv.classList.remove("displayed");
  } else {
    createTagErrorMessageDiv.classList.add("displayed");

    if (emoji.length >= 4) {
      createTagErrorMessageDiv.innerHTML = createdTagErrorMessageEmoji;
      createTagErrorMessageDiv.classList.remove("displayed");
    } else {
      createdTagSection.innerHTML = "";
      createTagErrorMessageDiv.classList.add("displayed");
      tagArray.push({ emoji: emoji, tagTitle: tagTitle });

      emojiInput.value = "";
      titleInput.value = "";
      displayTags();
    }
  }
}

function displayTags() {
  tagArray.forEach((tag, index) => {
    const mainContainer = document.createElement("div");
    const tagContainer = document.createElement("div");
    const emojiParagraph = document.createElement("p");
    const titleParagraph = document.createElement("p");
    const deleteTagButton = document.createElement("button");
    const deleteTagCrossIcon = document.createElement("i");

    emojiParagraph.innerHTML = tag.emoji;
    titleParagraph.innerHTML = tag.tagTitle;
    deleteTagButton.type = "button";
    deleteTagButton.onclick = () => deleteTag(index);

    createdTagSection.appendChild(mainContainer);
    mainContainer.appendChild(tagContainer);
    tagContainer.appendChild(emojiParagraph);
    tagContainer.appendChild(titleParagraph);
    deleteTagButton.appendChild(deleteTagCrossIcon);
    tagContainer.appendChild(deleteTagButton);

    mainContainer.classList.add("created-tag-and-close-button-container");
    tagContainer.classList.add("created-tag-container");
    emojiParagraph.classList.add("tag-emoji");
    titleParagraph.classList.add("tag-title");
    deleteTagButton.classList.add("delete-tag-button");
    deleteTagCrossIcon.classList.add("fa-solid");
    deleteTagCrossIcon.classList.add("fa-x");
    deleteTagCrossIcon.classList.add("fa-xl");
  });
}
function deleteTag(tagIndex) {
  const filteredArray = tagArray.filter((tag, index) => index != tagIndex);
  tagArray = filteredArray;
  createdTagSection.innerHTML = "";
  displayTags();
  createTagErrorMessageDiv.classList.add("displayed");
}
// save entry section -------------------------------------
const button = document.querySelector(".save-entry-button");
const title = document.querySelector(".header-input");
const reflection = document.querySelector(".reflection-input");
const ErrorMessageContainer = document.getElementById(
  "error-message-container",
);

const iconContainer = document.getElementById("icon-container");
const page = document.getElementById("page-icon");
const openBook = document.getElementById("open-book");
const closedBook = document.getElementById("closed-book");
const successMessage = document.getElementById("success-message");

const errorMessageDiv = document.getElementById("error-message-div");
const errorMessageParagraph = document.createElement("p");

const errorMessage =
  "IMPORTANT: Please fill in the title and the reflection in fields!!!";
const DiscardEmptyMessage = "There is no reflection to discard!!";
errorMessageParagraph.innerHTML = errorMessage;

errorMessageDiv.appendChild(errorMessageParagraph);

let publicCardArray = [];
let privateCardArray = [];
let deletedArray = [];

// animation container ------------------------------------------------
const animationContainer = document.getElementById("animation-container");

// text area counter --------------------------------------------------
const counterContainer = document.getElementById("input-counter-container");
const characterCountInput = document.getElementById("input-counter");
const textArea = document.getElementById("text-area");
textArea.addEventListener("input", () => {
  const count = textArea.value.length;
  characterCountInput.innerHTML = `${count}`;
});

// insert memory section ----------------------------------------------------
const insertMemoryButton = document.getElementById("insert-memory-button");
const insertMemoryMessage = document.getElementById("insert-memory-message");
insertMemoryButton.addEventListener("click", () => {
  insertMemoryMessage.classList.remove("display-memory-message");
  setTimeout(() => {
    insertMemoryMessage.classList.add("display-memory-message");
  }, 2000);
});

// private public button section -----------------------------------
const newEntryPrivateErrorMessage = document.querySelector(
  ".new-entry-private-error-message",
);

const private = "Private";
const public = "Public";
let isPrivate = true;
const privateButton = document.getElementById("private-public-button");

privateButton.innerHTML = public;

const padlock = document.getElementById("padlock");
padlock.classList.add("fa-solid");
padlock.classList.add("fa-lock-open");
padlock.classList.add("fa-lg");

privateButton.addEventListener("click", () => {
  const userLoggedIn = localStorage.getItem("user-logged-in");
  if (userLoggedIn == "false") {
    newEntryPrivateErrorMessage.classList.remove("vault-is-displayed");
    setTimeout(() => {
      newEntryPrivateErrorMessage.classList.add("vault-is-displayed");
    }, 3000);
  }
  if (userLoggedIn == "true") {
    if (isPrivate == true) {
      privateButton.innerHTML = private;
      padlock.classList.remove("fa-solid");
      padlock.classList.remove("fa-lock-open");
      padlock.classList.remove("fa-lg");
      padlock.classList.add("fa-solid");
      padlock.classList.add("fa-lock");
      padlock.classList.add("fa-lg");
      isPrivate = false;
    } else {
      privateButton.innerHTML = public;
      padlock.classList.remove("fa-solid");
      padlock.classList.remove("fa-lock");
      padlock.classList.remove("fa-lg");
      padlock.classList.add("fa-solid");
      padlock.classList.add("fa-lock-open");
      padlock.classList.add("fa-lg");
      isPrivate = true;
    }
  }
});

// discard section ------------------------------------------------------------

function discardReflection() {
  const reflectionInputForDiscard = reflection.value.trim();
  const titleInputForDiscard = title.value.trim();
  if (!reflectionInputForDiscard && !titleInputForDiscard) {
    errorMessageParagraph.innerHTML = DiscardEmptyMessage;
    ErrorMessageContainer.appendChild(errorMessageDiv);
    ErrorMessageContainer.classList.add("save-entry-error-message-displayed");
    discardConfirmMessage.classList.add("discard-no-reflection-message");
    setTimeout(() => {
      errorMessageParagraph.innerHTML = errorMessage;
      ErrorMessageContainer.classList.remove(
        "save-entry-error-message-displayed",
      );
      discardConfirmMessage.classList.remove("discard-no-reflection-message");
    }, 2000);
  } else {
    errorMessageParagraph.innerHTML = errorMessage;
    discardConfirmMessage.classList.remove("hide-confirm-message");
  }
}

const yes = document.getElementById("yesbutton");
const no = document.getElementById("nobutton");
const discardConfirmMessage = document.getElementById(
  "discard-confirm-message",
);
no.addEventListener("click", (e) => {
  e.preventDefault();
  discardConfirmMessage.classList.add("hide-confirm-message");
});

yes.addEventListener("click", (e) => {
  e.preventDefault();
  title.value = "";
  reflection.value = "";
  characterCountInput.innerHTML = `0`;
  discardConfirmMessage.classList.add("hide-confirm-message");
});
// save entry button ----------------------------------------------------------
button.addEventListener("click", () => {
  const titleInput = title.value.trim();
  // const titleInput = " " + title.value; adds a space
  // const reflectionInput = " " + reflection.value; adds a space
  const reflectionInput = reflection.value.trim();
  console.log(titleInput, reflectionInput);
  if (!titleInput || !reflectionInput) {
    if ((errorMessageParagraph.innerHTML = DiscardEmptyMessage)) {
      errorMessageParagraph.innerHTML = errorMessage;
    }
    ErrorMessageContainer.appendChild(errorMessageDiv);
    ErrorMessageContainer.classList.add("save-entry-error-message-displayed");
    characterCountInput.innerHTML = `0`;
  } else {
    ErrorMessageContainer.classList.remove(
      "save-entry-error-message-displayed",
    );
    textArea.classList.add("reflection-input-display");
    animationContainer.classList.remove("displayed");

    setTimeout(() => {
      pageAnimation();
    }, 500);

    //   if there is nothing saved at the start save an empty array.
    if (localStorage.getItem("public-vellum-entries") == null) {
      localStorage.setItem("public-vellum-entries", "[]");
    }

    if (localStorage.getItem("private-vellum-entries") == null) {
      localStorage.setItem("private-vellum-entries", "[]");
    }
    // get the new data and add it to the old data

    const publicCreatedArray = JSON.parse(
      localStorage.getItem("public-vellum-entries"),
    );
    const privateCreatedArray = JSON.parse(
      localStorage.getItem("private-vellum-entries"),
    );
    if (isPrivate == true) {
      if (!tagArray[0]) {
        publicCreatedArray.push({
          day: dayName,
          date: todaysdate,
          month: monthName,
          year: year,
          title: titleInput,
          reflection: reflectionInput,
        });
        createdTagSection.innerHTML = "";
      } else if (tagArray[0] && !tagArray[1]) {
        publicCreatedArray.push({
          day: dayName,
          date: todaysdate,
          month: monthName,
          year: year,
          title: titleInput,
          createdTagOne: {
            createdEmoji: tagArray[0].emoji,
            createdTitle: tagArray[0].tagTitle,
          },

          reflection: reflectionInput,
        });
        createdTagSection.innerHTML = "";
        tagArray = [];
      } else if (tagArray[0] && tagArray[1] && !tagArray[2]) {
        publicCreatedArray.push({
          day: dayName,
          date: todaysdate,
          month: monthName,
          year: year,
          title: titleInput,
          createdTagOne: {
            createdEmoji: tagArray[0].emoji,
            createdTitle: tagArray[0].tagTitle,
          },

          createdTagTwo: {
            createdEmoji: tagArray[1].emoji,
            createdTitle: tagArray[1].tagTitle,
          },

          reflection: reflectionInput,
        });
        createdTagSection.innerHTML = "";
        tagArray = [];
      } else if (tagArray[0] && tagArray[1] && tagArray[2]) {
        publicCreatedArray.push({
          day: dayName,
          date: todaysdate,
          month: monthName,
          year: year,
          title: titleInput,
          createdTagOne: {
            createdEmoji: tagArray[0].emoji,
            createdTitle: tagArray[0].tagTitle,
          },

          createdTagTwo: {
            createdEmoji: tagArray[1].emoji,
            createdTitle: tagArray[1].tagTitle,
          },
          createdTagThree: {
            createdEmoji: tagArray[2].emoji,
            createdTitle: tagArray[2].tagTitle,
          },

          reflection: reflectionInput,
        });
        tagArray = [];
        createdTagSection.innerHTML = "";
      }
      localStorage.setItem(
        "public-vellum-entries",
        JSON.stringify(publicCreatedArray),
      );
    } else {
      if (!tagArray[0]) {
        privateCreatedArray.push({
          day: dayName,
          date: todaysdate,
          month: monthName,
          year: year,
          title: titleInput,
          reflection: reflectionInput,
        });
        createdTagSection.innerHTML = "";
      } else if (tagArray[0] && !tagArray[1]) {
        privateCreatedArray.push({
          day: dayName,
          date: todaysdate,
          month: monthName,
          year: year,
          title: titleInput,
          createdTagOne: {
            createdEmoji: tagArray[0].emoji,
            createdTitle: tagArray[0].tagTitle,
          },

          reflection: reflectionInput,
        });
        createdTagSection.innerHTML = "";
        tagArray = [];
      } else if (tagArray[0] && tagArray[1] && !tagArray[2]) {
        privateCreatedArray.push({
          day: dayName,
          date: todaysdate,
          month: monthName,
          year: year,
          title: titleInput,
          createdTagOne: {
            createdEmoji: tagArray[0].emoji,
            createdTitle: tagArray[0].tagTitle,
          },

          createdTagTwo: {
            createdEmoji: tagArray[1].emoji,
            createdTitle: tagArray[1].tagTitle,
          },

          reflection: reflectionInput,
        });
        createdTagSection.innerHTML = "";
        tagArray = [];
      } else if (tagArray[0] && tagArray[1] && tagArray[2]) {
        privateCreatedArray.push({
          day: dayName,
          date: todaysdate,
          month: monthName,
          year: year,
          title: titleInput,
          createdTagOne: {
            createdEmoji: tagArray[0].emoji,
            createdTitle: tagArray[0].tagTitle,
          },

          createdTagTwo: {
            createdEmoji: tagArray[1].emoji,
            createdTitle: tagArray[1].tagTitle,
          },
          createdTagThree: {
            createdEmoji: tagArray[2].emoji,
            createdTitle: tagArray[2].tagTitle,
          },

          reflection: reflectionInput,
        });
        tagArray = [];
        createdTagSection.innerHTML = "";
      }
      localStorage.setItem(
        "private-vellum-entries",
        JSON.stringify(privateCreatedArray),
      );
    }

    //   clear the input fields
    title.value = "";
    reflection.value = "";
    console.log(titleInput.length);
    console.log("publicstored", publicCreatedArray);
    console.log("privatestored", privateCreatedArray);
  }
});

// success message animation section -----------------------------------

function pageAnimation() {
  characterCountInput.innerHTML = `0`;
  page.classList.add("page-animation");

  setTimeout(() => {
    openBook.classList.add("displayed");
    page.classList.add("displayed");
  }, 2000);
  setTimeout(() => {
    animationContainer.classList.remove("icon-container");
    animationContainer.classList.add("icon-container-animation");
    closedBook.classList.remove("displayed");
  }, 2000);
  setTimeout(() => {
    animationContainer.classList.remove("icon-container-animation");
    animationContainer.classList.add("icon-container-central");
    iconContainer.classList.add("end-animation-icon-container");
    iconContainer.classList.remove("container-basics");

    successMessage.classList.remove("displayed");
  }, 3500);
  setTimeout(() => {
    textArea.classList.remove("reflection-input-display");

    page.classList.remove("page-animation");
    animationContainer.classList.add("displayed");
    iconContainer.classList.add("container-basics");
    animationContainer.classList.remove("icon-container-central");
    iconContainer.classList.remove("end-animation-icon-container");
    openBook.classList.remove("displayed");
    page.classList.remove("displayed");
    closedBook.classList.add("displayed");
    successMessage.classList.add("displayed");
  }, 5500);
}

// date section ----------------------------------------------------------------
const today = new Date();
const todaysdate = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
console.log(`day ${todaysdate} month ${month} year ${year}`);

// Create a new Date object for the current date/time
const date = new Date();

// Array of month names
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Array of day names
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Extract day and month as words
const dayName = dayNames[date.getDay()]; // e.g., "Monday"
const monthName = monthNames[date.getMonth()]; // e.g., "July"

// Output
console.log(`${dayName}, ${todaysdate} ${monthName}, ${year}`); // Example: "Monday, July"

const currentDate = document.getElementById("form-date");
currentDate.innerHTML = `${dayName} ${todaysdate} ${monthName} ${year}`;

const testArrays = [
  { country: "england" },
  { name: "pete", team: "leicester" },
  {
    tagone: { id: "one", position: "forward" },
    tagtwo: { id: "two", position: "defender" },
  },
];

console.log("petestest", testArrays[2].tagone.position);
