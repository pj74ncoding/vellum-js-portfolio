const homeStoredPublicVellum = JSON.parse(
  localStorage.getItem("public-vellum-entries"),
);

const homeStoredPrivateVellum = JSON.parse(
  localStorage.getItem("private-vellum-entries"),
);

let userLoggedIn;
if (localStorage.getItem("user-logged-in") != null) {
  userLoggedIn = localStorage.getItem("user-logged-in");
}
if (localStorage.getItem("user-logged-in") == null) {
  localStorage.setItem("user-logged-in", "false");
}

let isPublic = false;
let displaySignInMessage = false;
let secondaryDisplaySignInMessage = false;

const feelingInspiredSection = document.querySelector(
  ".feeling-inspired-container",
);

// sound effect-----------------------------------------------------------

window.onload = () => {
  const audio = document.getElementById("myAudio");
  audio.play().catch((err) => {
    console.warn("Autoplay.Blocked", err);
  });
};
const userColourTheme = localStorage.getItem("colour-theme");
const soundOn = document.getElementById("index-sound-on-icon");
const soundOff = document.getElementById("index-sound-off-icon");
const audio = document.getElementById("myAudio");

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
const profileIconContainer = document.getElementById("profile-icon-container");
const profileIcon = document.getElementById("profile-icon");
const profileMenu = document.querySelector(".profile-menu");
const loggedIn = document.getElementById("logged-in");
const logInButton = document.getElementById("log-in-button");
const logOutButton = document.getElementById("log-out-button");

if (localStorage.getItem("user-logged-in") == "false") {
  logOutButton.classList.add("not-displayed");
  loggedIn.textContent = "Sign In";
} else {
  logInButton.classList.add("not-displayed");
  logOutButton.classList.remove("not-displayed");
  profileIcon.classList.add("profile-icon-logged-in");
  loggedIn.textContent = "Foxes1888";
}

// login section

const loginSection = document.getElementById("vault-login-section");
const loginUsername = document.getElementById("vault-username");
const loginPassword = document.getElementById("vault-password");
const loginConfirmButton = document.getElementById(
  "vault-login-confirm-button",
);
const loginErrorMessage = document.getElementById("vault-login-error-message");

let enteredProfileMenu = false;
let enteredProfileContainer = false;
profileIconContainer.addEventListener("mouseover", () => {
  setTimeout(() => {
    profileMenu.classList.remove("profile-menu-displayed");
  }, 200);
  enteredProfileContainer = true;
});
profileIconContainer.addEventListener("mouseleave", () => {
  profileMenuDisplay();
  enteredProfileContainer = false;
});

function profileMenuDisplay() {
  setTimeout(() => {
    if (!enteredProfileMenu) {
      profileMenu.classList.add("profile-menu-displayed");
    }
  }, 200);
}

profileMenu.addEventListener("mouseover", () => {
  enteredProfileMenu = true;
});
profileMenu.addEventListener("mouseleave", () => {
  setTimeout(() => {
    profileMenu.classList.add("profile-menu-displayed");
    enteredProfileMenu = false;
  }, 400);
});
const cardSectionContainer = document.getElementById("card-section-container");
logInButton.addEventListener("click", () => {
  const userLoggedIn = localStorage.getItem("user-logged-in");
  if (userLoggedIn == "false") {
    loginSection.classList.remove("not-displayed");
    profileMenu.classList.add("profile-menu-displayed");
    cardSectionContainer.classList.add("not-displayed");
    feelingInspiredSection.classList.add("not-displayed");
  }
});

logOutButton.addEventListener("click", () => {
  localStorage.setItem("user-logged-in", "false");
  logInButton.classList.remove("not-displayed");
  logOutButton.classList.add("not-displayed");
  profileIcon.classList.remove("profile-icon-logged-in");
  loggedIn.textContent = "Sign In";
  secondaryDisplaySignInMessage = false;
  homePublicOrPrivate();
});
// login section

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
    loginSection.classList.add("not-displayed");

    loginDetailsArray = [];
    localStorage.setItem("user-logged-in", "true");
    profileIcon.classList.add("profile-icon-logged-in");
    loggedIn.textContent = "Foxes1888";
    logInButton.classList.add("not-displayed");
    logOutButton.classList.remove("not-displayed");
    cardSectionContainer.classList.remove("not-displayed");
    feelingInspiredSection.classList.remove("not-displayed");
  } else {
    loginErrorMessage.classList.remove("vault-is-displayed");
  }
});

function closeLogin() {
  loginSection.classList.add("not-displayed");
  loginErrorMessage.classList.add("vault-is-displayed");
  const loginUsername = document.getElementById("vault-username");
  const loginPassword = document.getElementById("vault-password");
  cardSectionContainer.classList.remove("not-displayed");
  feelingInspiredSection.classList.remove("not-displayed");
  loginUsername.value = "";
  loginPassword.value = "";
}

