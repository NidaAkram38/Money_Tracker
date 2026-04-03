/* ═══════════════════════════════════════════════
   PocketPal – app.js
   All app logic: storage, auth, rendering, events
   ═══════════════════════════════════════════════ */

'use strict';

// ══════════════════════════════════════════════
// STORAGE
// ══════════════════════════════════════════════

const STORAGE_KEY = 'pocketpal_v2';

function loadData() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ══════════════════════════════════════════════
// DEFAULT CATEGORIES
// ══════════════════════════════════════════════

const DEFAULT_CATS = [
  { id: 'food',       label: 'Food',        icon: '🍱', bg: '#fff4e6' },
  { id: 'transport',  label: 'Bus Fare',    icon: '🚌', bg: '#e8f4ff' },
  { id: 'rickshaw',   label: 'Rickshaw',    icon: '🛺', bg: '#f2eeff' },
  { id: 'donation',   label: 'Donation',    icon: '🤲', bg: '#e6faf1' },
  { id: 'outing',     label: 'Outing',      icon: '🎉', bg: '#fff0fa' },
  { id: 'shopping',   label: 'Shopping',    icon: '🛍️', bg: '#fff4ec' },
  { id: 'health',     label: 'Health',      icon: '💊', bg: '#fff0f2' },
  { id: 'education',  label: 'Education',   icon: '📚', bg: '#e6faf1' },
  { id: 'bills',      label: 'Bills',       icon: '📃', bg: '#f0f0f0' },
  { id: 'mobile',     label: 'Mobile/Net',  icon: '📱', bg: '#e4fdf7' },
  { id: 'snacks',     label: 'Snacks',      icon: '🍟', bg: '#fff9e6' },
  { id: 'other',      label: 'Other',       icon: '💸', bg: '#f5f5ff' },
];

// ══════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════

let currentMonth = '';
let selectedCat  = '';
let isSignup     = false;

// ══════════════════════════════════════════════
// LOCK / AUTH
// ══════════════════════════════════════════════

function initLock() {
  const data = loadData();
  if (!data.pin) {
    isSignup = true;
    setLockMode('signup');
    return;
  }
  // Agar session active hai toh lock screen skip karo
  if (sessionStorage.getItem('pocketpal_session') === '1') {
    unlockApp();
    return;
  }
}

function setLockMode(mode) {
  const isS = mode === 'signup';
  isSignup = isS;
  document.getElementById('lock-btn').textContent  = isS ? 'Create Account 💰' : 'Let me in! ✨';
  document.getElementById('lock-switch').textContent = isS ? 'Already have an account? Login →' : 'New here? Create account →';
  document.getElementById('lock-sub').textContent  = isS ? 'Set up your PIN 🔒' : 'Your cute little money diary 🌸';
  document.getElementById('signup-fields').style.display     = isS ? 'block' : 'none';
  document.getElementById('pin-confirm-wrap').style.display  = isS ? 'block' : 'none';
}

document.getElementById('lock-btn').addEventListener('click', handleLock);
document.getElementById('pin-input').addEventListener('keydown', e => { if (e.key === 'Enter') handleLock(); });
document.getElementById('lock-switch').addEventListener('click', () => setLockMode(isSignup ? 'login' : 'signup'));

function handleLock() {
  const pin   = document.getElementById('pin-input').value.trim();
  const errEl = document.getElementById('lock-error');
  errEl.textContent = '';

  if (!pin) { errEl.textContent = 'Please enter a PIN 🔒'; return; }

  if (isSignup) {
    const name    = document.getElementById('reg-name').value.trim();
    const confirm = document.getElementById('pin-confirm').value.trim();
    if (!name)       { errEl.textContent = 'Please enter your name ✏️'; return; }
    if (pin !== confirm) { errEl.textContent = "PINs don't match 😅"; return; }
    const data  = loadData();
    data.pin    = pin;
    data.name   = name;
    saveData(data);
  } else {
    const data = loadData();
    if (pin !== data.pin) { errEl.textContent = 'Wrong PIN, try again! 🙈'; return; }
  }

  unlockApp();
}

