/*
==================================================
navigation.js

Handles:
✔ Sidebar section switching (Dashboard, Transactions, etc.)
✔ Mobile hamburger menu (open/close sidebar)
✔ Navbar title update per section
==================================================
*/

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const menuItems = document.querySelectorAll(".menu li");

    // FIX: use ">" so nested <section> elements inside #dashboard
    // (.cards, .chart-section) are never selected/hidden.
    const sections = document.querySelectorAll(".main-content > section");

    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menuBtn");
    const navTitle = document.querySelector(".navbar h1");
    const navSubtitle = document.querySelector(".navbar p");

    console.log("Navigation Loaded");

    /* ==========================================
       SECTION SWITCHING
    ========================================== */

    const sectionLabels = {
        dashboard: ["Dashboard", "Manage your personal finances"],
        transactions: ["Transactions", "View and manage all transactions"],
        add: ["Add Transaction", "Record a new income or expense"],
        categories: ["Categories", "Manage your expense categories"],
        reports: ["Reports", "Analyze your spending"],
        goals: ["Goals", "Track your financial goals"],
        settings: ["Settings", "Customize application settings"]
    };

    menuItems.forEach(item => {

        item.addEventListener("click", function () {

            console.log("Clicked:", this.dataset.section);

            // Remove active class from all menu items
            menuItems.forEach(menu => menu.classList.remove("active"));

            // Add active class to the clicked item
            this.classList.add("active");

            const sectionId = this.getAttribute("data-section");

            // Hide all top-level sections
            sections.forEach(section => section.classList.add("hidden"));

            // Show the selected section
            const selected = document.getElementById(sectionId);
            if (selected) {
                selected.classList.remove("hidden");
            }

            // Update navbar title/subtitle
            if (sectionLabels[sectionId]) {
                if (navTitle) navTitle.textContent = sectionLabels[sectionId][0];
                if (navSubtitle) navSubtitle.textContent = sectionLabels[sectionId][1];
            }

            // Auto-close sidebar on mobile after choosing a section
            if (window.innerWidth <= 768) {
                closeSidebar();
            }

        });

    });

    /* ==========================================
       MOBILE SIDEBAR TOGGLE (hamburger)
    ========================================== */

    // Create the overlay used to close the sidebar by tapping outside it
    const overlay = document.createElement("div");
    overlay.className = "sidebar-overlay";
    document.body.appendChild(overlay);

    function openSidebar() {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    }

    function closeSidebar() {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    }

    function toggleSidebar() {
        if (sidebar.classList.contains("active")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }

    if (menuBtn) {
        menuBtn.addEventListener("click", toggleSidebar);
    }

    overlay.addEventListener("click", closeSidebar);

    // Reset sidebar state when resizing back to desktop
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    });

});
