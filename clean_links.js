const fs = require('fs');
const vm = require('vm');
const { execSync } = require('child_process');

const SERIES_FILE = 'blog/series-list.js';

// ---------- ১. ফাইল পড়া ----------
let content = fs.readFileSync(SERIES_FILE, 'utf8');

// ---------- ২. অ্যারের অংশ বের করা ----------
const arrayMatch = content.match(/const blogSeries = (\[[\s\S]*?\]);/);
if (!arrayMatch) {
  console.error('❌ blogSeries অ্যারে খুঁজে পাওয়া যায়নি');
  process.exit(1);
}

// ---------- ৩. vm দিয়ে অ্যারে রান করো ----------
let blogSeries;
try {
  const script = new vm.Script('blogSeries = ' + arrayMatch[1]);
  const sandbox = { blogSeries: undefined };
  vm.createContext(sandbox);
  script.runInContext(sandbox);
  blogSeries = sandbox.blogSeries;
} catch (e) {
  console.error('❌ অ্যারে রান করতে সমস্যা:', e.message);
  process.exit(1);
}

if (!Array.isArray(blogSeries)) {
  console.error('❌ blogSeries অ্যারে পাওয়া যায়নি');
  process.exit(1);
}

console.log(`🔍 মোট লিংক: ${blogSeries.length}`);

// ---------- ৪. ডুপ্লিকেট সরানো ----------
const seen = new Set();
const unique = [];
for (const item of blogSeries) {
  if (!seen.has(item.link)) {
    seen.add(item.link);
    unique.push(item);
  }
}
console.log(`🧹 ডুপ্লিকেট সরানো: ${blogSeries.length - unique.length} টি`);

// ---------- ৫. মৃত লিংক চেক ----------
const dead = [];
console.log('🔍 লিংক চেক করা হচ্ছে...');
for (const item of unique) {
  try {
    const result = execSync(
      `curl -s -o /dev/null -w "%{http_code}" --max-time 5 "${item.link}"`,
      { encoding: 'utf8' }
    );
    const status = result.trim();
    if (status !== '200') {
      console.log(`  ⚠️ ${item.link} -> ${status}`);
      dead.push(item.link);
    }
  } catch (e) {
    console.log(`  ❌ ${item.link} -> error`);
    dead.push(item.link);
  }
}

// ---------- ৬. ফাইনাল অ্যারে ----------
const final = unique.filter(item => !dead.includes(item.link));
console.log(`💀 মৃত লিংক সরানো: ${dead.length} টি`);
console.log(`✅ চূড়ান্ত লিংক: ${final.length} টি`);

// ---------- ৭. ফাইল আপডেট ----------
const newArrayStr = JSON.stringify(final, null, 2);
const updatedContent = content.replace(
  /const blogSeries = \[[\s\S]*?\];/,
  `const blogSeries = ${newArrayStr};`
);

// ব্যাকআপ
fs.copyFileSync(SERIES_FILE, SERIES_FILE + '.bak');
fs.writeFileSync(SERIES_FILE, updatedContent, 'utf8');
console.log('📂 ব্যাকআপ রাখা হয়েছে: ' + SERIES_FILE + '.bak');
console.log('🎉 কাজ শেষ!');
