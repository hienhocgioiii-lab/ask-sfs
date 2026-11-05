/* Ask SFS "brain": understands questions in students' own words and answers from the public SFS facts in data.js.
   Works offline, no AI key. Handles small talk, typos, follow-ups, personal account questions, definitions,
   off-topic questions and unclear questions (asks back with choices). */
(function (global) {
"use strict";

// ---------- extra answer cards (facts paraphrased from KB in data.js) ----------
const EXTRA = {
  fafsa:{title:"FAFSA", office:"SFS", src:"appt",
    brief:"Temple’s FAFSA priority deadline is Feb 1. File each year at studentaid.gov, and list Temple first if you want the PA State Grant.",
    steps:["File the 2027–28 FAFSA at studentaid.gov by Feb 1, 2027","Each parent or contributor needs their own FSA ID","Made a mistake? Fix it on studentaid.gov, then email sfs@temple.edu with the subject “FAFSA Correction”"]},
  offer:{title:"Aid offer & scholarships", office:"SFS", src:"appt",
    brief:"Your aid offer is on the Costs & Aid tab of TUportal, under “View my Financial Aid Offer.” Grants and scholarships don’t need accepting; loans do.",
    steps:["TUportal → Costs & Aid → View my Financial Aid Offer","Accept loans under the Financial Aid Package option","Want more scholarships? Use ScholarshipUniverse on the same tab"]},
  coa:{title:"What college costs", office:"SFS", src:"coa",
    brief:"For 2026–27, a PA resident in Liberal Arts has a budget of about $48,160 a year, including about $21,474 for tuition and fees. Commuters get a $4,084 housing and food allowance.",
    steps:["Temple bills tuition, fees, Temple housing and meal plans","Books, transportation and personal costs aren’t billed but count in your budget","SFS can’t always cover full need; outside scholarships and loans can fill the gap"]},
  contact:{title:"Reaching SFS", office:"SFS", src:"appt",
    brief:"Call SFS at 215-204-2244, Monday–Friday 8:30–5, or email sfs@temple.edu. Appointments (in person or Zoom) are booked through QLess and fill fast near due dates.",
    steps:["Have your full name and Temple ID ready (say it, don’t email it)","No QLess slots? Check again the next day","Just need to verify your identity? Walk in Mon–Thu, 8:30–4"]},
  offices:{title:"SFS or the Bursar?", office:"Both", src:"bursar",
    brief:"SFS handles aid: FAFSA, grants, loans, scholarships, verification and SAP. The Bursar handles bills, payments, payment plans and refunds through TUpay.",
    steps:["Aid question → SFS, 215-204-2244, sfs@temple.edu","Bill, payment or refund → Bursar, 215-204-7269, bursar@temple.edu","The One Stop Student Services center has both in person"]},
  ferpa:{title:"Parents & privacy (FERPA)", office:"SFS", src:"ferpa",
    brief:"SFS can only talk to your parents about your account if they’re on your FERPA waiver. Without it, they can’t get answers, even if they pay the bill.",
    steps:["Add your parents to your FERPA waiver","Parents should have your name and Temple ID ready when they call","You can always call SFS yourself"]},
  pasg:{title:"PA State Grant", office:"SFS", src:"pasg",
    brief:"The FAFSA doesn’t send everything to PHEAA. You must finish the separate PA State Grant form, and Temple must be the first school on your FAFSA. The grant posts after add/drop.",
    steps:["Complete the PA State Grant form from the link PHEAA sends after your FAFSA","List Temple first on your FAFSA","Expect it after add/drop, not with your first bill"]},
  payplan:{title:"Payment plans", office:"Bursar", src:"appt",
    brief:"If your balance isn’t paid by the due date, it moves to the Deferred Payment Plan automatically for a $50 fee. The final spring date is Mar 4, 2027.",
    steps:["Spring bill due: Jan 21, 2027","Final payment date: Mar 4, 2027 (after that: $200 fee and a hold)","Want monthly payments next year? TIPP: up to 10 payments starting in May, $80 fee"]},
  payback:{title:"What you pay back", office:"SFS", src:"loans",
    brief:"Grants and scholarships (like Pell, SEOG, Temple grants and the PA State Grant) don’t need to be paid back. Loans do.",
    steps:["Subsidized loans don’t build interest while you’re in school at least half-time","Unsubsidized loans build interest while you’re in school","Not sure what you have? Check your aid offer on TUportal → Costs & Aid"]},
  dependency:{title:"Independent status", office:"SFS", src:"appt",
    brief:"Turning 18 or 21, living on your own, or parents refusing to help doesn’t make you independent for aid. You can ask for a dependency review.",
    steps:["Email sfs@temple.edu with the subject “Dependency Status”","Explain your situation and include documents","A Special Circumstance Appeal can only raise Pell eligibility"]},
};
const card = k => CARDS[k] ? {title:CARDS[k].title, brief:CARDS[k].brief, steps:CARDS[k].steps, src:CARDS[k].src, office:TOPICS[k].office} : EXTRA[k];

// ---------- spelling fixes + synonyms ----------
const VOCAB = ["refund","financial","scholarship","scholarships","disbursement","verification","registration","register","balance","tuition","grant","grants","loan","loans","payment","bursar","appointment","deadline","semester","subsidized","unsubsidized","promissory","counseling","dependency","independent","transcript","diploma","academic","progress","appeal","federal","document","documents","parents","waiver","account","deposit","direct","schedule","statement","eligible","eligibility","aid"];
function lev(a, b){ const m = a.length, n = b.length; if (Math.abs(m - n) > 2) return 9; let p = Array.from({length:n + 1}, (_, j) => j);
  for (let i = 1; i <= m; i++){ const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[n]; }
function fixTypos(t){ return t.replace(/[a-z]{5,}/g, w => { if (VOCAB.includes(w)) return w; let best = w, d = w.length >= 8 ? 2 : 1;
  for (const v of VOCAB){ const x = lev(w, v); if (x <= d && x > 0){ best = v; d = x - 1; } } return best; }); }
const SYN = [[/\bfin ?aid\b|\bfa\b/g,"financial aid"],[/\bmoney back\b|\bextra money\b|\bleftover money\b/g,"refund"],[/\bpell\b(?! grant)/g,"pell grant"],[/\b(wats|whats|wat is|wut is)\b/g,"what is"],
  [/\bcan'?t (sign up|enroll|register) for (classes|courses)\b|\bblocked from (classes|registering)\b/g,"hold can't register"],
  [/\bkicked out\b|\bdropped (from|out of) (my )?classes\b/g,"dropped hold"],[/\btu ?portal\b/g,"tuportal"],[/\bta(x|xes) (form|return)s?\b/g,"tax"],
  [/\b(mom|dad|mother|father|my parents?)\b/g,"parent"],[/\bstate grant\b/g,"pasg pa state grant"],[/\bloan money\b/g,"loan"]];
// Vietnamese, Spanish and Chinese keywords → English words the intents understand
const FOREIGN = [
  [/xin chào|chào bạn|^chào|^hola\b|^buenas|你好|您好|嗨/g," hello "],
  [/cảm ơn|cám ơn|gracias|谢谢|多谢/g," thanks "],
  [/tạm biệt|adiós|再见/g," bye "],
  [/không khỏe|không ổn|buồn|mệt mỏi|chán nản|no me siento bien|triste|deprimid|不舒服|难过|伤心|心情不好|抑郁/g," not feeling good "],
  [/căng thẳng|lo lắng|estrés|estresad|preocupad|压力|焦虑|担心/g," stressed "],
  [/tự tử|muốn chết|suicid|quiero morir|自杀|想死/g," suicide "],
  [/hoàn tiền|tiền hoàn lại|tiền thừa|reembolso|退款/g," refund "],
  [/học bổng|becas?\b|奖学金/g," scholarship "],
  [/khoản vay|tiền vay|vay|préstamos?|贷款/g," loan "],
  [/hóa đơn|học phí|factura|matrícula|账单|学费/g," bill "],
  [/trợ cấp|tiền hỗ trợ|subvenci[oó]n|ayuda financiera|ayuda|助学金|补助|资助/g," grant aid "],
  [/chưa (đến|nhận|có|vào)|no ha llegado|no llegó|todavía no|还没(到|收到|有)|没收到/g," hasn't arrived "],
  [/bị khóa|khóa tài khoản|retenci[oó]n|bloqueo|冻结|不能注册|无法注册/g," hold "],
  [/xác minh|verificaci[oó]n|核实|审核|验证/g," verification "],
  [/cha mẹ|bố mẹ|ba mẹ|phụ huynh|padres|mamá|papá|父母|妈妈|爸爸|家长/g," parent "],
  [/số điện thoại|gọi điện|gọi|llamar|tel[eé]fono|电话|打给/g," call phone "],
  [/(tôi )?(phải trả|nợ) bao nhiêu|cu[aá]nto debo|cu[aá]nto tengo que pagar|欠多少|要付多少/g," how much do i owe "],
  [/khi nào|cu[aá]ndo|什么时候|何时/g," when "],
  [/tại sao|por qu[eé]|为什么/g," why "],
  [/hỏi sfs hay bursar|sfs o (al )?bursar|sfs 还是 bursar|sfs还是bursar/g," sfs or bursar who do i ask "],
  [/trả góp|plan de pago|a plazos|分期/g," payment plan "],
  [/hạn chót|hạn đóng|fecha l[ií]mite|vence|截止|到期/g," due date "],
];
function pre(q){ let t = q.toLowerCase(); for (const [re, r] of FOREIGN) t = t.replace(re, r); return t; }
function norm(q){ let t = " " + pre(q).replace(/[’']/g, "'").replace(/[^a-z0-9$'/ ]+/g, " ") + " "; t = fixTypos(t); for (const [re, r] of SYN) t = t.replace(re, r); return t.replace(/\s+/g, " "); }

// ---------- intents: patterns with weights (best score wins, not first match) ----------
const I = {
  crisis:[[/\bsuicid|\bkill (myself|me)\b|\bend (my|it all|my life)\b|\bhurt(ing)? myself\b|\bself.?harm|\b(don'?t|do not) want to (live|be here|be alive)\b|\bwant to die\b|\bno reason to live\b/,20]],
  wellbeing:[[/\bnot (feeling|doing) (too |so |very )?(good|great|well|ok|okay)\b|\bfeel(ing)? (really |so |very |kind of |kinda |pretty |super )?(sad|down|depressed|lonely|alone|sick|awful|terrible|hopeless|bad|anxious|empty|lost)\b|\bdepress|\blonely\b|\bmental health\b|\btherap(y|ist)\b|\bcan'?t sleep\b|\b(rough|bad|hard) (day|week|time)\b|\bhaving a hard time\b|\bnot okay\b|\bstruggling\b/,6]],
  help:[[/^ ?(help|i need help|help me|can (you|u) help( me)?|i have a question|question|anyone there)\b/,5]],
  payback:[[/\bpay (it |them |this )?back\b|\brepay\b|\bpaid back\b/,5]],
  greet:[[/^ ?(hi|hey|hello|hiya|yo|sup|howdy|good (morning|afternoon|evening)|what'?s up)\b/,5]],
  thanks:[[/\b(thanks|thank you|thx|ty|appreciate it|that helped|perfect|great|awesome|got it)\b/,4]],
  bye:[[/\b(bye|goodbye|see you|later|that'?s all|nothing else)\b/,4]],
  howru:[[/\bhow are (you|u)\b|\bhow'?s it going\b/,5]],
  who:[[/\bwho are (you|u)\b|\bwhat are you\b|\bare you (a )?(bot|ai|real|human|person)\b|\bwhat can you (do|help)\b|\bhow does this work\b/,5]],
  joke:[[/\b(joke|funny|make me laugh)\b/,5]],
  stress:[[/\b(stressed|stressing|stressful|stress|panic|panicking|freaking out|anxious|worried|scared|broke|can'?t afford|crying|overwhelmed|ugh|this sucks|so done)\b/,3]],
  angry:[[/\b(useless|stupid|dumb|idiot|hate (this|sfs)|worst|nobody answers|no one answers|never answer)\b/,3]],
  my_owe:[[/\b(how much|what) (do|will|should) i (owe|pay|have to pay)\b|\bmy (balance|total)\b|\bwhat'?s my (balance|bill)\b|\bhow much is my bill\b|\bhow much (money )?(is|do i have) left\b/,6]],
  my_aid:[[/\b(where|when) is my (aid|grant|loan|money)\b|\bmy (aid|grants?|loans?) (coming|arrive|status)\b|\bwhat aid do i (have|get)\b|\bhow much aid\b/,6]],
  my_todo:[[/\bwhat (do|should) i (need to )?do\b|\bmy (tasks|to ?dos?|deadlines)\b|\bwhat'?s (due|next)\b|\bam i missing anything\b|\bwhat am i missing\b/,6]],
  my_refund:[[/\b(will|do) i (get|have) a refund\b|\bhow much (is )?my refund\b|\bmy refund\b/,5]],
  late:[[/\bgrant\b/,2],[/\b(pell|seog|promise|pasg)\b/,2],[/\bdisburs/,3],[/\b(haven'?t|hasn'?t|didn'?t|never) (got|gotten|received|come|came|arrived|shown up|show up|posted|paid)\b|\bnot (showing|posted|there|on my (bill|account))\b|\bstill waiting\b|\bmissing\b|\blate\b|\bwhen (will|does) .*(come|arrive|post|show)\b|\bwhere is\b/,2]],
  bill:[[/\bbill\b|\btuition\b|\bcharges?\b|\bdue date\b|\bowe\b|\bpay\b|\bpayment\b/,2]],
  payplan:[[/\blate fee\b|\bwhat happens if i (don'?t|can'?t) pay\b|\$200/,5],[/\bpayment plan\b|\bdeferred\b|\btipp\b|\binstall?ments?\b|\b\$?50 fee\b|\bpay (it )?(over time|monthly)\b|\bcan'?t pay (it )?all\b/,4]],
  refund:[[/\brefund\b|\bdirect deposit\b|\bcredit balance\b|\bcheck (in the mail|never came)\b/,4]],
  hold:[[/\bhold\b|\bcan'?t register\b|\btranscripts?\b|\bdiploma\b|\bblocked\b|\bdropped\b/,4]],
  verif:[[/\bverif|\btax\b|\birs\b|\bw-?2\b|\b1040\b|\bstudentforms\b|\bdocuments?\b|\bidentity\b/,3]],
  sap:[[/\bsap\b|\bgpa\b|\bacademic progress\b|\bappeal\b|\bwarning\b|\bpace\b|\bineligible\b|\blost (my )?aid\b|\bfailed\b|\bwithdr[ae]w/,3]],
  loans:[[/\bloans?\b|\bmpn\b|\bpromissory\b|\bentrance counsel|\bplus\b|\bborrow|\bsubsidized\b|\bunsubsidized\b|\binterest\b/,3]],
  fafsa:[[/\bfafsa\b|\bfsa id\b|\bcorrection\b|\bstudentaid\b/,4]],
  dependency:[[/\bdependen|\bindependent\b|\bparents? (won'?t|refuse|don'?t) help\b/,4]],
  offer:[[/\baid offer\b|\baward\b|\bscholarships?\b|\bhow much aid\b|\bfree money\b|\bmore money\b/,3]],
  coa:[[/\bhow much (does|is|will) (temple|college|it|school|a year) cost\b|\bcost of attendance\b/,5],[/\bcost\b|\bbudget\b|\bout of pocket\b|\bexpensive\b/,2]],
  contact:[[/\bcall\b|\bphone\b|\bnumber\b|\bemail\b|\bappointment\b|\bqless\b|\bhours\b|\bopen\b|\btalk to (a |someone|somebody|a person|a human)\b|\bwalk in\b|\breach\b|\bcontact\b|\bwhere is (sfs|the office)\b/,3]],
  offices:[[/\bsfs (or|vs|versus) (the )?bursar\b|\bbursar (or|vs|versus) sfs\b|\bwho do i ask\b|\bwhich office\b|\bdifference\b|\bwhat is (the )?bursar\b/,5]],
  ferpa:[[/\bparent\b|\bferpa\b|\bwaiver\b|\bfamily\b/,4]],
  pasg:[[/\bpasg\b|\bpheaa\b|\bpa state grant\b/,5]],
  offtopic_class:[[/\b(what )?(classes|courses) (should|to) (i )?take\b|\bmajor\b|\badvis(or|ing)\b|\bschedule (my )?classes\b|\bdegree audit\b/,4]],
  offtopic_house:[[/\bhousing\b|\bdorm\b|\broommate\b|\bresidence hall\b/,3]],
  offtopic_it:[[/\bpassword\b|\blog ?in\b|\bwifi\b|\baccount locked\b|\btuportal (down|not working)\b/,4]],
  offtopic_other:[[/\bweather\b|\bfood\b|\bparking\b|\bsports\b|\bgame\b|\bmovie\b|\bmusic\b|\bdate\b|\bhomework\b/,2]],
};
const MONEY_TOPICS = ["payback","late","bill","payplan","refund","hold","verif","sap","loans","fafsa","dependency","offer","coa","contact","offices","ferpa","pasg"];
function score(t){ const s = {}; for (const [k, list] of Object.entries(I)){ let v = 0; for (const [re, w] of list) if (re.test(t)) v += w; if (v) s[k] = v; } return Object.entries(s).sort((a, b) => b[1] - a[1]); }

// ---------- helpers ----------
const money = n => "$" + Math.round(Math.abs(n)).toLocaleString("en-US");
const fmtDate = d => new Date(d + "T00:00:00").toLocaleDateString("en-US", {month:"short", day:"numeric"});
const MENU = ["My grant hasn’t shown up","How much do I owe?","Why do I have a hold?","When do I get my refund?"];
const fromCard = (k, extra = {}) => { const c = card(k); return {topic:k, text:c.brief, steps:c.steps, src:c.src, office:c.office, human:false, ...extra}; };
const say = (text, extra = {}) => ({topic:null, text, steps:[], src:null, office:null, human:false, ...extra});
function glossary(t){ const m = t.match(/\bwhat(?:'s| is| are| does)\s+(?:a |an |the )?(.+?)(?:\s+mean)?\s*\??\s*$/); if (!m) return null;
  let term = m[1].trim(); const AL = {mpn:"master promissory note", pasg:"pa state grant", seog:"seog", fafsa:null, coa:"cost of attendance"}; if (AL[term]) term = AL[term]; const key = Object.keys(GLOSS).find(g => term === g.toLowerCase() || term.replace(/s$/, "") === g.toLowerCase() || (term.length > 2 && g.toLowerCase().startsWith(term)));
  return key ? say(`${key}: ${GLOSS[key]}`, {chips:["What else should I know?", "Who do I ask, SFS or the Bursar?"]}) : null; }
const FOLLOW = /^ ?(how|how do i( do)? (that|this|it)|where|when|why|what if|and( then)?|then what|more|tell me more|explain|steps|ok(ay)? (and|so)|so what (do i|now)|what now|what next|who do i (call|contact|ask)|is that (bad|normal|ok)|really|huh|wdym|what do you mean)\b/;

// ---------- personal answers (uses the signed-in sample student) ----------
function personal(kind, ctx){
  const p = ctx && ctx.persona, c = ctx && ctx.calc; if (!p || !c) return null;
  if (kind === "my_owe"){
    const lateList = p.aid.filter(a => a[1] === "late");
    return say(`You owe about ${money(c.short)} by Jan 21, 2027, after the aid that pays on time. ` + (c.late ? `Another ${money(c.late)} (${lateList.map(a => a[0]).join(", ")}) arrives after add/drop, which would bring your balance to ${c.gap > 0 ? money(c.gap) : "$0, with about " + money(-c.gap) + " back as a refund"}.` : "No other aid is still coming."),
      {topic:"bill", src:"appt", office:"Bursar", steps:["Unpaid on Jan 21? It moves to the Deferred Payment Plan ($50 fee), not a hold","Pay the rest by Mar 4, 2027 to avoid a $200 fee and a hold"], chips:["When does my aid arrive?","Can I pay over time?"]});
  }
  if (kind === "my_aid"){
    const e = p.aid.filter(a => a[1] === "early"), l = p.aid.filter(a => a[1] === "late");
    return say(`On time: ${e.map(a => `${a[0]} (${money(a[2])})`).join(", ") || "none"}. These start posting Jan 6 (grants) and Jan 13 (loans, full-time). ` + (l.length ? `After add/drop: ${l.map(a => `${a[0]} (${money(a[2])})`).join(", ")}. That’s normal and won’t cause a hold.` : ""),
      {topic:"late", src:"disb", office:"SFS", steps:["Check TUportal → Costs & Aid for unfinished tasks","Loans need the MPN and entrance counseling at studentaid.gov"], chips:["How much do I owe?","What do I need to do?"]});
  }
  if (kind === "my_todo"){
    const t = (ctx.tasks || []).slice(0, 3);
    if (!t.length) return say("You’re all caught up. Nothing is due right now.", {chips:["How much do I owe?"]});
    return say(`You have ${ctx.tasks.length} thing${ctx.tasks.length > 1 ? "s" : ""} to do. Start with these:`, {topic:null, steps:t.map(([, x]) => x.t + (x.date ? ` (by ${fmtDate(x.date)})` : "")), src:t[0][1].src, office:"SFS", chips:["How much do I owe?","When does my aid arrive?"]});
  }
  if (kind === "my_refund"){
    if (c.gap < 0) return say(`Once all your aid posts, it’s about ${money(-c.gap)} more than your bill, so you should get that back as a refund.`, {topic:"refund", src:"refund", office:"Bursar", steps:CARDS.refund.steps});
    return say(`Right now your aid doesn’t cover your whole bill (about ${money(c.gap)} short after all aid), so no refund is expected this term.`, {topic:"refund", src:"refund", office:"Bursar", chips:["How much do I owe?","Can I pay over time?"]});
  }
  return null;
}

// ---------- main ----------
function answer(q, ctx = {}){
  const t = norm(q), words = t.trim().split(" ").filter(Boolean);
  if (I.crisis[0][0].test(t)) return say("I’m really glad you told me. If you might hurt yourself or you’re in danger, please reach out right now: call or text 988 (Suicide & Crisis Lifeline), or call 911. On campus, Temple Police is 215-204-1234. Tuttleman Counseling Services is 215-204-7276 (after hours, press 1). You don’t have to go through this alone.", {topic:null, crisis:true});
  const g = glossary(t); if (g) return g;
  const ranked = score(t);
  const SMALL = ["wellbeing","help","greet","thanks","bye","howru","who","joke","stress","angry"];
  const real = ranked.find(r => !SMALL.includes(r[0]));
  const feel = ranked.find(r => r[0] === "stress" || r[0] === "angry" || r[0] === "wellbeing");
  let [top, s] = ranked[0] || [null, 0];
  if (real && (real[1] >= 3 || (feel && real[1] >= 2) || !SMALL.includes(top))) [top, s] = real;
  const second = ranked.find(r => !SMALL.includes(r[0]) && r[0] !== top);
  const empathy = feel && real ? (feel[0] === "angry" ? "Sorry, that’s really frustrating. " : feel[0] === "wellbeing" ? "Sorry you’re having a rough time. " : "I hear you, that’s stressful. ") : "";

  // small talk (only when there’s no real question in the message)
  if (!real || real[1] < (feel ? 2 : 3)){
    if (top === "wellbeing") return say("I’m sorry you’re not feeling good. You don’t have to deal with it alone: Temple’s Tuttleman Counseling Services can help at 215-204-7276 (after hours, press 1). If money stress is part of it, I can help you sort that out too, whenever you’re ready.", {chips:["Money is stressing me out","How much do I owe?"]});
    if (top === "help") return say("Of course. Tell me what’s going on in your own words, or pick one of these:", {chips:MENU});
    if (top === "greet") return say(`Hi${ctx.persona ? " " + ctx.persona.name : ""}! I can help with aid, bills, refunds, holds and anything else SFS. What’s going on?`, {chips:MENU});
    if (top === "howru") return say("Doing well, thanks for asking! More importantly, how’s your money situation this semester? I can check what you owe or what’s still coming.", {chips:MENU});
    if (top === "who") return say("I’m Ask SFS, a helper for Temple Student Financial Services. I answer in plain words from official SFS and Bursar policy, show you the source, and if you really need a person I’ll tell you which office and what to have ready.", {chips:MENU});
    if (top === "joke") return say("Why did the student bring a ladder to SFS? They heard the wait times were through the roof. Seriously though, I can usually save you the call. What do you need?", {chips:MENU});
    if (top === "thanks") return say("Anytime! If anything else comes up with aid or your bill, just ask.", {chips:["What do I need to do?"]});
    if (top === "bye") return say("Good luck this semester! I’m here 24/7 if you need me.");
    if (top === "angry") return say("That’s fair, it’s frustrating when nobody answers. Tell me what’s going on in a sentence and I’ll get you a straight answer, or set you up to solve it with one call.", {chips:MENU});
    if (top === "stress") return say("I hear you, money stress is real and you’re not the only one. Let’s figure out exactly where you stand. Want me to check what you owe and what aid is still coming?", {chips:["How much do I owe?","When does my aid arrive?","Can I pay over time?"]});
  }
  const withFeel = a => { if (empathy && a.text) a.text = empathy + a.text; return a; };

  // personal account questions
  if (/^my_/.test(top)){ const p = personal(top, ctx); if (p) return withFeel(p);
    const map = {my_owe:"bill", my_aid:"late", my_todo:null, my_refund:"refund"}[top];
    if (map) return fromCard(map, {text:"I can’t see your real account here. " + card(map).brief});
    return say("I can’t see your real account here, but these are the deadlines everyone should know:", {steps:["Spring bill due Jan 21, 2027","2027–28 FAFSA priority deadline Feb 1, 2027","Final spring payment Mar 4, 2027"], src:"appt", office:"SFS"}); }

  // off-topic but campus
  if (top === "offtopic_class") return say("Picking classes and majors is your academic advisor’s area, not SFS. One money tip: dropping below 12 credits can delay loans and change aid, so check with SFS before you drop.", {chips:["Why do I have a hold?","What is SAP?"]});
  if (top === "offtopic_house") return say("Housing questions go to University Housing. On the money side: Temple housing shows up on your bill, and commuters get a $4,084 housing and food allowance in their aid budget.", {src:"coa", office:"SFS", chips:["How much does Temple cost?"]});
  if (top === "offtopic_it") return say("Login and password problems go to Temple’s IT help desk, not SFS. Once you’re in TUportal, money things live under the Costs & Aid tab.", {chips:MENU});
  if (top === "offtopic_other" && s < 3) return say("Ha, that’s outside my lane. I only know Temple money stuff: aid, bills, refunds, holds. Anything there I can help with?", {chips:MENU});

  // follow-ups to the last topic
  if ((!top || s < 2) && ctx.last && FOLLOW.test(t) && words.length <= 7){
    const c = card(ctx.last);
    if (/who do i (call|contact|ask)/.test(t)) { const off = c.office === "Bursar" ? "the Bursar at 215-204-7269 (bursar@temple.edu)" : "SFS at 215-204-2244 (sfs@temple.edu), Mon–Fri 8:30–5"; return say(`About ${(TOPICS[ctx.last] ? TOPICS[ctx.last].label : c.title).toLowerCase()}: contact ${off}. Have your name and Temple ID ready.`, {topic:ctx.last, src:c.src, office:c.office}); }
    const kbId = TOPICS[ctx.last] ? TOPICS[ctx.last].kb[0] : null, k = kbId ? KB.find(e => e.id === kbId) : null;
    return say(k ? k.text.split(". ").slice(0, 3).join(". ") + "." : c.brief, {topic:ctx.last, steps:c.steps, src:c.src, office:c.office, chips:["Who do I call about this?","This needs a person"]});
  }

  // money topics
  if (top && MONEY_TOPICS.includes(top)){
    // close call between two topics: answer the best, offer the other
    if (top === "contact" && ctx.last && ctx.last !== "contact" && words.length <= 7 && card(ctx.last)) { const c = card(ctx.last); const off = c.office === "Bursar" ? "the Bursar’s Office at 215-204-7269 or bursar@temple.edu" : "SFS at 215-204-2244 (Mon–Fri, 8:30–5) or sfs@temple.edu"; return say(`About ${(TOPICS[ctx.last] ? TOPICS[ctx.last].label : c.title).toLowerCase()}: contact ${off}. Have your name and Temple ID ready, and say it on the call instead of emailing it.`, {topic:ctx.last, src:c.src, office:c.office, chips:["What should I have ready?"]}); }
    let ans = fromCard(top);
    const pp = ctx.persona;
    if (pp && (top === "late" || top === "pasg")) { const l = pp.aid.filter(a => a[1] === "late"); if (l.length) ans.text += ` For you: ${l.map(a => a[0] + " (" + money(a[2]) + ")").join(" and ")} ${l.length > 1 ? "are" : "is"} expected after add/drop.`; }
    if (pp && top === "bill" && ctx.calc) ans.text += ` For you: about ${money(ctx.calc.short)} is due Jan 21 after the aid that pays on time.`;
    if (second && MONEY_TOPICS.includes(second[0]) && second[1] >= s - 1 && second[0] !== top) ans.chips = [`Tell me about ${card(second[0]).title.toLowerCase()}`];
    if (/\b(why (do|does|is) (i|my)|my (exact|account)|is my .* (processed|approved|done))\b/.test(t)) ans.human = true;
    return withFeel(ans);
  }

  // search the policy text before giving up
  const w = (t.match(/[a-z]{3,}/g) || []);
  const hit = KB.map(e => ({e, s:w.reduce((a, x) => a + (e.keys.includes(x) ? 2 : 0) + (x.length > 4 && e.text.toLowerCase().includes(x) ? .4 : 0), 0)})).sort((a, b) => b.s - a.s)[0];
  if (hit && hit.s >= 2 && words.length >= 2) return say(hit.e.text.split(". ").slice(0, 2).join(". ") + ".", {src:hit.e.src, office:hit.e.office, chips:["Who do I ask, SFS or the Bursar?"]});

  // unclear: ask back
  return say(words.length <= 2 ? "Can you tell me a bit more? For example, is this about a missing grant, your bill, a refund or a hold?" : "I want to get this right. Which of these is closest?", {chips:MENU, unsure:true});
}

global.Brain = {answer, norm, card, EXTRA};
})(typeof window !== "undefined" ? window : globalThis);
