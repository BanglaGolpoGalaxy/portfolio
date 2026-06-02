// ----- আন্তর্জাতিকীকরণ -----
const langData = {
  bn: {
    appTitle: "সুপার ক্যালকুলেটর — অল-ইন-ওয়ান টুলস",
    tabs: {
      basic: "🧮 সাধারণ", flower: "🌻 ফুল বাজার", trig: "📐 ত্রিকোণমিতি",
      geometry: "📏 পরিমিতি", profitLoss: "💰 লাভ-ক্ষতি", age: "🎂 বয়স",
      work: "⚒️ সময়-কাজ", land: "🏞️ জমির পরিমাপ", unitLength: "📏 দৈর্ঘ্য",
      unitVolume: "🧴 আয়তন", unitTemp: "🌡️ তাপমাত্রা", weight: "⚖️ ওজন",
      emi: "💰 ইএমআই", bmi: "⚖️ বিএমআই"
    },
    placeholders: {
      totalWeight: "মোট ওজন (কেজি)", bagWeight: "ব্যাগের ওজন (গ্রাম)", wastePerKg: "বর্জ্য (গ্রাম/কেজি)", pricePerKg: "দাম/কেজি (টাকা)",
      angle: "কোণ (ডিগ্রি)", birthDate: "জন্ম তারিখ", height: "উচ্চতা (সেমি)", weight: "ওজন (কেজি)",
      principal: "মূলধন (P)", rate: "বার্ষিক সুদের হার (%)", emiMonthly: "মাসিক কিস্তি (ঐচ্ছিক)", emiMonths: "সময় (মাস)"
    },
    units: {
      length: { m:"মিটার", cm:"সেন্টিমিটার", mm:"মিলিমিটার", km:"কিলোমিটার", in:"ইঞ্চি", ft:"ফুট", yd:"গজ" },
      volume: { l:"লিটার", ml:"মিলিলিটার", m3:"ঘনমিটার", gal:"গ্যালন" },
      weight: { kg:"কেজি", g:"গ্রাম", lb:"পাউন্ড", oz:"আউন্স", t:"টন", mt:"মেট্রিক টন" },
      temp: { c:"সেলসিয়াস", f:"ফারেনহাইট", k:"কেলভিন" },
      land: { shotangsho:"শতাংশ", katha:"কাঠা", bigha:"বিঘা", acre:"একর", sqft:"বর্গফুট", sqm:"বর্গমিটার", sqyd:"বর্গগজ" }
    }
  },
  en: {
    appTitle: "Super Calculator — All-in-One Tools",
    tabs: {
      basic: "🧮 Basic", flower: "🌻 Flower Market", trig: "📐 Trigonometry",
      geometry: "📏 Geometry", profitLoss: "💰 Profit/Loss", age: "🎂 Age",
      work: "⚒️ Work & Time", land: "🏞️ Land Measure", unitLength: "📏 Length",
      unitVolume: "🧴 Volume", unitTemp: "🌡️ Temperature", weight: "⚖️ Weight",
      emi: "💰 EMI", bmi: "⚖️ BMI"
    },
    placeholders: {
      totalWeight: "Total weight (kg)", bagWeight: "Bag weight (gram)", wastePerKg: "Waste (gram/kg)", pricePerKg: "Price per kg (Tk)",
      angle: "Angle (degree)", birthDate: "Date of birth", height: "Height (cm)", weight: "Weight (kg)",
      principal: "Principal (P)", rate: "Annual interest (%)", emiMonthly: "Monthly EMI (optional)", emiMonths: "Time (months)"
    },
    units: {
      length: { m:"Meter", cm:"Centimeter", mm:"Millimeter", km:"Kilometer", in:"Inch", ft:"Feet", yd:"Yard" },
      volume: { l:"Liter", ml:"Milliliter", m3:"Cubic Meter", gal:"Gallon" },
      weight: { kg:"Kilogram", g:"Gram", lb:"Pound", oz:"Ounce", t:"Ton", mt:"Metric Ton" },
      temp: { c:"Celsius", f:"Fahrenheit", k:"Kelvin" },
      land: { shotangsho:"Shotangsho", katha:"Katha", bigha:"Bigha", acre:"Acre", sqft:"Sq. Feet", sqm:"Sq. Meter", sqyd:"Sq. Yard" }
    }
  }
};

let currentLang = "bn", activeTabId = "basic", basicExpr = "", resetNext = false;

