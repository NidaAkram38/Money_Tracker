'use strict'

const STORAGE_KEY = "pocketpal_data"

let currentMonth = ""
let selectedCat = "other"

function loadData(){
return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
}

function saveData(data){
localStorage.setItem(STORAGE_KEY,JSON.stringify(data))
}

function getMonthKey(){
const d = new Date()
return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")
}

function monthLabel(key){
const [y,m]=key.split("-")
const names=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
return names[m-1]+" "+y
}

function initApp(){

currentMonth=getMonthKey()

document.getElementById("greet-month").textContent=monthLabel(currentMonth)

populateMonthSelect()

document.getElementById("exp-date").value=new Date().toISOString().split("T")[0]

renderDashboard()
renderHistory()
renderCategoryChips()

}

function populateMonthSelect(){

const sel=document.getElementById("month-select")
const data=loadData()

const keys=Object.keys(data)

if(!keys.includes(currentMonth))keys.push(currentMonth)

sel.innerHTML=""

keys.sort().reverse().forEach(k=>{

const o=document.createElement("option")
o.value=k
o.textContent=monthLabel(k)

if(k===currentMonth)o.selected=true

sel.appendChild(o)

})

}

function switchMonth(){

currentMonth=document.getElementById("month-select").value
document.getElementById("greet-month").textContent=monthLabel(currentMonth)

renderDashboard()

}

function focusBudget(){

const panel=document.getElementById("budget-panel")

panel.style.display=panel.style.display==="block"?"none":"block"

const data=loadData()
const md=data[currentMonth]||{}

document.getElementById("budget-input").value=md.budget||""

}

function saveBudget(){

const val=Number(document.getElementById("budget-input").value)

if(!val)return alert("Enter budget")

const data=loadData()

if(!data[currentMonth])data[currentMonth]={}

data[currentMonth].budget=val

saveData(data)

document.getElementById("budget-panel").style.display="none"

renderDashboard()

}

function renderDashboard(){

const data=loadData()
const md=data[currentMonth]||{}

const budget=md.budget||0
const expenses=md.expenses||[]

const spent=expenses.reduce((s,e)=>s+e.amount,0)

const left=budget-spent

const pct=budget?Math.min(100,(spent/budget)*100):0

document.getElementById("s-budget").textContent="Rs "+budget
document.getElementById("s-spent").textContent="Rs "+spent
document.getElementById("s-left").textContent="Rs "+left

document.getElementById("progress-fill").style.width=pct+"%"

const list=document.getElementById("expense-list")

if(!expenses.length){
list.innerHTML="No expenses yet"
return
}

list.innerHTML=expenses.map(e=>`

<div class="expense-item">

<span>${e.cat}</span>

<span>Rs ${e.amount}</span>

<button onclick="deleteExpense(${e.id})">✕</button>

</div>

`).join("")

}

function addExpense(){

const amount=parseFloat(document.getElementById("exp-amount").value)
const date=document.getElementById("exp-date").value
const place=document.getElementById("exp-place").value
const note=document.getElementById("exp-note").value

if(!amount)return alert("Enter amount")

const month=date.substring(0,7)

const data=loadData()

if(!data[month])data[month]={}

if(!data[month].expenses)data[month].expenses=[]

data[month].expenses.push({
id:Date.now(),
amount,
date,
cat:selectedCat,
place,
note
})

saveData(data)

document.getElementById("exp-amount").value=""
document.getElementById("exp-place").value=""
document.getElementById("exp-note").value=""

currentMonth=month

populateMonthSelect()

renderDashboard()
renderHistory()

showTab("dashboard")

}

function deleteExpense(id){

const data=loadData()
const md=data[currentMonth]

md.expenses=md.expenses.filter(e=>e.id!==id)

saveData(data)

renderDashboard()
renderHistory()

}

function renderHistory(){

const data=loadData()

const el=document.getElementById("history-list")

const keys=Object.keys(data)

if(!keys.length){
el.innerHTML="No history"
return
}

el.innerHTML=keys.map(k=>{

const md=data[k]
const budget=md.budget||0
const spent=(md.expenses||[]).reduce((s,e)=>s+e.amount,0)

return `

<div class="card">

<h3>${monthLabel(k)}</h3>

<p>Budget: Rs ${budget}</p>
<p>Spent: Rs ${spent}</p>

</div>

`

}).join("")

}

function renderCategoryChips(){

const wrap=document.getElementById("cat-chips")

const cats=["Food","Transport","Shopping","Health","Other"]

wrap.innerHTML=cats.map(c=>`

<button onclick="selectCat('${c}')">${c}</button>

`).join("")

}

function selectCat(id){
selectedCat=id
}

function showTab(name){

document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"))

document.getElementById("tab-"+name).classList.add("active")

}

initApp()
