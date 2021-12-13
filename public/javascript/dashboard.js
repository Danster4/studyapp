var settingsmenu = document.querySelector(".settings-menu");

function settingsMenuToggle() {
    settingsmenu.classList.toggle("settings-menu-height");
}

document.querySelector("#nav-icon-pic").addEventListener('click', settingsMenuToggle);