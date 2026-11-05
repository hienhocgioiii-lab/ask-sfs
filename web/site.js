/* Ask SFS help center. Same public SFS facts and answer brain as the app (../data.js, ../brain.js), in 4 languages (i18n.js). */
(function () {
"use strict";
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const SENSITIVE = /\b916\d{6}\b|\b\d{3}-\d{2}-\d{4}\b|\b\d{9}\b|\b\d{12,19}\b/;
const COLORS = {late:"#FF9500", bill:"#981B31", refund:"#34C759", hold:"#FF3B30", verif:"#007AFF", sap:"#5856D6", loans:"#30B0C7", other:"#8E8E93"};
const ORDER = ["late","bill","refund","hold","verif","sap","loans","other"];
const LOCALE = {en:"en-US", vi:"vi-VN", es:"es-US", zh:"zh-CN"};

// ---- language
let lang = "en";
try { lang = localStorage.getItem("asksfs-lang") || ""; } catch (e) {}
if (!UI[lang]) { const n = (navigator.language || "en").slice(0, 2); lang = UI[n] ? n : "en"; }
const T = () => UI[lang];
const office = o => o === "Bursar" ? [T().bursar, "215-204-7269"] : [T().sfs, "215-204-2244"];
function topicText(k){ const en = CARDS[k] ? {t:CARDS[k].title, b:CARDS[k].brief, s:CARDS[k].steps} : {t:Brain.EXTRA[k].title, b:Brain.EXTRA[k].brief, s:Brain.EXTRA[k].steps};
  if (lang === "en") return en; const tr = (TOPIC_TR[lang] || {})[k]; return tr ? {t:tr.t, b:tr.b, s:tr.s || []} : en; }
const chipText = c => lang === "en" ? c : (CHIP_TR[c] && CHIP_TR[c][lang]) || c;

// translate one answer from the brain into the chosen language
function localize(a){
  if (lang === "en") return a;
  const k = a.topic, en = k ? (CARDS[k] ? CARDS[k].brief : Brain.EXTRA[k] && Brain.EXTRA[k].brief) : null;
  if (en && a.text.startsWith(en)) { const t = topicText(k); return {...a, text:t.b, steps:t.s, chips:(a.chips || []).map(chipText)}; }
  if (SAY_TR[a.text] && SAY_TR[a.text][lang]) return {...a, text:SAY_TR[a.text][lang], chips:(a.chips || []).map(chipText)};
  return {...a, chips:(a.chips || []).map(chipText), englishOnly:true};
}

// ---- answer engine
let lastTopic = null;
function answerFor(q){ const a = Brain.answer(q, {last:lastTopic}); if (a.topic) lastTopic = a.topic; return a; }

// ---- chat
let chat = [];
function bubble(m){
  if (m.me) return `<div class="bub me">${esc(m.text)}</div>`;
  if (m.typing) return `<div class="bub bot" aria-label="Typing"><span class="dots"><i></i><i></i><i></i></span></div>`;
  if (m.blocked) return `<div class="bub bot"><span class="warn">${esc(T().blocked)}</span></div>`;
  const a = localize(m.a), ct = a.office ? office(a.office) : null;
  const parts = a.text.split(/(?<=[.!?。！？])\s?/); const lead = parts.shift(), rest = parts.join(lang === "zh" ? "" : " ");
  const meta = (ct || a.src) ? `<div class="meta">${ct ? `<span class="badge">${esc(ct[0])} · ${ct[1]}</span>` : ""}${a.src ? `<a href="${SRC[a.src].u}" target="_blank" rel="noopener">${esc(T().source)}: ${esc(SRC[a.src].t)}</a>` : ""}</div>` : "";
  const next = a.human ? `<div class="next"><a class="btn solid" href="../">${esc(T().prep)}</a><a class="btn" href="#contact">${esc(T().contact)}</a></div>`
    : (a.topic && CARDS[a.topic] ? `<div class="next"><button type="button" class="btn" data-topic="${a.topic}">${esc(T().more)} ${esc(topicText(a.topic).t.toLowerCase())}</button></div>` : "");
  const chips = (a.chips || []).length ? `<div class="next">${a.chips.map(c => `<button type="button" class="chip" data-q="${esc(c)}">${esc(c)}</button>`).join("")}</div>` : "";
  return `<div class="bub bot"${a.englishOnly ? ' lang="en"' : ""}><span><span class="lead">${esc(lead)}</span>${rest ? (lang === "zh" ? "" : " ") + esc(rest) : ""}</span>
    ${a.steps && a.steps.length ? `<ol>${a.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>` : ""}
    ${meta}${next}${chips}
  </div>`;
}
function renderChat(){ $("#chatWrap").hidden = !chat.length; $("#chat").innerHTML = chat.map(bubble).join(""); }
function ask(q){
  q = q.trim(); if (!q) return;
  chat.push({me:true, text:q});
  if (SENSITIVE.test(q)) { chat.push({blocked:true}); renderChat(); scrollToChat(); return; }
  chat.push({typing:true}); renderChat(); scrollToChat();
  setTimeout(() => { chat.pop(); chat.push({a:answerFor(q)}); renderChat(); }, 600);
}
function scrollToChat(){ $("#chatWrap").scrollIntoView({behavior:"smooth", block:"start"}); }
$("#askForm").addEventListener("submit", e => { e.preventDefault(); const i = $("#askInput"); ask(i.value); i.value = ""; });
$("#clearChat").onclick = () => { chat = []; renderChat(); };

// ---- topic cards + dialog
const tile = k => `<span class="tile" style="background:${COLORS[k]}" aria-hidden="true"><svg viewBox="0 0 24 24">${CARDS[k].icon}</svg></span>`;
function renderCards(){ $("#cards").innerHTML = ORDER.map(k => { const t = topicText(k); return `<button type="button" class="card" data-topic="${k}">${tile(k)}<b>${esc(t.t)}</b><span class="desc">${esc(t.b)}</span></button>`; }).join(""); }
function openTopic(k){
  const t = topicText(k), [who, num] = office(TOPICS[k].office), src = CARDS[k].src;
  $("#dialog").innerHTML = `<button type="button" class="x" data-close aria-label="Close">×</button>
    ${tile(k)}<h2 id="dlgTitle">${esc(t.t)}</h2><p>${esc(t.b)}</p>
    <ol>${t.s.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
    <div class="meta"><span class="badge">${esc(who)} · ${num}</span><a href="${SRC[src].u}" target="_blank" rel="noopener">${esc(T().source)}: ${esc(SRC[src].t)}</a></div>
    <div class="next"><a class="btn solid" href="../">${esc(T().prep)}</a><button type="button" class="btn" data-close>${esc(T().done)}</button></div>`;
  $("#dialog").hidden = false; $("#scrim").hidden = false; $("#dialog").querySelector(".x").focus();
}
function closeTopic(){ $("#dialog").hidden = true; $("#scrim").hidden = true; }
$("#scrim").onclick = closeTopic;
document.addEventListener("keydown", e => { if (e.key === "Escape") closeTopic(); });

// ---- key dates
const today = () => { const d = new Date(); d.setHours(0,0,0,0); return d; };
const days = s => Math.round((new Date(s + "T00:00:00") - today()) / 864e5);
function renderDates(){
  $("#dateList").innerHTML = ["sapappeal","bill","fafsa","final"].map(k => { const d = TODO[k].date, n = days(d), [title, why] = T().dates[k];
    const when = new Date(d + "T00:00:00").toLocaleDateString(LOCALE[lang], {month:"short", day:"numeric", year:"numeric"});
    const rel = n < 0 ? T().passed : n === 0 ? T().today : T().inDays(n);
    return `<div class="date"><span class="d">${esc(when)}</span><b>${esc(title)}</b><span>${esc(why)}</span><span class="rel" style="color:${n < 0 ? "var(--label3)" : n <= 30 ? "var(--red)" : "var(--label2)"}">${esc(rel)}</span></div>`; }).join("");
}

// ---- static text + language switch
function applyLang(){
  const u = T();
  document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang;
  document.querySelectorAll("[data-i]").forEach(el => { const k = el.dataset.i; const v = k.includes(".") ? k.split(".").reduce((o, p) => o[p], u) : u[k]; if (typeof v === "string") el.textContent = v; });
  $("#askInput").placeholder = u.ph;
  $("#langNote").textContent = u.note; $("#langNote").hidden = !u.note;
  $("#chips").innerHTML = u.chips.map(q => `<button type="button" class="chip" data-q="${esc(q)}">${esc(q)}</button>`).join("");
  $("#lang").value = lang;
  $("#langRow").innerHTML = Object.entries(LANGS).map(([k, v]) => `<button type="button" data-lang="${k}" aria-pressed="${k === lang}" lang="${k}">${v}</button>`).join("");
  renderCards(); renderDates(); renderChat();
}
$("#lang").innerHTML = Object.entries(LANGS).map(([k, v]) => `<option value="${k}">${v}</option>`).join("");
function setLang(l){ lang = l; try { localStorage.setItem("asksfs-lang", lang); } catch (x) {} applyLang(); }
$("#lang").addEventListener("change", e => setLang(e.target.value));
applyLang();

// ---- one click handler
document.addEventListener("click", e => {
  const lb = e.target.closest("[data-lang]"); if (lb) { setLang(lb.dataset.lang); return; }
  const q = e.target.closest("[data-q]"); if (q) { ask(q.dataset.q); return; }
  const t = e.target.closest("[data-topic]"); if (t) { openTopic(t.dataset.topic); return; }
  if (e.target.closest("[data-close]")) closeTopic();
});
})();
