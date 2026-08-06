/*
==================================================
transaction.js

Handles:
✔ Add / Edit / Delete transaction form logic
✔ Rendering the transactions table
==================================================
*/
"use strict";

const els={
 form:document.getElementById("expenseForm"),
 desc:document.getElementById("description"),
 amount:document.getElementById("amount"),
 category:document.getElementById("category"),
 type:document.getElementById("type"),
 date:document.getElementById("date"),
 table:document.getElementById("transactionTable")
};

const state={editId:null};

document.addEventListener("DOMContentLoaded",init);

function init(){
 setToday();
 bindEvents();
 refresh();
}

function bindEvents(){
 els.form.addEventListener("submit",onSubmit);
 els.table.addEventListener("click",onTableClick);
}

function setToday(){
 els.date.value=new Date().toISOString().split("T")[0];
}

function onSubmit(e){
 e.preventDefault();
 const tx=readForm();
 if(!tx)return;
 if(state.editId){
   updateTransaction(state.editId,{...tx,id:state.editId});
   state.editId=null;
   els.form.querySelector("button").textContent="Add Transaction";
 }else{
   addTransaction({...tx,id:generateId()});
 }
 clearForm();
 refresh();
}

function readForm(){
 const description=els.desc.value.trim();
 const amount=Number(els.amount.value);
 const category=els.category.value;
 const type=els.type.value;
 const date=els.date.value;
 if(description.length<3){alert("Description required");return null;}
 if(!(amount>0)){alert("Invalid amount");return null;}
 if(!date){alert("Select date");return null;}
 return {description,amount,category,type,date};
}

function clearForm(){els.form.reset();setToday();}

function refresh(){
 render();
 if(typeof updateDashboard==="function")updateDashboard();
 if(typeof updateCharts==="function")updateCharts();
}

function render(){
 const data=sortTransactions("date");
 els.table.innerHTML="";
 if(!data.length){
   els.table.innerHTML='<tr><td colspan="6">No transactions</td></tr>';
   return;
 }
 data.forEach(t=>els.table.appendChild(row(t)));
}

function row(t){
 const tr=document.createElement("tr");
 tr.dataset.id=t.id;
 tr.innerHTML=`
<td>${fmtDate(t.date)}</td>
<td>${escapeHtml(t.description)}</td>
<td>${t.category}</td>
<td>${cap(t.type)}</td>
<td>${formatCurrency(t.amount)}</td>
<td>
<button data-a="edit">Edit</button>
<button data-a="del">Delete</button>
</td>`;
 return tr;
}

function onTableClick(e){
 const b=e.target.closest("button");
 if(!b)return;
 const id=b.closest("tr").dataset.id;
 if(b.dataset.a==="edit")edit(id);
 else remove(id);
}

function edit(id){
 const t=getTransactionById(id);
 if(!t)return;
 state.editId=id;
 els.desc.value=t.description;
 els.amount.value=t.amount;
 els.category.value=t.category;
 els.type.value=t.type;
 els.date.value=t.date;
 els.form.querySelector("button").textContent="Update Transaction";
}

function remove(id){
 if(!confirm("Delete this transaction?"))return;
 deleteTransaction(id);
 refresh();
}

const fmtDate=d=>new Date(d).toLocaleDateString("en-IN");
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
function escapeHtml(s){const d=document.createElement("div");d.textContent=s;return d.innerHTML;}

