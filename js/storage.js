/*
==================================================
Expense Tracker
storage.js

Handles:
✔ localStorage persistence
✔ CRUD operations for transactions
✔ Derived totals (income, expense, balance, count)
✔ Currency formatting
==================================================
*/

"use strict";

/* ==========================================
   CONSTANTS
========================================== */

const STORAGE_KEY = "expenseTrackerTransactions";

/* ==========================================
   LOAD / SAVE
========================================== */

function getTransactions() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return [];

    try {
        return JSON.parse(data);
    } catch (err) {
        console.error("Failed to parse transactions:", err);
        return [];
    }

}

function saveTransactions(transactions) {

    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));

    // Lets other tabs / app.js know data changed
    window.dispatchEvent(new Event("storage"));

}

/* ==========================================
   ID GENERATION
========================================== */

function generateId() {
    return "tx_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
}

/* ==========================================
   CRUD
========================================== */

function addTransaction(transaction) {

    const transactions = getTransactions();
    transactions.push(transaction);
    saveTransactions(transactions);
    return transaction;

}

function updateTransaction(id, updatedTransaction) {

    const transactions = getTransactions();
    const index = transactions.findIndex(t => t.id === id);

    if (index === -1) return null;

    transactions[index] = { ...transactions[index], ...updatedTransaction };
    saveTransactions(transactions);
    return transactions[index];

}

function deleteTransaction(id) {

    const transactions = getTransactions().filter(t => t.id !== id);
    saveTransactions(transactions);

}

function getTransactionById(id) {
    return getTransactions().find(t => t.id === id) || null;
}

/* ==========================================
   SORTING
========================================== */

function sortTransactions(key = "date") {

    const transactions = getTransactions();

    return [...transactions].sort((a, b) => {
        if (key === "date") {
            return new Date(b.date) - new Date(a.date);
        }
        if (key === "amount") {
            return b.amount - a.amount;
        }
        return 0;
    });

}

/* ==========================================
   DERIVED TOTALS
========================================== */

function getTotalIncome() {

    return getTransactions()
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

}

function getTotalExpense() {

    return getTransactions()
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

}

function getBalance() {
    return getTotalIncome() - getTotalExpense();
}

function getTransactionCount() {
    return getTransactions().length;
}

/* ==========================================
   FORMATTING
========================================== */

function formatCurrency(amount) {

    return "₹" + Number(amount || 0).toLocaleString("en-IN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

}

/* ==========================================
   RENDER HOOK (bridges to transaction.js's render)
========================================== */

function renderTransactions() {
    if (typeof render === "function") {
        render();
    }
}
