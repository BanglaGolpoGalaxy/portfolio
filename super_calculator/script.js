// ========== LANGUAGE CONTROL ==========
let currentLang = localStorage.getItem('sc_lang') || 'en';
function setLang(lang) {
    currentLang = lang;
    document.body.setAttribute('data-lang', lang);
    localStorage.setItem('sc_lang', lang);
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
}
document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
setLang(currentLang);

// ========== TAB SWITCHING ==========
const tabs = document.querySelectorAll('.tab-btn');
const panes = document.querySelectorAll('.tab-pane');
tabs.forEach(btn => {
    btn.addEventListener('click', () => {
        tabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        panes.forEach(p => p.classList.remove('active-pane'));
        document.getElementById(btn.dataset.tab).classList.add('active-pane');
    });
});

// ========== BASIC CALCULATOR (Full Logic) ==========
let expr = '', resetNext = false;
const exprEl = document.getElementById('exprDisplay'), resEl = document.getElementById('decimalResult');
const fracEl = document.getElementById('fractionResult'), termEl = document.getElementById('termCounter');

function normalize(e) {
    return e.replace(/(\d)\(/g, '$1*(')
           .replace(/\)(\d)/g, ')*$1')
           .replace(/\)\(/g, ')*(')
           .replace(/÷/g, '/')
           .replace(/×/g, '*');
}
function safeEval(e) {
    try { let r = Function('"use strict";return (' + normalize(e) + ')')(); if(isNaN(r)||!isFinite(r)) throw new Error(); return r; }
    catch(_) { return null; }
}
function toFraction(d, tol=1e-6) {
    if(isNaN(d)||!isFinite(d)) return d.toString();
    if(Math.abs(d-Math.round(d))<tol) return Math.round(d).toString();
    let s=d<0?-1:1, a=Math.abs(d), bn=1,bd=1,bdf=Math.abs(a-1);
    for(let de=1;de<=1000;de++){ let n=Math.round(a*de), df=Math.abs(a-n/de); if(df<bdf){bdf=df;bn=n;bd=de;if(bdf<tol)break;} }
    let fn=s*bn,fd=bd, g=(a,b)=>b?g(b,a%b):a, gg=g(Math.abs(fn),fd); fn/=gg;fd/=gg;
    return fd===1?fn.toString():`${fn}/${fd}`;
}
function update() {
    if(!expr.trim()){ exprEl.textContent='0';resEl.textContent='= 0';fracEl.textContent='Fraction: —';termEl.textContent='👉 0';return; }
    let r=safeEval(expr);
    if(r!==null){
        resEl.textContent=`= ${Number(r.toFixed(8))}`;
        fracEl.textContent=`Fraction: ${toFraction(r)}`;
        termEl.textContent=`👉 ${expr.split(/[\+\-\*\/]/).filter(t=>t.trim()&&!/^[\(\)\[\]\{\}]+$/.test(t)).length}`;
    } else { resEl.textContent='= Error';fracEl.textContent='Fraction: —';termEl.textContent='👉 ?'; }
    exprEl.textContent=expr.replace(/\*/g,'×').replace(/\//g,'÷');
}
function addChar(c) { if(resetNext&&/[\d\.]/.test(c)){expr='';resetNext=false;} expr+=c; update(); }
function addOp(o) { if(resetNext) resetNext=false; if(expr&&!/[\+\-\*\/]$/.test(expr)){expr+=o;update();} }
function clearAll() { expr='';resetNext=false;update(); }
function del() { if(!resetNext){expr=expr.slice(0,-1);update();} }
function sqrtFn() { let r=safeEval(expr); if(r!==null&&r>=0){expr=Math.sqrt(r).toString();resetNext=false;update();} }
function sqFn() { let r=safeEval(expr); if(r!==null){expr=(r*r).toString();resetNext=false;update();} }
function pctFn() { let r=safeEval(expr); if(r!==null){expr=(r/100).toString();resetNext=false;update();} }
function equalFn() { let r=safeEval(expr); if(r!==null){expr=r.toString();resetNext=true;update();} }

document.querySelectorAll('#basic .num-btn[data-char], #basic .bracket-btn[data-char]').forEach(b => b.addEventListener('click', () => addChar(b.dataset.char)));
document.getElementById('clearBtn').addEventListener('click', clearAll);
document.getElementById('delBtn').addEventListener('click', del);
document.getElementById('sqrtBtn').addEventListener('click', sqrtFn);
document.getElementById('squareBtn').addEventListener('click', sqFn);
document.getElementById('percentBtn').addEventListener('click', pctFn);
document.getElementById('equalBtn').addEventListener('click', equalFn);
document.getElementById('minusBtn').addEventListener('click', () => addOp('-'));
document.getElementById('multiplyBtn').addEventListener('click', () => addOp('*'));
document.getElementById('divideBtn').addEventListener('click', () => addOp('/'));
document.getElementById('largePlusBtn').addEventListener('click', () => addOp('+'));
update();

// ========== FLOWER MARKET (NEW LOGIC) ==========
document.getElementById('flowerBtn').addEventListener('click', () => {
    let total = parseFloat(document.getElementById('flowerTotal').value) || 0;
    let bagWt = parseFloat(document.getElementById('flowerBag').value) || 0;
    let wastePerKg = parseFloat(document.getElementById('flowerWastePerKg').value) || 0;
    let price = parseFloat(document.getElementById('flowerPrice').value) || 0;
    let wasteKg = (total * wastePerKg) / 1000;
    let netWeight = Math.max(0, total - bagWt - wasteKg);
    let totalPrice = netWeight * price;
    document.getElementById('flowerResult').innerHTML = `
        <div>Total: ${total} kg</div>
        <div>Bag: ${bagWt} kg</div>
        <div>Waste: ${wasteKg.toFixed(3)} kg (${wastePerKg} g/kg)</div>
        <div><strong>Net Weight: ${netWeight.toFixed(2)} kg</strong></div>
        <div><strong>Total Price: ₹${totalPrice.toFixed(2)}</strong></div>
    `;
});

// ========== TRIGONOMETRY ==========
const trigFns = {
    sin: d => Math.sin(d*Math.PI/180), cos: d => Math.cos(d*Math.PI/180), tan: d => Math.tan(d*Math.PI/180),
    asin: v => Math.asin(v)*180/Math.PI, acos: v => Math.acos(v)*180/Math.PI, atan: v => Math.atan(v)*180/Math.PI
};
['sin','cos','tan','asin','acos','atan'].forEach(fn => {
    document.getElementById(fn+'Btn').addEventListener('click', () => {
        let val = parseFloat(document.getElementById('angleDeg').value) || 0;
        let res = fn.startsWith('a') ? trigFns[fn](val) : trigFns[fn](val);
        document.getElementById('trigResult').innerHTML = `<strong>${fn}(${val}°) = ${res.toFixed(6)}</strong>`;
    });
});

// ========== GEOMETRY (UPDATED WITH TRIANGLES) ==========
const shapeInputs = document.getElementById('shapeInputs');
function updateShapeFields() {
    let s = document.getElementById('shapeSelect').value;
    let fields = {
        square: [{id:'sqSide',l:'Side (a)'}],
        rectangle: [{id:'recLen',l:'Length (l)'},{id:'recWid',l:'Width (w)'}],
        circle: [{id:'cirRad',l:'Radius (r)'}],
        cube: [{id:'cubeSide',l:'Side (a)'}],
        cuboid: [{id:'cubLen',l:'Length (l)'},{id:'cubWid',l:'Width (w)'},{id:'cubHt',l:'Height (h)'}],
        sphere: [{id:'sphRad',l:'Radius (r)'}],
        equilateral_triangle: [{id:'eqSide',l:'Side (a)'}],
        isosceles_triangle: [{id:'isoSide',l:'Equal Side (a)'},{id:'isoBase',l:'Base (b)'}],
        scalene_triangle: [{id:'scSide1',l:'Side 1 (a)'},{id:'scSide2',l:'Side 2 (b)'},{id:'scSide3',l:'Side 3 (c)'}],
        right_triangle: [{id:'rtLeg1',l:'Leg 1 (a)'},{id:'rtLeg2',l:'Leg 2 (b)'}]
    };
    shapeInputs.innerHTML = '';
    (fields[s]||[]).forEach(f => {
        const div = document.createElement('div'); div.className = 'input-group';
        div.innerHTML = `<label>${f.l}</label><input type="number" id="${f.id}" step="any">`;
        shapeInputs.appendChild(div);
    });
}
updateShapeFields();
document.getElementById('shapeSelect').addEventListener('change', updateShapeFields);

document.getElementById('calcShapeBtn').addEventListener('click', () => {
    let s = document.getElementById('shapeSelect').value;
    let vals = {};
    shapeInputs.querySelectorAll('input').forEach(inp => vals[inp.id] = parseFloat(inp.value) || 0);
    let res = '';
    if (s === 'square') { let a=vals.sqSide; res=`Area: ${(a*a).toFixed(2)} | Perimeter: ${(4*a).toFixed(2)}`; }
    else if (s === 'rectangle') { let l=vals.recLen, w=vals.recWid; res=`Area: ${(l*w).toFixed(2)} | Perimeter: ${(2*(l+w)).toFixed(2)}`; }
    else if (s === 'circle') { let r=vals.cirRad; res=`Area: ${(Math.PI*r*r).toFixed(2)} | Circumference: ${(2*Math.PI*r).toFixed(2)}`; }
    else if (s === 'cube') { let a=vals.cubeSide; res=`Volume: ${(a**3).toFixed(2)} | TSA: ${(6*a*a).toFixed(2)}`; }
    else if (s === 'cuboid') { let l=vals.cubLen, w=vals.cubWid, h=vals.cubHt; res=`Volume: ${(l*w*h).toFixed(2)} | TSA: ${(2*(l*w+w*h+h*l)).toFixed(2)}`; }
    else if (s === 'sphere') { let r=vals.sphRad; res=`Volume: ${((4/3)*Math.PI*r**3).toFixed(2)} | Surface: ${(4*Math.PI*r*r).toFixed(2)}`; }
    else if (s === 'equilateral_triangle') { let a=vals.eqSide; let area=(Math.sqrt(3)/4)*a*a; res=`Area: ${area.toFixed(2)} | Perimeter: ${(3*a).toFixed(2)}`; }
    else if (s === 'isosceles_triangle') { let a=vals.isoSide, b=vals.isoBase; let h=Math.sqrt(a*a-(b/2)*(b/2)); let area=0.5*b*h; res=`Height: ${h.toFixed(2)} | Area: ${area.toFixed(2)} | Perimeter: ${(2*a+b).toFixed(2)}`; }
    else if (s === 'scalene_triangle') { let a=vals.scSide1, b=vals.scSide2, c=vals.scSide3; let s2=(a+b+c)/2; let area=Math.sqrt(s2*(s2-a)*(s2-b)*(s2-c)); res=`Area: ${area.toFixed(2)} | Perimeter: ${(a+b+c).toFixed(2)}`; }
    else if (s === 'right_triangle') { let a=vals.rtLeg1, b=vals.rtLeg2; let c=Math.sqrt(a*a+b*b); let area=0.5*a*b; res=`Hypotenuse: ${c.toFixed(2)} | Area: ${area.toFixed(2)} | Perimeter: ${(a+b+c).toFixed(2)}`; }
    document.getElementById('geometryResult').innerHTML = res.split('|').map(i => `<div class="unit-item"><span>${i.split(':')[1]?.trim()}</span>${i.split(':')[0]}</div>`).join('');
});

// ========== PROFIT & LOSS ==========
document.getElementById('simplePLBtn').addEventListener('click', () => {
    let cp=parseFloat(document.getElementById('cp').value)||0, sp=parseFloat(document.getElementById('sp').value)||0;
    if(!cp||!sp) return;
    let diff=sp-cp, percent=(diff/cp)*100;
    document.getElementById('simplePLResult').innerHTML = `${diff>=0?'Profit':'Loss'}: ₹${Math.abs(diff).toFixed(2)} (${Math.abs(percent).toFixed(2)}%)`;
});

// ========== AGE ==========
document.getElementById('ageBtn').addEventListener('click', () => {
    let birth=document.getElementById('birthDate').value;
    if(!birth) return;
    let now=new Date(), bDate=new Date(birth), years=now.getFullYear()-bDate.getFullYear(), months=now.getMonth()-bDate.getMonth(), days=now.getDate()-bDate.getDate();
    if(days<0){ months--; days+=new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if(months<0){ years--; months+=12; }
    document.getElementById('ageResult').innerHTML = `${years} years, ${months} months, ${days} days`;
});

// ========== LAND CONVERTER ==========
const landUnits = { shotangsho: 435.6, katha: 720, bigha: 14400, acre: 43560, sqft: 1, sqm: 10.764, sqyd: 9 };
document.getElementById('convertLandBtn').addEventListener('click', () => {
    let val=parseFloat(document.getElementById('landValue').value)||0, unit=document.getElementById('landUnit').value;
    let sqft=val*landUnits[unit];
    let html='';
    for(let [key,factor] of Object.entries(landUnits)) html += `<div class="unit-item"><span>${(sqft/factor).toFixed(4)}</span>${key}</div>`;
    document.getElementById('landResults').innerHTML = html;
});

// ========== UNIT CONVERTERS ==========
const unitData = {
    length: {m:1,cm:0.01,mm:0.001,km:1000,in:0.0254,ft:0.3048,yd:0.9144},
    volume: {l:1,ml:0.001,m3:1000,gal:3.78541},
    weight: {kg:1,g:0.001,lb:0.453592,oz:0.0283495,t:1000}
};
function convertUnit(cat, val, from) {
    let table=unitData[cat], base=val*table[from], result={};
    for(let [unit,factor] of Object.entries(table)) result[unit]=(base/factor).toFixed(4);
    return result;
}
function showResults(id, data) {
    document.getElementById(id).innerHTML = Object.entries(data).map(([k,v]) => `<div class="unit-item"><span>${v}</span>${k}</div>`).join('');
}
document.getElementById('convertLengthBtn').addEventListener('click', ()=>{
    let v=parseFloat(document.getElementById('lengthValue').value)||0, u=document.getElementById('lengthUnit').value;
    showResults('lengthResults', convertUnit('length', v, u));
});
document.getElementById('convertVolumeBtn').addEventListener('click', ()=>{
    let v=parseFloat(document.getElementById('volumeValue').value)||0, u=document.getElementById('volumeUnit').value;
    showResults('volumeResults', convertUnit('volume', v, u));
});
document.getElementById('convertWeightBtn').addEventListener('click', ()=>{
    let v=parseFloat(document.getElementById('weightVal').value)||0, u=document.getElementById('weightUnit').value;
    showResults('weightResults', convertUnit('weight', v, u));
});
document.getElementById('convertTempBtn').addEventListener('click', ()=>{
    let v=parseFloat(document.getElementById('tempValue').value)||0, u=document.getElementById('tempUnit').value;
    let c = u==='f' ? (v-32)*5/9 : u==='k' ? v-273.15 : v;
    let res = { c: c.toFixed(2), f: (c*9/5+32).toFixed(2), k: (c+273.15).toFixed(2) };
    showResults('tempResults', res);
});

// ========== EMI ==========
document.getElementById('emiBtn').addEventListener('click', () => {
    let P=parseFloat(document.getElementById('emiPrincipal').value)||0, R=parseFloat(document.getElementById('emiRate').value)||0, N=parseFloat(document.getElementById('emiMonths').value)||0;
    if(!P||!R||!N) return;
    let r=R/1200, emi=P*r*Math.pow(1+r,N)/(Math.pow(1+r,N)-1), total=emi*N;
    document.getElementById('emiResult').innerHTML = `Monthly EMI: ₹${emi.toFixed(2)}<br>Total: ₹${total.toFixed(2)}`;
});

// ========== BMI ==========
document.getElementById('bmiBtn').addEventListener('click', () => {
    let h=parseFloat(document.getElementById('bmiHeight').value)/100, w=parseFloat(document.getElementById('bmiWeight').value)||0;
    if(!h||!w) return;
    let bmi=w/(h*h), cat=bmi<18.5?'Underweight':bmi<25?'Normal':bmi<30?'Overweight':'Obese';
    document.getElementById('bmiResult').innerHTML = `BMI: ${bmi.toFixed(1)} (${cat})`;
});