// ----- সাধারণ ক্যালকুলেটর ফাংশন -----
function normalizeImplicitMultiply(expr) { return expr.replace(/(\d+|\))(\()/g, '$1*$2'); }
function safeEval(expr) {
  try {
    let normalized = normalizeImplicitMultiply(expr);
    let result = Function('"use strict";return (' + normalized + ')')();
    if (isNaN(result) || !isFinite(result)) throw new Error();
    return result;
  } catch (e) { return null; }
}
function toFraction(d, tol=1e-6) {
  if (isNaN(d) || !isFinite(d)) return d.toString();
  if (Math.abs(d - Math.round(d)) < tol) return Math.round(d).toString();
  let s = d<0 ? -1 : 1, a = Math.abs(d), bestNum=1, bestDen=1, bestDiff=Math.abs(a-1);
  for(let den=1; den<=1000; den++) {
    let num = Math.round(a*den), diff = Math.abs(a - num/den);
    if(diff < bestDiff) { bestDiff=diff; bestNum=num; bestDen=den; if(diff<tol) break; }
  }
  let fn = s*bestNum, fd = bestDen, gcd = (x,y) => y ? gcd(y, x%y) : x, g = gcd(Math.abs(fn), fd);
  fn/=g; fd/=g;
  return fd===1 ? fn.toString() : `${fn}/${fd}`;
}
function updateBasic() {
  const exprEl = document.getElementById('exprDisplay'), resEl = document.getElementById('decimalResult'), fracEl = document.getElementById('fractionResult'), termEl = document.getElementById('termCounter');
  if(!basicExpr.trim()) { exprEl.textContent='0'; resEl.textContent='= 0'; fracEl.textContent='ভগ্নাংশ: —'; termEl.textContent='👉 0'; return; }
  let r = safeEval(basicExpr);
  if(r !== null) {
    let ds = r%1===0 ? r : r.toFixed(8).replace(/\.?0+$/,'');
    resEl.textContent = `= ${ds}`;
    fracEl.textContent = `ভগ্নাংশ: ${toFraction(r)}`;
    let terms = basicExpr.split(/[\+\-\*\/]/).filter(t=>t.trim() && !/^[\(\)\[\]\{\}]+$/.test(t));
    termEl.textContent = `👉 ${terms.length}`;
  } else { resEl.textContent = '= ত্রুটি'; fracEl.textContent = 'ভগ্নাংশ: —'; termEl.textContent = '👉 ?'; }
  exprEl.textContent = basicExpr.replace(/\*/g,'×').replace(/\//g,'÷');
}
function addChar(c) { if(resetNext && /[\d\.]/.test(c)) { basicExpr=''; resetNext=false; } basicExpr += c; updateBasic(); }
function addOp(o) { if(resetNext) resetNext=false; if(basicExpr && !/[\+\-\*\/]$/.test(basicExpr)) { basicExpr+=o; updateBasic(); } }
function clearAll() { basicExpr=''; resetNext=false; updateBasic(); }
function del() { if(!resetNext) { basicExpr=basicExpr.slice(0,-1); updateBasic(); } }
function sqrtFn() { let r = safeEval(basicExpr); if(r!==null && r>=0) { basicExpr=Math.sqrt(r).toString(); resetNext=false; updateBasic(); } else { basicExpr='Error'; updateBasic(); setTimeout(clearAll,1000); } }
function sqFn() { let r = safeEval(basicExpr); if(r!==null) { basicExpr=(r*r).toString(); resetNext=false; updateBasic(); } else { basicExpr='Error'; updateBasic(); setTimeout(clearAll,1000); } }
function pctFn() { let r = safeEval(basicExpr); if(r!==null) { basicExpr=(r/100).toString(); resetNext=false; updateBasic(); } }
function equalFn() { let r = safeEval(basicExpr); if(r!==null) { basicExpr=r.toString(); resetNext=true; updateBasic(); } else document.getElementById('decimalResult').textContent='= ত্রুটি'; }
function generateBasicButtons() {
  const container = document.getElementById('basicButtons');
  container.innerHTML = `<button class="bracket-btn" data-char="(">(</button><button class="bracket-btn" data-char=")">)</button><button class="bracket-btn" data-char="{">{</button><button class="bracket-btn" data-char="}">}</button><button class="clear-btn" id="clearBtn">AC</button><button class="bracket-btn" data-char="[">[</button><button class="bracket-btn" data-char="]">]</button><button class="sqrt-btn" id="sqrtBtn">√</button><button class="square-btn" id="squareBtn">x²</button><button class="del-btn" id="delBtn">⌫</button><button class="num-btn" data-char="7">7</button><button class="num-btn" data-char="8">8</button><button class="num-btn" data-char="9">9</button><button class="percent-btn" id="percentBtn">%</button><button class="op-btn" id="divideBtn">÷</button><button class="num-btn" data-char="4">4</button><button class="num-btn" data-char="5">5</button><button class="num-btn" data-char="6">6</button><div class="large-plus" id="largePlusBtn">+</div><button class="op-btn" id="multiplyBtn">×</button><button class="num-btn" data-char="1">1</button><button class="num-btn" data-char="2">2</button><button class="num-btn" data-char="3">3</button><button class="op-btn" id="minusBtn">-</button><button class="num-btn" data-char="00">00</button><button class="num-btn" data-char="0">0</button><button class="num-btn" data-char=".">.</button><button class="eq-btn" id="equalBtn">=</button>`;
  document.querySelectorAll('#basicButtons .num-btn[data-char], #basicButtons .bracket-btn[data-char]').forEach(b=>b.addEventListener('click',()=>addChar(b.dataset.char)));
  document.getElementById('clearBtn')?.addEventListener('click',clearAll);
  document.getElementById('delBtn')?.addEventListener('click',del);
  document.getElementById('sqrtBtn')?.addEventListener('click',sqrtFn);
  document.getElementById('squareBtn')?.addEventListener('click',sqFn);
  document.getElementById('percentBtn')?.addEventListener('click',pctFn);
  document.getElementById('equalBtn')?.addEventListener('click',equalFn);
  document.getElementById('minusBtn')?.addEventListener('click',()=>addOp('-'));
  document.getElementById('multiplyBtn')?.addEventListener('click',()=>addOp('*'));
  document.getElementById('divideBtn')?.addEventListener('click',()=>addOp('/'));
  document.getElementById('largePlusBtn')?.addEventListener('click',()=>addOp('+'));
}

// ----- সব পেইন HTML ডায়নামিক -----
function buildAllPanes() {
  const container = document.getElementById('panesContainer');
  container.innerHTML = `
    <div id="basicPane" class="tab-pane active-pane"><div class="calc-display"><div class="term-counter" id="termCounter">👉 0</div><div class="expression" id="exprDisplay">0</div><div class="result" id="decimalResult">= 0</div><div class="fraction-result" id="fractionResult">ভগ্নাংশ: —</div></div><div class="buttons" id="basicButtons"></div></div>
    <div id="flowerPane" class="tab-pane"><div class="two-col"><div class="input-group"><label id="flowerTotalLabel">মোট ওজন (কেজি)</label><input type="number" id="flowerTotal" step="any"></div><div class="input-group"><label id="flowerBagLabel">ব্যাগের ওজন (গ্রাম)</label><input type="number" id="flowerBag" step="any"></div><div class="input-group"><label id="flowerWasteLabel">বর্জ্য (গ্রাম/কেজি)</label><input type="number" id="flowerWastePerKg" step="any" value="0"></div><div class="input-group"><label id="flowerPriceLabel">দাম/কেজি (টাকা)</label><input type="number" id="flowerPrice" step="any"></div></div><button class="calc-submit" id="flowerBtn">হিসাব</button><div id="flowerResult" class="result-grid"></div><button class="clear-submit" onclick="clearTab('flower')">🗑️ ক্লিয়ার</button></div>
    <div id="trigPane" class="tab-pane"><div class="input-group"><label id="angleLabel">কোণ (ডিগ্রি)</label><input type="number" id="angleDeg" step="any"></div><div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px;"><button class="calc-submit" id="sinBtn">sin</button><button class="calc-submit" id="cosBtn">cos</button><button class="calc-submit" id="tanBtn">tan</button><button class="calc-submit" id="asinBtn">sin⁻¹</button><button class="calc-submit" id="acosBtn">cos⁻¹</button><button class="calc-submit" id="atanBtn">tan⁻¹</button></div><div id="trigResult" class="result-grid"></div><button class="clear-submit" onclick="clearTab('trig')">🗑️ ক্লিয়ার</button></div>
    <div id="geometryPane" class="tab-pane"><div class="input-group"><label id="shapeLabel">আকৃতি</label><select id="shape"><option value="square">বর্গ</option><option value="rectangle">আয়তক্ষেত্র</option><option value="rhombus">রম্বস</option><option value="parallelogram">সামান্তরিক</option><option value="trapezium">ট্রাপিজিয়াম</option><option value="irregular_quad">অসম চতুর্ভুজ</option><option value="circle">বৃত্ত</option><option value="sector">বৃত্তকলা</option><option value="cube">ঘনক</option><option value="cuboid">আয়তঘন</option><option value="sphere">গোলক</option><option value="cone">শঙ্কু</option><option value="frustum">ফ্রাস্টাম</option><option value="cylinder">সিলিন্ডার</option><option value="right_triangle">সমকোণী ত্রিভুজ</option><option value="equilateral_triangle">সমবাহু ত্রিভুজ</option><option value="isosceles_triangle">সমদ্বিবাহু ত্রিভুজ</option><option value="scalene_triangle">বিষমবাহু ত্রিভুজ</option></select></div><div id="shapeInputs" class="two-col"></div><button class="calc-submit" id="calcShapeBtn">হিসাব করুন</button><div id="geometryResult" class="result-grid"></div><button class="clear-submit" onclick="clearTab('geometry')">🗑️ ক্লিয়ার</button></div>
    <div id="profitLossPane" class="tab-pane"><div class="two-col"><div class="input-group"><label id="cpLabel">ক্রয়মূল্য (CP)</label><input type="number" id="cp" step="any"></div><div class="input-group"><label id="spLabel">বিক্রয়মূল্য (SP)</label><input type="number" id="sp" step="any"></div></div><button class="calc-submit" id="simplePLBtn">লাভ/ক্ষতি নির্ণয়</button><div id="simplePLResult" class="result-grid"></div><hr><div class="two-col"><div class="input-group"><label id="offerT1Label">অফার: T1 (টাকা)</label><input type="number" id="offerT1" step="any"></div><div class="input-group"><label id="offerQ1Label">Q1 (পরিমাণ)</label><input type="number" id="offerQ1" step="any"></div><div class="input-group"><label id="offerT2Label">T2 (টাকা)</label><input type="number" id="offerT2" step="any"></div><div class="input-group"><label id="offerQ2Label">Q2 (পরিমাণ)</label><input type="number" id="offerQ2" step="any"></div></div><button class="calc-submit" id="offerPLBtn">অফার লাভ/ক্ষতি</button><div id="offerPLResult" class="result-grid"></div><button class="clear-submit" onclick="clearTab('profitLoss')">🗑️ ক্লিয়ার</button></div>
    <div id="agePane" class="tab-pane"><div class="input-group"><label id="birthLabel">জন্ম তারিখ</label><input type="date" id="birthDate"></div><button class="calc-submit" id="ageBtn">বয়স নির্ণয়</button><div id="ageResult" class="result-grid"></div><button class="clear-submit" onclick="clearTab('age')">🗑️ ক্লিয়ার</button></div>
    <div id="workPane" class="tab-pane"><div class="two-col"><div class="input-group"><label>লোক (M1)</label><input type="number" id="workM1" step="any"></div><div class="input-group"><label>দিন (D1)</label><input type="number" id="workD1" step="any"></div><div class="input-group"><label>কাজ (W1)</label><input type="number" id="workW1" step="any"></div></div><hr><div class="two-col"><div class="input-group"><label>লোক (M2)</label><input type="number" id="workM2" step="any"></div><div class="input-group"><label>দিন (D2)</label><input type="number" id="workD2" step="any"></div><div class="input-group"><label>কাজ (W2)</label><input type="number" id="workW2" step="any"></div></div><button class="calc-submit" id="workBtn">অজানা নির্ণয়</button><div id="workResult" class="result-grid"></div><button class="clear-submit" onclick="clearTab('work')">🗑️ ক্লিয়ার</button></div>
    <div id="landPane" class="tab-pane"><div class="two-col"><div class="input-group"><label>মান</label><input type="number" id="landValue" step="any"></div><div class="input-group"><label>একক</label><select id="landUnit"><option value="shotangsho">শতাংশ</option><option value="katha">কাঠা</option><option value="bigha">বিঘা</option><option value="acre">একর</option><option value="sqft">বর্গফুট</option><option value="sqm">বর্গমিটার</option><option value="sqyd">বর্গগজ</option></select></div></div><button class="calc-submit" id="convertLandBtn">কনভার্ট</button><div id="landResults" class="result-grid"></div><button class="clear-submit" onclick="clearTab('land')">🗑️ ক্লিয়ার</button></div>
    <div id="unitLengthPane" class="tab-pane"><div class="two-col"><div class="input-group"><label>মান</label><input type="number" id="lengthValue" step="any"></div><div class="input-group"><label>একক</label><select id="lengthUnit"><option value="m">মিটার</option><option value="cm">সেমি</option><option value="mm">মিমি</option><option value="km">কিমি</option><option value="in">ইঞ্চি</option><option value="ft">ফুট</option><option value="yd">গজ</option></select></div></div><button class="calc-submit" id="convertLengthBtn">কনভার্ট</button><div id="lengthResults" class="result-grid"></div><button class="clear-submit" onclick="clearTab('unitLength')">🗑️ ক্লিয়ার</button></div>
    <div id="unitVolumePane" class="tab-pane"><div class="two-col"><div class="input-group"><label>মান</label><input type="number" id="volumeValue" step="any"></div><div class="input-group"><label>একক</label><select id="volumeUnit"><option value="l">লিটার</option><option value="ml">মিলিলিটার</option><option value="m3">ঘনমিটার</option><option value="gal">গ্যালন</option></select></div></div><button class="calc-submit" id="convertVolumeBtn">কনভার্ট</button><div id="volumeResults" class="result-grid"></div><button class="clear-submit" onclick="clearTab('unitVolume')">🗑️ ক্লিয়ার</button></div>
    <div id="unitTempPane" class="tab-pane"><div class="two-col"><div class="input-group"><label>মান</label><input type="number" id="tempValue" step="any"></div><div class="input-group"><label>একক</label><select id="tempUnit"><option value="c">সেলসিয়াস</option><option value="f">ফারেনহাইট</option><option value="k">কেলভিন</option></select></div></div><button class="calc-submit" id="convertTempBtn">কনভার্ট</button><div id="tempResults" class="result-grid"></div><button class="clear-submit" onclick="clearTab('unitTemp')">🗑️ ক্লিয়ার</button></div>
    <div id="weightPane" class="tab-pane"><div class="two-col"><div class="input-group"><label>মান</label><input type="number" id="weightVal" step="any"></div><div class="input-group"><label>একক</label><select id="weightUnit"><option value="kg">কেজি</option><option value="g">গ্রাম</option><option value="lb">পাউন্ড</option><option value="oz">আউন্স</option><option value="t">টন</option><option value="mt">মেট্রিক টন</option></select></div></div><button class="calc-submit" id="convertWeightBtn">কনভার্ট</button><div id="weightResults" class="result-grid"></div><button class="clear-submit" onclick="clearTab('weight')">🗑️ ক্লিয়ার</button></div>
    <div id="emiPane" class="tab-pane"><div class="two-col"><div class="input-group"><label>সুদের ধরন</label><select id="emiType"><option value="compound">চক্রবৃদ্ধি সুদ</option><option value="simple">সরল সুদ</option></select></div><div class="input-group"><label>মূলধন (P)</label><input type="number" id="emiPrincipal" step="any"></div><div class="input-group"><label>বার্ষিক সুদের হার (R%)</label><input type="number" id="emiRate" step="any"></div><div class="input-group"><label>মাসিক কিস্তি (M) — ঐচ্ছিক</label><input type="number" id="emiMonthly" step="any"></div><div class="input-group"><label>সময় (N মাস) — ঐচ্ছিক</label><input type="number" id="emiMonths" step="any"></div></div><button class="calc-submit" id="emiBtn">গণনা</button><div id="emiResult" class="result-grid"></div><button class="clear-submit" onclick="clearTab('emi')">🗑️ ক্লিয়ার</button></div>
    <div id="bmiPane" class="tab-pane"><div class="two-col"><div class="input-group"><label>উচ্চতা (সেমি)</label><input type="number" id="bmiHeight" step="any"></div><div class="input-group"><label>ওজন (কেজি)</label><input type="number" id="bmiWeight" step="any"></div></div><button class="calc-submit" id="bmiBtn">BMI</button><div id="bmiResult" class="result-grid"></div><button class="clear-submit" onclick="clearTab('bmi')">🗑️ ক্লিয়ার</button></div>
  `;
}

// ----- ট্যাব ও ভাষা -----
function initTabs() {
  const tabContainer = document.getElementById('tabsContainer'), panes = document.querySelectorAll('.tab-pane'), tabKeys = ['basic','flower','trig','geometry','profitLoss','age','work','land','unitLength','unitVolume','unitTemp','weight','emi','bmi'];
  tabContainer.innerHTML = '';
  tabKeys.forEach(key => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    if(key === 'basic') btn.classList.add('active');
    btn.setAttribute('data-tab', key);
    btn.innerText = langData[currentLang].tabs[key];
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      panes.forEach(p=>p.classList.remove('active-pane'));
      document.getElementById(key+'Pane').classList.add('active-pane');
      activeTabId = key;
    });
    tabContainer.appendChild(btn);
  });
}
function updateLanguageUI() {
  const L = langData[currentLang];
  document.getElementById('appTitle').innerText = L.appTitle;
  document.querySelectorAll('.tab-btn').forEach(btn => { const key = btn.getAttribute('data-tab'); if(L.tabs[key]) btn.innerText = L.tabs[key]; });
  const ph = L.placeholders;
  if(document.getElementById('flowerTotalLabel')) document.getElementById('flowerTotalLabel').innerText = ph.totalWeight;
  if(document.getElementById('flowerBagLabel')) document.getElementById('flowerBagLabel').innerText = ph.bagWeight;
  if(document.getElementById('flowerWasteLabel')) document.getElementById('flowerWasteLabel').innerText = ph.wastePerKg;
  if(document.getElementById('flowerPriceLabel')) document.getElementById('flowerPriceLabel').innerText = ph.pricePerKg;
  if(document.getElementById('angleLabel')) document.getElementById('angleLabel').innerText = ph.angle;
  if(document.getElementById('birthLabel')) document.getElementById('birthLabel').innerText = ph.birthDate;
  if(document.getElementById('cpLabel')) document.getElementById('cpLabel').innerText = "ক্রয়মূল্য (CP)";
  if(document.getElementById('spLabel')) document.getElementById('spLabel').innerText = "বিক্রয়মূল্য (SP)";
  if(document.getElementById('offerT1Label')) document.getElementById('offerT1Label').innerText = "অফার: T1 (টাকা)";
  if(document.getElementById('offerQ1Label')) document.getElementById('offerQ1Label').innerText = "Q1 (পরিমাণ)";
  if(document.getElementById('offerT2Label')) document.getElementById('offerT2Label').innerText = "T2 (টাকা)";
  if(document.getElementById('offerQ2Label')) document.getElementById('offerQ2Label').innerText = "Q2 (পরিমাণ)";
  // ইউনিট সিলেক্টর অপশন আপডেট (দৈর্ঘ্য, আয়তন, ওজন, তাপমাত্রা, জমি)
  const lengthSelect = document.getElementById('lengthUnit');
  if(lengthSelect) {
    const opts = lengthSelect.options;
    for(let i=0;i<opts.length;i++) {
      let val = opts[i].value;
      opts[i].text = L.units.length[val] || val;
    }
  }
  const volumeSelect = document.getElementById('volumeUnit');
  if(volumeSelect) for(let i=0;i<volumeSelect.options.length;i++) volumeSelect.options[i].text = L.units.volume[volumeSelect.options[i].value];
  const weightSelect = document.getElementById('weightUnit');
  if(weightSelect) for(let i=0;i<weightSelect.options.length;i++) weightSelect.options[i].text = L.units.weight[weightSelect.options[i].value];
  const tempSelect = document.getElementById('tempUnit');
  if(tempSelect) for(let i=0;i<tempSelect.options.length;i++) tempSelect.options[i].text = L.units.temp[tempSelect.options[i].value];
  const landSelect = document.getElementById('landUnit');
  if(landSelect) for(let i=0;i<landSelect.options.length;i++) landSelect.options[i].text = L.units.land[landSelect.options[i].value];
}
function setLanguage(lang) { currentLang = lang; updateLanguageUI(); }