// public / private reflection header
const homeHeaderContainer = document.getElementById(
  "your-newest-reflections-header-container",
);

const privateErrorMessage = document.getElementById("private-error-message");
const homePadlock = document.getElementById("home-padlock");
const homeHeader = document.getElementById("newest-reflections-header");
const homePublicOrPrivatebutton = document.getElementById(
  "home-public-or-private-button",
);
const cardSection = document.getElementById("vellum-card-section");

function displayErrorMessage() {
  console.log(secondaryDisplaySignInMessage, "secondaryDisplaySignInMessage");
  console.log(displaySignInMessage, "displaySignInMessage");

  if (displaySignInMessage == false || secondaryDisplaySignInMessage == false) {
    displaySignInMessage = true;
    secondaryDisplaySignInMessage = true;

    return;
  } else if (
    displaySignInMessage == true &&
    secondaryDisplaySignInMessage == true
  ) {
    privateErrorMessage.classList.remove("vault-is-displayed");
    setTimeout(() => {
      privateErrorMessage.classList.add("vault-is-displayed");
    }, 3000);
  }
}

homePublicOrPrivate();
function homePublicOrPrivate() {
  const loggedInUser = localStorage.getItem("user-logged-in");
  console.log(loggedInUser, "loggedInUser");
  if (loggedInUser == "false") {
    displayErrorMessage();
  }
  const homeStoredPublicVellum = JSON.parse(
    localStorage.getItem("public-vellum-entries"),
  );
  const homeStoredPrivateVellum = JSON.parse(
    localStorage.getItem("private-vellum-entries"),
  );

  cardSection.classList.remove("card-section-one");
  cardSection.classList.remove("card-section-two");
  cardSection.classList.remove("card-section-three");
  console.log(loggedInUser, "loggedInUser");
  if (loggedInUser == "true") {
    console.log(loggedInUser, "loggedInUser-inpublic");
    cardSection.innerHTML = "";
    console.log(isPublic, "isPublic");
    if (isPublic == true) {
      cardSection.classList.add("card-section");
      if (homeStoredPublicVellum.length == 1) {
        cardSection.classList.remove("card-section");
        cardSection.classList.add("card-section-one");
      }

      if (homeStoredPublicVellum.length == 3) {
        cardSection.classList.remove("card-section");
        cardSection.classList.add("card-section-two");
      }

      if (homeStoredPublicVellum.length == 5) {
        cardSection.classList.remove("card-section");
        cardSection.classList.add("card-section-three");
      }

      homeHeader.innerHTML = "Your Newest Public Reflections:";
      homePadlock.classList.remove("fa-solid");
      homePadlock.classList.remove("fa-lock");
      homePadlock.classList.remove("fa-xl");
      homePadlock.classList.add("fa-solid");
      homePadlock.classList.add("fa-lock-open");
      homePadlock.classList.add("fa-xl");
      homePublicOrPrivatebutton.innerHTML = "Change To Private Reflections";

      homeStoredPublicVellum
        .slice(-6)
        .reverse()
        .forEach((vellum) => {
          const cardSectionDiv = document.createElement("div");
          const cardSectionDateParagraph = document.createElement("p");
          const cardSectionHeading = document.createElement("h2");
          const reflectionParagraphDiv = document.createElement("div");
          const cardSectionReflectionParagraph = document.createElement("p");
          cardSectionDateParagraph.innerHTML = `${vellum.day}, ${vellum.date} ${vellum.month} ${vellum.year}`;
          cardSectionHeading.innerHTML = vellum.title;
          cardSectionReflectionParagraph.innerHTML = vellum.reflection;

          cardSectionDiv.appendChild(cardSectionDateParagraph);
          cardSectionDiv.appendChild(cardSectionHeading);
          cardSectionDiv.appendChild(reflectionParagraphDiv);
          reflectionParagraphDiv.appendChild(cardSectionReflectionParagraph);

          cardSection.appendChild(cardSectionDiv);
          //   --------------------------------------------------------------------------
          cardSectionDiv.classList.add("index-reflection-container");
          cardSectionDateParagraph.classList.add("index-date-heading");
          cardSectionHeading.classList.add("index-reflection-heading");
          reflectionParagraphDiv.classList.add("index-reflection-div");
          cardSectionReflectionParagraph.classList.add(
            "index-reflection-paragraph",
          );
        });

      isPublic = false;
    } else if (isPublic == false) {
      console.log(isPublic, "isPublicinprivate");
      cardSection.innerHTML = "";
      console.log(loggedInUser, "loggedInUser-inprivate");
      cardSection.classList.remove("card-section-one");
      cardSection.classList.remove("card-section-two");
      cardSection.classList.remove("card-section-three");
      cardSection.classList.add("card-section");
      if (homeStoredPrivateVellum.length == 1) {
        cardSection.classList.remove("card-section");
        cardSection.classList.add("card-section-one");
      }

      if (homeStoredPrivateVellum.length == 3) {
        cardSection.classList.remove("card-section");
        cardSection.classList.add("card-section-two");
      }

      if (homeStoredPrivateVellum.length == 5) {
        cardSection.classList.remove("card-section");
        cardSection.classList.add("card-section-three");
      }
      homeHeader.innerHTML = "Your Newest Private Reflections:";
      homePadlock.classList.remove("fa-solid");
      homePadlock.classList.remove("fa-lock-open");
      homePadlock.classList.remove("fa-xl");
      homePadlock.classList.add("fa-solid");
      homePadlock.classList.add("fa-lock");
      homePadlock.classList.add("fa-xl");
      homePublicOrPrivatebutton.innerHTML = "Change To Public Reflections";
      cardSection.innerHTML = "";
      homeStoredPrivateVellum
        .slice(-6)
        .reverse()
        .forEach((vellum) => {
          const cardSectionDiv = document.createElement("div");
          const cardSectionDateParagraph = document.createElement("p");
          const cardSectionHeading = document.createElement("h2");
          const reflectionParagraphDiv = document.createElement("div");
          const cardSectionReflectionParagraph = document.createElement("p");
          cardSectionDateParagraph.innerHTML = `${vellum.day}, ${vellum.date} ${vellum.month} ${vellum.year}`;
          cardSectionHeading.innerHTML = vellum.title;
          cardSectionReflectionParagraph.innerHTML = vellum.reflection;

          cardSectionDiv.appendChild(cardSectionDateParagraph);
          cardSectionDiv.appendChild(cardSectionHeading);
          cardSectionDiv.appendChild(reflectionParagraphDiv);
          reflectionParagraphDiv.appendChild(cardSectionReflectionParagraph);

          cardSection.appendChild(cardSectionDiv);
          //   --------------------------------------------------------------------------
          cardSectionDiv.classList.add("index-reflection-container");
          cardSectionDateParagraph.classList.add("index-date-heading");
          cardSectionHeading.classList.add("index-reflection-heading");
          reflectionParagraphDiv.classList.add("index-reflection-div");
          cardSectionReflectionParagraph.classList.add(
            "index-reflection-paragraph",
          );
        });

      isPublic = true;
    }
  } else {
    cardSection.classList.add("card-section");
    cardSection.innerHTML = "";
    if (homeStoredPublicVellum.length == 1) {
      cardSection.classList.remove("card-section");
      cardSection.classList.add("card-section-one");
    }

    if (homeStoredPublicVellum.length == 3) {
      cardSection.classList.remove("card-section");
      cardSection.classList.add("card-section-two");
    }

    if (homeStoredPublicVellum.length == 5) {
      cardSection.classList.remove("card-section");
      cardSection.classList.add("card-section-three");
    }

    homeHeader.innerHTML = "Your Newest Public Reflections:";
    homePadlock.classList.add("fa-solid");
    homePadlock.classList.add("fa-lock-open");
    homePadlock.classList.add("fa-xl");
    homePublicOrPrivatebutton.innerHTML = "Change To Private Reflections";

    homeStoredPublicVellum
      .slice(-6)
      .reverse()
      .forEach((vellum) => {
        const cardSectionDiv = document.createElement("div");
        const cardSectionDateParagraph = document.createElement("p");
        const cardSectionHeading = document.createElement("h2");
        const reflectionParagraphDiv = document.createElement("div");
        const cardSectionReflectionParagraph = document.createElement("p");
        cardSectionDateParagraph.innerHTML = `${vellum.day}, ${vellum.date} ${vellum.month} ${vellum.year}`;
        cardSectionHeading.innerHTML = vellum.title;
        cardSectionReflectionParagraph.innerHTML = vellum.reflection;

        cardSectionDiv.appendChild(cardSectionDateParagraph);
        cardSectionDiv.appendChild(cardSectionHeading);
        cardSectionDiv.appendChild(reflectionParagraphDiv);
        reflectionParagraphDiv.appendChild(cardSectionReflectionParagraph);

        cardSection.appendChild(cardSectionDiv);
        //   --------------------------------------------------------------------------
        cardSectionDiv.classList.add("index-reflection-container");
        cardSectionDateParagraph.classList.add("index-date-heading");
        cardSectionHeading.classList.add("index-reflection-heading");
        reflectionParagraphDiv.classList.add("index-reflection-div");
        cardSectionReflectionParagraph.classList.add(
          "index-reflection-paragraph",
        );
      });
  }
}