function unlockApp() {
  sessionStorage.setItem('pocketpal_session', '1');
  document.getElementById('lock-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  document.getElementById('pin-input').value = '';
  initApp();
}

function logout() {
  sessionStorage.removeItem('pocketpal_session');
  document.getElementById('app').style.display = 'none';
  document.getElementById('lock-screen').style.display = 'flex';
  document.getElementById('pin-input').value = '';
}

// ══════════════════════════════════════════════
// MONTH HELPERS
// ══════════════════════════════════════════════

function getMonthKey(date) {
  const d = date || new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
}

function monthLabel(key) {
  const [y, m] = key.split('-');
  const names = ['January','February','March','April','May','June',
                 'July','August','September','October','November','December'];
  return names[parseInt(m) - 1] + ' ' + y;
}

function monthShort(key) {
  const [y, m] = key.split('-');
  const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return names[parseInt(m) - 1] + ' ' + y;
}

function getAllMonthKeys(data) {
  const keys = new Set([getMonthKey()]);
  Object.keys(data).forEach(k => { if (/^\d{4}-\d{2}$/.test(k)) keys.add(k); });
  return Array.from(keys).sort((a, b) => b.localeCompare(a));
}

function formatDate(str) {
  const d = new Date(str + 'T00:00:00');
  return d.toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ══════════════════════════════════════════════
// CATEGORY HELPERS
// ══════════════════════════════════════════════

function getAllCats() {
  const data   = loadData();
  const custom = (data.customCats || []).map(c => ({
    id: 'custom_' + c.label.toLowerCase().replace(/\s+/g, '_'),
    label: c.label,
    icon:  c.icon || '🏷️',
    bg:    '#f2eeff',
  }));
  return [...DEFAULT_CATS, ...custom];
}

function getCat(catId) {
  return getAllCats().find(c => c.id === catId) || { icon: '💸', bg: '#f5f5ff', label: catId };
}

// ══════════════════════════════════════════════
// INIT APP
// ══════════════════════════════════════════════

function initApp() {
  const data = loadData();
  currentMonth = getMonthKey();

  document.getElementById('greet-name').textContent = data.name || 'friend';
  document.getElementById('greet-month').textContent = monthLabel(currentMonth);

  populateMonthSelect();
  renderDashboard();
  renderCategoryChips();
  renderCustomCats();
  renderHistory();
}

// ══════════════════════════════════════════════
// MONTH SELECT
// ══════════════════════════════════════════════

function populateMonthSelect() {
  const sel  = document.getElementById('month-select');
  const data = loadData();
  const keys = getAllMonthKeys(data);
  sel.innerHTML = '';
  keys.forEach(k => {
    const o = document.createElement('option');
    o.value = k;
    o.textContent = monthShort(k);
    if (k === currentMonth) o.selected = true;
    sel.appendChild(o);
  });
}

function switchMonth() {
  currentMonth = document.getElementById('month-select').value;
  document.getElementById('greet-month').textContent = monthLabel(currentMonth);
  renderDashboard();
}

// ══════════════════════════════════════════════
// BUDGET
// ══════════════════════════════════════════════

function focusBudget() {
  const panel = document.getElementById('budget-panel');
  const data  = loadData();
  const md    = data[currentMonth] || {};
  document.getElementById('budget-input').value = md.budget || '';
  document.getElementById('panel-month-label').textContent = monthShort(currentMonth);
  const isHidden = panel.style.display === 'none' || panel.style.display === '';
  panel.style.display = isHidden ? 'block' : 'none';
  if (isHidden) {
    setTimeout(() => document.getElementById('budget-input').focus(), 50);
  }
}

function saveBudget() {
  const input = document.getElementById('budget-input').value.trim();

  if (input === '') {
    alert('Please enter a budget amount 💰');
    return;
  }

  const val = Number(input);

  if (isNaN(val) || val < 0) {
    alert('Enter a valid number 💰');
    return;
  }

  const data = loadData();

  if (!data[currentMonth]) {
    data[currentMonth] = {};
  }

  data[currentMonth].budget = val;

  saveData(data);

  document.getElementById('budget-panel').style.display = 'none';

  renderDashboard();
}

// ══════════════════════════════════════════════
// RENDER DASHBOARD
// ══════════════════════════════════════════════

function renderDashboard() {
  const data     = loadData();
  const md       = data[currentMonth] || {};
  const budget   = md.budget || 0;
  const expenses = md.expenses || [];
  const spent    = expenses.reduce((s, e) => s + e.amount, 0);
  const left     = budget - spent;
  const pct      = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;

  // Hero card
  document.getElementById('s-budget').textContent = 'Rs. ' + budget.toLocaleString();
  document.getElementById('s-spent').textContent  = 'Rs. ' + spent.toLocaleString();
  document.getElementById('s-pct').textContent    = pct + '%';

  const fillEl   = document.getElementById('progress-fill');
  const leftEl   = document.getElementById('s-left');
  const labelEl  = document.getElementById('leftover-label');
  const iconEl   = document.getElementById('left-icon');

  fillEl.style.width = pct + '%';
  if (pct > 90)       fillEl.style.background = '#ff5a7a';
  else if (pct > 70)  fillEl.style.background = '#ffca3a';
  else                fillEl.style.background = '#ffe066';

  if (left >= 0) {
    leftEl.textContent       = 'Rs. ' + left.toLocaleString();
    leftEl.style.color       = 'var(--green)';
    labelEl.textContent      = 'Remaining';
    iconEl.textContent       = '🟢';
  } else {
    leftEl.textContent       = '− Rs. ' + Math.abs(left).toLocaleString();
    leftEl.style.color       = '#ffb3c8';
    labelEl.textContent      = 'Over Budget!';
    iconEl.textContent       = '🔴';
  }

  // Expense list
  const listEl = document.getElementById('expense-list');
  const countEl = document.getElementById('exp-count');
  const sorted = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  countEl.textContent = sorted.length;

  if (sorted.length === 0) {
    listEl.innerHTML = `
      <div class="empty-state">
        <span class="empty-state-icon">🌸</span>
        No expenses yet! Tap <strong>＋</strong> to add one.
      </div>`;
    return;
  }

  listEl.innerHTML = sorted.map((e, i) => {
    const cat = getCat(e.cat);
    const meta = [e.place, e.note, formatDate(e.date)].filter(Boolean).join(' · ');
    return `
      <div class="expense-item" style="animation-delay:${i * 40}ms">
        <div class="cat-bubble" style="background:${cat.bg}">${cat.icon}</div>
        <div class="exp-info">
          <div class="exp-cat">${cat.label}</div>
          <div class="exp-meta">${meta}</div>
        </div>
        <div class="exp-amount">−Rs.${e.amount.toLocaleString()}</div>
        <button class="btn-del" onclick="deleteExpense(${e.id})" title="Delete">✕</button>
      </div>`;
  }).join('');
}

// ══════════════════════════════════════════════
// DELETE EXPENSE
// ══════════════════════════════════════════════

function deleteExpense(id) {
  if (!confirm('Delete this expense? 🗑️')) return;
  const data = loadData();
  const md   = data[currentMonth];
  if (!md || !md.expenses) return;
  md.expenses = md.expenses.filter(e => e.id !== id);
  saveData(data);
  renderDashboard();
  renderHistory();
}

// ══════════════════════════════════════════════
// CATEGORY CHIPS
// ══════════════════════════════════════════════

function renderCategoryChips() {
  const cats = getAllCats();
  const wrap = document.getElementById('cat-chips');
  wrap.innerHTML = cats.map(cat => `
    <button class="cat-chip ${selectedCat === cat.id ? 'selected' : ''}"
            onclick="selectCat('${cat.id}')">
      ${cat.icon} ${cat.label}
    </button>
  `).join('');
}

function selectCat(id) {
  selectedCat = id;
  renderCategoryChips();
}

// ══════════════════════════════════════════════
// ADD EXPENSE
// ══════════════════════════════════════════════

function addExpense() {
  const amount = parseFloat(document.getElementById('exp-amount').value);
  const date   = document.getElementById('exp-date').value;
  const note   = document.getElementById('exp-note').value.trim();
  const place  = document.getElementById('exp-place').value.trim();

  if (!selectedCat)       { alert('Please choose a category 🏷️'); return; }
  if (!amount || amount <= 0) { alert('Please enter the amount 💰'); return; }
  if (!date)              { alert('Please pick a date 📅'); return; }

  const monthKey = date.substring(0, 7);
  const cat      = getCat(selectedCat);

  const expense = {
    id: Date.now(),
    cat:      selectedCat,
    catLabel: cat.label,
    catIcon:  cat.icon,
    amount,
    date,
    note,
    place,
  };

  const data = loadData();
  if (!data[monthKey])           data[monthKey] = {};
  if (!data[monthKey].expenses)  data[monthKey].expenses = [];
  data[monthKey].expenses.push(expense);
  saveData(data);

  // Reset form
  document.getElementById('exp-amount').value = '';
  document.getElementById('exp-note').value   = '';
  document.getElementById('exp-place').value  = '';
  selectedCat = '';
  renderCategoryChips();

  // Switch to that month and show dashboard
  currentMonth = monthKey;
  populateMonthSelect();
  document.getElementById('month-select').value = monthKey;
  document.getElementById('greet-month').textContent = monthLabel(monthKey);
  renderDashboard();
  renderHistory();
  showTab('dashboard');
}

// ══════════════════════════════════════════════
// RENDER HISTORY
// ══════════════════════════════════════════════

function renderHistory() {
  const data  = loadData();
  const keys  = getAllMonthKeys(data);
  const el    = document.getElementById('history-list');

  const valid = keys.filter(k => data[k] && (data[k].budget || (data[k].expenses && data[k].expenses.length)));

  if (valid.length === 0) {
    el.innerHTML = `<div class="empty-state"><span class="empty-state-icon">📅</span>No history yet!</div>`;
    return;
  }

  el.innerHTML = valid.map(key => {
    const md       = data[key] || {};
    const expenses = md.expenses || [];
    const budget   = md.budget || 0;
    const spent    = expenses.reduce((s, e) => s + e.amount, 0);
    const left     = budget - spent;

    // Category totals
    const totals = {};
    expenses.forEach(e => {
      if (!totals[e.cat]) totals[e.cat] = { total: 0, icon: e.catIcon, cat: e.cat };
      totals[e.cat].total += e.amount;
    });
    const maxAmt = Math.max(...Object.values(totals).map(t => t.total), 1);

    const breakdown = Object.entries(totals)
      .sort((a, b) => b[1].total - a[1].total)
      .map(([catId, info]) => {
        const cat = getCat(catId);
        return `
          <div class="cat-row">
            <span class="cat-row-icon">${cat.icon}</span>
            <span class="cat-row-name">${cat.label}</span>
            <div class="cat-row-bar">
              <div class="cat-row-fill" style="width:${Math.round((info.total/maxAmt)*100)}%"></div>
            </div>
            <span class="cat-row-amt">Rs.${info.total.toLocaleString()}</span>
          </div>`;
      }).join('');

    const expRows = [...expenses]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(e => {
        const cat  = getCat(e.cat);
        const meta = [e.place, e.note, formatDate(e.date)].filter(Boolean).join(' · ');
        return `
          <div class="hist-expense-row">
            <div class="hist-exp-left">
              <span style="font-size:18px;">${cat.icon}</span>
              <div>
                <div class="hist-exp-cat">${cat.label}</div>
                <div class="hist-exp-meta">${meta}</div>
              </div>
            </div>
            <div class="hist-exp-amt">−Rs.${e.amount.toLocaleString()}</div>
          </div>`;
      }).join('');

    const leftClass = left >= 0 ? 'left' : 'over';
    const leftLabel = left >= 0 ? 'Left' : 'Over';
    const leftAmt   = Math.abs(left);

    return `
      <div class="month-card">
        <div class="month-header" onclick="toggleHistory('${key}')">
          <div class="month-name">${monthLabel(key)}</div>
          <div class="month-chips">
            <div class="chip-stat">
              <span class="cs-label">Budget</span>
              <span class="cs-val">Rs.${budget.toLocaleString()}</span>
            </div>
            <div class="chip-stat spent">
              <span class="cs-label">Spent</span>
              <span class="cs-val">Rs.${spent.toLocaleString()}</span>
            </div>
            <div class="chip-stat ${leftClass}">
              <span class="cs-label">${leftLabel}</span>
              <span class="cs-val">Rs.${leftAmt.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div class="month-body" id="hist-${key}">
          ${expenses.length === 0
            ? '<p style="color:var(--text3);font-size:13px;padding-top:12px;">No expenses recorded.</p>'
            : `<div class="cat-breakdown">${breakdown}</div>${expRows}`
          }
        </div>
      </div>`;
  }).join('');
}

function toggleHistory(key) {
  const el = document.getElementById('hist-' + key);
  if (el) el.classList.toggle('open');
}

// ══════════════════════════════════════════════
// CUSTOM CATEGORIES
// ══════════════════════════════════════════════

function addCustomCat() {
  const name = document.getElementById('new-cat-name').value.trim();
  const icon = document.getElementById('new-cat-icon').value.trim();
  if (!name) { alert('Please enter a category name 🏷️'); return; }

  const data = loadData();
  if (!data.customCats) data.customCats = [];
  if (data.customCats.find(c => c.label.toLowerCase() === name.toLowerCase())) {
    alert('That category already exists! 😅'); return;
  }

  data.customCats.push({ label: name, icon: icon || '🏷️' });
  saveData(data);
  document.getElementById('new-cat-name').value = '';
  document.getElementById('new-cat-icon').value = '';
  renderCustomCats();
  renderCategoryChips();
}

function removeCustomCat(label) {
  const data = loadData();
  data.customCats = (data.customCats || []).filter(c => c.label !== label);
  saveData(data);
  renderCustomCats();
  renderCategoryChips();
}

function renderCustomCats() {
  const data = loadData();
  const cats = data.customCats || [];
  const el   = document.getElementById('custom-cat-list');

  if (cats.length === 0) {
    el.innerHTML = '<p style="font-size:13px;color:var(--text3);font-weight:600;">No custom categories yet 🌸</p>';
    return;
  }
  el.innerHTML = cats.map(c => `
    <div class="custom-cat-tag">
      <span>${c.icon}</span> ${c.label}
      <button onclick="removeCustomCat('${c.label}')">✕</button>
    </div>
  `).join('');
}

// ══════════════════════════════════════════════
// CHANGE PIN
// ══════════════════════════════════════════════

function changePin() {
  const oldPin = document.getElementById('old-pin').value;
  const newPin = document.getElementById('new-pin').value;
  const msg    = document.getElementById('pin-msg');
  msg.style.display = 'none';

  const data = loadData();
  if (oldPin !== data.pin) { alert('Current PIN is wrong! 🙈'); return; }
  if (!newPin)             { alert('Please enter a new PIN'); return; }

  data.pin = newPin;
  saveData(data);
  document.getElementById('old-pin').value = '';
  document.getElementById('new-pin').value = '';
  msg.style.display = 'block';
}

// ══════════════════════════════════════════════
// CLEAR MONTH
// ══════════════════════════════════════════════

function clearMonth() {
  if (!confirm(`Delete ALL data for ${monthLabel(currentMonth)}? 🗑️\nThis can't be undone!`)) return;
  const data = loadData();
  delete data[currentMonth];
  saveData(data);
  populateMonthSelect();
  renderDashboard();
  renderHistory();
}

// ══════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════

function showTab(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  document.getElementById('tab-' + name).classList.add('active');
  const btn = document.querySelector(`.nav-btn[data-tab="${name}"]`);
  if (btn) btn.classList.add('active');

  if (name === 'add') {
    renderCategoryChips();
    document.getElementById('exp-date').value = new Date().toISOString().split('T')[0];
  }
  if (name === 'history')  renderHistory();
  if (name === 'settings') renderCustomCats();
}

// ══════════════════════════════════════════════
// BOOT
// ══════════════════════════════════════════════

initLock();
