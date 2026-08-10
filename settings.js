// let userLoggedIn;
// userLoggedIn = localStorage.getItem("user-logged-in");

// sound effect-----------------------------------------------------------
const userColourTheme = localStorage.getItem("colour-theme");
const audio = document.getElementById("myAudio");
const forestGreenSoundOn = document.getElementById(
  "forest-green-sound-on-icon",
);
const forestGreenSoundOff = document.getElementById(
  "forest-green-sound-off-icon",
);

const sunriseSoundOn = document.getElementById("sunrise-sound-on-icon");
const sunriseSoundOff = document.getElementById("sunrise-sound-off-icon");
const seaBlueSoundOn = document.getElementById("sea-blue-sound-on-icon");
const seaBlueSoundOff = document.getElementById("sea-blue-sound-off-icon");

forestGreenSoundOn.addEventListener("click", () => {
  audio.src = "sounds/soundreality-forest-sound-576537.mp3";
  audio.volume = 0.5;
  audio.play();
});

forestGreenSoundOff.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0; //resets to the start
});
sunriseSoundOn.addEventListener("click", () => {
  audio.src = "sounds/freesound_community-meditation_impromptu_01-17402.mp3";
  audio.volume = 0.5;
  audio.play();
});

sunriseSoundOff.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0; //resets to the start
});
seaBlueSoundOn.addEventListener("click", () => {
  audio.src =
    "sounds/freesound_community-calm-waves-crashing-against-a-beach-74813.mp3";
  audio.volume = 0.5;
  audio.play();
});

seaBlueSoundOff.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0; //resets to the start
});

// profile menu ----------------------------------------------------------
const vaultProfileIconContainer = document.getElementById(
  "vault-profile-container",
);
const vaultProfileIcon = document.getElementById("vault-profile-icon");
const vaultLoggedIn = document.getElementById("vault-logged-in");
const vaultProfileMenu = document.querySelector(".settings-profile-menu");
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
    mainBodySection.classList.remove("main-body-section-not-displayed");
  } else {
    vaultLoginErrorMessage.classList.remove("vault-is-displayed");
  }
});

const mainBodySection = document.getElementById("main-body-section");
mainBodySection.classList.remove("main-body-section-not-displayed");
vaultLogInButton.addEventListener("click", () => {
  const userLoggedIn = localStorage.getItem("user-logged-in");
  if (userLoggedIn == "false") {
    vaultLoginSection.classList.remove("not-displayed");
    vaultProfileMenu.classList.add("profile-menu-displayed");
    mainBodySection.classList.add("main-body-section-not-displayed");
  }
});

vaultLogOutButton.addEventListener("click", () => {
  userLoggedIn = localStorage.setItem("user-logged-in", "false");
  vaultProfileIcon.classList.remove("vault-profile-icon-logged-in");
  vaultLoggedIn.textContent = "Sign In";
  vaultLogInButton.classList.remove("not-displayed");
  vaultLogOutButton.classList.add("not-displayed");
  mainBodySection.classList.remove("main-body-section-not-displayed");

  secondaryDisplaySignInMessage = false;
});

function closeLogin() {
  vaultLoginSection.classList.add("not-displayed");
  vaultLoginErrorMessage.classList.add("vault-is-displayed");
  const loginUsername = document.getElementById("vault-username");
  const loginPassword = document.getElementById("vault-password");
  mainBodySection.classList.remove("main-body-section-not-displayed");

  loginUsername.value = "";
  loginPassword.value = "";
}

// change theme form ------------------------------------------------

const theme = localStorage.getItem("colour-theme");

const themeHeading = document.getElementById("chosen-theme-h3");
const forestGreenCardContainer = document.querySelector(
  ".forest-green-card-main-container",
);

const sunRiseCardContainer = document.querySelector(
  ".sunrise-card-main-container",
);
const seaBlueCardContainer = document.querySelector(
  ".sea-blue-card-main-container",
);

const forestGreen = document.querySelector(".forest-green-checkbox");
const sunRise = document.querySelector(".sunrise-checkbox");
const seaBlue = document.querySelector(".sea-blue-checkbox");
const themeErrorMessage = document.getElementById("theme-error-message");

// sets the theme name and style in the html Your theme is: (Forest Green, Sunrise or Sea Blue)
setThemeParagraphColour();
function setThemeParagraphColour() {
  // soundtheme();
  const theme = localStorage.getItem("colour-theme");
  if (theme == "forest-green") {
    forestGreenCardContainer.classList.add("chosen-theme-style");
    themeHeading.textContent = "Forest Green";
    themeHeading.style.color = "darkgreen";
    themeHeading.style.fontSize = "20px";
    themeHeading.style.fontWeight = "bold";
    themeHeading.style.fontStyle = "italic";
    sunRise.classList.remove("not-displayed");
    seaBlue.classList.remove("not-displayed");
  } else if (theme == "sunrise") {
    sunRiseCardContainer.classList.add("chosen-theme-style");
    themeHeading.textContent = "Sunrise";
    themeHeading.style.color = "darkorange";
    themeHeading.style.fontSize = "20px";
    themeHeading.style.fontWeight = "bold";
    themeHeading.style.fontStyle = "italic";
    forestGreen.classList.remove("not-displayed");
    seaBlue.classList.remove("not-displayed");
  } else if (theme == "sea-blue") {
    seaBlueCardContainer.classList.add("chosen-theme-style");
    themeHeading.textContent = "Sea Blue";
    themeHeading.style.color = "darkblue";
    themeHeading.style.fontSize = "20px";
    themeHeading.style.fontWeight = "bold";
    themeHeading.style.fontStyle = "italic";
    forestGreen.classList.remove("not-displayed");
    sunRise.classList.remove("not-displayed");
  }
}

// removes checked if you select another checkbox and sound effect

forestGreen.addEventListener("change", () => {
  sunRise.checked = false;
  seaBlue.checked = false;
});
sunRise.addEventListener("change", () => {
  forestGreen.checked = false;
  seaBlue.checked = false;
});
seaBlue.addEventListener("change", () => {
  forestGreen.checked = false;
  sunRise.checked = false;
});

function changeColorTheme() {
  if (!forestGreen.checked && !sunRise.checked && !seaBlue.checked) {
    themeErrorMessage.classList.remove("error-is-hidden");
    setTimeout(() => {
      themeErrorMessage.classList.add("error-is-hidden");
    }, 4000);
  } else {
    if (forestGreen.checked) {
      bodyElement.dataset.theme = "forest-green";
      localStorage.setItem("colour-theme", "forest-green");
      forestGreen.checked = false;
      forestGreenCardContainer.classList.add("chosen-theme-style");
      seaBlueCardContainer.classList.remove("chosen-theme-style");
      setThemeParagraphColour();
    } else if (sunRise.checked) {
      bodyElement.dataset.theme = "sunrise";
      localStorage.setItem("colour-theme", "sunrise");
      sunRise.checked = false;
      sunRiseCardContainer.classList.add("chosen-theme-style");
      seaBlueCardContainer.classList.remove("chosen-theme-style");
      forestGreenCardContainer.classList.remove("chosen-theme-style");
      setThemeParagraphColour();
    } else if (seaBlue.checked) {
      bodyElement.dataset.theme = "sea-blue";
      localStorage.setItem("colour-theme", "sea-blue");
      seaBlue.checked = false;
      seaBlueCardContainer.classList.add("chosen-theme-style");
      forestGreenCardContainer.classList.remove("chosen-theme-style");
      setThemeParagraphColour();
    }
  }
}
