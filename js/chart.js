/*
==================================================
chart.js

Handles:

✔ Income vs Expense Bar Chart
✔ Expense Category Pie Chart
✔ Live Updates

==================================================
*/

"use strict";

/* ==========================================
   CHART VARIABLES
========================================== */

let incomeExpenseChart = null;

let categoryChart = null;


/* ==========================================
   UPDATE ALL CHARTS
========================================== */

function updateCharts(){

    createIncomeExpenseChart();

    createCategoryChart();

}


/* ==========================================
   BAR CHART
========================================== */

function createIncomeExpenseChart(){

    const canvas = document.getElementById("barChart");

    if(!canvas) return;

    if(incomeExpenseChart){

        incomeExpenseChart.destroy();

    }

    const income = getTotalIncome();

    const expense = getTotalExpense();

    incomeExpenseChart = new Chart(

        canvas,

        {

            type: "bar",

            data:{

                labels:[

                    "Income",

                    "Expense"

                ],

                datasets:[

                    {

                        label:"Amount",

                        data:[

                            income,

                            expense

                        ],

                        backgroundColor:[

                            "#22c55e",

                            "#ef4444"

                        ],

                        borderRadius:10,

                        borderWidth:0

                    }

                ]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{

                        display:false

                    }

                },

                scales:{

                    y:{

                        beginAtZero:true

                    }

                }

            }

        }

    );

}


/* ==========================================
   PIE CHART
========================================== */

function createCategoryChart(){

    const canvas = document.getElementById("pieChart");

    if(!canvas) return;

    if(categoryChart){

        categoryChart.destroy();

    }

    const transactions = getTransactions();

    const categoryTotals = {};

    transactions.forEach(transaction=>{

        if(transaction.type!=="expense") return;

        if(!categoryTotals[transaction.category]){

            categoryTotals[transaction.category]=0;

        }

        categoryTotals[transaction.category]+=transaction.amount;

    });

    categoryChart = new Chart(

        canvas,

        {

            type:"pie",

            data:{

                labels:Object.keys(categoryTotals),

                datasets:[

                    {

                        data:Object.values(categoryTotals),

                        backgroundColor:[

                            "#ef4444",
                            "#f97316",
                            "#3b82f6",
                            "#14b8a6",
                            "#8b5cf6",
                            "#06b6d4",
                            "#f59e0b",
                            "#84cc16",
                            "#e11d48",
                            "#6366f1",
                            "#64748b"

                        ],

                        borderWidth:2

                    }

                ]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{

                        position:"bottom"

                    }

                }

            }

        }

    );

}


/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    updateCharts

);