// ----- ক্লিয়ার ট্যাব -----
window.clearTab = function(tabId) {
  const pane = document.getElementById(tabId+'Pane');
  if(!pane) return;
  pane.querySelectorAll('input, select').forEach(inp=>inp.value='');
  pane.querySelectorAll('.result-grid').forEach(grid=>grid.innerHTML='');
};

// ----- পরিমিতি শেপ ফিল্ড ও জেনারেটর -----
const shapeFields = {
  square: [{id:'sqSide', label:'বাহু (a)'},{id:'sqArea', label:'ক্ষেত্রফল (A)'},{id:'sqPeri', label:'পরিসীমা (P)'}],
  rectangle: [{id:'recLen', label:'দৈর্ঘ্য (l)'},{id:'recWid', label:'প্রস্থ (w)'},{id:'recArea', label:'ক্ষেত্রফল (A)'},{id:'recPeri', label:'পরিসীমা (P)'}],
  rhombus: [{id:'rhoD1', label:'কর্ণ ১ (d1)'},{id:'rhoD2', label:'কর্ণ ২ (d2)'}],
  parallelogram: [{id:'paraBase', label:'ভূমি (b)'},{id:'paraHt', label:'উচ্চতা (h)'},{id:'paraSide', label:'বাহু (a)'}],
  trapezium: [{id:'trapA', label:'সমান্তরাল বাহু ১ (a)'},{id:'trapB', label:'সমান্তরাল বাহু ২ (b)'},{id:'trapH', label:'উচ্চতা (h)'}],
  irregular_quad: [{id:'irrA', label:'বাহু a'},{id:'irrB', label:'বাহু b'},{id:'irrC', label:'বাহু c'},{id:'irrD', label:'বাহু d'},{id:'irrDiag', label:'কর্ণ'}],
  circle: [{id:'cirRad', label:'ব্যাসার্ধ (r)'}],
  sector: [{id:'secRad', label:'ব্যাসার্ধ (r)'},{id:'secAngle', label:'কেন্দ্রীয় কোণ (°)'}],
  cube: [{id:'cubeSide', label:'বাহু (a)'}],
  cuboid: [{id:'cubLen', label:'দৈর্ঘ্য (l)'},{id:'cubWid', label:'প্রস্থ (w)'},{id:'cubHt', label:'উচ্চতা (h)'}],
  sphere: [{id:'sphRad', label:'ব্যাসার্ধ (r)'}],
  cone: [{id:'coneRad', label:'ব্যাসার্ধ (r)'},{id:'coneHt', label:'উচ্চতা (h)'}],
  frustum: [{id:'frusR', label:'বড় ব্যাসার্ধ (R)'},{id:'frusr', label:'ছোট ব্যাসার্ধ (r)'},{id:'frusH', label:'উচ্চতা (h)'}],
  cylinder: [{id:'cylRad', label:'ব্যাসার্ধ (r)'},{id:'cylHt', label:'উচ্চতা (h)'}],
  right_triangle: [{id:'triA', label:'লম্ব (a)'},{id:'triB', label:'ভূমি (b)'}],
  equilateral_triangle: [{id:'eqSide', label:'বাহু (a)'}],
  isosceles_triangle: [{id:'leg', label:'সমান বাহু (a)'},{id:'base', label:'ভূমি (b)'}],
  scalene_triangle: [{id:'sideA', label:'বাহু a'},{id:'sideB', label:'বাহু b'},{id:'sideC', label:'বাহু c'}]
};
function computeGeometry(shape, vals) {
  let result = {};
  // বর্গ
  if(shape === 'square') {
    let a = vals.sqSide;
    if(a) { let A=a*a, P=4*a; result={বাহু:a, ক্ষেত্রফল:A.toFixed(4), পরিসীমা:P.toFixed(4)}; }
    else if(vals.sqArea) { let A=vals.sqArea, a=Math.sqrt(A); result={বাহু:a.toFixed(4), ক্ষেত্রফল:A.toFixed(4), পরিসীমা:(4*a).toFixed(4)}; }
    else if(vals.sqPeri) { let P=vals.sqPeri, a=P/4; result={বাহু:a.toFixed(4), ক্ষেত্রফল:(a*a).toFixed(4), পরিসীমা:P.toFixed(4)}; }
    else result = { ত্রুটি:"একটি মান দিন (বাহু, ক্ষেত্রফল বা পরিসীমা)" };
  }
  // আয়তক্ষেত্র (বিস্তারিত)
  else if(shape === 'rectangle') {
    let l=vals.recLen, w=vals.recWid;
    if(l&&w) result={দৈর্ঘ্য:l, প্রস্থ:w, ক্ষেত্রফল:(l*w).toFixed(4), পরিসীমা:(2*(l+w)).toFixed(4)};
    else if(l&&vals.recArea) { let A=vals.recArea, w=A/l; result={দৈর্ঘ্য:l, প্রস্থ:w.toFixed(4), ক্ষেত্রফল:A.toFixed(4), পরিসীমা:(2*(l+w)).toFixed(4)}; }
    else if(w&&vals.recArea) { let A=vals.recArea, l=A/w; result={দৈর্ঘ্য:l.toFixed(4), প্রস্থ:w, ক্ষেত্রফল:A.toFixed(4), পরিসীমা:(2*(l+w)).toFixed(4)}; }
    else if(l&&vals.recPeri) { let P=vals.recPeri, w=P/2-l; if(w>0) result={দৈর্ঘ্য:l, প্রস্থ:w.toFixed(4), ক্ষেত্রফল:(l*w).toFixed(4), পরিসীমা:P.toFixed(4)}; else result={ত্রুটি:"পরিসীমা ও দৈর্ঘ্য সঠিক নয়"}; }
    else if(w&&vals.recPeri) { let P=vals.recPeri, l=P/2-w; if(l>0) result={দৈর্ঘ্য:l.toFixed(4), প্রস্থ:w, ক্ষেত্রফল:(l*w).toFixed(4), পরিসীমা:P.toFixed(4)}; else result={ত্রুটি:"পরিসীমা ও প্রস্থ সঠিক নয়"}; }
    else result={ত্রুটি:"দৈর্ঘ্য+প্রস্থ বা ক্ষেত্রফল/পরিসীমা সহ যেকোনো দুটি দিন"};
  }
  // বৃত্ত
  else if(shape === 'circle') {
    let r=vals.cirRad;
    if(r) result={ব্যাসার্ধ:r, ব্যাস:(2*r).toFixed(4), পরিধি:(2*Math.PI*r).toFixed(4), ক্ষেত্রফল:(Math.PI*r*r).toFixed(4)};
    else result={ত্রুটি:"ব্যাসার্ধ দিন"};
  }
  // গোলক
  else if(shape === 'sphere') {
    let r=vals.sphRad;
    if(r) result={ব্যাসার্ধ:r, আয়তন:((4/3)*Math.PI*r**3).toFixed(4), পৃষ্ঠতল:(4*Math.PI*r*r).toFixed(4)};
    else result={ত্রুটি:"ব্যাসার্ধ দিন"};
  }
  // ঘনক
  else if(shape === 'cube') {
    let a=vals.cubeSide;
    if(a) result={বাহু:a, আয়তন:(a**3).toFixed(4), সমগ্রতল:(6*a*a).toFixed(4), পার্শ্বতল:(4*a*a).toFixed(4), কর্ণ:(a*Math.sqrt(3)).toFixed(4)};
    else result={ত্রুটি:"বাহু দিন"};
  }
  // সমবাহু ত্রিভুজ
  else if(shape === 'equilateral_triangle') {
    let a=vals.eqSide;
    if(a) { let area=(Math.sqrt(3)/4)*a*a, h=(Math.sqrt(3)/2)*a; result={বাহু:a, ক্ষেত্রফল:area.toFixed(4), পরিসীমা:(3*a).toFixed(4), উচ্চতা:h.toFixed(4)}; }
    else result={ত্রুটি:"বাহু দিন"};
  }
  // অন্যান্য আকৃতির জন্য বেসিক ফলাফল (সম্পূর্ণ এখানে দেওয়া যাচ্ছে না, তবে ব্যবহারকারী পরে প্রয়োজনে বাড়াতে পারেন)
  else { result = { তথ্য:"এই আকৃতির জন্য শুধু মৌলিক গণনা সমর্থিত" }; }
  return result;
}
function updateShapeFields() {
  const shape = document.getElementById('shape').value, container = document.getElementById('shapeInputs');
  container.innerHTML = '';
  (shapeFields[shape] || []).forEach(f=>{
    const div = document.createElement('div'); div.className='input-group';
    div.innerHTML = `<label>${f.label}</label><input type="number" id="${f.id}" step="any">`;
    container.appendChild(div);
  });
}

