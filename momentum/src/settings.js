const settingsBtn = document.querySelector(".settings-button"),
      settingsContainer = document.querySelector(".settings-block");

function viewSettingsToggle() {
  settingsContainer.classList.toggle("hidden");
}

settingsBtn.addEventListener('click', viewSettingsToggle);