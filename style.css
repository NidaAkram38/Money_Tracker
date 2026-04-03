/* ═══════════════════════════════════════════════
   PocketPal – style.css
   Aesthetic: Soft pastel kawaii meets clean finance
   ═══════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Baloo+2:wght@500;600;700;800&display=swap');

/* ── TOKENS ── */
:root {
  --pink:        #ff7eb3;
  --pink-light:  #fff0f7;
  --pink-mid:    #ffd6ea;
  --purple:      #9b7fe8;
  --purple-light:#f2eeff;
  --purple-mid:  #ddd3ff;
  --teal:        #3ecfb2;
  --teal-light:  #e4fdf7;
  --green:       #34c77b;
  --green-light: #e6faf1;
  --red:         #ff5a7a;
  --red-light:   #fff0f2;
  --yellow:      #ffca3a;
  --yellow-light:#fffbe6;
  --orange:      #ff8c42;
  --orange-light:#fff4ec;

  --bg:          #fdf8ff;
  --bg2:         #f7f0ff;
  --surface:     #ffffff;
  --surface2:    #faf6ff;
  --border:      #ede6ff;
  --border2:     #d9cfff;
  --text:        #2d1f5e;
  --text2:       #6b5fa0;
  --text3:       #a89fc8;

  --radius:      18px;
  --radius-sm:   10px;
  --radius-pill: 99px;
  --shadow:      0 4px 20px rgba(155,127,232,0.12);
  --shadow-md:   0 8px 32px rgba(155,127,232,0.18);

  --font-display: 'Baloo 2', cursive;
  --font-body:    'Nunito', sans-serif;
}

/* ── RESET ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
}

/* ══════════════════════════════════════════════
   LOCK SCREEN
   ══════════════════════════════════════════════ */
#lock-screen {
  position: fixed; inset: 0;
  background: linear-gradient(145deg, #fceeff 0%, #e8f4ff 50%, #ffeef8 100%);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: 24px;
  overflow: hidden;
}

/* Decorative blobs */
.lock-blob {
  position: absolute; border-radius: 50%;
  filter: blur(60px); opacity: 0.35; pointer-events: none;
}
.lock-blob-1 {
  width: 320px; height: 320px;
  background: #d9b8ff;
  top: -80px; left: -80px;
  animation: blobFloat 6s ease-in-out infinite;
}
.lock-blob-2 {
  width: 250px; height: 250px;
  background: #ffb3d1;
  bottom: -60px; right: -60px;
  animation: blobFloat 8s ease-in-out infinite reverse;
}
.lock-blob-3 {
  width: 180px; height: 180px;
  background: #b3e8ff;
  top: 40%; left: 10%;
  animation: blobFloat 7s ease-in-out infinite 2s;
}
@keyframes blobFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}

.lock-card {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(20px);
  border: 1.5px solid rgba(255,255,255,0.9);
  border-radius: 28px;
  padding: 40px 32px;
  width: 100%; max-width: 380px;
  box-shadow: 0 20px 60px rgba(155,127,232,0.2);
  display: flex; flex-direction: column; gap: 14px;
  position: relative; z-index: 1;
  animation: cardIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
}
@keyframes cardIn {
  from { transform: translateY(30px) scale(0.95); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
}

.lock-logo {
  font-size: 56px; text-align: center;
  animation: logoFloat 2s ease-in-out infinite;
}
@keyframes logoFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.lock-title {
  font-family: var(--font-display);
  font-size: 32px; font-weight: 800;
  text-align: center;
  background: linear-gradient(135deg, var(--purple), var(--pink));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}

.lock-sub {
  text-align: center; color: var(--text2);
  font-size: 14px; margin-top: -6px;
}

.lock-error {
  color: var(--red); font-size: 13px;
  text-align: center; font-weight: 600;
  min-height: 18px;
}

.btn-lock {
  background: linear-gradient(135deg, var(--purple), var(--pink));
  color: #fff; border: none; cursor: pointer;
  padding: 14px; border-radius: var(--radius);
  font-family: var(--font-body); font-size: 16px; font-weight: 800;
  width: 100%; transition: transform 0.15s, box-shadow 0.15s;
  box-shadow: 0 6px 20px rgba(155,127,232,0.4);
  letter-spacing: 0.2px;
}
.btn-lock:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(155,127,232,0.5); }
.btn-lock:active { transform: scale(0.98); }

