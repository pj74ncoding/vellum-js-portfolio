let userLoggedIn;
userLoggedIn = localStorage.getItem("user-logged-in");
let displaySignInMessage = false;
let secondaryDisplaySignInMessage = false;

// sound effect-----------------------------------------------------------
window.onload = () => {
  const audio = document.getElementById("myAudio");
  audio.play().catch((err) => {
    console.warn("Autoplay.Blocked", err);
  });
};

const userColourTheme = localStorage.getItem("colour-theme");
const audio = document.getElementById("myAudio");
const soundOn = document.getElementById("vault-sound-on-icon");
const soundOff = document.getElementById("vault-sound-off-icon");

soundOn.addEventListener("click", () => {
  const userColourTheme = localStorage.getItem("colour-theme");
  const audio = document.getElementById("myAudio");
  audio.volume = 0.5;
  audio.play();
});

soundOff.addEventListener("click", () => {
  audio.pause();
});

if (userColourTheme == "forest-green") {
  audio.src = "sounds/soundreality-forest-sound-576537.mp3";
} else if (userColourTheme == "sunrise") {
  audio.src = "sounds/freesound_community-meditation_impromptu_01-17402.mp3";
} else if (userColourTheme == "sea-blue") {
  audio.src =
    "sounds/freesound_community-calm-waves-crashing-against-a-beach-74813.mp3";
}
// profile menu ----------------------------------------------------------
const vaultProfileIconContainer = document.getElementById(
  "vault-profile-container",
);
const vaultProfileIcon = document.getElementById("vault-profile-icon");
const vaultLoggedIn = document.getElementById("vault-logged-in");
const vaultProfileMenu = document.querySelector(".profile-menu");
const vaultLogInButton = document.getElementById("vault-log-in-button");
const vaultLogOutButton = document.getElementById("vault-log-out-button");

if (localStorage.getItem("user-logged-in") == "false") {
  vaultLogOutButton.classList.add("not-displayed");
  vaultLoggedIn.textContent = "Sign In";
} else {
  vaultLogInButton.classList.add("not-displayed");
  vaultLogOutButton.classList.remove("not-displayed");
  vaultProfileIcon.classList.add("vault-profile-icon-logged-in");

  vaultLoggedIn.textContent = "Foxes1888";
}

// login section
const vaultLoginSection = document.getElementById("vault-login-section");
const vaultLoginUsername = document.getElementById("vault-username");
const vaultLoginPassword = document.getElementById("vault-password");
const vaultLoginConfirmButton = document.getElementById(
  "vault-login-confirm-button",
);
const vaultLoginErrorMessage = document.getElementById(
  "vault-login-error-message",
);

let enteredVaultProfileContainer = false;
let enteredVaultProfileMenu = false;
vaultProfileIconContainer.addEventListener("mouseover", () => {
  setTimeout(() => {
    vaultProfileMenu.classList.remove("profile-menu-displayed");
  }, 200);
  enteredVaultProfileContainer = true;
});
vaultProfileIconContainer.addEventListener("mouseleave", () => {
  profileMenuDisplay();
  enteredVaultProfileContainer = false;
});

function profileMenuDisplay() {
  setTimeout(() => {
    if (!enteredVaultProfileMenu) {
      vaultProfileMenu.classList.add("profile-menu-displayed");
    }
  }, 200);
}

vaultProfileMenu.addEventListener("mouseover", () => {
  enteredVaultProfileMenu = true;
});
vaultProfileMenu.addEventListener("mouseleave", () => {
  setTimeout(() => {
    vaultProfileMenu.classList.add("profile-menu-displayed");
    enteredVaultProfileMenu = false;
  }, 400);
});
const vaultPrivateErrorMessage = document.getElementById(
  "vault-private-error-message",
);

vaultLoginConfirmButton.addEventListener("click", () => {
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
    vaultLoginSection.classList.add("not-displayed");
    loginDetailsArray = [];
    vaultProfileIcon.classList.add("vault-profile-icon-logged-in");
    vaultLoggedIn.textContent = "Foxes1888";
    vaultLogInButton.classList.add("not-displayed");
    vaultLogOutButton.classList.remove("not-displayed");
    localStorage.setItem("user-logged-in", "true");
    vaultLoginErrorMessage.classList.add("vault-is-displayed");
    cardSection.classList.remove("not-displayed-entry-section");
    publicOrPrivate();
  } else {
    vaultLoginErrorMessage.classList.remove("vault-is-displayed");
  }
});
const cardSection = document.getElementById("my-vault-entry-section");
vaultLogInButton.addEventListener("click", () => {
  const userLoggedIn = localStorage.getItem("user-logged-in");
  if (userLoggedIn == "false") {
    vaultLoginSection.classList.remove("not-displayed");
    vaultProfileMenu.classList.add("profile-menu-displayed");
    cardSection.classList.add("not-displayed-entry-section");
  }
});