// ----- ত্রিকোণমিতি: ঠিক করা ইনভার্স -----
function trigFraction(deg, func) {
  const exactMap = { sin0:0, sin30:0.5, sin45:Math.sqrt(2)/2, sin60:Math.sqrt(3)/2, sin90:1, cos0:1, cos30:Math.sqrt(3)/2, cos45:Math.sqrt(2)/2, cos60:0.5, cos90:0, tan0:0, tan30:1/Math.sqrt(3), tan45:1, tan60:Math.sqrt(3), tan90:Infinity };
  let key = func+Math.round(deg);
  let exact = exactMap[key];
  if(exact !== undefined && isFinite(exact)) {
    if(func==='tan' && deg===90) return "∞";
    if(func==='sin' && deg===30) return "1/2";
    if(func==='sin' && deg===45) return "√2/2";
    if(func==='sin' && deg===60) return "√3/2";
    if(func==='cos' && deg===30) return "√3/2";
    if(func==='cos' && deg===45) return "√2/2";
    if(func==='cos' && deg===60) return "1/2";
    if(func==='tan' && deg===30) return "1/√3";
    if(func==='tan' && deg===45) return "1";
    if(func==='tan' && deg===60) return "√3";
    return toFraction(exact);
  }
  return null;
}

// ----- সব ইভেন্ট লিসেনার -----
function attachEventListeners() {
  // ফুল বাজার
  document.getElementById('flowerBtn')?.addEventListener('click',()=>{
    let total=parseFloat(document.getElementById('flowerTotal').value)||0, bagGram=parseFloat(document.getElementById('flowerBag').value)||0, wasteGm=parseFloat(document.getElementById('flowerWastePerKg').value)||0, price=parseFloat(document.getElementById('flowerPrice').value)||0;
    let bagKg=bagGram/1000, totalWasteKg = (total*wasteGm/1000);
    let netWeight = total - bagKg - totalWasteKg;
    if(netWeight<0) netWeight=0;
    let totalPrice = netWeight * price;
    let wastedTotal = bagKg + totalWasteKg;
    document.getElementById('flowerResult').innerHTML = `<div class="result-card"><span>নিট ওজন</span>${netWeight.toFixed(2)} কেজি</div><div class="result-card"><span>মোট মূল্য</span>${totalPrice.toFixed(2)} টাকা</div><div class="result-card"><span>বাদ গেল (ব্যাগ+বর্জ্য)</span>${wastedTotal.toFixed(2)} কেজি</div>`;
  });
  // ত্রিকোণমিতি
  const trigFns = { sin:d=>Math.sin(d*Math.PI/180), cos:d=>Math.cos(d*Math.PI/180), tan:d=>Math.tan(d*Math.PI/180), asin:v=>Math.asin(v)*180/Math.PI, acos:v=>Math.acos(v)*180/Math.PI, atan:v=>Math.atan(v)*180/Math.PI };
  ['sin','cos','tan','asin','acos','atan'].forEach(fn=>{
    document.getElementById(fn+'Btn')?.addEventListener('click',()=>{
      let val = parseFloat(document.getElementById('angleDeg').value)||0, res, fracStr;
      if(fn.startsWith('a')) {
        res = trigFns[fn](val);
        fracStr = toFraction(res);
      } else {
        res = trigFns[fn](val);
        let exact = trigFraction(val, fn);
        fracStr = exact !== null ? exact : toFraction(res);
      }
      document.getElementById('trigResult').innerHTML = `<div class="result-card"><span>${fn}</span>${res.toFixed(6)}</div><div class="result-card"><span>ভগ্নাংশ</span>${fracStr}</div>`;
    });
  });
  // পরিমিতি
  document.getElementById('shape')?.addEventListener('change', updateShapeFields);
  updateShapeFields();
  document.getElementById('calcShapeBtn')?.addEventListener('click',()=>{
    const shape = document.getElementById('shape').value;
    let vals = {};
    document.querySelectorAll('#shapeInputs input').forEach(inp=>vals[inp.id]=parseFloat(inp.value)||0);
    let resObj = computeGeometry(shape, vals);
    const grid = document.getElementById('geometryResult');
    if(Object.keys(resObj).length===0 || resObj.ত্রুটি) grid.innerHTML=`<div class="result-card">${resObj.ত্রুটি || 'গণনা সম্ভব নয়'}</div>`;
    else grid.innerHTML = Object.entries(resObj).map(([k,v])=>`<div class="result-card"><span>${k}</span>${v}</div>`).join('');
  });
  // লাভ-ক্ষতি
  document.getElementById('simplePLBtn')?.addEventListener('click',()=>{
    let cp=parseFloat(document.getElementById('cp').value)||0, sp=parseFloat(document.getElementById('sp').value)||0, diff=sp-cp, pct=(diff/cp)*100;
    let text = diff>=0 ? `লাভ: ${diff.toFixed(2)} টাকা` : `ক্ষতি: ${Math.abs(diff).toFixed(2)} টাকা`;
    document.getElementById('simplePLResult').innerHTML = `<div class="result-card"><span>ফলাফল</span>${text}</div><div class="result-card"><span>শতকরা</span>${Math.abs(pct).toFixed(2)}%</div>`;
  });
  document.getElementById('offerPLBtn')?.addEventListener('click',()=>{
    let t1=parseFloat(document.getElementById('offerT1').value)||0, q1=parseFloat(document.getElementById('offerQ1').value)||0, t2=parseFloat(document.getElementById('offerT2').value)||0, q2=parseFloat(document.getElementById('offerQ2').value)||0;
    if(!q1||!q2) return;
    let cpPer=t1/q1, spPer=t2/q2, totalCP=cpPer*q2, totalSP=t2, diff=totalSP-totalCP, pct=(diff/totalCP)*100;
    let text = diff>=0 ? `লাভ: ${diff.toFixed(2)} টাকা` : `ক্ষতি: ${Math.abs(diff).toFixed(2)} টাকা`;
    document.getElementById('offerPLResult').innerHTML = `<div class="result-card"><span>ফলাফল</span>${text}</div><div class="result-card"><span>শতকরা</span>${pct.toFixed(2)}%</div>`;
  });
  // বয়স
  document.getElementById('ageBtn')?.addEventListener('click',()=>{
    let birth = document.getElementById('birthDate').value;
    if(!birth) return;
    let now=new Date(), bd=new Date(birth);
    let years=now.getFullYear()-bd.getFullYear(), months=now.getMonth()-bd.getMonth(), days=now.getDate()-bd.getDate();
    if(days<0){ months--; days+=new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if(months<0){ years--; months+=12; }
    document.getElementById('ageResult').innerHTML=`<div class="result-card"><span>বয়স</span>${years} বছর ${months} মাস ${days} দিন</div>`;
  });
  // সময়-কাজ
  document.getElementById('workBtn')?.addEventListener('click',()=>{
    let m1=parseFloat(document.getElementById('workM1').value)||0, d1=parseFloat(document.getElementById('workD1').value)||0, w1=parseFloat(document.getElementById('workW1').value)||1;
    let m2=parseFloat(document.getElementById('workM2').value)||0, d2=parseFloat(document.getElementById('workD2').value)||0, w2=parseFloat(document.getElementById('workW2').value)||0;
    if(!m1||!d1) return;
    let unit=(m1*d1)/w1;
    if(m2&&d2) document.getElementById('workResult').innerHTML=`<div class="result-card"><span>W2</span>${((m2*d2)/unit).toFixed(2)}</div>`;
    else if(m2&&w2) document.getElementById('workResult').innerHTML=`<div class="result-card"><span>D2</span>${((unit*w2)/m2).toFixed(2)} দিন</div>`;
    else if(d2&&w2) document.getElementById('workResult').innerHTML=`<div class="result-card"><span>M2</span>${((unit*w2)/d2).toFixed(2)} লোক</div>`;
    else document.getElementById('workResult').innerHTML='<div class="result-card">M2,D2,W2 এর যেকোনো দুটি দিন</div>';
  });
  // জমি কনভার্টার
  const landUnits={shotangsho:435.6, katha:720, bigha:14400, acre:43560, sqft:1, sqm:10.764, sqyd:9};
  document.getElementById('convertLandBtn')?.addEventListener('click',()=>{
    let val=parseFloat(document.getElementById('landValue').value)||0, from=document.getElementById('landUnit').value, sqft=val*landUnits[from], L=langData[currentLang].units.land;
    let html='';
    for(let [unit,factor] of Object.entries(landUnits)) html+=`<div class="result-card"><span>${L[unit]||unit}</span>${(sqft/factor).toFixed(4)}</div>`;
    document.getElementById('landResults').innerHTML=html;
  });
  // দৈর্ঘ্য কনভার্টার (ইউনিট নাম সম্পূর্ণ শব্দ)
  const lengthFactors={m:1,cm:0.01,mm:0.001,km:1000,in:0.0254,ft:0.3048,yd:0.9144};
  const volumeFactors={l:1,ml:0.001,m3:1000,gal:3.78541};
  const weightFactors={kg:1,g:0.001,lb:0.453592,oz:0.0283495,t:1000,mt:1000};
  function convertUnit(factors,val,from){ let base=val*factors[from], res={}; for(let k in factors) res[k]=(base/factors[k]).toFixed(4); return res; }
  document.getElementById('convertLengthBtn')?.addEventListener('click',()=>{
    let val=parseFloat(document.getElementById('lengthValue').value)||0, from=document.getElementById('lengthUnit').value, res=convertUnit(lengthFactors,val,from), L=langData[currentLang].units.length, html='';
    for(let [k,v] of Object.entries(res)) html+=`<div class="result-card"><span>${L[k]||k}</span>${v}</div>`;
    document.getElementById('lengthResults').innerHTML=html;
  });
  document.getElementById('convertVolumeBtn')?.addEventListener('click',()=>{
    let val=parseFloat(document.getElementById('volumeValue').value)||0, from=document.getElementById('volumeUnit').value, res=convertUnit(volumeFactors,val,from), L=langData[currentLang].units.volume, html='';
    for(let [k,v] of Object.entries(res)) html+=`<div class="result-card"><span>${L[k]||k}</span>${v}</div>`;
    document.getElementById('volumeResults').innerHTML=html;
  });
  document.getElementById('convertWeightBtn')?.addEventListener('click',()=>{
    let val=parseFloat(document.getElementById('weightVal').value)||0, from=document.getElementById('weightUnit').value, res=convertUnit(weightFactors,val,from), L=langData[currentLang].units.weight, html='';
    for(let [k,v] of Object.entries(res)) html+=`<div class="result-card"><span>${L[k]||k}</span>${v}</div>`;
    document.getElementById('weightResults').innerHTML=html;
  });
  document.getElementById('convertTempBtn')?.addEventListener('click',()=>{
    let val=parseFloat(document.getElementById('tempValue').value)||0, from=document.getElementById('tempUnit').value;
    let c = from==='f'?(val-32)*5/9 : from==='k'?val-273.15:val, f=c*9/5+32, k=c+273.15, L=langData[currentLang].units.temp;
    document.getElementById('tempResults').innerHTML=`<div class="result-card"><span>${L.c}</span>${c.toFixed(2)}</div><div class="result-card"><span>${L.f}</span>${f.toFixed(2)}</div><div class="result-card"><span>${L.k}</span>${k.toFixed(2)}</div>`;
  });
  // ইএমআই
  function emiCompound(P,R,N){ if(R===0) return P/N; let r=R/1200; return P*r*Math.pow(1+r,N)/(Math.pow(1+r,N)-1); }
  document.getElementById('emiBtn')?.addEventListener('click',()=>{
    let type=document.getElementById('emiType').value, P=parseFloat(document.getElementById('emiPrincipal').value)||0, R=parseFloat(document.getElementById('emiRate').value)||0, M=parseFloat(document.getElementById('emiMonthly').value)||0, N=parseFloat(document.getElementById('emiMonths').value)||0;
    if(type==='compound' && P&&R&&N){ let emi=emiCompound(P,R,N), total=emi*N, interest=total-P; document.getElementById('emiResult').innerHTML=`<div class="result-card"><span>মাসিক কিস্তি</span>${emi.toFixed(2)}</div><div class="result-card"><span>মোট পরিশোধ</span>${total.toFixed(2)}</div><div class="result-card"><span>সুদ</span>${interest.toFixed(2)}</div>`; }
    else if(type==='simple' && P&&R&&N){ let totalInt=P*(R/100)*(N/12), total=P+totalInt, emi=total/N; document.getElementById('emiResult').innerHTML=`<div class="result-card"><span>মাসিক কিস্তি</span>${emi.toFixed(2)}</div><div class="result-card"><span>মোট পরিশোধ</span>${total.toFixed(2)}</div><div class="result-card"><span>সুদ</span>${totalInt.toFixed(2)}</div>`; }
    else document.getElementById('emiResult').innerHTML='<div class="result-card">P, R, N দিন</div>';
  });
  // বিএমআই
  document.getElementById('bmiBtn')?.addEventListener('click',()=>{
    let h=parseFloat(document.getElementById('bmiHeight').value)/100||0, w=parseFloat(document.getElementById('bmiWeight').value)||0;
    if(!h||!w) return;
    let bmi=w/(h*h), cat=bmi<18.5?'কম ওজন':bmi<25?'স্বাভাবিক':bmi<30?'অতিরিক্ত ওজন':'স্থূল';
    document.getElementById('bmiResult').innerHTML=`<div class="result-card"><span>BMI</span>${bmi.toFixed(1)}</div><div class="result-card"><span>শ্রেণি</span>${cat}</div>`;
  });
}

// ----- মোডাল -----
function initModal() {
  const modal = document.getElementById('contactModal');
  document.getElementById('openContactBtn')?.addEventListener('click',()=>modal.classList.add('show'));
  document.getElementById('closeModalBtn')?.addEventListener('click',()=>modal.classList.remove('show'));
  window.addEventListener('click',(e)=>{ if(e.target===modal) modal.classList.remove('show'); });
}

// ----- শুরু করুন -----
window.addEventListener('DOMContentLoaded',()=>{
  buildAllPanes();
  generateBasicButtons();
  initTabs();
  setLanguage('bn');
  attachEventListeners();
  initModal();
  updateBasic();
  document.getElementById('langBn')?.addEventListener('click',()=>{ setLanguage('bn'); document.getElementById('langBn').classList.add('active'); document.getElementById('langEn').classList.remove('active'); });
  document.getElementById('langEn')?.addEventListener('click',()=>{ setLanguage('en'); document.getElementById('langEn').classList.add('active'); document.getElementById('langBn').classList.remove('active'); });
});