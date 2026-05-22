import re, json, subprocess, sys

SERIES_FILE = "blog/series-list.js"

# ১. ফাইল পড়ো
with open(SERIES_FILE, 'r') as f:
    content = f.read()

# ২. JSON অ্যারে বের করো
match = re.search(r'const blogSeries = (\[.*?\]);', content, re.DOTALL)
if not match:
    print("❌ blogSeries অ্যারে খুঁজে পাওয়া যায়নি")
    sys.exit(1)

series = json.loads(match.group(1))
original_count = len(series)

# ৩. ডুপ্লিকেট সরাও (একই লিংক একবারই থাকবে)
seen = set()
unique_series = []
for item in series:
    if item['link'] not in seen:
        seen.add(item['link'])
        unique_series.append(item)

dup_removed = original_count - len(unique_series)
print(f"🔍 ডুপ্লিকেট চেক: {dup_removed} টি সরানো হয়েছে")

# ৪. মরা লিংক চেক করো (ঐচ্ছিক, এখন সব লাইভ আছে)
DEAD_URLS = []
print("🔍 লিংক চেক করা হচ্ছে...")
for item in unique_series:
    url = item['link']
    result = subprocess.run(['curl', '-s', '-o', '/dev/null', '-w', '%{http_code}', '--max-time', '5', url], capture_output=True, text=True)
    status = result.stdout.strip()
    if status != "200":
        print(f"  ⚠️ {url} -> {status}")
        DEAD_URLS.append(url)

# ৫. মরা লিংক সরাও
final_series = [item for item in unique_series if item['link'] not in DEAD_URLS]
dead_removed = len(unique_series) - len(final_series)

# ৬. নতুন কন্টেন্ট তৈরি করো
new_json = json.dumps(final_series, indent=2, ensure_ascii=False)
new_content = content.replace(match.group(1), new_json)

# ৭. সেভ করো
with open(SERIES_FILE, 'w') as f:
    f.write(new_content)

print(f"\n✅ ডুপ্লিকেট সরানো: {dup_removed}, মরা লিংক সরানো: {dead_removed}")
print(f"📊 মোট এন্ট্রি: {len(final_series)}")