vaultLogOutButton.addEventListener("click", () => {
  userLoggedIn = localStorage.setItem("user-logged-in", "false");
  vaultProfileIcon.classList.remove("vault-profile-icon-logged-in");
  vaultLoggedIn.textContent = "Sign In";
  vaultLogInButton.classList.remove("not-displayed");
  vaultLogOutButton.classList.add("not-displayed");
  cardSection.classList.remove("not-displayed-entry-section");
  secondaryDisplaySignInMessage = false;
  publicOrPrivate();
});

function closeLogin() {
  vaultLoginSection.classList.add("not-displayed");
  vaultLoginErrorMessage.classList.add("vault-is-displayed");
  const loginUsername = document.getElementById("vault-username");
  const loginPassword = document.getElementById("vault-password");
  cardSection.classList.remove("not-displayed-entry-section");
  loginUsername.value = "";
  loginPassword.value = "";
}

// ----------------------------------------------------------------
// const cardSection = document.getElementById("my-vault-entry-section");
const vaultHeading = document.getElementById("vault-heading");
const vaultHeader = document.getElementById("vault-your-reflections-header");
vaultHeader.innerHTML = "Your Public Reflections:";
const vaultPadlock = document.getElementById("vault-padlock");
const emptyVaultHeading = document.getElementById("empty-vault-heading");
const publicOrPrivateButton = document.getElementById(
  "public-or-private-button",
);

let isExpanded = false;
let isPublicVellum = false;

function displayErrorMessage() {
  if (displaySignInMessage == false || secondaryDisplaySignInMessage == false) {
    displaySignInMessage = true;
    secondaryDisplaySignInMessage = true;

    return;
  } else if (
    displaySignInMessage == true &&
    secondaryDisplaySignInMessage == true
  ) {
    vaultPrivateErrorMessage.classList.remove("vault-is-displayed");
    setTimeout(() => {
      vaultPrivateErrorMessage.classList.add("vault-is-displayed");
    }, 3000);
  }
}

