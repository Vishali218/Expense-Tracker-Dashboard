/*
==================================================
Expense Tracker
app.js

Application Entry Point

Responsibilities:
✔ Initialize application
✔ Verify required modules
✔ Refresh dashboard & charts
✔ Render transactions
==================================================
*/

"use strict";

/* ==========================================
   APPLICATION
========================================== */

const ExpenseTrackerApp = {

    init() {

        console.log("Expense Tracker Initialized");

        this.verifyModules();

        this.initializeData();

        this.attachGlobalEvents();

    },

    /* ======================================
       VERIFY REQUIRED FUNCTIONS
    ====================================== */

    verifyModules() {

        const requiredFunctions = [

            "getTransactions",

            "addTransaction",

            "updateTransaction",

            "deleteTransaction",

            "renderTransactions",

            "updateDashboard",

            "updateCharts"

        ];

        requiredFunctions.forEach(functionName => {

            if (typeof window[functionName] !== "function") {

                console.warn(

                    `Missing function: ${functionName}`

                );

            }

        });

    },

    /* ======================================
       INITIAL DATA LOAD
    ====================================== */

    initializeData() {

        if (typeof renderTransactions === "function") {

            renderTransactions();

        }

        if (typeof updateDashboard === "function") {

            updateDashboard();

        }

        if (typeof updateCharts === "function") {

            updateCharts();

        }

    },

    /* ======================================
       GLOBAL EVENTS
    ====================================== */

    attachGlobalEvents() {

        window.addEventListener(

            "storage",

            () => {

                this.initializeData();

            }

        );

    }

};


/* ==========================================
   START APPLICATION
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        ExpenseTrackerApp.init();

    }

);