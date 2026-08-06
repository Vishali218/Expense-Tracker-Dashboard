/*
==================================================
dashboard.js
Handles Dashboard Summary Cards
==================================================
*/

"use strict";

/* ==========================================
   DOM ELEMENTS
========================================== */

const incomeElement = document.getElementById("income");

const expenseElement = document.getElementById("expense");

const balanceElement = document.getElementById("balance");

const countElement = document.getElementById("count");

/* ==========================================
   UPDATE DASHBOARD
========================================== */

function updateDashboard() {

    const income = getTotalIncome();

    const expense = getTotalExpense();

    const balance = getBalance();

    const totalTransactions = getTransactionCount();

    incomeElement.textContent = formatCurrency(income);

    expenseElement.textContent = formatCurrency(expense);

    balanceElement.textContent = formatCurrency(balance);

    countElement.textContent = totalTransactions;

    updateBalanceColor(balance);

    updateMonthlyOverview(expense);

}

/* ==========================================
   UPDATE BALANCE COLOR
========================================== */

function updateBalanceColor(balance) {

    balanceElement.classList.remove(

        "positive",

        "negative"

    );

    if (balance >= 0) {

        balanceElement.classList.add("positive");

    } else {

        balanceElement.classList.add("negative");

    }

}

/* ==========================================
   MONTHLY OVERVIEW CARD
========================================== */

function updateMonthlyOverview(expense) {

    const monthlyAmount = document.querySelector(".monthly-card h2");

    const progress = document.querySelector(".progress");

    if (!monthlyAmount || !progress) return;

    monthlyAmount.textContent = formatCurrency(expense);

    const limit = 50000;

    const percentage = Math.min((expense / limit) * 100, 100);

    progress.style.width = percentage + "%";

}

/* ==========================================
   RESET DASHBOARD
========================================== */

function resetDashboard() {

    incomeElement.textContent = formatCurrency(0);

    expenseElement.textContent = formatCurrency(0);

    balanceElement.textContent = formatCurrency(0);

    countElement.textContent = "0";

}

/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    updateDashboard

);