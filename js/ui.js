/*
==================================================
ui.js

Handles:
✔ Dark / Light Theme
✔ Toast Notifications
✔ Button Animations
✔ Page Initialization

==================================================
*/

"use strict";

/* ==========================================
   DOM ELEMENTS
========================================== */

const themeButton = document.getElementById("themeBtn");

/* ==========================================
   INITIALIZE UI
========================================== */

document.addEventListener("DOMContentLoaded", initializeUI);

function initializeUI() {

    loadTheme();

    bindUIEvents();

}

/* ==========================================
   BIND EVENTS
========================================== */

function bindUIEvents() {

    if (themeButton) {

        themeButton.addEventListener(

            "click",

            toggleTheme

        );

    }

}

/* ==========================================
   TOGGLE THEME
========================================== */

function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    saveTheme();

    updateThemeIcon();

}

/* ==========================================
   SAVE THEME
========================================== */

function saveTheme() {

    const currentTheme =

        document.body.classList.contains("dark-mode")

            ? "dark"

            : "light";

    localStorage.setItem(

        "expenseTrackerTheme",

        currentTheme

    );

}

/* ==========================================
   LOAD THEME
========================================== */

function loadTheme() {

    const savedTheme =

        localStorage.getItem(

            "expenseTrackerTheme"

        );

    if (savedTheme === "dark") {

        document.body.classList.add(

            "dark-mode"

        );

    }

    updateThemeIcon();

}

/* ==========================================
   UPDATE ICON
========================================== */

function updateThemeIcon() {

    if (!themeButton) return;

    const icon =

        themeButton.querySelector("i");

    if (!icon) return;

    if (

        document.body.classList.contains(

            "dark-mode"

        )

    ) {

        icon.className =

            "fa-solid fa-sun";

    }

    else {

        icon.className =

            "fa-solid fa-moon";

    }

}

/* ==========================================
   TOAST NOTIFICATION
========================================== */

function showToast(message, type = "success") {

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.textContent = message;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {

        toast.classList.add("show");

    });

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2500);

}

/* ==========================================
   BUTTON CLICK ANIMATION
========================================== */

document.addEventListener("click", function (event) {

    const button = event.target.closest("button");

    if (!button) return;

    button.classList.add("button-click");

    setTimeout(() => {

        button.classList.remove(

            "button-click"

        );

    }, 150);

});

/* ==========================================
   PAGE FADE-IN
========================================== */

window.addEventListener("load", () => {

    document.body.classList.add(

        "page-loaded"

    );

});