.lock-switch {
  text-align: center; color: var(--purple);
  font-size: 13px; font-weight: 700;
  cursor: pointer; transition: color 0.15s;
}
.lock-switch:hover { color: var(--pink); }

/* ══════════════════════════════════════════════
   FIELDS (shared)
   ══════════════════════════════════════════════ */
.field {
  width: 100%;
  background: var(--surface2);
  border: 1.5px solid var(--border);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 14px; font-weight: 600;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.field:focus {
  border-color: var(--purple);
  box-shadow: 0 0 0 3px rgba(155,127,232,0.15);
}
.field::placeholder { color: var(--text3); font-weight: 500; }

.field-wrap { position: relative; }
.field-prefix {
  position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
  font-size: 13px; color: var(--text3); font-weight: 700;
  pointer-events: none; font-family: var(--font-body);
}
.field-prefixed { padding-left: 42px !important; }

textarea.field { resize: vertical; }

.field-label {
  display: block; font-size: 12px; font-weight: 800;
  color: var(--text2); text-transform: uppercase; letter-spacing: 0.8px;
  margin-bottom: 6px; margin-top: 14px;
}
.field-label:first-child { margin-top: 0; }
.optional { font-weight: 500; text-transform: none; color: var(--text3); letter-spacing: 0; }

/* ══════════════════════════════════════════════
   TOP BAR
   ══════════════════════════════════════════════ */
.topbar {
  background: var(--surface);
  border-bottom: 1.5px solid var(--border);
  padding: 0 18px;
  height: 56px;
  display: flex; align-items: center; justify-content: space-between;
  position: sticky; top: 0; z-index: 50;
  box-shadow: 0 2px 12px rgba(155,127,232,0.07);
}
.topbar-left { display: flex; align-items: center; gap: 8px; }
.topbar-logo { font-size: 26px; }
.topbar-brand {
  font-family: var(--font-display);
  font-size: 20px; font-weight: 800;
  background: linear-gradient(135deg, var(--purple), var(--pink));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.topbar-right { display: flex; align-items: center; gap: 10px; }

.month-select {
  background: var(--purple-light);
  border: 1.5px solid var(--border2);
  color: var(--text); font-family: var(--font-body);
  font-size: 13px; font-weight: 700;
  padding: 7px 10px; border-radius: var(--radius-pill);
  outline: none; cursor: pointer;
}

.btn-icon {
  background: var(--pink-light); border: 1.5px solid var(--pink-mid);
  font-size: 18px; width: 36px; height: 36px; border-radius: var(--radius-pill);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: transform 0.15s;
}
.btn-icon:hover { transform: scale(1.1); }

/* ══════════════════════════════════════════════
   BOTTOM NAV
   ══════════════════════════════════════════════ */
.bottom-nav {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: var(--surface);
  border-top: 1.5px solid var(--border);
  display: flex; align-items: center; justify-content: space-around;
  padding: 8px 0 12px;
  z-index: 50;
  box-shadow: 0 -4px 20px rgba(155,127,232,0.08);
}

.nav-btn {
  background: none; border: none; cursor: pointer;
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  padding: 4px 16px; border-radius: var(--radius);
  transition: transform 0.15s;
  position: relative;
}
.nav-btn:hover { transform: translateY(-2px); }

.nav-icon { font-size: 22px; line-height: 1; }
.nav-label { font-size: 10px; font-weight: 700; color: var(--text3); font-family: var(--font-body); }
.nav-btn.active .nav-icon { filter: drop-shadow(0 0 4px rgba(155,127,232,0.5)); }
.nav-btn.active .nav-label { color: var(--purple); }

/* FAB (center Add button) */
.nav-fab {
  width: 52px; height: 52px; border-radius: 50%;
  background: linear-gradient(135deg, var(--purple), var(--pink));
  color: #fff; font-size: 28px; font-weight: 300;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 20px rgba(155,127,232,0.45);
  margin-top: -18px;
  transition: transform 0.15s, box-shadow 0.15s;
  line-height: 1;
}
.nav-btn:hover .nav-fab { transform: scale(1.08); box-shadow: 0 10px 28px rgba(155,127,232,0.55); }

/* ══════════════════════════════════════════════
   PAGES & LAYOUT
   ══════════════════════════════════════════════ */
.pages {
  padding: 16px 16px 100px;
  max-width: 600px; margin: 0 auto;
}

.page { display: none; }
.page.active { display: block; animation: fadeUp 0.3s ease both; }
@keyframes fadeUp {
  from { transform: translateY(12px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

.page-heading {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  color: var(--text);
  margin-bottom: 18px;
}

/* ══════════════════════════════════════════════
   DASHBOARD
   ══════════════════════════════════════════════ */
.greet-bar { margin-bottom: 16px; }
.greet-text { font-size: 18px; font-weight: 800; color: var(--text); }
.greet-text strong { color: var(--purple); }
.greet-month { font-size: 13px; color: var(--text2); margin-top: 2px; font-weight: 600; }

/* Hero card */
.hero-card {
  background: linear-gradient(135deg, #6c3fc9 0%, #a63d8c 100%);
  border-radius: 24px;
  padding: 22px 20px;
  margin-bottom: 20px;
  box-shadow: 0 12px 32px rgba(108,63,201,0.35);
  position: relative; overflow: hidden;
}
.hero-card::before {
  content: ''; position: absolute;
  width: 200px; height: 200px; border-radius: 50%;
  background: rgba(255,255,255,0.07);
  top: -60px; right: -40px;
}
.hero-card::after {
  content: ''; position: absolute;
  width: 120px; height: 120px; border-radius: 50%;
  background: rgba(255,255,255,0.05);
  bottom: -30px; left: 20px;
}

.hero-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
.hero-label { font-size: 12px; color: rgba(255,255,255,0.7); font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; }
.hero-amount { font-family: var(--font-display); font-size: 30px; font-weight: 800; color: #fff; margin-top: 4px; }

.btn-edit-budget {
  background: rgba(255,255,255,0.18);
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff; font-size: 12px; font-weight: 700;
  padding: 6px 12px; border-radius: var(--radius-pill);
  cursor: pointer; font-family: var(--font-body);
  transition: background 0.15s;
}
.btn-edit-budget:hover { background: rgba(255,255,255,0.28); }

.hero-bar-wrap { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
.hero-bar { flex: 1; height: 8px; background: rgba(255,255,255,0.2); border-radius: 99px; overflow: hidden; }
.hero-bar-fill { height: 100%; border-radius: 99px; background: #ffe066; transition: width 0.7s cubic-bezier(0.4,0,0.2,1); }
.hero-pct { font-size: 13px; font-weight: 800; color: #ffe066; min-width: 36px; text-align: right; }

.hero-stats { display: flex; align-items: center; gap: 0; }
.hero-stat { flex: 1; display: flex; align-items: center; gap: 10px; }
.hero-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.2); margin: 0 16px; }
.hstat-icon { font-size: 20px; }
.hstat-label { font-size: 11px; color: rgba(255,255,255,0.65); font-weight: 700; }
.hstat-val { font-size: 16px; font-weight: 800; color: #fff; font-family: var(--font-display); }
.spent-val { color: #ffb3c8 !important; }

/* Budget panel */
.budget-panel {
  background: var(--purple-light);
  border: 1.5px solid var(--border2);
  border-radius: var(--radius);
  padding: 16px 18px;
  margin-bottom: 20px;
  animation: fadeUp 0.25s ease both;
}
.panel-title { font-size: 13px; font-weight: 800; color: var(--text2); margin-bottom: 12px; }
.budget-row { display: flex; gap: 10px; }
.budget-row .field-wrap { flex: 1; }

.btn-save {
  background: var(--purple);
  color: #fff; border: none; cursor: pointer;
  padding: 12px 20px; border-radius: var(--radius-sm);
  font-family: var(--font-body); font-size: 14px; font-weight: 800;
  transition: background 0.15s, transform 0.1s;
  white-space: nowrap;
}
.btn-save:hover { background: var(--pink); transform: translateY(-1px); }
.btn-save:active { transform: scale(0.97); }

/* Section header */
.section-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.section-title { font-family: var(--font-display); font-size: 17px; font-weight: 800; color: var(--text); }
.badge {
  background: var(--purple-mid);
  color: var(--purple);
  font-size: 11px; font-weight: 800;
  padding: 3px 9px; border-radius: var(--radius-pill);
}

/* Expense items */
.expense-item {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 14px 14px;
  margin-bottom: 10px;
  display: flex; align-items: center; gap: 13px;
  transition: transform 0.15s, box-shadow 0.15s;
  animation: itemIn 0.3s ease both;
}
@keyframes itemIn {
  from { transform: translateX(-10px); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}
.expense-item:hover { transform: translateY(-2px); box-shadow: var(--shadow); }

.cat-bubble {
  width: 44px; height: 44px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; flex-shrink: 0;
}
.exp-info { flex: 1; min-width: 0; }
.exp-cat { font-size: 14px; font-weight: 800; color: var(--text); }
.exp-meta { font-size: 12px; color: var(--text3); margin-top: 2px; font-weight: 600; }
.exp-amount { font-family: var(--font-display); font-size: 17px; font-weight: 800; color: var(--red); flex-shrink: 0; }
.btn-del {
  background: var(--red-light); border: none;
  color: var(--red); font-size: 14px; width: 28px; height: 28px;
  border-radius: var(--radius-pill); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: transform 0.15s, background 0.15s;
}
.btn-del:hover { background: var(--red); color: #fff; transform: scale(1.1); }

.empty-state {
  text-align: center; padding: 40px 0;
  color: var(--text3); font-size: 14px; font-weight: 600;
}
.empty-state-icon { font-size: 48px; display: block; margin-bottom: 10px; }

/* ══════════════════════════════════════════════
   ADD PAGE
   ══════════════════════════════════════════════ */
.add-card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 24px;
  padding: 22px 18px;
  box-shadow: var(--shadow);
}

/* Category chips */
.cat-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; }
.cat-chip {
  background: var(--surface2);
  border: 1.5px solid var(--border);
  color: var(--text2);
  padding: 7px 13px; border-radius: var(--radius-pill);
  font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all 0.15s;
  display: flex; align-items: center; gap: 5px;
  font-family: var(--font-body);
}
.cat-chip:hover { border-color: var(--purple); color: var(--purple); background: var(--purple-light); }
.cat-chip.selected {
  background: linear-gradient(135deg, var(--purple), var(--pink));
  color: #fff; border-color: transparent;
  box-shadow: 0 4px 12px rgba(155,127,232,0.35);
  transform: scale(1.04);
}

.btn-add {
  width: 100%; margin-top: 20px;
  background: linear-gradient(135deg, var(--purple), var(--pink));
  color: #fff; border: none; cursor: pointer;
  padding: 15px; border-radius: var(--radius);
  font-family: var(--font-body); font-size: 16px; font-weight: 800;
  transition: transform 0.15s, box-shadow 0.15s;
  box-shadow: 0 6px 20px rgba(155,127,232,0.4);
  letter-spacing: 0.2px;
}
.btn-add:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(155,127,232,0.5); }
.btn-add:active { transform: scale(0.98); }

/* ══════════════════════════════════════════════
   HISTORY
   ══════════════════════════════════════════════ */
.month-card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 14px;
  overflow: hidden;
  box-shadow: var(--shadow);
}
.month-header {
  padding: 16px 18px; cursor: pointer;
  display: flex; justify-content: space-between; align-items: center;
  transition: background 0.15s;
}
.month-header:hover { background: var(--surface2); }
.month-name { font-family: var(--font-display); font-size: 16px; font-weight: 800; color: var(--text); }

.month-chips { display: flex; gap: 8px; flex-wrap: wrap; }
.chip-stat {
  background: var(--purple-light);
  border: 1px solid var(--border2);
  border-radius: var(--radius-pill);
  padding: 4px 10px; text-align: center;
}
.chip-stat .cs-label { font-size: 9px; color: var(--text3); font-weight: 800; text-transform: uppercase; display: block; }
.chip-stat .cs-val { font-size: 13px; font-weight: 800; color: var(--text); display: block; font-family: var(--font-display); }
.chip-stat.spent .cs-val { color: var(--red); }
.chip-stat.left .cs-val { color: var(--green); }
.chip-stat.over .cs-val { color: var(--red); }

.month-body { display: none; padding: 0 18px 18px; border-top: 1.5px solid var(--border); }
.month-body.open { display: block; }

.cat-breakdown { margin-bottom: 14px; margin-top: 14px; }
.cat-row { display: flex; align-items: center; gap: 8px; margin-bottom: 9px; }
.cat-row-icon { font-size: 16px; width: 22px; }
.cat-row-name { font-size: 12px; font-weight: 700; color: var(--text2); width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cat-row-bar { flex: 1; height: 6px; background: var(--bg2); border-radius: 99px; overflow: hidden; }
.cat-row-fill { height: 100%; border-radius: 99px; background: var(--purple); }
.cat-row-amt { font-size: 12px; font-weight: 800; color: var(--text3); width: 72px; text-align: right; font-family: var(--font-display); }

.hist-expense-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 9px 0; border-bottom: 1px dashed var(--border);
}
.hist-expense-row:last-child { border-bottom: none; }
.hist-exp-left { display: flex; align-items: center; gap: 8px; }
.hist-exp-cat { font-size: 13px; font-weight: 800; color: var(--text); }
.hist-exp-meta { font-size: 11px; color: var(--text3); font-weight: 600; }
.hist-exp-amt { font-size: 14px; font-weight: 800; color: var(--red); font-family: var(--font-display); }

/* ══════════════════════════════════════════════
   SETTINGS
   ══════════════════════════════════════════════ */
.settings-card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 18px;
  margin-bottom: 14px;
  box-shadow: var(--shadow);
}
.settings-title { font-family: var(--font-display); font-size: 16px; font-weight: 800; color: var(--text); margin-bottom: 6px; }
.settings-sub { font-size: 13px; color: var(--text3); font-weight: 600; margin-bottom: 14px; }

.settings-row { display: flex; gap: 8px; align-items: center; }
.settings-row .field { flex: 1; }
.emoji-field { width: 60px !important; flex: none !important; text-align: center; font-size: 20px; padding: 8px; }

.custom-cat-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.custom-cat-tag {
  background: var(--purple-light);
  border: 1.5px solid var(--border2);
  border-radius: var(--radius-pill);
  padding: 6px 12px; font-size: 13px; font-weight: 700;
  display: flex; align-items: center; gap: 6px; color: var(--text);
}
.custom-cat-tag button {
  background: none; border: none; cursor: pointer;
  color: var(--text3); font-size: 14px; padding: 0; line-height: 1;
  transition: color 0.15s;
}
.custom-cat-tag button:hover { color: var(--red); }

.danger-card { border-color: #ffd6d6; background: #fff8f8; }
.btn-danger {
  background: var(--red-light); color: var(--red);
  border: 1.5px solid #ffb3c0; cursor: pointer;
  padding: 11px 20px; border-radius: var(--radius-sm);
  font-family: var(--font-body); font-size: 14px; font-weight: 800;
  transition: all 0.15s;
}
.btn-danger:hover { background: var(--red); color: #fff; }

/* ══════════════════════════════════════════════
   RESPONSIVE
   ══════════════════════════════════════════════ */
@media (max-width: 420px) {
  .hero-amount { font-size: 26px; }
  .month-chips { gap: 6px; }
  .chip-stat { padding: 3px 8px; }
}
