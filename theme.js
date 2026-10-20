const themeToggleButtons = document.querySelectorAll(".theme-toggle");
const themeStorageKey = "leo-portfolio-night-mode";
const profileImage = document.querySelector(".profile-photo img");
const profileGlitchImage = document.querySelector(".profile-glitch-image");
const universeLabel = document.querySelector(".universe-label");

function setNightMode(enabled) {
    document.body.classList.toggle("night-mode", enabled);

    if (profileImage) {
        profileImage.src = enabled
            ? profileImage.dataset.nightSrc
            : profileImage.dataset.daySrc;
    }

    if (profileGlitchImage) {
        profileGlitchImage.src = enabled
            ? profileGlitchImage.dataset.nightSrc
            : profileGlitchImage.dataset.daySrc;
    }

    if (universeLabel) {
        universeLabel.textContent = enabled
            ? universeLabel.dataset.nightLabel
            : universeLabel.dataset.dayLabel;
    }

    document.querySelectorAll(".brand-name").forEach((brandName) => {
        brandName.textContent = enabled ? "GRIM" : "OEL";
    });

    themeToggleButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(enabled));
        button.querySelector("i").className = enabled
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";
        button.querySelector("span").textContent = enabled
            ? "Day Mode"
            : "Night Mode";
    });
}

let nightModeEnabled = false;

try {
    nightModeEnabled = window.localStorage.getItem(themeStorageKey) === "true";
} catch (error) {
    console.error("Unable to read the saved theme preference.", error);
}

setNightMode(nightModeEnabled);

themeToggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
        nightModeEnabled = !document.body.classList.contains("night-mode");
        setNightMode(nightModeEnabled);

        try {
            window.localStorage.setItem(themeStorageKey, String(nightModeEnabled));
        } catch (error) {
            console.error("Unable to save the theme preference.", error);
        }
    });
});