publicOrPrivate();
function publicOrPrivate() {
  const storedPublicVellum = JSON.parse(
    localStorage.getItem("public-vellum-entries"),
  );
  const storedPrivateVellum = JSON.parse(
    localStorage.getItem("private-vellum-entries"),
  );

  const loggedInUser = localStorage.getItem("user-logged-in");
  const vaultEmptyMessageContainer = document.getElementById(
    "vault-empty-message-container",
  );
  if (loggedInUser == "false") {
    displayErrorMessage();
  }
  if (loggedInUser == "true") {
    if (isPublicVellum == true) {
      if (storedPublicVellum.length <= 0) {
        vaultHeading.innerHTML = "My Public Vault";
        vaultHeader.innerHTML = "My Public Reflections:";
        vaultPadlock.classList.remove("fa-solid");
        vaultPadlock.classList.remove("fa-lock");
        vaultPadlock.classList.remove("fa-xl");
        vaultPadlock.classList.add("fa-solid");
        vaultPadlock.classList.add("fa-lock-open");
        vaultPadlock.classList.add("fa-xl");
        publicOrPrivateButton.innerHTML = "Change To Private Reflections";
        vaultEmptyMessageContainer.classList.remove(
          "vault-empty-container-not-displayed",
        );
        cardSection.innerHTML = "";
        emptyVaultHeading.innerHTML = "Your Public Vault Is Empty!!";
        isPublicVellum = false;
      } else {
        const storedPublicVellum = JSON.parse(
          localStorage.getItem("public-vellum-entries"),
        );

        vaultHeading.innerHTML = "My Public Vault";
        publicOrPrivateButton.innerHTML = "Change To Private Reflections";
        vaultEmptyMessageContainer.classList.add(
          "vault-empty-container-not-displayed",
        );

        cardSection.innerHTML = "";
        vaultHeader.innerHTML = "My Public Reflections:";
        vaultPadlock.classList.remove("fa-solid");
        vaultPadlock.classList.remove("fa-lock");
        vaultPadlock.classList.remove("fa-xl");
        vaultPadlock.classList.add("fa-solid");
        vaultPadlock.classList.add("fa-lock-open");
        vaultPadlock.classList.add("fa-xl");

        storedPublicVellum.forEach((vellum, index) => {
          // delete message section --------------------------------------------------
          const deleteVellumDiv = document.createElement("div");
          const deleteVellumParagraph = document.createElement("p");
          const deleteVellumButtonContainer = document.createElement("div");
          const deleteVellumYesButton = document.createElement("button");
          const deleteVellumNoButton = document.createElement("button");
          deleteVellumParagraph.innerHTML = "Are You Sure!!!";
          deleteVellumYesButton.innerHTML = "Yes";
          deleteVellumNoButton.innerHTML = "No";
          deleteVellumDiv.classList.add("vault-delete-confirm");
          deleteVellumDiv.classList.add("vault-confirm-is-displayed");
          deleteVellumButtonContainer.classList.add(
            "vault-confirm-button-container",
          );
          deleteVellumYesButton.classList.add("vault-yes-button");
          deleteVellumNoButton.classList.add("vault-no-button");
          deleteVellumDiv.appendChild(deleteVellumParagraph);
          deleteVellumButtonContainer.appendChild(deleteVellumYesButton);
          deleteVellumButtonContainer.appendChild(deleteVellumNoButton);
          deleteVellumDiv.appendChild(deleteVellumButtonContainer);

          deleteVellumNoButton.addEventListener("click", () => {
            deleteVellumDiv.classList.add("vault-confirm-is-displayed");
          });

          deleteVellumYesButton.onclick = () => deleteVellum(index);

          function deleteVellum(vellumIndex) {
            const newVellumArray = storedPublicVellum.filter(
              (item, index) => index !== vellumIndex,
            );
            localStorage.setItem(
              "public-vellum-entries",
              JSON.stringify(newVellumArray),
            );
            isPublicVellum = true;
            deleteVellumDiv.classList.add("vault-confirm-is-displayed");
            publicOrPrivate();
          }

          // card section
          const cardsectionTagContainer = document.createElement("div");
          if (vellum.createdTagOne) {
            const mainContainer = document.createElement("div");
            const tagOneContainer = document.createElement("div");
            const tagTwoContainer = document.createElement("div");
            const tagThreeContainer = document.createElement("div");
            const emojiParagraphOne = document.createElement("p");
            const titleParagraphOne = document.createElement("p");
            const emojiParagraphTwo = document.createElement("p");
            const titleParagraphTwo = document.createElement("p");
            const emojiParagraphThree = document.createElement("p");
            const titleParagraphThree = document.createElement("p");

            if (vellum.createdTagOne && !vellum.createdTagTwo) {
              emojiParagraphOne.innerHTML = vellum.createdTagOne.createdEmoji;
              titleParagraphOne.innerHTML = vellum.createdTagOne.createdTitle;
              cardsectionTagContainer.appendChild(mainContainer);
              mainContainer.appendChild(tagOneContainer);
              tagOneContainer.appendChild(emojiParagraphOne);
              tagOneContainer.appendChild(titleParagraphOne);
            } else if (
              vellum.createdTagOne &&
              vellum.createdTagTwo &&
              !vellum.createdTagThree
            ) {
              emojiParagraphOne.innerHTML = vellum.createdTagOne.createdEmoji;
              titleParagraphOne.innerHTML = vellum.createdTagOne.createdTitle;
              emojiParagraphTwo.innerHTML = vellum.createdTagTwo.createdEmoji;
              titleParagraphTwo.innerHTML = vellum.createdTagTwo.createdTitle;
              cardsectionTagContainer.appendChild(mainContainer);
              mainContainer.appendChild(tagOneContainer);
              mainContainer.appendChild(tagTwoContainer);
              tagOneContainer.appendChild(emojiParagraphOne);
              tagOneContainer.appendChild(titleParagraphOne);
              tagTwoContainer.appendChild(emojiParagraphTwo);
              tagTwoContainer.appendChild(titleParagraphTwo);
            } else if (
              vellum.createdTagOne &&
              vellum.createdTagTwo &&
              vellum.createdTagThree
            ) {
              emojiParagraphOne.innerHTML = vellum.createdTagOne.createdEmoji;
              titleParagraphOne.innerHTML = vellum.createdTagOne.createdTitle;
              emojiParagraphTwo.innerHTML = vellum.createdTagTwo.createdEmoji;
              titleParagraphTwo.innerHTML = vellum.createdTagTwo.createdTitle;
              emojiParagraphThree.innerHTML =
                vellum.createdTagThree.createdEmoji;
              titleParagraphThree.innerHTML =
                vellum.createdTagThree.createdTitle;
              cardsectionTagContainer.appendChild(mainContainer);
              mainContainer.appendChild(tagOneContainer);
              mainContainer.appendChild(tagTwoContainer);
              mainContainer.appendChild(tagThreeContainer);
              tagOneContainer.appendChild(emojiParagraphOne);
              tagOneContainer.appendChild(titleParagraphOne);
              tagTwoContainer.appendChild(emojiParagraphTwo);
              tagTwoContainer.appendChild(titleParagraphTwo);
              tagThreeContainer.appendChild(emojiParagraphThree);
              tagThreeContainer.appendChild(titleParagraphThree);
            }

            mainContainer.classList.add("vault-created-tag-container");
            if (!emojiParagraphOne) {
              tagOneContainer.classList.add("no-emoji");
              console.log("no-emoji");
            } else {
              tagOneContainer.classList.add("vault-created-tag");
            }
            tagTwoContainer.classList.add("vault-created-tag");
            tagThreeContainer.classList.add("vault-created-tag");
          }

          const cardSectionDiv = document.createElement("div");
          const cardSectionDateParagraphAndTagContainer =
            document.createElement("div");
          const cardSectionDateParagraph = document.createElement("p");

          const cardSectionHeading = document.createElement("h2");
          const reflectionParagraphAndButtonDiv = document.createElement("div");
          const reflectionParagraphDiv = document.createElement("div");

          const cardSectionReflectionParagraph = document.createElement("p");
          const expandButton = document.createElement("button");

          cardSectionDateParagraph.innerHTML = `${vellum.day}, ${vellum.date} ${vellum.month} ${vellum.year}`;
          cardSectionHeading.innerHTML = vellum.title;
          cardSectionReflectionParagraph.innerHTML = vellum.reflection;
          expandButton.innerHTML = "EXPAND";

          expandButton.onclick = () => {
            if (isExpanded == false) {
              reflectionParagraphDiv.classList.remove(
                "vault-reflection-paragraph-div",
              );
              reflectionParagraphDiv.classList.add(
                "vault-reflection-paragraph-div-expand",
              );
              expandButton.innerHTML = "SHRINK";
              isExpanded = true;
            } else {
              reflectionParagraphDiv.classList.remove(
                "vault-reflection-paragraph-div-expand",
              );
              reflectionParagraphDiv.classList.add(
                "vault-reflection-paragraph-div",
              );
              expandButton.innerHTML = "EXPAND";
              isExpanded = false;
            }
          };

          const dateAndIconDiv = document.createElement("div");
          const crossIconDiv = document.createElement("div");
          const crossIcon = document.createElement("i");

          dateAndIconDiv.appendChild(cardSectionDateParagraphAndTagContainer);
          cardSectionDateParagraphAndTagContainer.appendChild(
            cardSectionDateParagraph,
          );
          cardSectionDateParagraphAndTagContainer.appendChild(
            cardsectionTagContainer,
          );
          cardSectionDiv.appendChild(dateAndIconDiv);
          dateAndIconDiv.appendChild(crossIconDiv);
          crossIconDiv.appendChild(crossIcon);
          dateAndIconDiv.appendChild(deleteVellumDiv);

          dateAndIconDiv.classList.add("dateAndIconDiv");
          cardSectionDateParagraphAndTagContainer.classList.add(
            "date-and-tag-container",
          );

          cardSectionDateParagraph.classList.add("vault-date-paragraph");
          cardsectionTagContainer.classList.add("tag-container");
          crossIconDiv.classList.add("cross-icon-div");
          crossIcon.classList.add("fa-solid");
          crossIcon.classList.add("fa-x");
          crossIcon.classList.add("fa-sm");

          cardSectionHeading.classList.add("vault-heading");

          crossIconDiv.addEventListener("click", () => {
            deleteVellumDiv.classList.remove("vault-confirm-is-displayed");
            expandButton.innerHTML = "SHRINK";
          });

          cardSectionDiv.appendChild(cardSectionHeading);
          cardSectionDiv.appendChild(reflectionParagraphAndButtonDiv);
          reflectionParagraphAndButtonDiv.appendChild(reflectionParagraphDiv);
          reflectionParagraphAndButtonDiv.appendChild(expandButton);

          reflectionParagraphDiv.appendChild(cardSectionReflectionParagraph);
          cardSection.appendChild(cardSectionDiv);
          expandButton.classList.add("expand-button-hidden");

          if (cardSectionReflectionParagraph.innerHTML.length >= 170) {
            expandButton.classList.remove("expand-button-hidden");
          }

          //   --------------------------------------------------------------------------

          cardSectionDiv.classList.add("vault-reflection-container");
          cardSectionHeading.classList.add("vault-heading");
          reflectionParagraphAndButtonDiv.classList.add(
            "vault-reflection-and-button-div",
          );
          reflectionParagraphDiv.classList.add(
            "vault-reflection-paragraph-div",
          );
          expandButton.classList.add("expand-button");
        });

        isPublicVellum = false;
      }
      // storedPrivateVellum ---------------------------------------------------
      // storedPrivateVellum ---------------------------------------------------
      // storedPrivateVellum ---------------------------------------------------
    } else if (isPublicVellum == false) {
      if (storedPrivateVellum.length <= 0) {
        vaultHeading.innerHTML = "My Private Vault";
        vaultHeader.innerHTML = "My Private Reflections:";
        vaultPadlock.classList.remove("fa-solid");
        vaultPadlock.classList.remove("fa-lock-open");
        vaultPadlock.classList.remove("fa-xl");
        vaultPadlock.classList.add("fa-solid");
        vaultPadlock.classList.add("fa-lock");
        vaultPadlock.classList.add("fa-xl");
        publicOrPrivateButton.innerHTML = "Change To Public Reflections";
        vaultEmptyMessageContainer.classList.remove(
          "vault-empty-container-not-displayed",
        );
        emptyVaultHeading.innerHTML = "Your Private Vault Is Empty!!";
        cardSection.innerHTML = "";
        isPublicVellum = true;
      } else {
        vaultHeading.innerHTML = "My Private Vault";
        vaultHeader.innerHTML = "My Private Reflections:";
        vaultPadlock.classList.remove("fa-solid");
        vaultPadlock.classList.remove("fa-lock-open");
        vaultPadlock.classList.remove("fa-xl");
        vaultPadlock.classList.add("fa-solid");
        vaultPadlock.classList.add("fa-lock");
        vaultPadlock.classList.add("fa-xl");

        cardSection.innerHTML = "";

        publicOrPrivateButton.innerHTML = "Change To Public Reflections";
        vaultEmptyMessageContainer.classList.add(
          "vault-empty-container-not-displayed",
        );

        storedPrivateVellum.forEach((vellum, index) => {
          // delete message section --------------------------------------------------
          const deleteVellumDiv = document.createElement("div");
          const deleteVellumParagraph = document.createElement("p");
          const deleteVellumButtonContainer = document.createElement("div");
          const deleteVellumYesButton = document.createElement("button");
          const deleteVellumNoButton = document.createElement("button");
          deleteVellumParagraph.innerHTML = "Are You Sure!!!";
          deleteVellumYesButton.innerHTML = "Yes";
          deleteVellumNoButton.innerHTML = "No";
          deleteVellumDiv.classList.add("vault-delete-confirm");
          deleteVellumDiv.classList.add("vault-confirm-is-displayed");
          deleteVellumButtonContainer.classList.add(
            "vault-confirm-button-container",
          );
          deleteVellumYesButton.classList.add("vault-yes-button");
          deleteVellumNoButton.classList.add("vault-no-button");
          deleteVellumDiv.appendChild(deleteVellumParagraph);
          deleteVellumButtonContainer.appendChild(deleteVellumYesButton);
          deleteVellumButtonContainer.appendChild(deleteVellumNoButton);
          deleteVellumDiv.appendChild(deleteVellumButtonContainer);

          deleteVellumNoButton.addEventListener("click", () => {
            deleteVellumDiv.classList.add("vault-confirm-is-displayed");
          });

          deleteVellumYesButton.onclick = () => deleteVellum(index);

          function deleteVellum(vellumIndex) {
            const newVellumArray = storedPrivateVellum.filter(
              (item, index) => index !== vellumIndex,
            );
            localStorage.setItem(
              "private-vellum-entries",
              JSON.stringify(newVellumArray),
            );
            deleteVellumDiv.classList.add("vault-confirm-is-displayed");
            isPublicVellum = false;

            // location.href = location.href; //reloads the page
            secondaryDisplaySignInMessage = false;
            publicOrPrivate();
          }
          // card section
          const cardsectionTagContainer = document.createElement("div");
          if (vellum.createdTagOne) {
            const mainContainer = document.createElement("div");
            const tagOneContainer = document.createElement("div");
            const tagTwoContainer = document.createElement("div");
            const tagThreeContainer = document.createElement("div");
            const emojiParagraphOne = document.createElement("p");
            const titleParagraphOne = document.createElement("p");
            const emojiParagraphTwo = document.createElement("p");
            const titleParagraphTwo = document.createElement("p");
            const emojiParagraphThree = document.createElement("p");
            const titleParagraphThree = document.createElement("p");

            if (vellum.createdTagOne && !vellum.createdTagTwo) {
              emojiParagraphOne.innerHTML = vellum.createdTagOne.createdEmoji;
              titleParagraphOne.innerHTML = vellum.createdTagOne.createdTitle;
              cardsectionTagContainer.appendChild(mainContainer);
              mainContainer.appendChild(tagOneContainer);
              tagOneContainer.appendChild(emojiParagraphOne);
              tagOneContainer.appendChild(titleParagraphOne);
            } else if (
              vellum.createdTagOne &&
              vellum.createdTagTwo &&
              !vellum.createdTagThree
            ) {
              emojiParagraphOne.innerHTML = vellum.createdTagOne.createdEmoji;
              titleParagraphOne.innerHTML = vellum.createdTagOne.createdTitle;
              emojiParagraphTwo.innerHTML = vellum.createdTagTwo.createdEmoji;
              titleParagraphTwo.innerHTML = vellum.createdTagTwo.createdTitle;
              cardsectionTagContainer.appendChild(mainContainer);
              mainContainer.appendChild(tagOneContainer);
              mainContainer.appendChild(tagTwoContainer);
              tagOneContainer.appendChild(emojiParagraphOne);
              tagOneContainer.appendChild(titleParagraphOne);
              tagTwoContainer.appendChild(emojiParagraphTwo);
              tagTwoContainer.appendChild(titleParagraphTwo);
            } else if (
              vellum.createdTagOne &&
              vellum.createdTagTwo &&
              vellum.createdTagThree
            ) {
              emojiParagraphOne.innerHTML = vellum.createdTagOne.createdEmoji;
              titleParagraphOne.innerHTML = vellum.createdTagOne.createdTitle;
              emojiParagraphTwo.innerHTML = vellum.createdTagTwo.createdEmoji;
              titleParagraphTwo.innerHTML = vellum.createdTagTwo.createdTitle;
              emojiParagraphThree.innerHTML =
                vellum.createdTagThree.createdEmoji;
              titleParagraphThree.innerHTML =
                vellum.createdTagThree.createdTitle;
              cardsectionTagContainer.appendChild(mainContainer);
              mainContainer.appendChild(tagOneContainer);
              mainContainer.appendChild(tagTwoContainer);
              mainContainer.appendChild(tagThreeContainer);
              tagOneContainer.appendChild(emojiParagraphOne);
              tagOneContainer.appendChild(titleParagraphOne);
              tagTwoContainer.appendChild(emojiParagraphTwo);
              tagTwoContainer.appendChild(titleParagraphTwo);
              tagThreeContainer.appendChild(emojiParagraphThree);
              tagThreeContainer.appendChild(titleParagraphThree);
            }

            mainContainer.classList.add("vault-created-tag-container");
            tagOneContainer.classList.add("vault-created-tag");
            tagTwoContainer.classList.add("vault-created-tag");
            tagThreeContainer.classList.add("vault-created-tag");
          }

          const cardSectionDiv = document.createElement("div");
          const cardSectionDateParagraphAndTagContainer =
            document.createElement("div");
          const cardSectionDateParagraph = document.createElement("p");

          const cardSectionHeading = document.createElement("h2");
          const reflectionParagraphAndButtonDiv = document.createElement("div");
          const reflectionParagraphDiv = document.createElement("div");

          const cardSectionReflectionParagraph = document.createElement("p");
          const expandButton = document.createElement("button");

          cardSectionDateParagraph.innerHTML = `${vellum.day}, ${vellum.date} ${vellum.month} ${vellum.year}`;
          cardSectionHeading.innerHTML = vellum.title;
          cardSectionReflectionParagraph.innerHTML = vellum.reflection;
          expandButton.innerHTML = "EXPAND";

          expandButton.onclick = () => {
            if (isExpanded == false) {
              reflectionParagraphDiv.classList.remove(
                "vault-reflection-paragraph-div",
              );
              reflectionParagraphDiv.classList.add(
                "vault-reflection-paragraph-div-expand",
              );
              expandButton.innerHTML = "SHRINK";
              isExpanded = true;
            } else {
              reflectionParagraphDiv.classList.remove(
                "vault-reflection-paragraph-div-expand",
              );
              reflectionParagraphDiv.classList.add(
                "vault-reflection-paragraph-div",
              );
              expandButton.innerHTML = "EXPAND";
              isExpanded = false;
            }
          };

          const dateAndIconDiv = document.createElement("div");
          const crossIconDiv = document.createElement("div");
          const crossIcon = document.createElement("i");

          dateAndIconDiv.appendChild(cardSectionDateParagraphAndTagContainer);
          cardSectionDateParagraphAndTagContainer.appendChild(
            cardSectionDateParagraph,
          );
          cardSectionDateParagraphAndTagContainer.appendChild(
            cardsectionTagContainer,
          );
          cardSectionDiv.appendChild(dateAndIconDiv);
          dateAndIconDiv.appendChild(crossIconDiv);
          crossIconDiv.appendChild(crossIcon);
          dateAndIconDiv.appendChild(deleteVellumDiv);

          dateAndIconDiv.classList.add("dateAndIconDiv");
          cardSectionDateParagraphAndTagContainer.classList.add(
            "date-and-tag-container",
          );

          cardSectionDateParagraph.classList.add("vault-date-paragraph");
          cardsectionTagContainer.classList.add("tag-container");
          crossIconDiv.classList.add("cross-icon-div");
          crossIcon.classList.add("fa-solid");
          crossIcon.classList.add("fa-x");
          crossIcon.classList.add("fa-sm");

          cardSectionHeading.classList.add("vault-heading");

          crossIconDiv.addEventListener("click", () => {
            deleteVellumDiv.classList.remove("vault-confirm-is-displayed");
            expandButton.innerHTML = "SHRINK";
          });

          cardSectionDiv.appendChild(cardSectionHeading);
          cardSectionDiv.appendChild(reflectionParagraphAndButtonDiv);
          reflectionParagraphAndButtonDiv.appendChild(reflectionParagraphDiv);
          reflectionParagraphAndButtonDiv.appendChild(expandButton);

          reflectionParagraphDiv.appendChild(cardSectionReflectionParagraph);
          cardSection.appendChild(cardSectionDiv);
          expandButton.classList.add("expand-button-hidden");

          if (cardSectionReflectionParagraph.innerHTML.length >= 170) {
            expandButton.classList.remove("expand-button-hidden");
          }

          //   --------------------------------------------------------------------------

          cardSectionDiv.classList.add("vault-reflection-container");
          cardSectionHeading.classList.add("vault-heading");
          reflectionParagraphAndButtonDiv.classList.add(
            "vault-reflection-and-button-div",
          );
          reflectionParagraphDiv.classList.add(
            "vault-reflection-paragraph-div",
          );
          expandButton.classList.add("expand-button");
        });
        isPublicVellum = true;
      }
    }
  } else {
    if (storedPublicVellum.length <= 0) {
      vaultHeading.innerHTML = "My Public Vault";
      vaultHeader.innerHTML = "My Public Reflections:";
      vaultPadlock.classList.remove("fa-solid");
      vaultPadlock.classList.remove("fa-lock");
      vaultPadlock.classList.remove("fa-xl");
      vaultPadlock.classList.add("fa-solid");
      vaultPadlock.classList.add("fa-lock-open");
      vaultPadlock.classList.add("fa-xl");
      publicOrPrivateButton.innerHTML = "Change To Private Reflections";
      vaultEmptyMessageContainer.classList.remove(
        "vault-empty-container-not-displayed",
      );
      cardSection.innerHTML = "";
      emptyVaultHeading.innerHTML = "Your Public Vault Is Empty!!";
      isPublicVellum = false;
    } else {
      const storedPublicVellum = JSON.parse(
        localStorage.getItem("public-vellum-entries"),
      );

      vaultHeading.innerHTML = "My Public Vault";
      publicOrPrivateButton.innerHTML = "Change To Private Reflections";
      vaultEmptyMessageContainer.classList.add(
        "vault-empty-container-not-displayed",
      );

      cardSection.innerHTML = "";
      vaultHeader.innerHTML = "My Public Reflections:";
      vaultPadlock.classList.remove("fa-solid");
      vaultPadlock.classList.remove("fa-lock");
      vaultPadlock.classList.remove("fa-xl");
      vaultPadlock.classList.add("fa-solid");
      vaultPadlock.classList.add("fa-lock-open");
      vaultPadlock.classList.add("fa-xl");

      storedPublicVellum.forEach((vellum, index) => {
        // delete message section --------------------------------------------------
        const deleteVellumDiv = document.createElement("div");
        const deleteVellumParagraph = document.createElement("p");
        const deleteVellumButtonContainer = document.createElement("div");
        const deleteVellumYesButton = document.createElement("button");
        const deleteVellumNoButton = document.createElement("button");
        deleteVellumParagraph.innerHTML = "Are You Sure!!!";
        deleteVellumYesButton.innerHTML = "Yes";
        deleteVellumNoButton.innerHTML = "No";
        deleteVellumDiv.classList.add("vault-delete-confirm");
        deleteVellumDiv.classList.add("vault-confirm-is-displayed");
        deleteVellumButtonContainer.classList.add(
          "vault-confirm-button-container",
        );
        deleteVellumYesButton.classList.add("vault-yes-button");
        deleteVellumNoButton.classList.add("vault-no-button");
        deleteVellumDiv.appendChild(deleteVellumParagraph);
        deleteVellumButtonContainer.appendChild(deleteVellumYesButton);
        deleteVellumButtonContainer.appendChild(deleteVellumNoButton);
        deleteVellumDiv.appendChild(deleteVellumButtonContainer);

        deleteVellumNoButton.addEventListener("click", () => {
          deleteVellumDiv.classList.add("vault-confirm-is-displayed");
        });

        deleteVellumYesButton.onclick = () => deleteVellum(index);

        function deleteVellum(vellumIndex) {
          const newVellumArray = storedPublicVellum.filter(
            (item, index) => index !== vellumIndex,
          );
          localStorage.setItem(
            "public-vellum-entries",
            JSON.stringify(newVellumArray),
          );
          isPublicVellum = true;
          deleteVellumDiv.classList.add("vault-confirm-is-displayed");
          secondaryDisplaySignInMessage = false;
          publicOrPrivate();
        }
        // card section
        const cardsectionTagContainer = document.createElement("div");
        if (vellum.createdTagOne) {
          const mainContainer = document.createElement("div");
          const tagOneContainer = document.createElement("div");
          const tagTwoContainer = document.createElement("div");
          const tagThreeContainer = document.createElement("div");
          const emojiParagraphOne = document.createElement("p");
          const titleParagraphOne = document.createElement("p");
          const emojiParagraphTwo = document.createElement("p");
          const titleParagraphTwo = document.createElement("p");
          const emojiParagraphThree = document.createElement("p");
          const titleParagraphThree = document.createElement("p");

          if (vellum.createdTagOne && !vellum.createdTagTwo) {
            emojiParagraphOne.innerHTML = vellum.createdTagOne.createdEmoji;
            titleParagraphOne.innerHTML = vellum.createdTagOne.createdTitle;
            cardsectionTagContainer.appendChild(mainContainer);
            mainContainer.appendChild(tagOneContainer);
            tagOneContainer.appendChild(emojiParagraphOne);
            tagOneContainer.appendChild(titleParagraphOne);
          } else if (
            vellum.createdTagOne &&
            vellum.createdTagTwo &&
            !vellum.createdTagThree
          ) {
            emojiParagraphOne.innerHTML = vellum.createdTagOne.createdEmoji;
            titleParagraphOne.innerHTML = vellum.createdTagOne.createdTitle;
            emojiParagraphTwo.innerHTML = vellum.createdTagTwo.createdEmoji;
            titleParagraphTwo.innerHTML = vellum.createdTagTwo.createdTitle;
            cardsectionTagContainer.appendChild(mainContainer);
            mainContainer.appendChild(tagOneContainer);
            mainContainer.appendChild(tagTwoContainer);
            tagOneContainer.appendChild(emojiParagraphOne);
            tagOneContainer.appendChild(titleParagraphOne);
            tagTwoContainer.appendChild(emojiParagraphTwo);
            tagTwoContainer.appendChild(titleParagraphTwo);
          } else if (
            vellum.createdTagOne &&
            vellum.createdTagTwo &&
            vellum.createdTagThree
          ) {
            emojiParagraphOne.innerHTML = vellum.createdTagOne.createdEmoji;
            titleParagraphOne.innerHTML = vellum.createdTagOne.createdTitle;
            emojiParagraphTwo.innerHTML = vellum.createdTagTwo.createdEmoji;
            titleParagraphTwo.innerHTML = vellum.createdTagTwo.createdTitle;
            emojiParagraphThree.innerHTML = vellum.createdTagThree.createdEmoji;
            titleParagraphThree.innerHTML = vellum.createdTagThree.createdTitle;
            cardsectionTagContainer.appendChild(mainContainer);
            mainContainer.appendChild(tagOneContainer);
            mainContainer.appendChild(tagTwoContainer);
            mainContainer.appendChild(tagThreeContainer);
            tagOneContainer.appendChild(emojiParagraphOne);
            tagOneContainer.appendChild(titleParagraphOne);
            tagTwoContainer.appendChild(emojiParagraphTwo);
            tagTwoContainer.appendChild(titleParagraphTwo);
            tagThreeContainer.appendChild(emojiParagraphThree);
            tagThreeContainer.appendChild(titleParagraphThree);
          }

          mainContainer.classList.add("vault-created-tag-container");
          if (!emojiParagraphOne) {
            tagOneContainer.classList.add("no-emoji");
            console.log("no-emoji");
          } else {
            tagOneContainer.classList.add("vault-created-tag");
          }
          tagTwoContainer.classList.add("vault-created-tag");
          tagThreeContainer.classList.add("vault-created-tag");
        }

        const cardSectionDiv = document.createElement("div");
        const cardSectionDateParagraphAndTagContainer =
          document.createElement("div");
        const cardSectionDateParagraph = document.createElement("p");

        const cardSectionHeading = document.createElement("h2");
        const reflectionParagraphAndButtonDiv = document.createElement("div");
        const reflectionParagraphDiv = document.createElement("div");

        const cardSectionReflectionParagraph = document.createElement("p");
        const expandButton = document.createElement("button");

        cardSectionDateParagraph.innerHTML = `${vellum.day}, ${vellum.date} ${vellum.month} ${vellum.year}`;
        cardSectionHeading.innerHTML = vellum.title;
        cardSectionReflectionParagraph.innerHTML = vellum.reflection;
        expandButton.innerHTML = "EXPAND";
        console.log(isExpanded);
        expandButton.onclick = () => {
          if (isExpanded == false) {
            console.log(isExpanded);
            reflectionParagraphDiv.classList.remove(
              "vault-reflection-paragraph-div",
            );
            reflectionParagraphDiv.classList.add(
              "vault-reflection-paragraph-div-expand",
            );
            expandButton.innerHTML = "SHRINK";
            isExpanded = true;
          } else {
            reflectionParagraphDiv.classList.remove(
              "vault-reflection-paragraph-div-expand",
            );
            reflectionParagraphDiv.classList.add(
              "vault-reflection-paragraph-div",
            );
            expandButton.innerHTML = "EXPAND";
            isExpanded = false;
          }
        };

        const dateAndIconDiv = document.createElement("div");
        const crossIconDiv = document.createElement("div");
        const crossIcon = document.createElement("i");

        dateAndIconDiv.appendChild(cardSectionDateParagraphAndTagContainer);
        cardSectionDateParagraphAndTagContainer.appendChild(
          cardSectionDateParagraph,
        );
        cardSectionDateParagraphAndTagContainer.appendChild(
          cardsectionTagContainer,
        );
        cardSectionDiv.appendChild(dateAndIconDiv);
        dateAndIconDiv.appendChild(crossIconDiv);
        crossIconDiv.appendChild(crossIcon);
        dateAndIconDiv.appendChild(deleteVellumDiv);

        dateAndIconDiv.classList.add("dateAndIconDiv");
        cardSectionDateParagraphAndTagContainer.classList.add(
          "date-and-tag-container",
        );

        cardSectionDateParagraph.classList.add("vault-date-paragraph");
        cardsectionTagContainer.classList.add("tag-container");
        crossIconDiv.classList.add("cross-icon-div");
        crossIcon.classList.add("fa-solid");
        crossIcon.classList.add("fa-x");
        crossIcon.classList.add("fa-sm");

        cardSectionHeading.classList.add("vault-heading");

        crossIconDiv.addEventListener("click", () => {
          deleteVellumDiv.classList.remove("vault-confirm-is-displayed");
          expandButton.innerHTML = "SHRINK";
        });

        cardSectionDiv.appendChild(cardSectionHeading);
        cardSectionDiv.appendChild(reflectionParagraphAndButtonDiv);
        reflectionParagraphAndButtonDiv.appendChild(reflectionParagraphDiv);
        reflectionParagraphAndButtonDiv.appendChild(expandButton);

        reflectionParagraphDiv.appendChild(cardSectionReflectionParagraph);
        cardSection.appendChild(cardSectionDiv);
        expandButton.classList.add("expand-button-hidden");

        if (cardSectionReflectionParagraph.innerHTML.length >= 170) {
          expandButton.classList.remove("expand-button-hidden");
        }

        //   --------------------------------------------------------------------------

        cardSectionDiv.classList.add("vault-reflection-container");
        cardSectionHeading.classList.add("vault-heading");
        reflectionParagraphAndButtonDiv.classList.add(
          "vault-reflection-and-button-div",
        );
        reflectionParagraphDiv.classList.add("vault-reflection-paragraph-div");
        expandButton.classList.add("expand-button");
      });
    }
  }
}
